import { IPaymentGateway } from '@/types/engine';
import { LemonSqueezyPaymentAdapter } from './lemonsqueezy-adapter';
import { StripePaymentAdapter } from './stripe-adapter';

/**
 * Payment Gateway Factory
 * Instantiates the configured payment provider based on PAYMENT_GATEWAY_PROVIDER env var.
 * Defaults to LemonSqueezy for seamless zero-tax/zero-license MoR operation in UAE.
 */
export class PaymentGatewayFactory {
  private static instance: IPaymentGateway | null = null;

  public static getGateway(): IPaymentGateway {
    if (this.instance) {
      return this.instance;
    }

    const provider = process.env.PAYMENT_GATEWAY_PROVIDER?.toLowerCase() || 'lemonsqueezy';

    switch (provider) {
      case 'stripe':
        this.instance = new StripePaymentAdapter();
        break;
      case 'lemonsqueezy':
      default:
        this.instance = new LemonSqueezyPaymentAdapter();
        break;
    }

    return this.instance;
  }

  /**
   * Resets the cached singleton instance (useful in tests or hot configuration reloading).
   */
  public static reset(): void {
    this.instance = null;
  }
}
