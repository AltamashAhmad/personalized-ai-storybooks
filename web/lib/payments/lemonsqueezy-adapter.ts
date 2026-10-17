import crypto from 'crypto';
import { IPaymentGateway, OrderRequest, CheckoutResponse } from '@/types/engine';

/**
 * LemonSqueezy Adapter (Merchant of Record)
 * Handles Apple Pay, credit cards, global VAT/sales tax compliance,
 * and automatic direct payouts to UAE bank accounts with zero trade license requirement.
 *
 * Honesty contract: creating a checkout session requires LEMONSQUEEZY_API_KEY +
 * LEMONSQUEEZY_STORE_ID + LEMONSQUEEZY_VARIANT_ID and either succeeds against
 * the live API or THROWS a descriptive error. It never returns a fake
 * checkout URL — a missing key or a failed API call is a hard error.
 */
export class LemonSqueezyPaymentAdapter implements IPaymentGateway {
  private apiKey: string;
  private storeId: string;
  private webhookSecret: string;
  private variantId: string;

  constructor(
    apiKey?: string,
    storeId?: string,
    webhookSecret?: string,
    variantId?: string
  ) {
    this.apiKey = apiKey || process.env.LEMONSQUEEZY_API_KEY || '';
    this.storeId = storeId || process.env.LEMONSQUEEZY_STORE_ID || '';
    this.webhookSecret = webhookSecret || process.env.LEMONSQUEEZY_WEBHOOK_SECRET || '';
    this.variantId = variantId || process.env.LEMONSQUEEZY_VARIANT_ID || '';
  }

  /**
   * Creates a hosted checkout session with Apple Pay pre-enabled.
   */
  async createCheckoutSession(order: OrderRequest): Promise<CheckoutResponse> {
    const missing: string[] = [];
    if (!this.apiKey) missing.push('LEMONSQUEEZY_API_KEY');
    if (!this.storeId) missing.push('LEMONSQUEEZY_STORE_ID');
    if (!this.variantId) missing.push('LEMONSQUEEZY_VARIANT_ID');
    if (missing.length > 0) {
      throw new Error(
        `[LemonSqueezyAdapter] Missing configuration: ${missing.join(', ')}. ` +
          'Set them to create real checkout sessions.'
      );
    }

    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://personalizedtales.com').replace(/\/+$/, '');

    let response: Response;
    try {
      response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          data: {
            type: 'checkouts',
            attributes: {
              checkout_data: {
                email: order.customerEmail,
                name: order.customerName,
                custom: {
                  book_id: order.bookId,
                  package_type: order.packageType,
                },
              },
              product_options: {
                redirect_url: `${appUrl}/preview/${order.bookId}?success=true`,
              },
            },
            relationships: {
              store: {
                data: {
                  type: 'stores',
                  id: this.storeId,
                },
              },
              variant: {
                data: {
                  type: 'variants',
                  id: this.variantId,
                },
              },
            },
          },
        }),
      });
    } catch (error) {
      throw new Error(
        `[LemonSqueezyAdapter] Network error creating Lemon Squeezy checkout: ${(error as Error).message}`
      );
    }

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(
        `[LemonSqueezyAdapter] Lemon Squeezy API error ${response.status}: ${errText.slice(0, 300)}`
      );
    }

    const json = (await response.json()) as {
      data?: { id?: string | number; attributes?: { url?: string; expires_at?: string } };
    };
    const url = json.data?.attributes?.url;
    const id = json.data?.id;
    if (!url || id === undefined || id === null) {
      throw new Error('[LemonSqueezyAdapter] Lemon Squeezy API returned a checkout without url/id.');
    }
    return {
      checkoutUrl: url,
      sessionId: String(id),
      expiresAt: json.data?.attributes?.expires_at,
    };
  }

  /**
   * Verifies the cryptographic HMAC SHA-256 signature from LemonSqueezy webhook requests.
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    if (!this.webhookSecret) {
      // Fail closed: without a configured secret, signatures cannot be trusted.
      console.error('[LemonSqueezyAdapter] LEMONSQUEEZY_WEBHOOK_SECRET not set — rejecting webhook signature.');
      return false;
    }
    const hmac = crypto.createHmac('sha256', this.webhookSecret);
    const digest = Buffer.from(hmac.update(payload).digest('hex'), 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');
    try {
      // timingSafeEqual throws on length mismatch — a malformed signature must fail, not crash.
      return crypto.timingSafeEqual(digest, signatureBuffer);
    } catch {
      return false;
    }
  }

  /**
   * Translates LemonSqueezy webhook events into normalized internal domain events.
   */
  async handleWebhookEvent(event: unknown): Promise<{ orderId: string; status: 'paid' | 'failed' | 'refunded' }> {
    const ev = event as {
      meta?: {
        event_name?: string;
        custom_data?: {
          book_id?: string;
        };
      };
      data?: {
        attributes?: {
          order_id?: string | number;
          status?: string;
          first_order_item?: {
            order_id?: string | number;
          };
        };
      };
    };
    const eventName = ev?.meta?.event_name;
    const customData = ev?.data?.attributes?.first_order_item?.order_id || ev?.data?.attributes?.order_id;
    const bookId = ev?.meta?.custom_data?.book_id || 'unknown';

    switch (eventName) {
      case 'order_created': {
        // Lemon Squeezy fires order_created when the order is created — payment may
        // still be pending or failed. Only report 'paid' on explicit confirmation.
        const orderStatus = ev?.data?.attributes?.status;
        return {
          orderId: `${customData || bookId}`,
          status: orderStatus === 'paid' ? 'paid' : 'failed',
        };
      }
      case 'order_refunded':
        return { orderId: `${customData || bookId}`, status: 'refunded' };
      default:
        // Never grant 'paid' for an event we don't explicitly recognize.
        return { orderId: `${customData || bookId}`, status: 'failed' };
    }
  }
}
