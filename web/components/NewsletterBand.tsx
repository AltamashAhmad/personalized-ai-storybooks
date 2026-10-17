'use client';

import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export interface NewsletterBandProps {
  isAr?: boolean;
  dir?: 'ltr' | 'rtl';
}

/**
 * Section S10: NewsletterBand
 * Distinctive Tinkerbell mint band with newsletter incentive.
 */
export default function NewsletterBand({ isAr = false, dir = 'ltr' }: NewsletterBandProps) {
  const [email, setEmail] = useState('');

  // Honest subscription: there is no newsletter backend, so the form opens the
  // user's own email app addressed to support with a prefilled subscribe request.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    const subject = encodeURIComponent('Subscribe to newsletter');
    const body = encodeURIComponent(
      `Please subscribe me to the PersonalizedTales newsletter.\n\nEmail: ${trimmed}`
    );
    window.location.href = `mailto:support@personalizedtales.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-12 md:py-16 bg-[var(--color-tinkerbell-60,#DAF7C6)] border-b border-[var(--color-sharpie-20,#D9D9D7)]" dir={dir}>
      <div className="wb-container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/80 text-[var(--color-racing-green,#1E5751)] border border-emerald-200 flex items-center justify-center shadow-xs">
            <Mail className="w-6 h-6 text-[#1E5751]" />
          </div>

          <h2 className="wb-heading text-2xl sm:text-3xl lg:text-4xl font-black mb-3 text-[var(--color-sharpie,#23231E)]">
            {isAr
              ? 'اشترك في نشرتنا البريدية واحصل على خصم ١٥٪ على طلبك الأول مع كود MAGIC15'
              : 'Sign up to our newsletter and get 15% off your first order with code MAGIC15'}
          </h2>
          <p className="wb-body text-xs sm:text-sm text-[var(--color-sharpie-80,#555553)] mb-6 max-w-lg mx-auto">
            {isAr
              ? 'كن أول من يعرف عن أحدث القصص والعروض الموسمية الحصرية والأفكار التذكارية المبتكرة.'
              : 'Be the first to hear about new storybook releases, seasonal surprises, and exclusive gifting perks.'}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isAr ? 'أدخل بريدك الإلكتروني هنا...' : 'Enter your email address...'}
              className="flex-1 px-4 py-3 rounded-[2px] border-2 border-slate-300/80 bg-white text-sm text-[var(--color-sharpie,#23231E)] placeholder:text-slate-400 focus:border-[#1E5751] focus:outline-none focus:ring-2 focus:ring-[#1E5751]/20 font-medium"
            />
            <button
              type="submit"
              className="bg-[var(--color-sharpie,#23231E)] hover:bg-black text-white px-6 py-3 rounded-[2px] font-extrabold text-sm transition-colors duration-150 whitespace-nowrap cursor-pointer shadow-xs active:scale-[0.99]"
            >
              {isAr ? 'اشترك الآن' : 'Sign up'}
            </button>
          </form>

          <p className="text-[10px] text-[var(--color-sharpie-60,#7B7B78)] mt-3 font-bold">
            {isAr
              ? 'سيؤدي هذا إلى فتح تطبيق البريد لديك لإتمام الاشتراك.'
              : 'This opens your email app to complete your subscription.'}
          </p>

          <p className="text-[10px] text-[var(--color-sharpie-60,#7B7B78)] mt-3">
            {isAr
              ? 'يمكنك إلغاء الاشتراك في أي وقت. نحن نحترم خصوصيتك بالكامل.'
              : 'You can unsubscribe at any time. We respect your privacy.'}
          </p>
        </div>
      </div>
    </section>
  );
}
