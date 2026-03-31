import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck, TrendingDown, Users, RefreshCcw, Network,
  BarChart3, CheckCircle2, ArrowLeft, X, UserCheck,
  FileText, Building2, Star, Layers,
} from "lucide-react";

const SERVICE_CATEGORIES = [
  { emoji: "🔧", name: "صيانة وتشغيل",     desc: "تكييف، كهرباء، سباكة، نجارة وأكثر" },
  { emoji: "📄", name: "تراخيص وحكومي",    desc: "تجديد التراخيص، شؤون حكومية، دفاع مدني" },
  { emoji: "🧹", name: "نظافة وخدمات",     desc: "نظافة، مكافحة حشرات، نقل وشحن" },
  { emoji: "💧", name: "مالي وإداري",       desc: "فواتير، إيجارات، أسطول، وثائق" },
];

const SECTORS = [
  { name: "سلاسل المطاعم والمقاهي",     icon: "🍽️", desc: "فروع كثيرة + تراخيص صحية + صيانة مطابخ" },
  { name: "محلات التجزئة والسوبرماركت", icon: "🛒", desc: "تبريد + كاميرات + تكييف + موردو نظافة" },
  { name: "المستشفيات والعيادات",        icon: "🏥", desc: "معدات + ترخيص صحة + تنظيف متخصص" },
  { name: "الشركات متعددة الفروع",       icon: "🏢", desc: "كهرباء + نظافة + إيجارات + اتصالات" },
  { name: "شركات المقاولات",             icon: "🏗️", desc: "مواقع متعددة + موردو مواد + عقارات" },
  { name: "المدارس والمراكز التعليمية",  icon: "🎓", desc: "ترخيص تعليم + مرافق + صيانة منتظمة" },
];

const SAVINGS = [
  { role: "مدير تشغيل",   salary: "15,000 – 25,000 ريال/شهر", icon: Users },
  { role: "مشرف مرافق",   salary: "8,000 – 12,000 ريال/شهر",  icon: Building2 },
  { role: "منسق موردين",  salary: "6,000 – 10,000 ريال/شهر",  icon: Network },
  { role: "متابع تراخيص", salary: "5,000 – 8,000 ريال/شهر",   icon: FileText },
];

