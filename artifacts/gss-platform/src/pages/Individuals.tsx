import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, ArrowRight, ShieldCheck, Banknote,
  Star, Award, ClipboardCheck
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIndividualAuth } from "@/contexts/IndividualAuthContext";

const FEATURES_AR = [
  { icon: Banknote,       color: "bg-green-50 text-green-600",  title: "سعر المورد المباشر",      desc: "تدفع تكلفة التنفيذ الفعلية بدون أي هامش خفي" },
  { icon: Award,          color: "bg-blue-50 text-blue-600",    title: "فنيون معتمدون ومحترفون",   desc: "شبكة موردين مختارة ومجربة وليست عمالة عشوائية" },
  { icon: ClipboardCheck, color: "bg-primary/10 text-primary",  title: "متابعة حتى إغلاق الطلب",  desc: "ننسق مع المورد حتى التأكد من رضاك الكامل" },
  { icon: ShieldCheck,    color: "bg-rose-50 text-rose-600",    title: "رسوم شفافة — لا مفاجآت",  desc: "تعرف التكلفة الكاملة قبل بدء التنفيذ" },
];

const FEATURES_EN = [
  { icon: Banknote,       color: "bg-green-50 text-green-600",  title: "Direct Vendor Price",          desc: "You pay the actual execution cost with no hidden margin" },
  { icon: Award,          color: "bg-blue-50 text-blue-600",    title: "Certified & Professional Techs",desc: "A curated, vetted vendor network — not random labour" },
  { icon: ClipboardCheck, color: "bg-primary/10 text-primary",  title: "Follow-Up Until Closed",       desc: "We coordinate with the vendor until your full satisfaction" },
  { icon: ShieldCheck,    color: "bg-rose-50 text-rose-600",    title: "Transparent Fee — No Surprises",desc: "Know the full cost before execution begins" },
];

const STEPS_AR = [
  { num: "01", icon: "📲", title: "أرسل طلبك",           desc: "اختر الخدمة وأدخل التفاصيل أو أرفق صور المشكلة" },
  { num: "02", icon: "💰", title: "نجهّز أفضل عرض",      desc: "نتواصل مع موردين معتمدين ونختار أفضل سعر تنفيذ" },
  { num: "03", icon: "✅", title: "تنفيذ الخدمة",         desc: "بعد موافقتك يتم جدولة الموعد مباشرة" },
  { num: "04", icon: "⭐", title: "تأكيد وإغلاق الطلب",  desc: "يُغلق الطلب فقط بعد التأكد من رضاك الكامل" },
];

const STEPS_EN = [
  { num: "01", icon: "📲", title: "Send Your Request",    desc: "Choose the service, enter details or attach photos of the issue" },
  { num: "02", icon: "💰", title: "We Prepare the Quote", desc: "We coordinate with certified vendors and select the best execution price" },
  { num: "03", icon: "✅", title: "Service Execution",    desc: "Once you approve, the appointment is scheduled immediately" },
  { num: "04", icon: "⭐", title: "Confirm & Close",      desc: "The request closes only after your full satisfaction is confirmed" },
];

export default function Individuals() {
  const { lang, isRTL } = useLanguage();
  const { isLoggedIn }  = useIndividualAuth();
  const ctaHref = isLoggedIn ? "/request/service" : "/register/individual";
  const Arrow   = isRTL ? ArrowLeft : ArrowRight;
  const features = lang === "ar" ? FEATURES_AR : FEATURES_EN;
  const steps    = lang === "ar" ? STEPS_AR    : STEPS_EN;

  return (
    <div>

      {/* HERO */}
      <section className="relative bg-primary py-28 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary/90" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-secondary/20 text-secondary font-bold text-sm px-4 py-1.5 rounded-full mb-6">
                {lang === "ar" ? "خدمة الأفراد" : "Individual Service"}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {lang === "ar"
                  ? <> احصل على<br /><span className="text-secondary">سعر المورد المباشر</span><br />بدون أي زيادة </>
                  : <> Get<br /><span className="text-secondary">Direct Vendor Pricing</span><br />With Zero Markup </>}
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-10">
                {lang === "ar"
                  ? "تربطك منصة GSS بموردين وفنيين معتمدين بسعر التنفيذ الحقيقي، مع متابعة كاملة حتى إنجاز الخدمة — مقابل رسوم خدمة شفافة ومعلنة مسبقًا فقط."
                  : "GSS connects you with certified vendors and technicians at the true execution cost, with full follow-up until service completion — for a transparent, pre-announced service fee only."}
              </p>
              <Link href={ctaHref}>
                <Button size="lg" className="h-14 px-10 text-lg font-bold bg-secondary hover:bg-secondary/90 text-primary">
                  {lang === "ar" ? "اطلب خدمتك الآن" : "Request Your Service Now"} <Arrow className="ms-2" size={20} />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {(lang === "ar"
                ? [
                    { num: "صفر",   label: "هامش ربح مخفي",  sub: "تدفع سعر التكلفة المباشر" },
                    { num: "100%",  label: "فنيون مرخصون",    sub: "شبكتنا مؤهلة ومعتمدة" },
                    { num: "ساعات", label: "وقت الاستجابة",   sub: "نتواصل معك بسرعة" },
                    { num: "ضمان",  label: "جودة التنفيذ",    sub: "أو نُعيد التنسيق مجاناً" },
                  ]
                : [
                    { num: "Zero",      label: "Hidden Margin",       sub: "You pay the direct cost" },
                    { num: "100%",      label: "Licensed Technicians", sub: "Our network is certified" },
                    { num: "Hours",     label: "Response Time",        sub: "We reach you quickly" },
                    { num: "Guarantee", label: "Execution Quality",    sub: "Or we re-coordinate free" },
                  ]
              ).map((item, i) => (
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {lang === "ar" ? "لماذا يختار الأفراد منصة GSS؟" : "Why Individuals Choose GSS?"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-gray-50 border border-gray-100 rounded-3xl p-6 hover:shadow-sm transition-shadow">
                <div className={`w-11 h-11 ${feat.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <feat.icon size={20} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {lang === "ar" ? "كيف تعمل الخدمة؟" : "How Does the Service Work?"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl border border-gray-100 p-6 text-center relative">
                <div className="absolute -top-3 right-1/2 translate-x-1/2 bg-primary text-white text-xs font-black px-3 py-1 rounded-full">
                  {step.num}
                </div>
                <p className="text-4xl mb-3 mt-3">{step.icon}</p>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {lang === "ar" ? "الخدمات المتاحة للأفراد" : "Services Available for Individuals"}
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-10">
              {lang === "ar"
                ? "صيانة، تشطيب، أنظمة تقنية، تنظيف، نقل، خدمات حكومية وأكثر — كل شيء في مكان واحد."
                : "Maintenance, finishing, tech systems, cleaning, moving, government services and more — all in one place."}
            </p>
            <Link href="/services">
              <Button size="lg" className="h-14 px-12 text-lg font-bold">
                {lang === "ar" ? "تصفح جميع الخدمات" : "Browse All Services"} <Arrow className="ms-2" size={20} />
              </Button>
            </Link>
          </motion.div>
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

    </div>
  );
}
