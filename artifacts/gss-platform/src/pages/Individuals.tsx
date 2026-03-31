import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, ArrowRight, ShieldCheck, Banknote, Star,
  Award, Zap, ClipboardCheck, Clock, ChevronDown, ChevronUp, Send
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIndividualAuth } from "@/contexts/IndividualAuthContext";

// ── Service categories ────────────────────────────────────────────────────────
const SERVICE_CATEGORIES = [
  {
    icon: "🔧",
    ar: { title: "الصيانة المنزلية والكهربائية", services: [
      "تكييف (تركيب – صيانة – تنظيف – تعبئة فريون)",
      "كهرباء (أعطال – تمديدات – تركيب إنارة وأجهزة)",
      "سباكة (تسريبات – تمديدات – تركيب أدوات صحية)",
      "صيانة الأجهزة المنزلية",
      "صيانة الثلاجات والفريزرات وغرف التبريد",
      "صيانة الأفران والأجهزة المطبخية",
      "صيانة عامة متعددة الأعمال",
    ]},
    en: { title: "Home & Electrical Maintenance", services: [
      "AC (Installation – Maintenance – Cleaning – Freon Refill)",
      "Electrical (Faults – Extensions – Lighting & Appliance Installation)",
      "Plumbing (Leaks – Extensions – Fixture Installation)",
      "Home Appliance Maintenance",
      "Refrigerators, Freezers & Cold Room Maintenance",
      "Oven & Kitchen Appliance Maintenance",
      "General Multi-Task Maintenance",
    ]},
  },
  {
    icon: "🏗️",
    ar: { title: "أعمال التشطيب والتجهيز", services: [
      "دهانات داخلية وخارجية",
      "نجارة وتركيبات",
      "تركيب الأبواب والأقفال",
      "أرضيات وتبليط",
      "باركيه وأرضيات خشبية",
      "أعمال جبسية وأسقف مستعارة",
      "لياسة وتشطيبات",
      "تركيب الزجاج والعزل",
      "العزل الحراري والمائي",
      "تركيب الأثاث الجاهز",
      "تجهيز المطابخ المنزلية",
    ]},
    en: { title: "Finishing & Fit-Out Works", services: [
      "Interior & Exterior Painting",
      "Carpentry & Installations",
      "Door & Lock Installation",
      "Flooring & Tiling",
      "Parquet & Wooden Flooring",
      "Gypsum Works & False Ceilings",
      "Plastering & Finishing",
      "Glass & Insulation Installation",
      "Thermal & Waterproofing Insulation",
      "Ready-Made Furniture Assembly",
      "Home Kitchen Fitting",
    ]},
  },
  {
    icon: "📡",
    ar: { title: "الأنظمة التقنية والخدمات الذكية", services: [
      "كاميرات مراقبة",
      "أنظمة إنذار وسلامة",
      "ستالايت وتمديدات تلفزيون",
      "تمديدات الإنترنت والشبكات المنزلية",
      "تركيب الأقفال الذكية",
      "تركيب وحدات الطاقة الاحتياطية الصغيرة",
    ]},
    en: { title: "Tech Systems & Smart Services", services: [
      "CCTV Cameras",
      "Alarm & Safety Systems",
      "Satellite & TV Cabling",
      "Internet & Home Network Cabling",
      "Smart Lock Installation",
      "Small UPS / Backup Power Installation",
    ]},
  },
  {
    icon: "🧹",
    ar: { title: "خدمات التنظيف والصيانة الدورية", services: [
      "تنظيف منازل ومكاتب",
      "تنظيف خزانات المياه",
      "مكافحة الحشرات والقوارض",
      "صيانة المسابح",
      "تركيب وصيانة العشب الصناعي",
    ]},
    en: { title: "Cleaning & Periodic Maintenance", services: [
      "Home & Office Cleaning",
      "Water Tank Cleaning",
      "Pest & Rodent Control",
      "Swimming Pool Maintenance",
      "Artificial Grass Installation & Maintenance",
    ]},
  },
  {
    icon: "🚛",
    ar: { title: "النقل والخدمات اللوجستية", services: [
      "نقل الأثاث",
      "تغليف الأغراض",
      "شحن داخلي",
      "استلام وتسليم الشحنات نيابة عن العميل",
    ]},
    en: { title: "Moving & Logistics Services", services: [
      "Furniture Moving",
      "Item Packaging",
      "Domestic Shipping",
      "Shipment Collection & Delivery on Client's Behalf",
    ]},
  },
  {
    icon: "🏠",
    ar: { title: "تجهيز العقارات والمكاتب", services: [
      "تجهيز الشقق قبل السكن",
      "تجهيز المكاتب المنزلية",
      "تجهيز المحلات الصغيرة",
      "تجهيز العقارات للتأجير",
      "متابعة صيانة العقارات الاستثمارية",
    ]},
    en: { title: "Property & Office Preparation", services: [
      "Apartment Preparation Before Move-In",
      "Home Office Setup",
      "Small Shop Fit-Out",
      "Property Preparation for Rental",
      "Investment Property Maintenance Follow-Up",
    ]},
  },
  {
    icon: "🚗",
    ar: { title: "خدمات المركبات والمرافق", services: [
      "خدمات المركبات الأساسية",
      "تركيب مظلات وسواتر",
      "صيانة المواقف والمرافق الخارجية",
    ]},
    en: { title: "Vehicles & Facilities Services", services: [
      "Basic Vehicle Services",
      "Shade & Partition Installation",
      "Parking & Outdoor Facilities Maintenance",
    ]},
  },
  {
    icon: "📄",
    ar: { title: "الفواتير والخدمات الحكومية", services: [
      "متابعة فواتير الكهرباء والمياه والاتصالات",
      "تجديد التراخيص",
      "متابعة المعاملات الحكومية",
      "خدمات الشؤون الحكومية",
    ]},
    en: { title: "Bills & Government Services", services: [
      "Electricity, Water & Telecom Bill Follow-Up",
      "License Renewal",
      "Government Transaction Follow-Up",
      "Government Affairs Services",
    ]},
  },
  {
    icon: "📄",
    ar: { title: "خدمات المستندات والطباعة", services: [
      "طباعة المستندات الرسمية",
      "خدمات التصوير والطباعة المكتبية",
      "ترجمة الوثائق",
      "تصديق الوثائق",
    ]},
    en: { title: "Documents & Printing Services", services: [
      "Official Document Printing",
      "Office Photocopying & Printing Services",
      "Document Translation",
      "Document Attestation",
    ]},
  },
  {
    icon: "✨",
    ar: { title: "خدمات إضافية متنوعة", services: [
      "خدمات البريد والشحن",
      "خدمات التصوير للعقارات والمواقع",
      "استلام وتسليم المعاملات نيابة عن العميل",
      "تنسيق خدمات متعددة في نفس الطلب",
    ]},
    en: { title: "Additional Miscellaneous Services", services: [
      "Postal & Courier Services",
      "Real Estate & Site Photography",
      "Transaction Collection & Delivery on Client's Behalf",
      "Coordinating Multiple Services in One Request",
    ]},
  },
];