export default function Companies() {
  return (
    <div className="pb-0">

      {/* HERO */}
      <section className="relative bg-primary py-28 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary/90" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-secondary/20 text-secondary font-bold text-sm px-4 py-1.5 rounded-full mb-6">للمنشآت والشركات</span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                منشأتك تحتاج<br />
                <span className="text-secondary">مدير عمليات خارجي</span><br />
                لا موظف إضافي
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-10">
                كل منشأة تتحمل يومياً عبء الفواتير والصيانة والتراخيص وعشرات الموردين — نحن نتولى هذا كله بدلاً منكم.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register/company">
                  <Button size="lg" className="h-14 px-10 text-lg font-bold bg-secondary hover:bg-secondary/90 text-primary" data-testid="cta-hero-register">
                    سجّل منشأتك مجاناً <ArrowLeft className="mr-2" size={20} />
                  </Button>
                </Link>
                <Link href="#scenario">
                  <Button size="lg" variant="outline" className="h-14 px-10 text-lg text-white border-white hover:bg-white/10">
                    شوف السيناريو الحقيقي
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "صفر",   label: "موظف إضافي",           sub: "مدير حساب مخصص من GSS" },
                { num: "100%",  label: "متابعة شهرية مضمونة",  sub: "فواتير، صيانة، تراخيص" },
                { num: "نقطة", label: "اتصال واحدة فقط",       sub: "لكل خدماتكم التشغيلية" },
                { num: "وفر",  label: "تكاليف التوظيف",         sub: "بدون راتب أو تأمين أو مكتب" },
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

      {/* CORE POSITIONING — LEAN */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="inline-block bg-amber-50 text-amber-700 font-bold text-sm px-4 py-1.5 rounded-full mb-5">الفكرة الأساسية</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                نحن موظفوكم<br />التشغيليون
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                الفاتورة المتأخرة، البلاغ المعلّق، الترخيص على وشك الانتهاء — هذه مشاكل لا تُحلّها برامج إدارة، بل تحتاج شخصاً يرفع الهاتف ويتابع. نحن ذلك الشخص.
              </p>
              <Link href="/register/company">
                <Button size="lg" className="font-bold" data-testid="cta-positioning">
                  ابدأ الآن <ArrowLeft className="mr-2" size={18} />
                </Button>
              </Link>
            </div>
            <div className="bg-primary rounded-3xl p-8 text-white">
              <p className="font-black text-xl mb-6">GSS هو الخيار الثالث — بدلاً من:</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-5 py-4">
                  <X size={18} className="text-red-400 flex-shrink-0" />
                  <span className="text-white/85">توظيف فريق داخلي وتحمّل رواتبه</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-5 py-4">
                  <X size={18} className="text-red-400 flex-shrink-0" />
                  <span className="text-white/85">تجاهل المهام وتراكم المشاكل</span>
                </div>
                <div className="flex items-center gap-3 bg-secondary/20 border border-secondary/30 rounded-2xl px-5 py-4">
                  <CheckCircle2 size={18} className="text-secondary flex-shrink-0" />
                  <span className="font-bold text-white">فريق GSS يتولى كل شيء — بدون تكاليف التوظيف</span>
                </div>
              </div>
            </div>
          </div>

          {/* Service Categories — compact */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">ما الذي نتابعه نيابةً عنكم؟</h3>
            <p className="text-gray-500">أكثر من 25 خدمة تشغيلية — موزّعة على 4 محاور رئيسية</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {SERVICE_CATEGORIES.map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-primary/5 border border-primary/10 rounded-2xl p-5 text-center hover:border-primary/30 hover:shadow-sm transition-all">
                <p className="text-3xl mb-3">{cat.emoji}</p>
                <p className="font-bold text-gray-900 text-sm mb-1">{cat.name}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{cat.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-600 text-sm text-center sm:text-right">
              📲 أرسل طلبك → نجلب أفضل عرض من موردين معتمدين → نتابع حتى الإنجاز ✅
            </p>
            <Link href="/register/company" className="flex-shrink-0">
              <Button variant="outline" size="sm" className="font-bold border-primary text-primary" data-testid="cta-how-it-works">
                سجّل وجرّب
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* REAL SCENARIO */}
      <section id="scenario" className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10">
            <span className="inline-block bg-primary/10 text-primary font-bold text-sm px-4 py-1.5 rounded-full mb-3">السيناريو الحقيقي</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">يوم عمل عادي — بفرق واحد</h2>
            <p className="text-gray-500 mt-2 text-base">نفس اليوم، نفس المنشأة — قبل GSS وبعدها</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white border-2 border-red-200 rounded-3xl p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <X size={18} className="text-red-500" />
                </div>
                <h3 className="font-black text-gray-800 text-lg">بدون GSS</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { time: "8 ص",  event: "تكييف فرع الرياض عطلان — تتصل بـ 3 موردين ولا أحد يرد" },
                  { time: "10 ص", event: "فاتورة كهرباء غير مألوفة — لا أحد يعرف سببها" },
                  { time: "12 م", event: "ترخيص صحي ينتهي بعد أسبوعين — اكتشفته بالصدفة" },
                  { time: "3 م",  event: "موظف قضى 4 ساعات في متابعة طلب صيانة لم يُغلق بعد" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-xs font-bold text-red-400 bg-red-50 px-2 py-1 rounded-lg mt-0.5 w-12 text-center flex-shrink-0">{item.time}</span>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.event}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-red-50 rounded-2xl px-4 py-3 text-center">
                <p className="text-red-600 font-bold text-sm">النتيجة: يوم ضائع، مشاكل متراكمة</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white border-2 border-primary/30 rounded-3xl p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-primary" />
                </div>
                <h3 className="font-black text-gray-800 text-lg">مع GSS</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { time: "8 ص",  event: "GSS توجّه المورد المعتمد فوراً — الإغلاق في نفس اليوم" },
                  { time: "10 ص", event: "GSS تراجع الفاتورة وترسل تقريراً موضّحاً بالأسباب" },
                  { time: "12 م", event: "GSS نبّهتك قبل 60 يوماً — التجديد جارٍ بدون أي تدخل منك" },
                  { time: "3 م",  event: "موظفك يركّز على عمله — GSS تتابع حتى الإغلاق" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg mt-0.5 w-12 text-center flex-shrink-0">{item.time}</span>
                    <p className="text-gray-700 text-sm leading-relaxed font-medium">{item.event}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-primary/10 rounded-2xl px-4 py-3 text-center">
                <p className="text-primary font-bold text-sm">النتيجة: كل شيء مُغلق، أنت تركّز على عملك</p>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-primary text-white rounded-2xl px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/90 font-medium text-center sm:text-right">
              نقطة اتصال واحدة — متابعة كاملة — تقرير شهري واضح
            </p>
            <Link href="/register/company" className="flex-shrink-0">
              <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold px-6" data-testid="cta-scenario">
                ابدأ الآن <ArrowLeft className="mr-1" size={16} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ACCOUNT MANAGER — SLIM */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary font-bold text-sm px-4 py-1.5 rounded-full mb-4">الحل</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">مدير حساب مخصص لمنشأتكم</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">يتابع جميع عملياتكم التشغيلية — يومياً وأسبوعياً وشهرياً</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              { icon: "📅", period: "يومياً",   items: ["استقبال البلاغات وتوجيهها للموردين", "متابعة التنفيذ وتأكيد الإغلاق"] },
              { icon: "📋", period: "أسبوعياً", items: ["مراجعة الطلبات المفتوحة", "تقرير أداء الموردين"] },
              { icon: "📊", period: "شهرياً",   items: ["فاتورة موحدة لكل فرع", "تقرير تشغيلي شامل + تنبيه التراخيص"] },
            ].map((block, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-primary/5 border border-primary/10 rounded-3xl p-6">
                <p className="text-3xl mb-3">{block.icon}</p>
                <p className="font-black text-gray-900 text-xl mb-4">{block.period}</p>
                <ul className="space-y-2">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* No vs Yes — compact */}
          <div className="bg-primary text-white rounded-3xl p-8 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="font-bold text-lg mb-4 text-white/70">لا يحتاج:</h3>
              <ul className="space-y-2">
                {["راتب شهري + مزايا وظيفية", "مكتب أو جهاز", "تدريب أو تأهيل", "إجازات أو تأمين صحي"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/75 text-sm">
                    <X size={14} className="text-red-400 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">لكنه يُقدّم:</h3>
              <ul className="space-y-2">
                {["متابعة تشغيلية كاملة طوال الشهر", "تقارير شهرية بكل الإنفاق", "تنبيهات مبكرة للتراخيص والعقود", "استجابة سريعة لبلاغات الصيانة"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/90 text-sm">
                    <CheckCircle2 size={14} className="text-secondary flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COST SAVINGS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-green-50 text-green-700 font-bold text-sm px-4 py-1.5 rounded-full mb-3">التوفير الفعلي</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">كم ستوفر منشأتكم؟</h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">هذا ما تدفعه المنشآت شهرياً لفريق عمليات داخلي — وهو ما يتولاه GSS بدلاً منهم</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {SAVINGS.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5">
                <div className="w-10 h-10 bg-red-50 text-red-400 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm">{item.role}</p>
                  <p className="text-red-500 font-semibold text-xs">{item.salary}</p>
                </div>
                <X size={16} className="text-red-300 flex-shrink-0" />
              </motion.div>
            ))}
          </div>
          <div className="bg-green-600 text-white rounded-3xl p-7 text-center">
            <p className="text-3xl font-black mb-2">
              توفير محتمل: <span className="text-yellow-300">+34,000 – 55,000 ريال/شهر</span>
            </p>
            <p className="text-green-100 text-base">بدون GSS — هذه تكاليف التوظيف الثابتة كل شهر</p>
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">من يستفيد أكثر من GSS؟</h2>
            <p className="text-gray-500 text-base">أي منشأة لديها فروع متعددة أو موردون كثر أو متابعة يومية مستنزِفة</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SECTORS.map((sector, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="bg-primary/5 border border-primary/10 rounded-2xl p-5 hover:shadow-sm transition-shadow">
                <p className="text-3xl mb-3">{sector.icon}</p>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{sector.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{sector.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">لماذا GSS تحديداً؟</h2>
            <p className="text-slate-400 text-base">6 مزايا مباشرة تجعل قرار التسجيل سهلاً</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: UserCheck,   title: "مدير حساب مخصص",              desc: "شخص حقيقي يعرف منشأتكم ويتابع كل شيء — ليس نظاماً إلكترونياً فقط" },
              { icon: TrendingDown, title: "توفير فعلي في التكاليف",      desc: "بدائل بأسعار أفضل، اكتشاف تكاليف مخفية، تقليل إعادة التنفيذ" },
              { icon: Layers,       title: "نقطة اتصال واحدة",             desc: "الصيانة، التراخيص، الفواتير — كل شيء عبر GSS فقط" },
              { icon: BarChart3,    title: "تقارير شهرية وشفافية كاملة",  desc: "تعرفون أين يذهب كل ريال وما هي فرص التوفير" },
              { icon: RefreshCcw,   title: "لا حاجة لتغيير موردييكم",     desc: "نُنظّم الإدارة فوق ما هو موجود — بدون أي تعطيل" },
              { icon: ShieldCheck,  title: "تنبيهات مبكرة للتراخيص",      desc: "لا مفاجآت — تنبيه قبل 60 يوماً من انتهاء أي ترخيص أو عقد" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-4 bg-slate-800 rounded-2xl p-5 border border-slate-700">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base mb-1">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            فريق تشغيل احترافي لمنشأتكم<br />بدون تكاليف التوظيف
          </h2>
          <p className="text-white/75 text-lg mb-10">
            سجّلوا الآن وسيتواصل مدير الحساب المخصص لدراسة احتياجاتكم.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register/company">
              <Button size="lg" className="h-14 px-12 text-xl font-bold bg-secondary hover:bg-secondary/90 text-primary" data-testid="cta-register-company-bottom">
                سجّل منشأتك الآن — مجاناً <ArrowLeft className="mr-2" size={22} />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg text-white border-white hover:bg-white/10">
                تواصل معنا أولاً
              </Button>
            </Link>
          </div>
          <p className="text-white/40 text-sm mt-6">لا يوجد التزام مسبق — فريق GSS سيتواصل معكم لشرح التفاصيل</p>
        </div>
      </section>

    </div>
  );
}