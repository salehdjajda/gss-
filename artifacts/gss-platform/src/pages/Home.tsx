import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/image_1774909317242.png";
import {
  ArrowLeft,
  ShieldCheck,
  Clock,
  Users,
  CheckCircle2,
  Wrench,
  TrendingUp,
  FileText,
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

  const gssSupportPoints = ar ? [
    "تنظيم الطلبات عبر نقطة تشغيل واحدة",
    "توحيد التنسيق مع الموردين",
    "تحسين وضوح المصروفات التشغيلية",
    "متابعة التنفيذ حتى الإغلاق",
    "توفير تقارير تشغيلية تدعم اتخاذ القرار",
  ] : [
    "Organizing requests through a single operational point",
    "Unifying coordination with vendors",
    "Improving clarity of operational expenses",
    "Following up on execution until closure",
    "Providing operational reports that support decision-making",
  ];

  const howSteps = ar ? [
    { step: "1", title: "ترسل طلبك (منشأة أو فرد) عبر نقطة اتصال واحدة داخل المنصة", desc: "" },
    { step: "2", title: "يتم تحليل الاحتياج قبل التنفيذ", desc: "" },
    { step: "3", title: "اختيار المورد الأنسب وفق السعر والجودة", desc: "" },
    { step: "4", title: "متابعة التنفيذ حتى إغلاق الطلب", desc: "" },
    { step: "5", title: "إصدار تقرير إنجاز يدعم اتخاذ قراراتك", desc: "" },
  ] : [
    { step: "1", title: "You (facility or individual) submit your request via a single channel inside the platform", desc: "" },
    { step: "2", title: "Your need is analyzed before execution begins", desc: "" },
    { step: "3", title: "Most suitable vendor selected based on price and quality", desc: "" },
    { step: "4", title: "Execution is monitored until the request is closed", desc: "" },
    { step: "5", title: "A completion report is issued to support your decision-making", desc: "" },
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
    ? ["نقطة تشغيل واحدة لجميع الخدمات", "رسوم واضحة وشفافة", "بدء سريع حسب الطلب"]
    : ["Single operational point for all services", "Clear and transparent fees", "Flexible on-demand start"];

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
        {/* Background image + overlays */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&auto=format&fit=crop&q=85"
            alt="GSS Platform"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark centered gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-primary/90 to-slate-900/95" />
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          {/* Gold glow at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-secondary/20 rounded-full blur-3xl" />
        </div>

        {/* Centered content */}
        <div className="relative z-10 w-full px-4 sm:px-6 text-center flex flex-col items-center pt-24 pb-20">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-10"
          >
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white/90">
              {ar ? "المنصة التشغيلية الأولى في المملكة" : "Saudi Arabia's First Operational Platform"}
            </span>
          </motion.div>

          {/* Main headline — line 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-2"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
              {ar ? "منصة الخدمات الإدارية والتشغيلية" : "Administrative & Operational Services"}
            </h1>
          </motion.div>

          {/* Main headline — line 2 (gold, bigger) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-10"
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-secondary leading-tight tracking-tight">
              {ar ? "للمنشآت والأفراد" : "Management Platform"}
            </h2>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
              {/* Button 1 — Primary: company registration */}
              <Link href="/register/company">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-primary font-black h-14 px-10 text-lg shadow-xl shadow-secondary/30 rounded-2xl"
                  data-testid="hero-btn-company"
                >
                  {ar ? "سجّل منشأتك مجانًا" : "Register Your Facility Free"}
                  <ArrowLeft className="mr-2" size={20} />
                </Button>
              </Link>
              {/* Button 2 — Secondary: individual registration */}
              <Link href="/register/individual">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-14 px-8 text-lg font-bold text-sky-300 border-sky-400/60 hover:bg-sky-400/10 hover:text-sky-200 hover:border-sky-300 rounded-2xl backdrop-blur-sm transition-colors"
                  data-testid="hero-btn-individual"
                >
                  {ar ? "سجّل كفرد واطلب خدمتك" : "Register as Individual"}
                </Button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="mt-10 flex flex-wrap gap-5 items-center justify-center"
            >
              {trustItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-300 text-sm bg-white/5 border border-white/10 rounded-full px-4 py-2">
                  <CheckCircle2 size={15} className="text-secondary flex-shrink-0" />
                  {item}
                </div>
              ))}
            </motion.div>
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
                ? "كيف تساعدك منصة GSS في إدارة خدماتك التشغيلية؟"
                : "How Does GSS Help You Manage Your Operational Services?"}
            </h2>
          </div>

          {/* Two-column: intro + GSS support points */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-10 items-start"
          >
            {/* Left: Intro paragraph */}
            <motion.div variants={fadeInUp}>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                {ar
                  ? "سواء كنت منشأة أو فرداً، تحتاج إلى مستوى أعلى من التنسيق في الخدمات التشغيلية، وتحكم أوضح في المصروفات، ورؤية واضحة لكل ما تم تنفيذه."
                  : "Whether you're a facility or an individual, you need a higher level of coordination in operational services, clearer expense control, and full visibility into everything executed."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/register/company">
                  <Button size="lg" className="h-12 px-7 font-bold bg-secondary text-primary hover:bg-secondary/90" data-testid="link-challenge-register">
                    {ar ? "سجّل الآن" : "Register Now"} <ArrowLeft className="mr-2" size={16} />
                  </Button>
                </Link>
                <Link href="/companies">
                  <Button size="lg" variant="outline" className="h-12 px-7 font-bold border-white/30 text-white hover:bg-white/10">
                    {ar ? "اعرف أكثر" : "Learn More"}
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right: GSS support points */}
            <motion.div variants={fadeInUp} className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-7">
              <p className="text-secondary font-bold text-base mb-5">
                {ar
                  ? "سواء كنت منشأة أو فرداً، تدعمك GSS في هذه الجوانب من خلال:"
                  : "Whether you're a facility or an individual, GSS supports you in these areas through:"}
              </p>
              <ul className="space-y-4">
                {gssSupportPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={14} className="text-secondary" />
                    </div>
                    <span className="text-slate-200 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

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
                ? "آلية عمل سلسة وموثوقة تضمن تنفيذ طلبك بأعلى جودة وأفضل سعر — سواء كنت منشأة أو فرداً."
                : "A smooth, reliable workflow that ensures your requests are executed at the highest quality and best price — whether you're a facility or an individual."}
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
                  ? "لا تعتمد منصة GSS على مورد واحد لتنفيذ الخدمات، بل يتم اختيار المورد الأنسب لكل حالة تشغيلية بما يحقق أفضل قيمة مقابل التكلفة."
                  : "GSS doesn't rely on a single vendor. The most suitable vendor is selected for each operational case to achieve the best value against cost."}
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
                ? "مهما كان قطاعك، GSS تدعم خدماتك الإدارية والتشغيلية"
                : "Whatever Your Sector, GSS Supports Your Administrative & Operational Services"}
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
                  ? "سواء كنت منشأة أو فرداً — نبدأ معك من اليوم الأول"
                  : "Whether you're a facility or an individual — we start with you from day one"}
              </p>
              <p className="text-gray-500 text-sm">
                {ar
                  ? "سجّل وسيتواصل معك فريقنا لتقديم الحل المناسب لاحتياجاتك."
                  : "Register and our team will reach out to provide the right solution for your needs."}
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/register/company">
                <Button className="font-bold px-6 bg-primary hover:bg-primary/90">
                  {ar ? "سجّل الآن" : "Register Now"}
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

      {/* Support Section */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {ar ? "الدعم الفني والتواصل المباشر" : "Technical Support & Direct Contact"}
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              {ar
                ? "فريقنا متاح لمساعدتك في أي وقت عبر قنوات التواصل المتعددة"
                : "Our team is available to help you at any time through multiple channels"}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* WhatsApp */}
            <a
              href="https://wa.me/966595980004"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-800 hover:bg-green-600 rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer border border-slate-700 hover:border-green-500"
            >
              <div className="w-14 h-14 bg-green-500 group-hover:bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white group-hover:text-green-600">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="font-bold text-white mb-1">{ar ? "واتساب" : "WhatsApp"}</h3>
              <p className="text-slate-400 group-hover:text-white text-sm transition-colors" dir="ltr">+966 59 598 0004</p>
            </a>

            {/* Toll-free / Phone */}
            <a
              href="tel:+966595980004"
              className="group bg-slate-800 hover:bg-blue-600 rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer border border-slate-700 hover:border-blue-500"
            >
              <div className="w-14 h-14 bg-blue-500 group-hover:bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-white group-hover:text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-bold text-white mb-1">{ar ? "اتصل بنا" : "Call Us"}</h3>
              <p className="text-slate-400 group-hover:text-white text-sm transition-colors" dir="ltr">+966 59 598 0004</p>
            </a>

            {/* Email */}
            <a
              href="mailto:info@gss-platform.sa"
              className="group bg-slate-800 hover:bg-amber-600 rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer border border-slate-700 hover:border-amber-500"
            >
              <div className="w-14 h-14 bg-amber-500 group-hover:bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-white group-hover:text-amber-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-white mb-1">{ar ? "البريد الإلكتروني" : "Email"}</h3>
              <p className="text-slate-400 group-hover:text-white text-sm transition-colors">info@gss-platform.sa</p>
            </a>

            {/* Contact Form */}
            <Link
              href="/contact"
              className="group bg-slate-800 hover:bg-primary rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer border border-slate-700 hover:border-primary"
            >
              <div className="w-14 h-14 bg-primary group-hover:bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-white group-hover:text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="font-bold text-white mb-1">{ar ? "أرسل طلباً" : "Send a Request"}</h3>
              <p className="text-slate-400 group-hover:text-white text-sm transition-colors">
                {ar ? "استفسار أو طلب خدمة" : "Inquiry or service request"}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-24 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {ar ? "ابدأ في تنظيم خدماتك الإدارية والتشغيلية — للمنشآت والأفراد" : "Start Organizing Your Administrative & Operational Services — For Facilities & Individuals"}
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed">
            {ar
              ? "عبر نقطة تشغيل واحدة، بنموذج مرن حسب الطلب يناسبك سواء كنت منشأة أو فرداً، مع إمكانية إضافة مزايا تشغيلية متقدمة حسب احتياجاتك."
              : "Through a single operational point, with a flexible on-demand model suitable for facilities and individuals alike, with the ability to add advanced features based on your needs."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register/company">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-primary font-bold h-14 px-10 text-lg"
                data-testid="cta-register-company"
              >
                {ar ? "سجّل الآن" : "Register Now"}
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