// ── Feature list (6 items) ────────────────────────────────────────────────────
const FEATURES_AR = [
  { icon: Banknote,      color: "bg-green-50 text-green-600",   title: "سعر المورد المباشر",         desc: "تدفع تكلفة التنفيذ الفعلية بدون أي هامش خفي" },
  { icon: Award,         color: "bg-blue-50 text-blue-600",     title: "فنيون معتمدون ومحترفون",      desc: "شبكة موردين مختارة ومجربة وليست عمالة عشوائية" },
  { icon: ClipboardCheck,color: "bg-primary/10 text-primary",   title: "متابعة حتى إغلاق الطلب",     desc: "ننسق مع المورد حتى التأكد من رضاك الكامل" },
  { icon: Zap,           color: "bg-amber-50 text-amber-600",   title: "رسوم خدمة شفافة",            desc: "تعرف التكلفة قبل بدء التنفيذ بدون مفاجآت" },
  { icon: Clock,         color: "bg-sky-50 text-sky-600",       title: "استجابة سريعة",              desc: "يتم التواصل خلال ساعات لتأكيد العرض والموعد" },
  { icon: ShieldCheck,   color: "bg-rose-50 text-rose-600",     title: "ضمان جودة التنفيذ",          desc: "في حال عدم رضاك يتم إعادة التنسيق حتى حل المشكلة" },
];

