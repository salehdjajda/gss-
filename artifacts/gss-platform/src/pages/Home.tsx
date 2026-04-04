import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/image_1774909317242.png";
import {
  ArrowLeft,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Wrench,
  TrendingUp,
  FileText,
  Building2,
  Car,
  Zap,
  Users,
  BarChart3,
  Receipt,
  Phone,
  Smartphone,
  MessageCircle,
  Headphones,
  Package,
  AlertTriangle,
  ClipboardList,
  BriefcaseBusiness,
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

  const operationalServices = ar ? [
    { icon: Wrench,          label: "إدارة طلبات الصيانة والتشغيل" },
    { icon: Users,           label: "إدارة الموردين المعتمدين" },
    { icon: Building2,       label: "متابعة الفروع والمكاتب" },
    { icon: Car,             label: "متابعة السيارات والخدمات اللوجستية" },
    { icon: FileText,        label: "متابعة الخدمات الحكومية والتراخيص" },
    { icon: AlertTriangle,   label: "إدارة البلاغات التشغيلية" },
    { icon: ClipboardList,   label: "متابعة العقود التشغيلية" },
    { icon: Package,         label: "إدارة الأصول التشغيلية" },
    { icon: BarChart3,       label: "إدارة الميزانية التشغيلية" },
    { icon: TrendingUp,      label: "إصدار التقارير التشغيلية" },
    { icon: Receipt,         label: "الفوترة الشهرية الموحدة" },
  ] : [
    { icon: Wrench,          label: "Maintenance & Operations Management" },
    { icon: Users,           label: "Vendor Management" },
    { icon: Building2,       label: "Branch & Office Monitoring" },
    { icon: Car,             label: "Fleet & Logistics Monitoring" },
    { icon: FileText,        label: "Government Services & Licensing" },
    { icon: AlertTriangle,   label: "Operational Incident Management" },
    { icon: ClipboardList,   label: "Operational Contracts Tracking" },
    { icon: Package,         label: "Operational Asset Management" },
    { icon: BarChart3,       label: "Operational Budget Management" },
    { icon: TrendingUp,      label: "Operational Reporting" },
    { icon: Receipt,         label: "Unified Monthly Billing" },
  ];

  const vendorNetwork = ar ? [
    { icon: "🏗️", label: "شركات صيانة معتمدة" },
    { icon: "📦", label: "موردون معتمدون" },
    { icon: "⚙️", label: "فنيون متخصصون" },
    { icon: "💡", label: "استشاريو تشغيل" },
  ] : [
    { icon: "🏗️", label: "Certified Maintenance Companies" },
    { icon: "📦", label: "Approved Suppliers" },
    { icon: "⚙️", label: "Specialist Technicians" },
    { icon: "💡", label: "Operations Consultants" },
  ];

  const requestChannels = ar ? [
    { icon: Smartphone,    label: "بوابة العميل",  desc: "رفع الطلبات ومتابعتها مباشرة عبر لوحة التحكم" },
    { icon: Phone,         label: "الجوال",        desc: "إمكانية التواصل والمتابعة عبر تطبيق الجوال" },
    { icon: MessageCircle, label: "واتساب",         desc: "استقبال الطلبات العاجلة عبر واتساب" },
    { icon: Headphones,    label: "الكول سنتر",    desc: "فريق استجابة مباشر لاستقبال البلاغات الهاتفية" },
  ] : [
    { icon: Smartphone,    label: "Client Portal",  desc: "Submit and track requests directly via the dashboard" },
    { icon: Phone,         label: "Mobile",          desc: "Follow up and communicate via mobile app" },
    { icon: MessageCircle, label: "WhatsApp",        desc: "Receive urgent requests via WhatsApp" },
    { icon: Headphones,    label: "Call Center",     desc: "Direct response team for phone-based reports" },
  ];

  const selectionCriteria = ar ? [
    { icon: TrendingUp,  label: "مقارنة أسعار السوق" },
    { icon: ShieldCheck, label: "تقييم جودة الأداء" },
    { icon: FileText,    label: "شفافية كاملة في التكاليف" },
    { icon: Clock,       label: "سرعة الاستجابة والتنفيذ" },
  ] : [
    { icon: TrendingUp,  label: "Market Price Comparison" },
    { icon: ShieldCheck, label: "Performance Quality Assessment" },
    { icon: FileText,    label: "Full Cost Transparency" },
    { icon: Clock,       label: "Fast Response & Execution" },
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
    { icon: "🚗", label: "قطاع المركبات" },
    { icon: "💼", label: "الخدمات المهنية" },
    { icon: "🛒", label: "التجارة الإلكترونية" },
    { icon: "🏟️", label: "الترفيه والفعاليات" },
    { icon: "🏠", label: "العقارات والإسكان" },
    { icon: "🏛️", label: "الجهات الحكومية" },
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
    { icon: "🚗", label: "Automotive Sector" },
    { icon: "💼", label: "Professional Services" },
    { icon: "🛒", label: "E-Commerce" },
    { icon: "🏟️", label: "Entertainment & Events" },
    { icon: "🏠", label: "Real Estate & Housing" },
    { icon: "🏛️", label: "Government Entities" },
  ];

  const trustItems = ar
    ? ["نقطة اتصال واحدة لجميع العمليات", "شبكة موردين معتمدين", "فوترة شهرية موحدة"]
    : ["Single point of contact for all operations", "Certified vendor network", "Unified monthly billing"];

  return (
    <div className="w-full overflow-hidden">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&auto=format&fit=crop&q=85"
            alt="GSS Platform"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-primary/90 to-slate-900/95" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-secondary/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 text-center flex flex-col items-center pt-24 pb-20">

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-10"
          >
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white/90">
              {ar ? "منصة إدارة الخدمات التشغيلية للمنشآت" : "Institutional Operations Management Platform"}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-2"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
              {ar ? "بوابة إدارة التشغيل المؤسسي" : "Institutional Operations Management Portal"}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-secondary leading-tight tracking-tight">
              {ar ? "نقطة اتصال واحدة لجميع عملياتكم" : "One Point of Contact for All Your Operations"}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/80 text-lg max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            {ar
              ? "GSS شريككم التشغيلي الخارجي — نتولى إدارة جميع عملياتكم التشغيلية عبر منصة رقمية موحدة، بشبكة موردين معتمدين واستجابة فورية."
              : "GSS is your external operations partner — managing all your operational processes through a unified digital platform, with a certified vendor network and instant response."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <Link href="/register/company">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-primary font-black h-14 px-10 text-lg shadow-xl shadow-secondary/30 rounded-2xl"
              >
                {ar ? "ابدأ التعاقد مع GSS" : "Start Partnership with GSS"}
                <ArrowLeft className="mr-2" size={20} />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 text-lg font-bold text-sky-300 border-sky-400/60 hover:bg-sky-400/10 hover:text-sky-200 hover:border-sky-300 rounded-2xl backdrop-blur-sm transition-colors"
              >
                {ar ? "كيف تعمل المنصة؟" : "How Does It Work?"}
              </Button>
            </Link>
          </motion.div>

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

      {/* Operational Services — 11 Core Services */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-secondary/20 text-secondary font-bold text-xs px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              {ar ? "ما تديره GSS لمنشأتكم" : "What GSS Manages for Your Facility"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
              {ar
                ? "إدارة شاملة لجميع العمليات التشغيلية"
                : "Comprehensive Management of All Operational Processes"}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              {ar
                ? "عبر نقطة اتصال واحدة، تتولى GSS إدارة كافة احتياجاتكم التشغيلية بدءاً من الصيانة وحتى الفوترة الشهرية."
                : "Through a single point of contact, GSS manages all your operational needs from maintenance to monthly billing."}
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {operationalServices.map((svc, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 flex items-center gap-4 hover:border-secondary/40 hover:bg-slate-800 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <svc.icon size={20} className="text-secondary" />
                </div>
                <span className="text-slate-200 font-medium text-sm leading-snug">{svc.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link href="/services">
              <Button variant="outline" className="h-12 px-8 font-semibold border-secondary text-secondary hover:bg-secondary hover:text-primary">
                {ar ? "استعرض جميع التصنيفات التشغيلية" : "Browse All Operational Categories"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Vendor Network */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-secondary/20 text-secondary font-bold text-xs px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
                {ar ? "شبكة الموردين" : "Vendor Network"}
              </span>
              <h2 className="text-3xl font-bold mb-6">
                {ar
                  ? "شبكة واسعة من الموردين والمتخصصين المعتمدين"
                  : "A Wide Network of Certified Vendors & Specialists"}
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                {ar
                  ? "يتم اختيار المورد الأنسب حسب نوع الطلب وموقع المنشأة — لا مورد ثابت، بل الأفضل دائماً لمصلحتكم."
                  : "The most suitable vendor is selected based on request type and facility location — no fixed vendor, always the best for your interests."}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {vendorNetwork.map((item, i) => (
                  <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-4 flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-semibold text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {selectionCriteria.map((item, i) => (
                <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-6 text-center">
                  <item.icon size={32} className="mx-auto mb-3 text-secondary" />
                  <p className="font-semibold text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Request Channels */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary font-bold text-xs px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              {ar ? "قنوات استقبال الطلبات" : "Request Channels"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
              {ar ? "طلباتكم تصلنا من أي قناة" : "Your Requests Reach Us on Any Channel"}
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {ar
                ? "نستقبل طلبات المنشآت المتعاقدة عبر قنوات متعددة لضمان الاستجابة الفورية."
                : "We receive requests from contracted facilities through multiple channels to ensure immediate response."}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {requestChannels.map((ch, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-primary/5 border border-primary/10 rounded-2xl p-6 text-center hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ch.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{ch.label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{ch.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">
              {ar
                ? "نخدم المنشآت في جميع القطاعات"
                : "We Serve Facilities Across All Sectors"}
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {ar
                ? "شبكتنا من الموردين المعتمدين تغطي طيفاً واسعاً من القطاعات."
                : "Our certified vendor network covers a wide range of sectors."}
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-12">
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
                  ? "منشأتكم تستحق شريك تشغيل احترافي"
                  : "Your Facility Deserves a Professional Operations Partner"}
              </p>
              <p className="text-gray-500 text-sm">
                {ar
                  ? "سجّلوا وسيتواصل مدير الحساب المخصص لدراسة احتياجاتكم التشغيلية."
                  : "Register and your dedicated account manager will contact you to study your operational needs."}
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/register/company">
                <Button className="font-bold px-8 bg-primary hover:bg-primary/90">
                  {ar ? "ابدأ التعاقد" : "Start Partnership"}
                  <ArrowLeft className="mr-2" size={16} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="font-bold px-5 border-primary text-primary hover:bg-primary hover:text-white">
                  {ar ? "تواصل معنا" : "Contact Us"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor & Consultant Network Teaser */}
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
                  ? "استقبل طلبات عمل مباشرة من شركات ومنشآت متعددة. كن جزءاً من شبكة الموردين المعتمدين لدى GSS."
                  : "Receive work requests directly from multiple companies and facilities. Join GSS's certified vendor network."}
              </p>
              <Link href="/vendors">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  {ar ? "انضم لشبكة الموردين" : "Join the Vendor Network"}
                </Button>
              </Link>
            </div>
            <div className="bg-secondary/5 rounded-2xl p-8 border border-secondary/10">
              <BriefcaseBusiness size={40} className="text-secondary mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {ar ? "أنت مستشار أو خبير تشغيل؟" : "Are You a Consultant or Operations Expert?"}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {ar
                  ? "قدّم توصيات تشغيلية ورشّح موردين موثوقين واحصل على نسبة عند تنفيذ التوصيات."
                  : "Provide operational recommendations, refer trusted vendors, and earn a percentage when recommendations are executed."}
              </p>
              <Link href="/partners">
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white">
                  {ar ? "انضم لشبكة المستشارين" : "Join the Consultant Network"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            {ar
              ? "ابدأ مع GSS اليوم — شريككم التشغيلي المؤسسي"
              : "Start with GSS Today — Your Institutional Operations Partner"}
          </h2>
          <p className="text-white/75 text-lg mb-10">
            {ar
              ? "فريقنا جاهز لدراسة احتياجاتكم التشغيلية وتقديم عرض تعاقد مناسب لمنشأتكم."
              : "Our team is ready to study your operational needs and offer a suitable partnership proposal for your facility."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register/company">
              <Button size="lg" className="h-14 px-12 text-xl font-bold bg-secondary hover:bg-secondary/90 text-primary">
                {ar ? "سجّل منشأتكم الآن" : "Register Your Facility Now"} <ArrowLeft className="mr-2" size={22} />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold text-white border-white hover:bg-white/10">
                {ar ? "تواصل مع فريقنا" : "Contact Our Team"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
