import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Building2, Briefcase, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Pricing() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  // ── On-demand features ────────────────────────────────────────────────────
  const onDemandFeatures = isAr ? [
    { icon: "📩", text: "استقبال وتنظيم الطلبات الإدارية والتشغيلية عبر نقطة اتصال واحدة" },
    { icon: "🔧", text: "التنسيق مع الموردين المناسبين لكل طلب" },
    { icon: "💰", text: "توفير عروض أسعار من شبكة موردين معتمدين" },
    { icon: "✅", text: "متابعة تنفيذ الخدمة حتى إغلاق الطلب" },
    { icon: "🛠",  text: "التأكد من جودة التنفيذ قبل اعتماد الإغلاق" },
    { icon: "📊", text: "إمكانية طلب خدمات متعددة حسب الحاجة" },
    { icon: "📁", text: "توثيق جميع الطلبات داخل حسابك لمراجعتها في أي وقت" },
  ] : [
    { icon: "📩", text: "Receive and organize administrative and operational requests through a single point of contact" },
    { icon: "🔧", text: "Coordinate with the right vendors for each request" },
    { icon: "💰", text: "Provide quotes from our certified vendor network" },
    { icon: "✅", text: "Follow up on service execution until request closure" },
    { icon: "🛠",  text: "Verify execution quality before approving closure" },
    { icon: "📊", text: "Request multiple services as needed" },
    { icon: "📁", text: "Document all requests in your account for review anytime" },
  ];

  const onDemandWhen = isAr ? [
    "إذا كنت فرداً يحتاج خدمة تشغيلية عند الحاجة فقط",
    "إذا كانت طلباتك التشغيلية غير منتظمة أو موسمية",
    "إذا أردت تجربة المنصة قبل الالتزام بأي باقة",
    "إذا كانت منشأتك لديها فريق داخلي يتابع جزءًا من الأعمال",
  ] : [
    "If you're an individual who needs a service occasionally",
    "If your operational requests are irregular or seasonal",
    "If you want to try the platform before committing to a package",
    "If your facility has an internal team handling part of the work",
  ];

  // ── Tier plans ────────────────────────────────────────────────────────────
  const tiers = [
    {
      level: isAr ? "المستوى الأول" : "Tier 1",
      title: isAr ? "باقة المتابعة الأساسية" : "Basic Follow-Up Package",
      badge: null,
      desc: isAr
        ? "للمنشآت الصغيرة أو ذات الطلبات التشغيلية المحدودة"
        : "For small facilities or those with limited operational requests",
      icon: Briefcase,
      features: isAr ? [
        "تنظيم ومتابعة الطلبات التشغيلية",
        "الوصول إلى شبكة الموردين المعتمدين",
        "تجميع الطلبات عبر نقطة اتصال واحدة",
        "متابعة التنفيذ حتى إغلاق الطلب",
        "ملف تشغيلي موحد لجميع الطلبات السابقة",
        "تنسيق زيارات الصيانة عند الحاجة",
      ] : [
        "Operational request organization and follow-up",
        "Access to the certified vendor network",
        "Request aggregation through a single contact point",
        "Follow-up until request closure",
        "Unified operational file for all past requests",
        "Coordinate maintenance visits when needed",
      ],
      primary: false,
    },
    {
      level: isAr ? "المستوى الثاني" : "Tier 2",
      title: isAr ? "باقة المتابعة المتقدمة" : "Advanced Follow-Up Package",
      badge: isAr ? "⭐ الأكثر اختيارًا" : "⭐ Most Popular",
      desc: isAr
        ? "للمنشآت المتوسطة أو متعددة المواقع"
        : "For medium facilities or multi-location businesses",
      icon: Star,
      features: isAr ? [
        "جميع مزايا المستوى الأول",
        "👤 مدير حساب مخصص للمتابعة التشغيلية",
        "📊 تقارير تشغيلية دورية مبسطة",
        "⏰ تنبيهات انتهاء العقود والتراخيص",
        "📄 تنظيم الفواتير التشغيلية الشهرية",
        "متابعة أداء الموردين وتحسين جودة التنفيذ",
        "تنسيق الصيانة الدورية المجدولة",
        "⚡ أولوية أعلى في الاستجابة للطلبات",
      ] : [
        "All Tier 1 features",
        "👤 Dedicated account manager",
        "📊 Periodic simplified operational reports",
        "⏰ Contract and license expiry alerts",
        "📄 Monthly operational invoice organization",
        "Vendor performance tracking and quality improvement",
        "Scheduled periodic maintenance coordination",
        "⚡ Higher response priority",
      ],
      primary: true,
    },
    {
      level: isAr ? "المستوى الثالث" : "Tier 3",
      title: isAr ? "باقة الإدارة التشغيلية الشاملة" : "Full Operational Management Package",
      badge: null,
      desc: isAr
        ? "مناسبة للمنشآت الكبيرة أو متعددة الفروع ذات التشغيل المستمر"
        : "Suitable for large or multi-branch businesses with continuous operations",
      icon: Building2,
      features: isAr ? [
        "جميع مزايا المستويات السابقة",
        "🏢 إدارة تشغيل مركزية لجميع الفروع",
        "📊 تقارير تحليلية تشغيلية شهرية مفصلة",
        "💰 تحليل المصروفات التشغيلية واكتشاف فرص التوفير",
        "إدارة الموردين الحاليين للمنشأة",
        "اقتراح بدائل تشغيلية أقل تكلفة",
        "تنسيق المشاريع التشغيلية الخاصة",
        "متابعة التراخيص والخدمات الحكومية",
        "تنظيم عقود الخدمات الدورية",
        "⚡ أولوية قصوى في الاستجابة والتنفيذ",
        "اجتماعات مراجعة تشغيلية دورية مع الإدارة",
      ] : [
        "All previous tier features",
        "🏢 Centralized operations management for all branches",
        "📊 Detailed monthly operational analytics",
        "💰 Operational expense analysis and savings opportunities",
        "Management of the company's existing vendors",
        "Proposing lower-cost operational alternatives",
        "Coordination of custom operational projects",
        "License and government services follow-up",
        "Periodic service contract organization",
        "⚡ Top-priority response and execution",
        "Periodic operational review meetings with management",
      ],
      primary: false,
    },
  ];

  // ── Large projects features ───────────────────────────────────────────────
  const projectsFeatures = isAr ? [
    "إدارة المناقصات التشغيلية",
    "تنسيق الموردين المشاركين في المشروع",
    "متابعة التنفيذ حتى التسليم",
    "إدارة العقود التشغيلية طويلة المدى",
    "إعداد تقارير متابعة المشروع",
  ] : [
    "Operational tender management",
    "Coordinating vendors participating in the project",
    "Execution follow-up until delivery",
    "Long-term operational contract management",
    "Project progress reporting",
  ];

  return (
    <div className="pb-0">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-primary py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-secondary/20 text-secondary font-bold text-sm px-4 py-1.5 rounded-full mb-6">
            {isAr ? "نموذج الأسعار" : "Pricing Model"}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isAr ? "نموذج مالي شفاف ومرن" : "Transparent & Flexible Pricing"}
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-3xl mx-auto">
            {isAr
              ? "تعتمد منصة GSS على نظام خدمة حسب الطلب مناسب للمنشآت والأفراد، مع باقات مزايا إدارية وتشغيلية اختيارية مخصصة للمنشآت لمستوى أعلى من التنظيم والمتابعة."
              : "GSS Platform operates on an on-demand model suitable for both facilities and individuals, with optional administrative and operational packages exclusively for facilities needing a higher level of organization and follow-up."}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-sm font-bold">
              <span className="text-secondary">●</span>
              {isAr ? "حسب الطلب — للمنشآت والأفراد" : "On-Demand — For Facilities & Individuals"}
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-sm font-bold">
              <span className="text-secondary">●</span>
              {isAr ? "الباقات الإدارية والتشغيلية — للمنشآت فقط" : "Administrative & Operational Packages — Facilities Only"}
            </span>
          </div>
        </div>
      </section>

      {/* ── ON-DEMAND SECTION ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section identity label */}
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/8 border border-primary/15 text-primary font-bold text-sm px-5 py-2 rounded-full mb-4">
              {isAr ? "ما نقدمه" : "What We Offer"}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {isAr
                ? "الخدمات الإدارية والتشغيلية للأفراد والمنشآت"
                : "Administrative & Operational Services for Individuals & Facilities"}
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
              {isAr
                ? "سواء كنت فرداً يحتاج خدمة بسيطة، أو منشأة تبحث عن إدارة متكاملة — المنصة تخدم الجميع."
                : "Whether you're an individual needing a simple service or a facility seeking full management — the platform serves everyone."}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left: Features */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Zap size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">{isAr ? "أولاً" : "Start Here"}</p>
                  <h2 className="text-xl font-bold text-gray-900">
                    {isAr ? "الخدمة حسب الطلب (بدون اشتراك)" : "On-Demand Service (No Subscription)"}
                  </h2>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-full px-3 py-1 mb-4">
                <span>✓</span>
                {isAr ? "متاح للمنشآت والأفراد" : "Available for Facilities & Individuals"}
              </span>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {isAr
                  ? "يمكنك الاستفادة من خدمات منصة GSS دون الالتزام بأي باقة تشغيلية — سواء كنت منشأة أو فرداً. فقط اطلب الخدمة وسنتولى التنفيذ."
                  : "You can benefit from GSS Platform services without committing to any operational package — whether you're a facility or an individual. Just request the service and we'll handle execution."}
              </p>
              <ul className="space-y-3 mb-8">
                {onDemandFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-lg shrink-0 mt-0.5">{f.icon}</span>
                    <span className="text-gray-700 text-sm leading-relaxed">{f.text}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-amber-50 border border-amber-100 rounded-2xl px-5 py-3 text-sm text-amber-800">
                {isAr
                  ? "يتم احتساب رسوم خدمة لكل طلب حسب نوع الخدمة ونطاقها."
                  : "A service fee is calculated per request based on the type and scope of service."}
              </div>
            </motion.div>

            {/* Right: When is it suitable */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="bg-primary/5 border border-primary/10 rounded-3xl p-7">
                <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="text-primary">✦</span>
                  {isAr ? "متى يكون نظام حسب الطلب مناسبًا؟" : "When Is the On-Demand Model Right for You?"}
                </h3>
                <ul className="space-y-4">
                  {onDemandWhen.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={16} className="text-primary mt-0.5 shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 space-y-3">
                  <Link href="/register/individual">
                    <Button variant="outline" className="w-full font-bold border-primary text-primary hover:bg-primary hover:text-white">
                      {isAr ? "سجّل كفرد" : "Register as Individual"}
                    </Button>
                  </Link>
                  <Link href="/register/company">
                    <Button className="w-full font-bold">
                      {isAr ? "سجّل كمنشأة" : "Register as Facility"}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TIER PLANS ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-bold rounded-full px-4 py-1.5 mb-5">
              <Building2 size={13} />
              {isAr ? "مخصصة للمنشآت فقط" : "For Facilities Only"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isAr ? "باقات المزايا التشغيلية (اختيارية)" : "Operational Feature Packages (Optional)"}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {isAr
                ? "هذه الباقات مخصصة للمنشآت التي تحتاج مستوى أعلى من التنظيم والمتابعة وإعداد التقارير. الأفراد يستفيدون من نظام حسب الطلب أعلاه."
                : "These packages are exclusively for facilities requiring a higher level of organization, follow-up, and reporting. Individuals use the on-demand model above."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-white rounded-3xl border flex flex-col overflow-hidden ${
                  tier.primary
                    ? "border-primary shadow-xl ring-1 ring-primary"
                    : "border-gray-200 shadow-sm"
                }`}
              >
                {tier.badge && (
                  <div className="bg-primary text-white text-center py-2 text-xs font-bold tracking-wide">
                    {tier.badge}
                  </div>
                )}
                <div className="p-7 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${tier.primary ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}>
                      <tier.icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{tier.level}</p>
                      <h3 className="font-bold text-gray-900 text-base leading-tight">{tier.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">{tier.desc}</p>

                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <Check size={15} className="text-primary mt-0.5 shrink-0" />
                        <span className="text-gray-700 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5 text-xs text-amber-700 mb-5 text-center">
                    {isAr
                      ? "تُحتسب رسوم خدمة لكل طلب يتم تنفيذه حسب نطاق العمل."
                      : "A service fee is charged per executed request based on scope."}
                  </div>

                  <Link href="/register/company">
                    <Button
                      variant={tier.primary ? "default" : "outline"}
                      className="w-full h-11 font-bold"
                    >
                      {isAr ? "اختيار الباقة" : "Choose Package"}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LARGE PROJECTS ────────────────────────────────────────────────── */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 bg-white/15 rounded-2xl flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <h2 className="text-2xl font-bold">
                  {isAr ? "إدارة المشاريع والعقود التشغيلية الكبيرة" : "Large Projects & Operational Contracts"}
                </h2>
              </div>
              <p className="text-white/75 text-sm leading-relaxed mb-8">
                {isAr
                  ? "في المشاريع التشغيلية الكبيرة أو العقود السنوية تتولى منصة GSS إدارة المشروع بالكامل بالتنسيق مع الموردين المعتمدين."
                  : "For large operational projects or annual contracts, GSS Platform fully manages the project in coordination with certified vendors."}
              </p>
              <ul className="space-y-3 mb-8">
                {projectsFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={15} className="text-secondary mt-0.5 shrink-0" />
                    <span className="text-white/85 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-sm text-white/70">
                {isAr
                  ? "يتم تحديد نسبة إدارة المشروع مسبقًا حسب حجم المشروع ونطاق العمل."
                  : "Project management fee is determined upfront based on project size and scope."}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 border border-white/15 rounded-2xl p-5 text-center">
                <p className="text-4xl font-black text-secondary mb-2">{isAr ? "مخصص" : "Custom"}</p>
                <p className="text-white/70 text-sm">{isAr ? "نسبة إدارة محددة مسبقاً حسب حجم المشروع" : "Pre-defined management fee based on project size"}</p>
              </div>
              <Link href="/contact">
                <Button size="lg" className="w-full h-13 font-bold bg-secondary hover:bg-secondary/90 text-primary">
                  {isAr ? "تواصل لمناقشة مشروعك" : "Contact Us to Discuss Your Project"}
                </Button>
              </Link>
              <Link href="/register/company">
                <Button size="lg" variant="outline" className="w-full h-11 font-bold text-white border-white hover:bg-white/10">
                  {isAr ? "سجّل أولاً" : "Register First"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
