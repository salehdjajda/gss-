import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/image_1774909317242.png";
import {
  ArrowLeft,
  ShieldCheck,
  Coins,
  Clock,
  ChartLine,
  Users,
  RefreshCcw,
  CheckCircle2,
  Building2,
  Wrench,
  TrendingUp,
  FileText,
  TrendingDown,
  BarChart3,
  AlertTriangle,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { lang } = useLanguage();
  const ar = lang === "ar";

  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const challengeCategories = ar ? [
    {
      icon: Wrench,
      title: "تحديات تشغيلية شائعة",
      points: [
        "تعدد الموردين واختلاف مستوى التنسيق بينهم",
        "استهلاك وقت إداري كبير في التنسيق اليومي",
        "تفاوت الأسعار بين الموردين لنفس الخدمة",
        "صعوبة توحيد جودة التنفيذ عبر الفروع",
      ],
    },
    {
      icon: Coins,
      title: "تحديات في إدارة التكاليف",
      points: [
        "عدم وضوح كامل لتفاصيل المصروفات التشغيلية",
        "تكاليف غير مباشرة يصعب ملاحظتها (إعادة أعمال، تأخير)",
        "صعوبة مقارنة عروض الموردين بشكل منهجي",
        "ارتفاع التكلفة الإجمالية نتيجة غياب التنسيق المركزي",
      ],
    },
    {
      icon: BarChart3,
      title: "تحديات في المتابعة والتقارير",
      points: [
        "غياب رؤية مركزية لجميع الطلبات التشغيلية",
        "تشتت البيانات بين الأقسام والفروع",
        "صعوبة إعداد تقارير تشغيلية دقيقة بشكل دوري",
        "ضعف القدرة على تحليل الأداء واتخاذ قرارات مبنية على بيانات",
      ],
    },
    {
      icon: RefreshCcw,
      title: "تحديات في استمرارية التشغيل",
      points: [
        "تأخر الاستجابة لبعض الطلبات التشغيلية",
        "الاعتماد على أشخاص محددين في المتابعة",
        "صعوبة متابعة التراخيص والعقود بشكل استباقي",
        "تباين مستوى الخدمة بين موقع وآخر",
      ],
    },
  ] : [
    {
      icon: Wrench,
      title: "Common Operational Challenges",
      points: [
        "Multiple vendors with inconsistent coordination",
        "High administrative time spent on daily coordination",
        "Price variations between vendors for the same service",
        "Difficulty maintaining consistent quality across branches",
      ],
    },
    {
      icon: Coins,
      title: "Cost Management Challenges",
      points: [
        "Lack of full clarity on operational expense details",
        "Hidden indirect costs (rework, delays)",
        "Difficulty comparing vendor quotes systematically",
        "Higher total costs due to absence of central coordination",
      ],
    },
    {
      icon: BarChart3,
      title: "Monitoring & Reporting Challenges",
      points: [
        "No centralized view of all operational requests",
        "Data scattered across departments and branches",
        "Difficulty producing accurate operational reports periodically",
        "Limited ability to analyze performance and make data-driven decisions",
      ],
    },
    {
      icon: RefreshCcw,
      title: "Operational Continuity Challenges",
      points: [
        "Delayed responses to some operational requests",
        "Dependency on specific individuals for follow-up",
        "Difficulty proactively tracking licenses and contracts",
        "Inconsistent service levels across locations",
      ],
    },
  ];

  const impactItems = ar ? [
    { icon: Clock,         label: "وقت إداري أعلى من اللازم" },
    { icon: TrendingDown,  label: "تكلفة تشغيلية أكبر من المتوقع" },
    { icon: AlertTriangle, label: "تحكم أقل في جودة التنفيذ" },
    { icon: ChartLine,     label: "رؤية محدودة لاتخاذ القرار" },
  ] : [
    { icon: Clock,         label: "Higher-than-necessary admin time" },
    { icon: TrendingDown,  label: "Larger-than-expected operational costs" },
    { icon: AlertTriangle, label: "Less control over execution quality" },
    { icon: ChartLine,     label: "Limited visibility for decision-making" },
  ];

  const howSteps = ar ? [
    { step: "1", title: "ترسل المنشأة الطلب", desc: "عبر قناة واحدة بسيطة داخل المنصة." },
    { step: "2", title: "يحلّل فريق GSS الاحتياج", desc: "دراسة دقيقة لفهم المتطلبات الفعلية قبل أي إجراء." },
    { step: "3", title: "اختيار المورد الأنسب", desc: "نختار المورد الأفضل سعراً وجودةً من شبكتنا المعتمدة — وليس موردًا ثابتًا." },
    { step: "4", title: "متابعة التنفيذ حتى الإغلاق", desc: "نشرف على سير العمل ونتابع حتى اكتمال التنفيذ بنجاح." },
    { step: "5", title: "إصدار التقرير التشغيلي", desc: "تقرير إنجاز شامل وفاتورة موحدة تدعم اتخاذ القرار." },
  ] : [
    { step: "1", title: "Facility Sends Request", desc: "Through a single simple channel inside the platform." },
    { step: "2", title: "GSS Analyzes the Need", desc: "Precise study to understand actual requirements before any action." },
    { step: "3", title: "Best Vendor Selected", desc: "We select the best vendor by price and quality from our certified network — not a fixed vendor." },
    { step: "4", title: "Execution Monitored to Closure", desc: "We oversee the workflow and follow up until execution is complete." },
    { step: "5", title: "Operational Report Issued", desc: "Comprehensive completion report and unified invoice supporting decision-making." },
  ];

  const vendorCriteria = ar ? [
    { icon: TrendingUp, label: "مقارنة أسعار السوق" },
    { icon: ShieldCheck, label: "تقييم جودة الأداء" },
    { icon: FileText, label: "شفافية كاملة في التكاليف" },
    { icon: Clock, label: "سرعة الاستجابة والتنفيذ" },
  ] : [
    { icon: TrendingUp, label: "Market Price Comparison" },
    { icon: ShieldCheck, label: "Performance Quality Assessment" },
    { icon: FileText, label: "Full Cost Transparency" },
    { icon: Clock, label: "Fast Response & Execution" },
  ];

  const sectors = ar ? [
    { icon: "🏢", label: "المكاتب والإدارة" },
    { icon: "🏪", label: "التجزئة والمحلات" },
    { icon: "🏨", label: "الفنادق والضيافة" },
    { icon: "🏥", label: "الرعاية الصحية" },
    { icon: "🏗️", label: "المقاولات والبناء" },
    { icon: "🏭", label: "المصانع والإنتاج" },
    { icon: "📦", label: "اللوجستيات والتخزين" },
    { icon: "🎓", label: "التعليم والمدارس" },
    { icon: "⚡", label: "الطاقة والمرافق" },
    { icon: "🌿", label: "الزراعة والبيئة" },
    { icon: "🚗", label: "قطاع المركبات" },
    { icon: "💼", label: "الخدمات المهنية" },
    { icon: "🛒", label: "التجارة الإلكترونية" },
    { icon: "🏟️", label: "الترفيه والفعاليات" },
    { icon: "🏠", label: "العقارات والإسكان" },
  ] : [
    { icon: "🏢", label: "Offices & Admin" },
    { icon: "🏪", label: "Retail & Shops" },
    { icon: "🏨", label: "Hotels & Hospitality" },
    { icon: "🏥", label: "Healthcare" },
    { icon: "🏗️", label: "Contracting & Construction" },
    { icon: "🏭", label: "Factories & Production" },
    { icon: "📦", label: "Logistics & Warehousing" },
    { icon: "🎓", label: "Education & Schools" },
    { icon: "⚡", label: "Energy & Utilities" },
    { icon: "🌿", label: "Agriculture & Environment" },
    { icon: "🚗", label: "Automotive Sector" },
    { icon: "💼", label: "Professional Services" },
    { icon: "🛒", label: "E-Commerce" },
    { icon: "🏟️", label: "Entertainment & Events" },
    { icon: "🏠", label: "Real Estate & Housing" },
  ];

  const trustItems = ar
    ? ["نقطة اتصال واحدة لجميع الخدمات", "لا عمولات مخفية", "بدء سريع دون التزام"]
    : ["Single point of contact for all services", "No hidden commissions", "Fast start, no commitment"];

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80"
            alt="GSS Platform"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-primary/95 via-primary/85 to-slate-900/70"></div>
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          <div className="absolute top-8 left-8 hidden md:block" style={{ height: "110px", width: "380px" }}>
            <img
              src={logoImg}
              alt="GSS - General Support Services"
              style={{
                height: "340px",
                width: "auto",
                marginTop: "-112px",
                mixBlendMode: "screen",
                filter: "invert(1) hue-rotate(180deg) brightness(1.15) contrast(1.1)",
              }}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-16 pb-16 md:pt-24 lg:pt-28 lg:pb-28">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/40 rounded-full px-5 py-2 text-secondary text-sm font-bold mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              General Support Services — GSS
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              {ar ? (
                <>
                  مدير العمليات الخارجي
                  <br />
                  <span className="text-secondary">لخدمات منشأتكم التشغيلية</span>
                </>
              ) : (
                <>
                  Your External Operations Manager
                  <br />
                  <span className="text-secondary">for Facility Services</span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed"
            >
              {ar
                ? "تعمل منصة GSS كمدير عمليات خارجي يدعم منشأتكم في تنظيم الطلبات التشغيلية ومتابعة الموردين وتحليل المصروفات واقتراح الحلول الأكثر كفاءة، مما يساهم في رفع جودة الأداء التشغيلي وتقليل الأعباء الإدارية دون الحاجة إلى إنشاء فريق تشغيل داخلي إضافي."
                : "GSS acts as an external operations manager supporting your facility in organizing operational requests, monitoring vendors, analyzing expenses, and proposing more efficient solutions — improving operational performance without the need to build an additional internal operations team."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <Link href="/register/company">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-primary font-bold h-14 px-10 text-lg shadow-lg shadow-secondary/30 rounded-2xl"
                  data-testid="hero-btn-company"
                >
                  {ar ? "سجّل منشأتك مجاناً" : "Register Your Facility Free"}
                  <ArrowLeft className="mr-2" size={20} />
                </Button>
              </Link>
              <Link href="/companies">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-14 px-8 text-lg text-white border-white/40 hover:bg-white/10 rounded-2xl backdrop-blur-sm"
                  data-testid="hero-btn-learn"
                >
                  {ar ? "اعرف أكثر" : "Learn More"}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-10 flex flex-wrap gap-6 items-center"
            >
              {trustItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                  <CheckCircle2 size={16} className="text-secondary flex-shrink-0" />
                  {item}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenges & Solution — Unified Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-secondary/20 text-secondary font-bold text-xs px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              {ar ? "التحديات والحلول" : "Challenges & Solutions"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
              {ar
                ? "كيف يمكن تعزيز كفاءة إدارة الخدمات التشغيلية في منشأتكم؟"
                : "How Can Operational Service Management Efficiency Be Enhanced in Your Facility?"}
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
              {ar
                ? "حتى المنشآت الأكثر تنظيمًا تواجه تحديات تشغيلية يومية تؤثر بشكل غير مباشر على الكفاءة والتكلفة وسرعة التنفيذ. تعمل منصة GSS على دعم منشأتكم في التعامل مع هذه الجوانب بكفاءة أعلى."
                : "Even the most organized facilities face daily operational challenges that indirectly affect efficiency, cost, and execution speed. GSS supports your facility in handling these aspects with greater efficiency."}
            </p>
          </div>

          {/* 4 Challenge Categories */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-5 mb-8"
          >
            {challengeCategories.map((cat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-secondary/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <cat.icon size={20} className="text-secondary" />
                  </div>
                  <h3 className="font-bold text-white text-base">{cat.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {cat.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Impact Strip */}
          <div className="bg-red-950/40 border border-red-500/20 rounded-2xl px-6 py-5 mb-6">
            <p className="text-center text-red-300 font-bold text-sm mb-5">
              {ar ? "النتيجة عند عدم معالجة هذه الجوانب" : "The Result When These Areas Are Left Unaddressed"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {impactItems.map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2">
                  <div className="w-9 h-9 bg-red-900/40 rounded-xl flex items-center justify-center">
                    <item.icon size={18} className="text-red-400" />
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* GSS Solution */}
          <div className="bg-primary/25 border border-primary/40 rounded-2xl p-7 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={18} className="text-secondary flex-shrink-0" />
                <h3 className="text-lg font-bold text-secondary">
                  {ar ? "كيف تعالج GSS هذه التحديات؟" : "How Does GSS Address These Challenges?"}
                </h3>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                {ar
                  ? "تعمل منصة GSS كطبقة تشغيل داعمة تعزز كفاءة إدارة الخدمات التشغيلية، من خلال تنظيم الطلبات، وتوحيد التنسيق مع الموردين، وتحسين وضوح المصروفات، وتوفير تقارير تشغيلية تدعم اتخاذ القرار."
                  : "GSS acts as a supporting operational layer that enhances operational service management efficiency — through organizing requests, unifying vendor coordination, improving expense clarity, and providing decision-supporting operational reports."}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link href="/register/company">
                <Button size="lg" className="h-12 px-7 font-bold bg-secondary text-primary hover:bg-secondary/90" data-testid="link-challenge-register">
                  {ar ? "سجّل منشأتك" : "Register Your Facility"} <ArrowLeft className="mr-2" size={16} />
                </Button>
              </Link>
              <Link href="/companies">
                <Button size="lg" variant="outline" className="h-12 px-7 font-bold border-white/30 text-white hover:bg-white/10">
                  {ar ? "اعرف أكثر" : "Learn More"}
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {ar ? "كيف تعمل المنصة؟" : "How Does the Platform Work?"}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {ar
                ? "آلية عمل سلسة وموثوقة تضمن تنفيذ طلباتكم بأعلى جودة وأفضل سعر."
                : "A smooth, reliable workflow that ensures your requests are executed at the highest quality and best price."}
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {howSteps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shadow-md">
                  {item.step}
                </div>
                <div className="flex-1 pb-8 border-b border-gray-100 last:border-0">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/how-it-works">
              <Button variant="outline" className="h-12 px-8 font-semibold border-primary text-primary hover:bg-primary hover:text-white" data-testid="link-how-it-works">
                {ar ? "تعرف على آلية العمل بالتفصيل" : "See the Full Workflow"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Vendor Selection Strategy */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {ar
                  ? "نختار المورد الأنسب لمصلحتكم وليس موردًا ثابتًا"
                  : "We Select the Best Vendor for Your Benefit — Not a Fixed One"}
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                {ar
                  ? "لا تعتمد منصة GSS على مورد واحد لتنفيذ الخدمات، بل يتم اختيار المورد الأنسب سعراً وجودةً لكل حالة تشغيلية بما يحقق أفضل مصلحة للمنشأة."
                  : "GSS doesn't rely on a single vendor. The most suitable vendor by price and quality is selected for each operational case to achieve the best outcome for the facility."}
              </p>
              <p className="text-secondary font-bold text-xl">
                {ar
                  ? "نحن نعمل معكم كشريك تشغيل وليس كمصدر تكلفة إضافي."
                  : "We work with you as an operations partner, not an additional cost."}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {vendorCriteria.map((item, i) => (
                <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-6 text-center">
                  <item.icon size={32} className="mx-auto mb-3 text-secondary" />
                  <p className="font-semibold text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">
              {ar
                ? "مهما كان قطاعكم، GSS تدعم عملياتكم التشغيلية"
                : "Whatever Your Sector, GSS Supports Your Operations"}
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {ar
                ? "شبكتنا من الموردين والخبرة التشغيلية تغطي طيفاً واسعاً من القطاعات داخل المملكة."
                : "Our vendor network and operational expertise cover a wide range of sectors across the Kingdom."}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12">
            {sectors.map((sector, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-white border border-gray-100 rounded-2xl p-4 text-center hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <p className="text-2xl mb-1.5">{sector.icon}</p>
                <p className="text-gray-700 font-medium text-xs leading-tight">{sector.label}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-primary/5 border border-primary/15 rounded-3xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p className="font-bold text-gray-900 text-lg mb-1">
                {ar
                  ? "لا يهم حجم منشأتك — صغيرة أو كبيرة، نبدأ معكم من اليوم الأول"
                  : "Size doesn't matter — small or large, we start with you from day one"}
              </p>
              <p className="text-gray-500 text-sm">
                {ar
                  ? "سجّل منشأتك وسيتواصل معك فريقنا لتقديم التسعيرة المناسبة لاحتياجاتكم."
                  : "Register your facility and our team will reach out to provide a quote tailored to your needs."}
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/register/company">
                <Button className="font-bold px-6 bg-primary hover:bg-primary/90">
                  {ar ? "سجّل منشأتك الآن" : "Register Now"}
                  <ArrowLeft className="mr-2" size={16} />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" className="font-bold px-5 border-primary text-primary hover:bg-primary hover:text-white">
                  {ar ? "عرض الباقات" : "View Plans"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* For Vendors Teaser */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <Wrench size={40} className="text-primary mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {ar ? "أنت مورد أو فني؟" : "Are You a Vendor or Technician?"}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {ar
                  ? "استقبل طلبات عمل مباشرة من شركات ومنشآت متعددة. لا عمولات على الخدمات التشغيلية اليومية. تقديم سعرك بشفافية كاملة."
                  : "Receive work requests directly from multiple companies and facilities. No commissions on daily operational services. Submit your price with full transparency."}
              </p>
              <Link href="/vendors">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" data-testid="link-vendor-network">
                  {ar ? "انضم لشبكة الموردين" : "Join the Vendor Network"}
                </Button>
              </Link>
            </div>
            <div className="bg-secondary/5 rounded-2xl p-8 border border-secondary/10">
              <Users size={40} className="text-secondary mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {ar ? "أنت مستشار أو خبير تشغيل؟" : "Are You a Consultant or Operations Expert?"}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {ar
                  ? "حقّق دخلاً إضافياً من خبرتك المهنية. قدّم توصيات تشغيلية ورشّح موردين موثوقين واحصل على نسبة عند تنفيذ التوصيات."
                  : "Generate additional income from your professional expertise. Provide operational recommendations, refer trusted vendors, and earn a percentage when recommendations are executed."}
              </p>
              <Link href="/partners">
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white" data-testid="link-success-partners">
                  {ar ? "انضم كشريك نجاح" : "Join as a Success Partner"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-24 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {ar ? "ابدأ بتنظيم عملياتك التشغيلية اليوم" : "Start Organizing Your Operations Today"}
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed">
            {ar ? "بدون التزامات — بدء سريع — نتائج واضحة" : "No commitments — Fast start — Clear results"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register/company">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-primary font-bold h-14 px-10 text-lg"
                data-testid="cta-register-company"
              >
                {ar ? "سجل منشأتك الآن" : "Register Your Facility Now"}
                <ArrowLeft className="mr-2" size={20} />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-10 text-lg text-white border-white hover:bg-white/10"
                data-testid="cta-contact"
              >
                {ar ? "تواصل معنا أولاً" : "Contact Us First"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
