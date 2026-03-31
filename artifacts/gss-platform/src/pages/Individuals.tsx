import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck, Banknote, Star, Award, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SERVICES = [
  { emoji: "❄️", ar: "تكييف",           en: "AC & Cooling" },
  { emoji: "🔧", ar: "سباكة",           en: "Plumbing" },
  { emoji: "⚡", ar: "كهرباء",          en: "Electrical" },
  { emoji: "🛠️",ar: "نجارة وتركيبات", en: "Carpentry" },
  { emoji: "🧊", ar: "غرف التبريد",    en: "Cold Storage" },
  { emoji: "📱", ar: "صيانة الأجهزة",  en: "Device Repair" },
  { emoji: "🎨", ar: "دهانات",          en: "Painting" },
  { emoji: "🏗️",ar: "لياسة",          en: "Plastering" },
  { emoji: "✨", ar: "أعمال جبسية",    en: "Gypsum Works" },
  { emoji: "🪵", ar: "باركيه",          en: "Parquet" },
  { emoji: "🧱", ar: "أرضيات وتبليط", en: "Tiling & Flooring" },
  { emoji: "📹", ar: "كاميرات مراقبة", en: "CCTV" },
  { emoji: "🧹", ar: "تنظيف",          en: "Cleaning" },
  { emoji: "🐛", ar: "مكافحة حشرات",   en: "Pest Control" },
  { emoji: "🚛", ar: "نقل وشحن",       en: "Moving & Delivery" },
  { emoji: "📄", ar: "تراخيص",          en: "Licensing" },
  { emoji: "🏠", ar: "إيجارات",         en: "Rentals" },
  { emoji: "🚗", ar: "مركبات",          en: "Vehicles" },
  { emoji: "💧", ar: "فواتير خدمات",   en: "Utility Bills" },
  { emoji: "🏊", ar: "حوض سباحة",     en: "Swimming Pool" },
  { emoji: "🌿", ar: "عشب صناعي",      en: "Artificial Grass" },
  { emoji: "📡", ar: "ستالايت",         en: "Satellite" },
  { emoji: "🏛️",ar: "شؤون حكومية",   en: "Gov. Affairs" },
  { emoji: "🌐", ar: "ترجمة وثائق",    en: "Document Translation" },
  { emoji: "🅿️",ar: "مضلات مواقف",    en: "Parking Shades" },
];

