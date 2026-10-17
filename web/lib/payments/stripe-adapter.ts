import crypto from 'crypto';
import { IPaymentGateway, OrderRequest, CheckoutResponse } from '@/types/engine';

/**
 * Stripe Adapter (Direct Merchant Processor)
 * Provides direct credit card, Apple Pay, and Google Pay checkout sessions.
 *
 * Honesty contract: creating a checkout session requires STRIPE_SECRET_KEY
 * and either succeeds against the live Stripe API or THROWS a descriptive
 * error. It never returns a fake checkout URL — a missing key or a failed
 * API call is a hard error, not a silent mock.
 */
export class StripePaymentAdapter implements IPaymentGateway {
  private secretKey: string;
  private webhookSecret: string;

  constructor(secretKey?: string, webhookSecret?: string) {
    this.secretKey = secretKey || process.env.STRIPE_SECRET_KEY || '';
    this.webhookSecret = webhookSecret || process.env.STRIPE_WEBHOOK_SECRET || '';
  }

  async createCheckoutSession(order: OrderRequest): Promise<CheckoutResponse> {
    if (!this.secretKey) {
      throw new Error(
        '[StripePaymentAdapter] STRIPE_SECRET_KEY is not configured. Set it to create real checkout sessions.'
      );
    }

    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://personalizedtales.com').replace(/\/+$/, '');

    // Direct Stripe API call via standard fetch without heavy SDK dependencies
    const params = new URLSearchParams();
    params.append('payment_method_types[0]', 'card');
    params.append('mode', 'payment');
    params.append('customer_email', order.customerEmail);
    params.append('client_reference_id', order.bookId);
    params.append('success_url', `${appUrl}/preview/${order.bookId}?session_id={CHECKOUT_SESSION_ID}&success=true`);
    params.append('cancel_url', `${appUrl}/preview/${order.bookId}?canceled=true`);
    params.append('line_items[0][price_data][currency]', order.currency.toLowerCase());
    params.append('line_items[0][price_data][unit_amount]', Math.round(order.amount * 100).toString());
    params.append('line_items[0][price_data][product_data][name]', `Personalized Keepsake Storybook (${order.bookId})`);
    params.append('line_items[0][quantity]', '1');

    let res: Response;
    try {
      res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.secretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });
    } catch (err) {
      throw new Error(
        `[StripePaymentAdapter] Network error creating Stripe checkout session: ${(err as Error).message}`
      );
    }

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(
        `[StripePaymentAdapter] Stripe API error ${res.status}: ${errText.slice(0, 300)}`
      );
    }

    const session = (await res.json()) as { url?: string; id?: string };
    if (!session.url || !session.id) {
      throw new Error('[StripePaymentAdapter] Stripe API returned a session without url/id.');
    }
    return {
      checkoutUrl: session.url,
      sessionId: session.id,
    };
  }

  verifyWebhookSignature(payload: string, signature: string): boolean {
    if (!this.webhookSecret) {
      // Fail closed: without a configured secret, signatures cannot be trusted.
      console.error('[StripeAdapter] STRIPE_WEBHOOK_SECRET not set — rejecting webhook signature.');
      return false;
    }
    // Stripe webhook signature uses timestamp (t) and signature (v1)
    const elements = signature.split(',');
    const timestampStr = elements.find((el) => el.startsWith('t='))?.split('=')[1];
    const signatureHash = elements.find((el) => el.startsWith('v1='))?.split('=')[1];

    if (!timestampStr || !signatureHash) return false;

    const timestamp = Number(timestampStr);
    if (!Number.isFinite(timestamp)) return false;

    // Stripe best practice: reject webhooks older than 5 minutes (replay protection).
    const ageSeconds = Math.abs(Date.now() / 1000 - timestamp);
    if (ageSeconds > 5 * 60) {
      console.error('[StripeAdapter] Webhook timestamp too old — rejecting as possible replay.');
      return false;
    }

    const signedPayload = `${timestampStr}.${payload}`;
    const hmac = crypto.createHmac('sha256', this.webhookSecret);
    const expected = hmac.update(signedPayload).digest('hex');

    try {
      // timingSafeEqual throws on length mismatch — a malformed signature must fail, not crash.
      return crypto.timingSafeEqual(Buffer.from(signatureHash), Buffer.from(expected));
    } catch {
      return false;
    }
  }

  async handleWebhookEvent(event: unknown): Promise<{ orderId: string; status: 'paid' | 'failed' | 'refunded' }> {
    const ev = event as {
      type?: string;
      data?: {
        object?: {
          id?: string;
          client_reference_id?: string;
        };
      };
    };
    const type = ev?.type;
    const session = ev?.data?.object;
    const orderId = session?.client_reference_id || session?.id || 'unknown';

    switch (type) {
      case 'checkout.session.completed':
        return { orderId, status: 'paid' };
      case 'charge.refunded':
        return { orderId, status: 'refunded' };
      default:
        // Never grant 'paid' for an event we don't explicitly recognize.
        return { orderId, status: 'failed' };
    }
  }
}
