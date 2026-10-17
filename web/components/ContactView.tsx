"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import StoreHeader from "@/components/StoreHeader";
import { useCountry } from "@/lib/context/CountryContext";

export default function ContactView({ initialLang }: { initialLang?: "en" | "ar" }) {
  const { language } = useCountry();
  const currentLang = initialLang || language;
  const isAr = currentLang === "ar";
  const currentDir = isAr ? "rtl" : "ltr";

  // WhatsApp support number — web/config/site.ts has no whatsapp constant, so it is defined here.
  const WHATSAPP_URL = "https://wa.me/971501234567";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderId: "",
    subject: "general",
    message: "",
  });

  // Honest contact form: there is no backend, so submitting opens the user's
  // own email app addressed to the displayed support address with the inquiry prefilled.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website inquiry from ${formData.name.trim() || "a parent"}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nOrder ID: ${formData.orderId || "-"}\nInquiry type: ${formData.subject}\n\n${formData.message}`
    );
    window.location.href = `mailto:support@personalizedtales.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#FDF8F1] text-[#23231E] flex flex-col selection:bg-amber-200">
      <StoreHeader />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-12 md:py-20 w-full" dir={currentDir}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-bold text-slate-500 mb-6 flex items-center gap-2">
          <Link href={isAr ? "/ar" : "/"} className="hover:text-[#1E5751] transition">
            {isAr ? "الرئيسية" : "Home"}
          </Link>
          <span>/</span>
          <span className="text-[#23231E]">{isAr ? "اتصل بنا" : "Contact Us"}</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E5751]/10 text-[#1E5751] text-xs font-black uppercase tracking-wider mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>{isAr ? "خدمة أولياء الأمور" : "Parent Care Support"}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#23231E] tracking-tight font-serif mb-4">
            {isAr ? "نحن هنا لمساعدتك دائماً" : "We'd Love to Hear From You"}
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            {isAr
              ? "سواء كان لديك استفسار حول تخصيص قصة، أو متابعة شحنتك، أو طلبات الحضانات والمدارس، فريقنا في أبوظبي جاهز لخدمتك."
              : "Whether you have a question about personalizing a story, tracking an order, or school/nursery bulk gifts, our UAE team is here to help."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Rail */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Quick Box */}
            <div className="bg-[#DAF7C6] p-7 rounded-3xl border border-slate-300/80 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-white text-emerald-600 flex items-center justify-center font-black mb-4 shadow-sm">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#23231E] font-serif mb-2">
                {isAr ? "الدعم السريع عبر الواتساب" : "Instant WhatsApp Support"}
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed mb-6">
                {isAr
                  ? "تحدث مباشرة مع مستشاري الكتب وأولياء الأمور لدينا. متوسط الرد أقل من ١٥ دقيقة."
                  : "Chat directly with our UAE story experts. Average response time is under 15 minutes."}
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#23231E] hover:bg-black text-white font-extrabold px-6 py-3.5 rounded-xl text-sm transition shadow-md w-full justify-center"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? "فتح محادثة الواتساب (+971)" : "Open WhatsApp Chat (+971)"}</span>
              </a>
            </div>

            {/* Address & Hours */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#1E5751] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-[#23231E]">
                    {isAr ? "المقر الرئيسي" : "Headquarters"}
                  </h4>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {isAr
                      ? "أبوظبي، دولة الإمارات العربية المتحدة"
                      : "Abu Dhabi, United Arab Emirates"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <Clock className="w-5 h-5 text-[#1E5751] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-[#23231E]">
                    {isAr ? "ساعات العمل الرسمية" : "Parent Care Hours"}
                  </h4>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {isAr
                      ? "يومياً من ٩:٠٠ صباحاً حتى ٩:٠٠ مساءً بتوقيت الإمارات (GST)"
                      : "Daily: 9:00 AM – 9:00 PM Gulf Standard Time (GST)"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <Mail className="w-5 h-5 text-[#1E5751] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-[#23231E]">
                    {isAr ? "البريد الإلكتروني المباشر" : "Direct Email"}
                  </h4>
                  <p className="text-slate-500 text-xs mt-0.5">
                    support@personalizedtales.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Email Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-2xl font-black text-[#23231E] font-serif mb-2">
                {isAr ? "أرسل لنا رسالة" : "Send Us a Message"}
              </h3>
              <p className="text-slate-500 text-xs mb-6">
                {isAr
                  ? "نضمن الرد خلال ساعتين خلال ساعات العمل الرسمية."
                  : "Guaranteed response within 2 hours during business hours."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isAr ? "الاسم الكريم *" : "Your Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isAr ? "محمد أحمد" : "Sarah Jenkins"}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:border-[#1E5751]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isAr ? "البريد الإلكتروني *" : "Email Address *"}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="parent@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:border-[#1E5751]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isAr ? "رقم الطلب (اختياري)" : "Order ID (Optional)"}
                  </label>
                  <input
                    type="text"
                    value={formData.orderId}
                    onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                    placeholder="#PT-12345"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:border-[#1E5751]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isAr ? "موضوع الاستفسار" : "Inquiry Subject"}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:border-[#1E5751] bg-white"
                  >
                    <option value="general">{isAr ? "استفسار عام" : "General Question"}</option>
                    <option value="order">{isAr ? "متابعة شحنة أو طلب" : "Order & Delivery Status"}</option>
                    <option value="customization">{isAr ? "مساعدة في تخصيص القصة" : "Personalization Assistance"}</option>
                    <option value="schools">{isAr ? "طلبات الحضانات والمدارس" : "School & Nursery Bulk Gifting"}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? "رسالتك بالتفصيل *" : "Your Message *"}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={isAr ? "اكتب استفسارك هنا..." : "Tell us how we can help you..."}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:border-[#1E5751]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#23231E] hover:bg-black text-white font-extrabold py-4 rounded-xl text-sm transition cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isAr ? "إرسال الرسالة الآن" : "Send Inquiry"}</span>
              </button>
              <p className="text-[11px] text-slate-500 text-center">
                {isAr
                  ? "سيؤدي هذا إلى فتح تطبيق البريد لديك مع تعبئة رسالتك مسبقاً."
                  : "This opens your email app with your message prefilled."}
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