export default function Individuals() {
  const { t, lang, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const features = [
    { icon: Banknote,   titleKey: "ind_feat1_title" as const, descKey: "ind_feat1_desc" as const, color: "bg-green-50 text-green-600" },
    { icon: Award,      titleKey: "ind_feat2_title" as const, descKey: "ind_feat2_desc" as const, color: "bg-blue-50 text-blue-600" },
    { icon: ShieldCheck,titleKey: "ind_feat3_title" as const, descKey: "ind_feat3_desc" as const, color: "bg-primary/10 text-primary" },
    { icon: Zap,        titleKey: "ind_feat4_title" as const, descKey: "ind_feat4_desc" as const, color: "bg-amber-50 text-amber-600" },
  ];

  const steps = [
    { num: "01", icon: "📲", titleKey: "ind_step1" as const, descKey: "ind_step1_desc" as const },
    { num: "02", icon: "💰", titleKey: "ind_step2" as const, descKey: "ind_step2_desc" as const },
    { num: "03", icon: "✅", titleKey: "ind_step3" as const, descKey: "ind_step3_desc" as const },
    { num: "04", icon: "⭐", titleKey: "ind_step4" as const, descKey: "ind_step4_desc" as const },
  ];

  return (
    <div className="pb-0">

      {/* HERO */}
      <section className="relative bg-primary py-28 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary/90" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-secondary/20 text-secondary font-bold text-sm px-4 py-1.5 rounded-full mb-6">
                {t("ind_badge")}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {t("ind_h1a")}<br />
                <span className="text-secondary">{t("ind_h1b")}</span><br />
                {t("ind_h1c")}
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-10">
                {t("ind_hero_desc")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register/individual">
                  <Button size="lg" className="h-14 px-10 text-lg font-bold bg-secondary hover:bg-secondary/90 text-primary" data-testid="cta-ind-hero">
                    {t("ind_requestNow")} <Arrow className="mr-2" size={20} />
                  </Button>
                </Link>
                <Link href="#ind-services">
                  <Button size="lg" variant="outline" className="h-14 px-10 text-lg text-white border-white hover:bg-white/10">
                    {t("ind_seeServices")}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: lang === "ar" ? "صفر" : "Zero",   label: lang === "ar" ? "هامش ربح مخفي" : "Hidden Margin",      sub: lang === "ar" ? "تدفع سعر التكلفة المباشر" : "You pay the direct cost price" },
                { num: "100%",                             label: lang === "ar" ? "فنيون مرخصون" : "Licensed Technicians", sub: lang === "ar" ? "شبكتنا مؤهلة ومعتمدة" : "Our network is certified" },
                { num: lang === "ar" ? "أسرع" : "Faster", label: lang === "ar" ? "استجابة خلال ساعات" : "Hours Response",   sub: lang === "ar" ? "نتواصل معك بسرعة" : "We reach out quickly" },
                { num: lang === "ar" ? "ضمان" : "Guarantee",label: lang === "ar" ? "جودة التنفيذ" : "Execution Quality",   sub: lang === "ar" ? "أو نُصلحها مجاناً" : "Or we fix it free" },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center">
                  <p className="text-3xl font-black text-secondary mb-1">{item.num}</p>
                  <p className="text-white font-bold text-sm mb-1">{item.label}</p>
                  <p className="text-white/60 text-xs">{item.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY GSS */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t("ind_why_title")}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t("ind_why_desc")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-gray-50 border border-gray-100 rounded-3xl p-6 text-center hover:shadow-sm transition-shadow">
                <div className={`w-12 h-12 ${feat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <feat.icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{t(feat.titleKey)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(feat.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t("ind_how_title")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl border border-gray-100 p-6 text-center relative">
                <div className="absolute -top-3 right-1/2 translate-x-1/2 bg-primary text-white text-xs font-black px-3 py-1 rounded-full">
                  {step.num}
                </div>
                <p className="text-4xl mb-3 mt-3">{step.icon}</p>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{t(step.titleKey)}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{t(step.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="ind-services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t("ind_services_title")}</h2>
            <p className="text-gray-500">{t("ind_services_desc")}</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-10">
            {SERVICES.map((svc, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.02 }}
                className="bg-primary/5 border border-primary/10 rounded-2xl p-4 text-center hover:border-primary/30 hover:shadow-sm transition-all cursor-default">
                <p className="text-2xl mb-2">{svc.emoji}</p>
                <p className="font-bold text-gray-800 text-xs">{lang === "ar" ? svc.ar : svc.en}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/register/individual">
              <Button size="lg" className="h-13 px-10 text-lg font-bold" data-testid="cta-ind-services">
                {t("requestService")} <Arrow className="mr-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-12 bg-secondary/5 border-y border-secondary/20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={20} fill="currentColor" className="text-secondary" />)}
          </div>
          <p className="text-xl md:text-2xl font-bold text-primary leading-relaxed mb-3">
            {lang === "ar"
              ? '"لأول مرة أدفع سعر الفني الحقيقي — بدون وساطة وبدون مفاجآت"'
              : '"For the first time I paid the real technician price — no middleman, no surprises"'}
          </p>
          <p className="text-gray-400 text-sm">{lang === "ar" ? "عميل GSS — الرياض" : "GSS Client — Riyadh"}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">{t("ind_cta_title")}</h2>
          <p className="text-white/75 text-lg mb-4">{t("ind_cta_desc")}</p>
          <p className="text-secondary font-bold mb-10 text-sm">{t("ind_guarantee")}</p>
          <Link href="/register/individual">
            <Button size="lg" className="h-14 px-12 text-xl font-bold bg-secondary hover:bg-secondary/90 text-primary" data-testid="cta-ind-final">
              {t("ind_requestNow")} <Arrow className="mr-2" size={22} />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
