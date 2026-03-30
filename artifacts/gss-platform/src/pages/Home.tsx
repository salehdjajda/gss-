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
} from "lucide-react";

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const problems = [
    "تعدد الموردين دون تنسيق فعّال",
    "ضياع وقت الإدارة في المتابعة اليومية",
    "تكاليف تشغيلية غير واضحة أو مرتفعة",
    "غياب التقارير والبيانات التشغيلية",
    "صعوبة إيجاد موردين موثوقين",
    "إعادة تنفيذ أعمال بسبب ضعف التنسيق",
  ];

  const benefits = [
    {
      icon: ShieldCheck,
      title: "توفير الوقت الإداري",
      desc: "إدارة جميع الخدمات التشغيلية عبر نقطة اتصال واحدة بدلاً من التواصل مع عدة موردين ومتابعة التنفيذ بشكل يومي.",
      result: "تقليل العبء التشغيلي على الإدارات الداخلية",
    },
    {
      icon: Coins,
      title: "تقليل التكاليف التشغيلية",
      desc: "نساعد منشأتكم على تقليل المصروفات الناتجة عن تعدد الموردين، وضعف التنسيق، وتفاوت الأسعار، وتكرار تنفيذ الأعمال.",
      result: "ترشيد الإنفاق التشغيلي بشكل مستدام",
    },
    {
      icon: Users,
      title: "فريق تشغيل خارجي لمنشأتكم",
      desc: "تعمل منصة GSS كامتداد لفريقكم الداخلي دون الحاجة إلى توظيف مدير تشغيل أو مشرف مرافق أو منسق خدمات.",
      result: "توفير تكاليف التوظيف والإدارة الداخلية",
    },
    {
      icon: RefreshCcw,
      title: "الاستمرار مع موردييكم الحاليين",
      desc: "يمكن لمنشأتكم الاستمرار في العمل مع مورديكم الحاليين بينما تتولى منصة GSS تنظيم التنفيذ وتحسين المتابعة.",
      result: "لا تغيير في العلاقات التعاقدية القائمة",
    },
    {
      icon: Building2,
      title: "بدائل تشغيلية عند الحاجة",
      desc: "في حال ارتفاع التكلفة أو انخفاض الجودة، توفر المنصة شبكة موردين معتمدين كبدائل مناسبة دون تعطيل الأعمال.",
      result: "استمرارية التشغيل في جميع الأوقات",
    },
    {
      icon: ChartLine,
      title: "تقارير تشغيلية داعمة للقرار",
      desc: "تقارير دورية تساعد الإدارات على متابعة الأداء، وتحليل المصروفات، واكتشاف فرص التوفير، واتخاذ قرارات تشغيلية مبنية على بيانات.",
      result: "رؤية واضحة وشفافة لكل ريال ينفق",
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80"
            alt="GSS Platform"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-primary/95 via-primary/85 to-slate-900/70"></div>
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          {/* Logo — inside background container so blend mode composites directly with hero */}
          <div className="absolute top-8 left-8" style={{ height: "110px", width: "380px" }}>
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20 lg:py-28">
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
                مدير العمليات الخارجي
                <br />
                <span className="text-secondary">لخدمات منشأتكم التشغيلية</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed"
              >
                تعمل منصة GSS كمدير عمليات خارجي يدعم منشأتكم في تنظيم الطلبات التشغيلية ومتابعة الموردين وتحليل المصروفات واقتراح الحلول الأكثر كفاءة، مما يساهم في رفع جودة الأداء التشغيلي وتقليل الأعباء الإدارية دون الحاجة إلى إنشاء فريق تشغيل داخلي إضافي.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/register/company">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-primary font-bold h-14 px-8 text-lg shadow-lg shadow-secondary/30"
                    data-testid="hero-btn-company"
                  >
                    أنا منشأة — سجّل الآن
                  </Button>
                </Link>
                <Link href="/register/vendor">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-14 px-8 text-lg text-white border-white/60 hover:bg-white/10 backdrop-blur-sm"
                    data-testid="hero-btn-vendor"
                  >
                    أنا مورد / فني
                  </Button>
                </Link>
                <Link href="/register/consultant">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="w-full sm:w-auto h-14 px-8 text-lg text-slate-300 hover:text-white hover:bg-white/5"
                    data-testid="hero-btn-consultant"
                  >
                    أنا مستشار / شريك نجاح
                  </Button>
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="mt-10 flex flex-wrap gap-6 items-center"
              >
                {["نقطة اتصال واحدة لجميع الخدمات", "لا عمولات مخفية", "بدء سريع دون التزام"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle2 size={16} className="text-secondary flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">هل تواجه منشأتك هذه التحديات؟</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              معظم المنشآت تعاني يومياً من فوضى إدارة الخدمات التشغيلية. GSS جاءت لحل هذه المشكلة.
            </p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {problems.map((problem, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex items-start gap-3 bg-slate-800/60 border border-slate-700 rounded-xl px-6 py-4"
              >
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-red-400"></span>
                </span>
                <p className="text-slate-300">{problem}</p>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-center text-slate-400 mt-10 text-lg font-medium">
            وقت ضائع — تكلفة أعلى — تحكم أقل
          </p>
        </div>
      </section>

      {/* Partnership Message Banner */}
      <section className="py-16 bg-secondary/10 border-y border-secondary/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-2xl md:text-3xl font-bold text-primary leading-relaxed">
            نحن لا ندير الطلبات التشغيلية فقط،
            <br />
            <span className="text-secondary">
              بل نعمل كشريك تشغيل يساعد منشأتكم على تحسين الكفاءة
              وتقليل التكاليف وتنظيم الخدمات اليومية بشكل مستمر.
            </span>
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              ماذا توفر منصة GSS لمنشأتكم؟
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              نساعد منشأتكم على تقليل التكاليف التشغيلية وتحسين كفاءة إدارة الخدمات اليومية.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">{benefit.desc}</p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm font-semibold text-secondary flex items-center gap-2">
                    <CheckCircle2 size={16} className="flex-shrink-0" />
                    {benefit.result}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link href="/companies">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold border-primary text-primary hover:bg-primary hover:text-white" data-testid="link-more-companies">
                استكشف كيف تساعد منصة GSS منشأتكم
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">كيف تعمل المنصة؟</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              آلية عمل سلسة وموثوقة تضمن تنفيذ طلباتكم بأعلى جودة وأفضل سعر.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {[
              {
                step: "1",
                title: "ترسل المنشأة الطلب",
                desc: "عبر قناة واحدة بسيطة داخل المنصة.",
              },
              {
                step: "2",
                title: "يحلّل فريق GSS الاحتياج",
                desc: "دراسة دقيقة لفهم المتطلبات الفعلية قبل أي إجراء.",
              },
              {
                step: "3",
                title: "اختيار المورد الأنسب",
                desc: "نختار المورد الأفضل سعراً وجودةً من شبكتنا المعتمدة — وليس موردًا ثابتًا.",
              },
              {
                step: "4",
                title: "متابعة التنفيذ حتى الإغلاق",
                desc: "نشرف على سير العمل ونتابع حتى اكتمال التنفيذ بنجاح.",
              },
              {
                step: "5",
                title: "إصدار التقرير التشغيلي",
                desc: "تقرير إنجاز شامل وفاتورة موحدة تدعم اتخاذ القرار.",
              },
            ].map((item, i) => (
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
                تعرف على آلية العمل بالتفصيل
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
              <h2 className="text-3xl font-bold mb-6">نختار المورد الأنسب لمصلحتكم وليس موردًا ثابتًا</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                لا تعتمد منصة GSS على مورد واحد لتنفيذ الخدمات، بل يتم اختيار المورد الأنسب سعراً وجودةً لكل حالة تشغيلية بما يحقق أفضل مصلحة للمنشأة.
              </p>
              <p className="text-secondary font-bold text-xl">
                نحن نعمل معكم كشريك تشغيل وليس كمصدر تكلفة إضافي.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: TrendingUp, label: "مقارنة أسعار السوق" },
                { icon: ShieldCheck, label: "تقييم جودة الأداء" },
                { icon: FileText, label: "شفافية كاملة في التكاليف" },
                { icon: Clock, label: "سرعة الاستجابة والتنفيذ" },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-6 text-center">
                  <item.icon size={32} className="mx-auto mb-3 text-secondary" />
                  <p className="font-semibold text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Model Preview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">نموذج رسوم واضح ومرن</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              شفافية كاملة في التكاليف — لا عمولات مخفية، لا مفاجآت.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "حسب الطلب",
                highlight: false,
                points: [
                  "رسوم إدارة تشغيل فقط",
                  "لا عمولات على أسعار الموردين",
                  "لا التزام مستمر",
                  "دفع مقابل الخدمة فقط",
                ],
              },
              {
                title: "اشتراك تشغيلي",
                highlight: true,
                badge: "الأكثر شيوعاً",
                points: [
                  "متابعة تشغيلية مستمرة",
                  "تقارير دورية",
                  "مدير حساب مخصص",
                  "يتم تحديد الرسوم حسب حجم التشغيل",
                ],
              },
              {
                title: "مشاريع كبيرة",
                highlight: false,
                points: [
                  "نسبة إدارة مشروع",
                  "يتم تحديدها مسبقاً",
                  "قبل بدء التنفيذ",
                  "بكل شفافية ووضوح",
                ],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 border relative ${
                  plan.highlight
                    ? "bg-primary text-white border-primary shadow-xl scale-105"
                    : "bg-white border-gray-200"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 right-6 bg-secondary text-primary text-xs font-bold px-4 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}
                <h3 className={`text-xl font-bold mb-6 ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                  {plan.title}
                </h3>
                <ul className="space-y-3">
                  {plan.points.map((point, j) => (
                    <li key={j} className={`flex items-start gap-2 text-sm ${plan.highlight ? "text-slate-200" : "text-gray-600"}`}>
                      <CheckCircle2 size={16} className={`mt-0.5 flex-shrink-0 ${plan.highlight ? "text-secondary" : "text-primary"}`} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="h-12 px-8 font-semibold border-primary text-primary hover:bg-primary hover:text-white" data-testid="link-pricing">
                عرض نموذج الرسوم الكامل
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Vendors Teaser */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <Wrench size={40} className="text-primary mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">أنت مورد أو فني؟</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                استقبل طلبات عمل مباشرة من شركات ومنشآت متعددة. لا عمولات على الخدمات التشغيلية اليومية. تقديم سعرك بشفافية كاملة.
              </p>
              <Link href="/vendors">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" data-testid="link-vendor-network">
                  انضم لشبكة الموردين
                </Button>
              </Link>
            </div>
            <div className="bg-secondary/5 rounded-2xl p-8 border border-secondary/10">
              <Users size={40} className="text-secondary mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">أنت مستشار أو خبير تشغيل؟</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                حقّق دخلاً إضافياً من خبرتك المهنية. قدّم توصيات تشغيلية ورشّح موردين موثوقين واحصل على نسبة عند تنفيذ التوصيات.
              </p>
              <Link href="/partners">
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white" data-testid="link-success-partners">
                  انضم كشريك نجاح
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
            ابدأ بتنظيم عملياتك التشغيلية اليوم
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed">
            بدون التزامات — بدء سريع — نتائج واضحة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register/company">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-primary font-bold h-14 px-10 text-lg"
                data-testid="cta-register-company"
              >
                سجل منشأتك الآن
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
                تواصل معنا أولاً
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
