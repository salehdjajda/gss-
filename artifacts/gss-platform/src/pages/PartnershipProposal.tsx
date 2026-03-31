import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Handshake,
  Target,
  Calendar,
  CheckCircle2,
  Building2,
  Wrench,
  BarChart3,
  Users,
  Clock,
  DollarSign,
  Phone,
  Mail,
  ArrowLeft,
  Star,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/image_1774909317242.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function PartnershipProposal() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const problems = [
    {
      icon: AlertTriangle,
      title: "تشتت الطلبات التشغيلية",
      desc: "الطلبات موزعة بين واتساب ومكالمات ورسائل، دون نظام يضمن المتابعة والإغلاق.",
    },
    {
      icon: Users,
      title: "ضعف الرقابة على الموردين",
      desc: "صعوبة مقارنة الأسعار والجودة وتقييم الأداء عبر مورد واحد غير مرن.",
    },
    {
      icon: BarChart3,
      title: "غياب الرؤية التشغيلية",
      desc: "لا تقارير تشغيلية موثوقة تدعم القرار أو تكشف فرص الضبط في المصروفات.",
    },
    {
      icon: Clock,
      title: "استنزاف وقت الفريق",
      desc: "الفريق الداخلي يُصرف وقته في التنسيق بدلاً من الإدارة والتطوير.",
    },
  ];

  const solutionPhases = [
    {
      num: "01",
      title: "نقطة تشغيل واحدة",
      desc: "جميع الطلبات التشغيلية تُدار عبر منصة GSS الرقمية — لا بريد إلكتروني، لا واتساب، لا خسائر في التواصل.",
      icon: Building2,
    },
    {
      num: "02",
      title: "شبكة موردين مؤهلة",
      desc: "نختار المورد الأنسب لكل طلب وفق السعر والجودة والسرعة. أنتم لا تتعاملون مع مورد واحد ثابت.",
      icon: Handshake,
    },
    {
      num: "03",
      title: "متابعة حتى الإغلاق",
      desc: "كل طلب يُتابع من اللحظة الأولى حتى إغلاقه بتقرير إنجاز تشغيلي موثق.",
      icon: CheckCircle2,
    },
    {
      num: "04",
      title: "تقارير تدعم القرار",
      desc: "تقارير دورية شاملة تكشف مصروفاتكم التشغيلية وتساعدكم على ضبطها والتخطيط بثقة.",
      icon: BarChart3,
    },
  ];

  const roles = [
    {
      party: "ركيزة التميز",
      color: "from-amber-500 to-amber-600",
      items: [
        "توفير المنشآت والمواقع المؤهلة للانضمام",
        "التعريف بمنصة GSS لدى عملاء التشغيل والصيانة",
        "دعم عملية التأهيل والبدء التشغيلي للمنشآت",
        "تسهيل التواصل مع متخذي القرار في المنشآت",
        "تقديم الخبرة التشغيلية الميدانية لدعم تحسين الخدمة",
      ],
    },
    {
      party: "منصة GSS",
      color: "from-primary to-blue-700",
      items: [
        "تشغيل المنصة الرقمية وإدارة الطلبات التشغيلية",
        "بناء وإدارة شبكة الموردين المؤهلين",
        "إصدار التقارير التشغيلية الدورية للمنشآت",
        "تقديم الدعم الفني والتشغيلي المستمر",
        "تحويل العوائد المتفق عليها لشريك ركيزة التميز",
      ],
    },
  ];

  const plan90 = [
    {
      period: "الشهر الأول",
      phase: "الإطلاق والتأهيل",
      color: "bg-primary",
      tasks: [
        "توقيع اتفاقية الشراكة وتحديد آلية العوائد",
        "تأهيل أول 3 منشآت وإطلاق الخدمة معهم",
        "تدريب مسؤولي التشغيل لديهم على المنصة",
        "إعداد شبكة الموردين الملائمة للمنشآت المستهدفة",
      ],
    },
    {
      period: "الشهر الثاني",
      phase: "التوسع والقياس",
      color: "bg-secondary",
      tasks: [
        "استهداف 5 منشآت إضافية بالتعاون مع ركيزة التميز",
        "قياس جودة الخدمة ورضا المنشآت الأولى",
        "مراجعة نموذج التسعير وتحسينه",
        "تقرير أداء مشترك للمرحلة الأولى",
      ],
    },
    {
      period: "الشهر الثالث",
      phase: "الاستقرار والتحسين",
      color: "bg-slate-700",
      tasks: [
        "استهداف 10 منشآت إجمالاً في نهاية الفترة",
        "إصدار أول تقرير عائد مالي لركيزة التميز",
        "رسم خارطة النمو للسنة القادمة",
        "توسيع شبكة الموردين بناءً على الطلب الفعلي",
      ],
    },
  ];

  const targets = [
    { num: "10+", label: "منشأة مستهدفة", sublabel: "خلال 90 يوماً", icon: Building2 },
    { num: "50+", label: "طلب تشغيلي شهرياً", sublabel: "بعد الاستقرار", icon: Wrench },
    { num: "3", label: "قطاعات مغطاة", sublabel: "تجاري، خدمي، صناعي", icon: Target },
    { num: "95%", label: "معدل إغلاق الطلبات", sublabel: "التزام تشغيلي", icon: CheckCircle2 },
  ];

  const revenueModel = [
    {
      label: "عقد منشأة صغيرة",
      monthly: "3,000 – 5,000 ريال",
      partnerShare: "15%",
      partnerMonthly: "450 – 750 ريال/شهر",
    },
    {
      label: "عقد منشأة متوسطة",
      monthly: "8,000 – 15,000 ريال",
      partnerShare: "15%",
      partnerMonthly: "1,200 – 2,250 ريال/شهر",
    },
    {
      label: "عقد منشأة كبيرة",
      monthly: "20,000 – 40,000 ريال",
      partnerShare: "15%",
      partnerMonthly: "3,000 – 6,000 ريال/شهر",
    },
  ];

  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-white font-sans text-right">

      {/* Custom Header */}
      <header className="bg-primary sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div style={{ height: "44px", width: "150px", overflow: "hidden", position: "relative" }}>
              <img
                src={logoImg}
                alt="GSS"
                style={{
                  height: "150px",
                  width: "auto",
                  marginTop: "-50px",
                  mixBlendMode: "screen",
                  filter: "invert(1) hue-rotate(180deg) brightness(1.15) contrast(1.1)",
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
            <span>مقترح شراكة تشغيلية</span>
            <span className="text-secondary font-bold">× ركيزة التميز</span>
          </div>
          <Button
            onClick={scrollToForm}
            className="bg-secondary hover:bg-secondary/90 text-primary font-bold h-9 px-5 text-sm rounded-xl"
          >
            طلب اجتماع
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-slate-900 via-primary to-slate-800 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/40 rounded-full px-5 py-2 text-secondary text-sm font-bold mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            مقترح شراكة تشغيلية — سري ومخصص
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
          >
            شراكة GSS
            <br />
            <span className="text-secondary">× ركيزة التميز</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed"
          >
            نمو مشترك يبدأ بتحويل تحديات التشغيل إلى فرص موثوقة — عبر منصة رقمية متكاملة وشبكة موردين مؤهلة.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-primary font-bold h-13 px-9 text-lg shadow-lg shadow-secondary/30 rounded-2xl"
            >
              طلب اجتماع الآن
              <ArrowLeft className="mr-2" size={20} />
            </Button>
            <a href="#solution">
              <Button
                size="lg"
                variant="outline"
                className="h-13 px-8 text-lg text-white border-white/40 hover:bg-white/10 rounded-2xl"
              >
                استعرض المقترح
                <ChevronDown className="mr-2" size={18} />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <span className="inline-block bg-red-100 text-red-600 font-bold text-xs px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
                التحديات التشغيلية
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                لماذا تحتاج المنشآت إلى GSS؟
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                أغلب المنشآت تعاني من تحديات تشغيلية متكررة تكلّفها وقتاً ومالاً دون أن يكون لديها نظام متكامل للتعامل معها.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="bg-white border border-red-100 rounded-2xl p-6 hover:shadow-md hover:border-red-200 transition-all"
                >
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                    <p.icon size={24} className="text-red-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <span className="inline-block bg-primary/10 text-primary font-bold text-xs px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
                الحل المتكامل
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                كيف تحل GSS هذه التحديات؟
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                نموذج تشغيلي رقمي يوحد العمليات، يختار الموردين بذكاء، ويقدم رؤية واضحة لكل مصروف.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {solutionPhases.map((phase, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex gap-5 bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:border-primary/20 hover:shadow-sm transition-all"
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-primary text-white rounded-xl flex flex-col items-center justify-center font-bold text-xs">
                      <span className="text-secondary text-base font-black leading-none">{phase.num}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <phase.icon size={18} className="text-primary" />
                      <h3 className="font-bold text-gray-900 text-base">{phase.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{phase.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <span className="inline-block bg-white/10 text-white font-bold text-xs px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
                نموذج العمل
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                كيف نعمل معاً؟
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
                شراكة تكاملية — ركيزة التميز تفتح الأبواب، وGSS تشغّل وتدير وتبني القيمة.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {roles.map((role, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="bg-white/10 border border-white/20 rounded-2xl p-7 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center`}>
                      {i === 0 ? <Star size={20} className="text-white" /> : <Building2 size={20} className="text-white" />}
                    </div>
                    <h3 className="text-xl font-bold">{role.party}</h3>
                  </div>
                  <ul className="space-y-3">
                    {role.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 size={17} className="text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-slate-200 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 90-Day Plan */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <span className="inline-block bg-secondary/15 text-secondary font-bold text-xs px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
                خطة التنفيذ
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                خطة الـ90 يوم الأولى
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                خطة واضحة ومرحلية تبدأ من التوقيع وتصل إلى تشغيل فعلي مع منشآت حقيقية.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {plan90.map((month, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <div className={`${month.color} px-6 py-5`}>
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-white/80" />
                      <span className="text-white/80 text-sm font-medium">{month.period}</span>
                    </div>
                    <h3 className="text-white text-xl font-bold mt-1">{month.phase}</h3>
                  </div>
                  <ul className="p-6 space-y-3">
                    {month.tasks.map((task, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-slate-500">{j + 1}</span>
                        </div>
                        <span className="text-gray-600 text-sm leading-relaxed">{task}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Targets */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <span className="inline-block bg-primary/10 text-primary font-bold text-xs px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
                المستهدفات
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                الأرقام التي نستهدفها معاً
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {targets.map((t, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="bg-gradient-to-br from-primary to-blue-800 text-white rounded-2xl p-7 text-center"
                >
                  <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <t.icon size={24} className="text-secondary" />
                  </div>
                  <div className="text-4xl font-black text-secondary mb-1">{t.num}</div>
                  <div className="font-bold text-base mb-1">{t.label}</div>
                  <div className="text-slate-300 text-xs">{t.sublabel}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Revenue Model */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <span className="inline-block bg-secondary/20 text-secondary font-bold text-xs px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
                العائد المالي
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ماذا تكسب ركيزة التميز؟
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                نسبة 15% من إجمالي العقود التي تنضم بمساهمة مباشرة منكم — عائد شهري مستمر طوال فترة العقد.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="overflow-x-auto rounded-2xl">
              <table className="w-full text-right">
                <thead>
                  <tr className="bg-slate-800">
                    <th className="px-6 py-4 text-slate-400 font-semibold text-sm">نوع المنشأة</th>
                    <th className="px-6 py-4 text-slate-400 font-semibold text-sm">قيمة العقد الشهرية</th>
                    <th className="px-6 py-4 text-slate-400 font-semibold text-sm">نسبة ركيزة التميز</th>
                    <th className="px-6 py-4 text-secondary font-bold text-sm">العائد الشهري</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueModel.map((row, i) => (
                    <tr
                      key={i}
                      className={`border-t border-slate-700/50 ${i % 2 === 0 ? "bg-slate-800/30" : "bg-transparent"} hover:bg-slate-800/60 transition-colors`}
                    >
                      <td className="px-6 py-4 font-medium">{row.label}</td>
                      <td className="px-6 py-4 text-slate-300">{row.monthly}</td>
                      <td className="px-6 py-4">
                        <span className="bg-secondary/20 text-secondary font-bold px-3 py-1 rounded-full text-sm">
                          {row.partnerShare}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-secondary font-bold text-base">{row.partnerMonthly}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-8 bg-secondary/10 border border-secondary/20 rounded-2xl p-6 text-center"
            >
              <DollarSign size={32} className="text-secondary mx-auto mb-3" />
              <p className="font-bold text-lg mb-1">مثال تطبيقي:</p>
              <p className="text-slate-300 text-base leading-relaxed">
                إذا أضافت ركيزة التميز 5 منشآت متوسطة بعقود شهرية بمعدل 10,000 ريال لكل منشأة،
                <span className="text-secondary font-bold"> فالعائد الشهري يبلغ 7,500 ريال</span>
                {" "}(15% × 50,000 ريال) — سنوياً 90,000 ريال دون أي تشغيل مباشر.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Meeting CTA + Form */}
      <section ref={formRef} className="py-20 bg-white" id="meeting">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="bg-gradient-to-br from-primary via-primary to-blue-800 rounded-3xl p-8 md:p-12 text-white text-center mb-12"
          >
            <motion.div variants={fadeInUp}>
              <Handshake size={48} className="text-secondary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                نؤمن بأن هذه الشراكة تستحق اجتماعاً
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                نوقع الاتفاقية، نحدد التفاصيل، ونبدأ معاً. استكمل النموذج وسيتواصل معك فريقنا لتحديد موعد مناسب.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 size={16} className="text-secondary" />
                  لا التزامات مسبقة
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 size={16} className="text-secondary" />
                  اجتماع لا يتجاوز 45 دقيقة
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 size={16} className="text-secondary" />
                  خطة واضحة من أول يوم
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                <CheckCircle2 size={56} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">تم إرسال طلبكم بنجاح!</h3>
                <p className="text-gray-500 text-lg leading-relaxed">
                  سيتواصل معكم فريق GSS خلال 24 ساعة لتحديد موعد الاجتماع.
                </p>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 md:p-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">نموذج طلب الاجتماع</h3>
                <p className="text-gray-500 text-center mb-8">أدخل بياناتك وسنتواصل معك في أقرب وقت</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">الاسم الكامل *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="محمد الأحمد"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">المسمى الوظيفي *</label>
                      <input
                        type="text"
                        required
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="مدير تشغيل، شريك، ..."
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Phone size={14} className="inline ml-1 text-gray-400" />
                        رقم الجوال *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="05xxxxxxxx"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white transition-all"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Mail size={14} className="inline ml-1 text-gray-400" />
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@rakizah.com"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white transition-all"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">ملاحظة أو سؤال (اختياري)</label>
                    <textarea
                      rows={3}
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      placeholder="أي تفاصيل إضافية تودون مشاركتها قبل الاجتماع..."
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white transition-all resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-13 text-lg font-bold bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20"
                  >
                    إرسال طلب الاجتماع
                    <ArrowLeft className="mr-2" size={20} />
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>© {new Date().getFullYear()} GSS — General Support Services. جميع الحقوق محفوظة.</p>
        <p className="mt-1 text-slate-600 text-xs">هذا المقترح سري ومخصص لشركة ركيزة التميز للتشغيل والصيانة.</p>
      </footer>
    </div>
  );
}
