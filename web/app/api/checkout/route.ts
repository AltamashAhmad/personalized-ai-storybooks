import { NextRequest, NextResponse } from 'next/server';
import { PaymentGatewayFactory } from '@/lib/payments/factory';
import { getProductBySlug } from '@/config/products';
import { isComingSoon } from '@/config/comingSoon';
import {
  FORMAT_PRICES,
  ADDON_PRICES,
  getCouponDiscount,
  type FormatId,
} from '@/lib/utils/pricing';
import { DIGITAL_ONLY_LAUNCH } from '@/config/launch';
import { OrderRequest } from '@/types/engine';

// Server-side pricing authority — the charged amount is ALWAYS recomputed
// here from the catalog + pricing rules. body.amount (if present) is NEVER
// trusted and is ignored entirely. Keepsake photo is a free personalization
// marker (no upload exists yet), so it is never billed.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Only these formats may be priced. Anything else is rejected with 400 —
// an unknown format must never silently price as a default.
const FORMAT_ALLOWLIST = Object.keys(FORMAT_PRICES) as FormatId[];

const MAX_QTY_PER_LINE = 99;
const MAX_ITEMS = 20;

/**
 * A payment provider counts as configured only when its secret keys are
 * present. PAYMENT_GATEWAY_PROVIDER unset defaults to Lemon Squeezy, but
 * without keys we must NOT hand out a fake checkout URL.
 */
function isPaymentConfigured(): boolean {
  const provider = (process.env.PAYMENT_GATEWAY_PROVIDER || 'lemonsqueezy').toLowerCase();
  if (provider === 'stripe') {
    return !!process.env.STRIPE_SECRET_KEY;
  }
  return !!(
    process.env.LEMONSQUEEZY_API_KEY &&
    process.env.LEMONSQUEEZY_STORE_ID &&
    process.env.LEMONSQUEEZY_VARIANT_ID
  );
}

interface CheckoutLine {
  productSlug: string;
  format: FormatId;
  qty: number;
}

/**
 * Validates and normalizes one order line (multi-item array entry or the
 * legacy single-item body). Returns the line or a client-facing error.
 */
