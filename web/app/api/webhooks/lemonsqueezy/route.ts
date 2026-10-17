import { NextRequest, NextResponse } from 'next/server';
import { LemonSqueezyPaymentAdapter } from '@/lib/payments/lemonsqueezy-adapter';
import { BookRepository } from '@/lib/db/repository';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature') || '';

    const adapter = new LemonSqueezyPaymentAdapter();

    // Verify webhook cryptographic HMAC signature
    const isValid = adapter.verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const event = await adapter.handleWebhookEvent(payload);

    if (event.status === 'paid') {
      // Mark book status as approved and ready for delivery
      await BookRepository.updateBookStatus(event.orderId, 'approved');
    }

    // Never echo the parsed event payload back to the caller.
    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    console.error('[Webhook] Error processing LemonSqueezy webhook:', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