const FEATURES_EN = [
  { icon: Banknote,      color: "bg-green-50 text-green-600",   title: "Direct Vendor Price",          desc: "You pay the actual execution cost with no hidden margin" },
  { icon: Award,         color: "bg-blue-50 text-blue-600",     title: "Certified & Professional Techs",desc: "A curated, vetted vendor network — not random labour" },
  { icon: ClipboardCheck,color: "bg-primary/10 text-primary",   title: "Follow-Up Until Closed",       desc: "We coordinate with the vendor until your full satisfaction" },
  { icon: Zap,           color: "bg-amber-50 text-amber-600",   title: "Transparent Service Fee",      desc: "Know the total cost before execution — no surprises" },
  { icon: Clock,         color: "bg-sky-50 text-sky-600",       title: "Fast Response",                desc: "We reach out within hours to confirm the offer and schedule" },
  { icon: ShieldCheck,   color: "bg-rose-50 text-rose-600",     title: "Execution Quality Guarantee",  desc: "If you're not satisfied, we re-coordinate until it's resolved" },
];

// ── Steps ─────────────────────────────────────────────────────────────────────
const STEPS_AR = [
  { num: "01", icon: "📲", title: "أرسل طلبك",          desc: "اختر الخدمة وأدخل التفاصيل أو أرفق صور المشكلة" },
  { num: "02", icon: "💰", title: "نجهّز العرض المناسب", desc: "يتم التنسيق مع الموردين المعتمدين واختيار أفضل عرض" },
  { num: "03", icon: "✅", title: "تنفيذ الخدمة",        desc: "بعد موافقتك يتم جدولة الموعد مباشرة" },
  { num: "04", icon: "⭐", title: "تقييم وإغلاق الطلب", desc: "يتم إغلاق الطلب بعد تأكيد رضاك عن التنفيذ" },
];

const STEPS_EN = [
  { num: "01", icon: "📲", title: "Send Your Request",     desc: "Choose the service, enter details or attach photos of the issue" },
  { num: "02", icon: "💰", title: "We Prepare the Quote",  desc: "We coordinate with certified vendors and select the best offer" },
  { num: "03", icon: "✅", title: "Service Execution",     desc: "Once you approve, the appointment is scheduled immediately" },
  { num: "04", icon: "⭐", title: "Review & Close",        desc: "The request is closed after your satisfaction is confirmed" },
];