function parseLine(raw: unknown): CheckoutLine | { error: string } {
  const item =
    raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : null;
  if (!item) return { error: 'Invalid item' };

  const bookSlug = typeof item.bookSlug === 'string' ? item.bookSlug : '';
  const product = getProductBySlug(bookSlug);
  if (!product || isComingSoon(bookSlug)) {
    return { error: 'Unknown or unavailable product' };
  }

  const formatKey = typeof item.format === 'string' ? item.format : '';
  if (!FORMAT_ALLOWLIST.includes(formatKey as FormatId)) {
    return { error: 'Invalid format' };
  }

  const qty = Math.max(
    1,
    Math.min(MAX_QTY_PER_LINE, Math.floor(Number(item.qty) || 1))
  );

  return { productSlug: product.slug, format: formatKey as FormatId, qty };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // NOTE: body.amount is NEVER trusted. The charged amount is always
    // recomputed server-side from the catalog + pricing rules below.

    // --- Normalize items: multi-item OR legacy single-item ----------------
    const lines: CheckoutLine[] = [];
    const rawItems = Array.isArray(body.items) ? body.items : null;
    if (rawItems && rawItems.length > 0) {
      // Multi-item: { items: [{ bookSlug, format, qty }], ... }
      if (rawItems.length > MAX_ITEMS) {
        return NextResponse.json(
          { success: false, error: 'Too many items' },
          { status: 400 }
        );
      }
      for (const raw of rawItems) {
        const line = parseLine(raw);
        if ('error' in line) {
          return NextResponse.json(
            { success: false, error: line.error },
            { status: 400 }
          );
        }
        lines.push(line);
      }
    } else {
      // Legacy single-item: { bookSlug, format, qty, ... }
      const line = parseLine({
        bookSlug: body.bookSlug,
        format: body.format,
        qty: body.qty,
      });
      if ('error' in line) {
        return NextResponse.json(
          { success: false, error: line.error },
          { status: 400 }
        );
      }
      lines.push(line);
    }

    // --- DIGITAL-ONLY LAUNCH: only the digital edition is sold. Reject any
    // physical format or add-on here — the client UI gates them too, but the
    // API is the authority and never trusts the request body.
    if (DIGITAL_ONLY_LAUNCH) {
      const launchAddons =
        body.addons && typeof body.addons === 'object'
          ? (body.addons as Record<string, unknown>)
          : {};
      const hasAddons = ['giftBox', 'coloringBook', 'audioKeepsake', 'giftWrap', 'stickers', 'photo'].some(
        (key) => !!launchAddons[key]
      );
      if (hasAddons) {
        return NextResponse.json(
          { success: false, error: 'Add-ons are coming soon — only the digital edition is available at launch' },
          { status: 400 }
        );
      }
      if (lines.some((line) => line.format !== 'digital')) {
        return NextResponse.json(
          { success: false, error: 'Physical editions are coming soon — only the digital edition is available at launch' },
          { status: 400 }
        );
      }
    }

    // --- Validate the buyer email (no placeholder fallback) ---------------
    const customerEmail =
      typeof body.customerEmail === 'string' ? body.customerEmail.trim() : '';
    if (!EMAIL_RE.test(customerEmail)) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required' },
        { status: 400 }
      );
    }

    // --- Compute the amount SERVER-SIDE ------------------------------------
    const unitPrices = lines.map(
      (line) => FORMAT_PRICES[line.format] ?? 79
    );
    const itemsSubtotal = lines.reduce(
      (sum, line, idx) => sum + (unitPrices[idx] ?? 79) * line.qty,
      0
    );

    const addons =
      body.addons && typeof body.addons === 'object'
        ? (body.addons as Record<string, unknown>)
        : {};
    const addonsTotal =
      (addons.giftBox ? ADDON_PRICES.giftBox : 0) +
      (addons.coloringBook ? ADDON_PRICES.coloringBook : 0) +
      (addons.audioKeepsake ? ADDON_PRICES.audioKeepsake : 0) +
      (addons.giftWrap ? ADDON_PRICES.giftWrap : 0) +
      (addons.stickers ? ADDON_PRICES.stickers : 0) +
      (addons.photo ? ADDON_PRICES.photo : 0);

    const grossSubtotal = itemsSubtotal + addonsTotal;
    const coupon = typeof body.coupon === 'string' ? body.coupon : null;
    const discount = getCouponDiscount(
      coupon,
      lines.map((line, idx) => ({
        unitPrice: unitPrices[idx] ?? 79,
        quantity: line.qty,
      })),
      grossSubtotal
    );
    const amount = Math.max(grossSubtotal - discount, 0);

    // --- Refuse to fake a checkout when no provider is configured ---------
    if (!isPaymentConfigured()) {
      return NextResponse.json(
        { success: false, error: 'payments_not_configured', demoMode: true },
        { status: 503 }
      );
    }

    const orderRequest: OrderRequest = {
      bookId: lines[0]?.productSlug ?? '',
      customerEmail,
      customerName:
        typeof body.customerName === 'string' && body.customerName.trim()
          ? body.customerName.trim()
          : 'Valued Parent',
      amount,
      currency: 'AED',
      packageType: lines.length > 1 ? 'bundle' : 'digital_keepsake',
    };

    const gateway = PaymentGatewayFactory.getGateway();
    const session = await gateway.createCheckoutSession(orderRequest);

    return NextResponse.json({
      success: true,
      checkoutUrl: session.checkoutUrl,
      sessionId: session.sessionId,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to initialize checkout session';
    console.error('[API Checkout] Error generating checkout session:', error);
    // If the gateway itself reports missing configuration, surface it
    // honestly instead of a generic 500.
    if (/not configured|missing|api key|secret/i.test(message)) {
      return NextResponse.json(
        { success: false, error: 'payments_not_configured', demoMode: true },
        { status: 503 }
      );
    }
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