export default function Individuals() {
  const { lang, isRTL } = useLanguage();
  const { isLoggedIn }  = useIndividualAuth();
  const ctaHref = isLoggedIn ? "/request/service" : "/register/individual";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const features  = lang === "ar" ? FEATURES_AR : FEATURES_EN;
  const steps     = lang === "ar" ? STEPS_AR    : STEPS_EN;
  const categories = SERVICE_CATEGORIES;

  const [showOther, setShowOther] = useState(false);
  const [otherText, setOtherText] = useState("");

  return (
    <div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
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

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {(lang === "ar"
                ? [
                    { num: "صفر",   label: "هامش ربح مخفي",       sub: "تدفع سعر التكلفة المباشر" },
                    { num: "100%",  label: "فنيون مرخصون",         sub: "شبكتنا مؤهلة ومعتمدة" },
                    { num: "ساعات", label: "وقت الاستجابة",        sub: "نتواصل معك بسرعة" },
                    { num: "ضمان",  label: "جودة التنفيذ",         sub: "أو نُعيد التنسيق مجاناً" },
                  ]
                : [
                    { num: "Zero",       label: "Hidden Margin",       sub: "You pay the direct cost" },
                    { num: "100%",       label: "Licensed Technicians", sub: "Our network is certified" },
                    { num: "Hours",      label: "Response Time",        sub: "We reach you quickly" },
                    { num: "Guarantee",  label: "Execution Quality",    sub: "Or we re-coordinate free" },
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

      {/* ── WHY GSS (6 features) ──────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {lang === "ar" ? "لماذا يختار الأفراد منصة GSS؟" : "Why Individuals Choose GSS?"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
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

      {/* ── SERVICES (categorised) ─────────────────────────────────────────── */}
      <section id="ind-services" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {lang === "ar" ? "الخدمات المتاحة للأفراد" : "Services Available for Individuals"}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
              {lang === "ar"
                ? "توفر منصة GSS شبكة واسعة من الموردين والفنيين لتنسيق ومتابعة مختلف الخدمات المنزلية والمكتبية والعقارية حتى إنجازها بالكامل."
                : "GSS provides a wide network of vendors and technicians to coordinate and follow up on all home, office, and real estate services until full completion."}
            </p>
          </div>

          {/* Category cards */}
          <div className="mt-10 space-y-4">
            {categories.map((cat, catIdx) => {
              const catData = lang === "ar" ? cat.ar : cat.en;
              return (
                <motion.div key={catIdx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: catIdx * 0.04 }}
                  className="border border-gray-100 rounded-2xl overflow-hidden">
                  <div className="bg-gray-50 px-5 py-4 flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <h3 className="font-bold text-gray-900 text-base">{catData.title}</h3>
                  </div>
                  <div className="px-5 py-4 grid sm:grid-cols-2 gap-x-6 gap-y-2">
                    {catData.services.map((svc, si) => (
                      <div key={si} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-primary mt-0.5 shrink-0">✓</span>
                        <span>{svc}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* "Other service" option */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="mt-5 border-2 border-dashed border-primary/30 rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowOther(!showOther)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-primary/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">➕</span>
                <span className="font-bold text-primary text-base">
                  {lang === "ar" ? "طلب خدمة أخرى" : "Request Another Service"}
                </span>
              </div>
              {showOther ? <ChevronUp size={18} className="text-primary" /> : <ChevronDown size={18} className="text-primary" />}
            </button>
            {showOther && (
              <div className="px-5 pb-5">
                <p className="text-gray-500 text-sm mb-3">
                  {lang === "ar"
                    ? "اكتب تفاصيل الخدمة المطلوبة وسيتولى فريق GSS التنسيق مع المورد المناسب لتنفيذها عبر شبكتنا المعتمدة"
                    : "Describe the service you need and the GSS team will coordinate with the right vendor to execute it through our certified network"}
                </p>
                <textarea
                  rows={3}
                  value={otherText}
                  onChange={e => setOtherText(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none mb-3"
                  placeholder={lang === "ar" ? "اكتب تفاصيل الخدمة هنا..." : "Describe your service here..."}
                />
                <Link href={`/register/individual${otherText ? `?service=other&details=${encodeURIComponent(otherText)}` : ""}`}>
                  <Button className="font-bold" size="sm">
                    <Send size={14} className="ms-2" />
                    {lang === "ar" ? "أرسل الطلب" : "Send Request"}
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>

          {/* Closing summary */}
          <div className="mt-8 bg-primary/5 border border-primary/15 rounded-2xl px-6 py-5 text-center">
            <p className="text-gray-600 text-sm leading-relaxed">
              {lang === "ar"
                ? "إذا لم تجد الخدمة المطلوبة ضمن القائمة، يمكنك إرسال طلبك مباشرة وسيقوم فريق GSS بتنسيق التنفيذ مع المورد المناسب ومتابعة الخدمة حتى إنجازها بالكامل."
                : "If you can't find the service you need in the list, you can send your request directly and the GSS team will coordinate execution with the right vendor and follow up until full completion."}
            </p>
          </div>

          <div className="text-center mt-10">
            <Link href={ctaHref}>
              <Button size="lg" className="h-13 px-10 text-lg font-bold">
                {lang === "ar" ? "اطلب خدمتك الآن" : "Request Your Service Now"} <Arrow className="ms-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ───────────────────────────────────────────────────── */}
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

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            {lang === "ar" ? "جاهز تطلب خدمتك؟" : "Ready to Request Your Service?"}
          </h2>
          <p className="text-white/75 text-lg mb-4">
            {lang === "ar"
              ? "اطلب الآن وسنتواصل معك خلال ساعات لتأكيد العرض والموعد."
              : "Submit now and we'll reach out within hours to confirm the offer and schedule."}
          </p>
          <p className="text-secondary font-bold mb-10 text-sm">
            {lang === "ar"
              ? "ضمان الجودة + سعر شفاف + فنيون مرخصون"
              : "Quality Guarantee + Transparent Pricing + Licensed Technicians"}
          </p>
          <Link href={ctaHref}>
            <Button size="lg" className="h-14 px-12 text-xl font-bold bg-secondary hover:bg-secondary/90 text-primary">
              {lang === "ar" ? "اطلب خدمتك الآن" : "Request Your Service Now"} <Arrow className="ms-2" size={22} />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
