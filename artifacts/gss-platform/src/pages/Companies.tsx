import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck, TrendingDown, Users, RefreshCcw, Network,
  BarChart3, CheckCircle2, ArrowLeft, X, UserCheck,
  PhoneCall, FileText, Wrench, Calendar, AlertCircle,
  Building2, Star, Banknote, Clock, Layers,
  Zap, Car, Home, ClipboardList, Send
} from "lucide-react";

const EMPLOYEE_TASKS = [
  {
    icon: Wrench,
    category: "الصيانة والتشغيل",
    tasks: [
      "استقبال بلاغات الصيانة من الفروع",
      "التنسيق مع الفني المناسب وتحديد موعد",
      "متابعة التنفيذ وإغلاق البلاغ بعد التأكد",
      "الصيانة الدورية والاستباقية للمعدات",
    ],
  },
  {
    icon: Zap,
    category: "الكهرباء والمياه والاتصالات",
    tasks: [
      "استلام ومراجعة الفواتير الشهرية لكل فرع",
      "التواصل مع شركات الكهرباء والمياه عند الانقطاع",
      "إدارة خطوط الهاتف والإنترنت ومتابعة الأعطال",
      "متابعة الدفع مع المالية وتسوية الفروقات",
    ],
  },
  {
    icon: FileText,
    category: "التراخيص والشؤون الحكومية",
    tasks: [
      "متابعة تواريخ انتهاء جميع التراخيص",
      "تجديد السجل التجاري والتراخيص البلدية",
      "شهادات السلامة ومتطلبات الدفاع المدني",
      "التعامل مع الجهات الحكومية نيابةً عن المنشأة",
    ],
  },
  {
    icon: Car,
    category: "الأسطول والمركبات",
    tasks: [
      "تتبع المركبات المملوكة والمستأجرة وعقودها",
      "الصيانة الدورية والمخالفات والتجديدات",
      "إدارة تصاريح السائقين ومتابعة ورودياتهم",
      "إعداد التقارير المالية الشهرية للأسطول",
    ],
  },
  {
    icon: Home,
    category: "السكن والنقل",
    tasks: [
      "البحث عن وحدات سكن للموظفين وإتمام العقود",
      "متابعة تصاريح السكن الجماعي والإيجارات",
      "تنسيق النقل اليومي بين السكن ومواقع العمل",
      "الإشراف على إخلاء المواقع عند انتهاء العقود",
    ],
  },
  {
    icon: ClipboardList,
    category: "الخدمات الإدارية اليومية",
    tasks: [
      "الإشراف على موظفي الاستقبال والخدمات",
      "إدارة المراسلين وورديات التوصيل والبريد",
      "طلبات المواد الاستهلاكية (مطبخ، نظافة، مياه)",
      "متابعة البريد السعودي وصناديق البريد",
    ],
  },
];

const PAIN_POINTS = [
  { icon: PhoneCall,   text: "عشرات أرقام الهواتف لكل مورد وجهة حكومية في كل فرع" },
  { icon: FileText,    text: "فواتير شهرية من جميع مزودي الخدمة تحتاج مراجعة ومتابعة يدوية" },
  { icon: Wrench,      text: "بلاغات الصيانة تُفتح وتُغلق دون متابعة فعلية لجودة التنفيذ" },
  { icon: Calendar,    text: "تراخيص تنتهي وتحتاج تجديد — وإغفالها يُوقف العمل" },
  { icon: AlertCircle, text: "الانقطاعات الطارئة لا أحد يتابعها حتى تؤثر على العمليات" },
  { icon: Users,       text: "موظف أو أكثر يُعيَّن لمتابعة هذه المهام بدلاً من التركيز على العمل الأساسي" },
];

const ACCOUNT_MANAGER_TASKS = [
  { period: "يومياً", tasks: ["استقبال بلاغات الصيانة من الفروع", "توجيه الطلبات للموردين المناسبين", "متابعة التنفيذ وتأكيد الإغلاق"] },
  { period: "أسبوعياً", tasks: ["مراجعة حالة جميع الطلبات المفتوحة", "تقرير أداء المورد لكل خدمة", "تنسيق أي زيارات صيانة دورية مجدولة"] },
  { period: "شهرياً", tasks: ["إعداد وإرسال فواتير الخدمة لكل فرع", "مراجعة فواتير الكهرباء والمياه والاتصالات", "تقرير تشغيلي شامل لكل المصروفات", "تنبيه التراخيص المقرر تجديدها"] },
];

const SAVINGS = [
  { role: "مدير تشغيل", salary: "15,000 – 25,000 ريال/شهر", icon: Users },
  { role: "مشرف مرافق", salary: "8,000 – 12,000 ريال/شهر", icon: Building2 },
  { role: "منسق موردين", salary: "6,000 – 10,000 ريال/شهر", icon: Network },
  { role: "متابع تراخيص", salary: "5,000 – 8,000 ريال/شهر", icon: FileText },
];

const BEFORE_AFTER = [
  { before: "تواصل مع 10+ موردين بشكل مستقل", after: "نقطة اتصال واحدة مع GSS لكل شيء" },
  { before: "بلاغات صيانة تُفتح وتُنسى", after: "متابعة كاملة حتى الإغلاق الفعلي" },
  { before: "فواتير متفرقة من جهات كثيرة", after: "فاتورة موحدة شهرية منظمة بكل التفاصيل" },
  { before: "ترخيص منتهٍ يُكتشف بالصدفة", after: "تنبيهات مسبقة قبل 60 يوماً من الانتهاء" },
  { before: "موظف يقضي نصف يومه في متابعة الخدمات", after: "فريق GSS يتولى كل ذلك بشكل احترافي" },
  { before: "لا يوجد تقرير واضح لما أُنفق وأين", after: "تقرير تشغيلي شهري يوضح كل ريال" },
];

const SECTORS = [
  { name: "سلاسل المطاعم والمقاهي", icon: "🍽️", desc: "فروع كثيرة + تراخيص صحية + صيانة مطابخ + عقود نظافة" },
  { name: "محلات التجزئة والسوبرماركت", icon: "🛒", desc: "أنظمة تبريد + كاميرات + تكييف + موردو نظافة بكل فرع" },
  { name: "شركات المقاولات والتطوير", icon: "🏗️", desc: "مواقع متعددة + موردو مواد + عمالة + عقارات إدارية" },
  { name: "المستشفيات والعيادات", icon: "🏥", desc: "صيانة معدات + ترخيص الصحة + تنظيف متخصص + عقود" },
  { name: "الشركات ذات المكاتب المتعددة", icon: "🏢", desc: "IT + كهرباء + نظافة + إيجارات + هواتف لكل موقع" },
  { name: "المدارس والمراكز التعليمية", icon: "🎓", desc: "ترخيص التعليم + مرافق + نقل طلاب + صيانة منتظمة" },
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
                كل منشأة تعمل في السوق السعودي تتحمل يومياً عبء متابعة الفواتير والصيانة والتراخيص وعشرات الموردين — نحن نتولى هذا كله بدلاً منكم.
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
            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "صفر", label: "موظف إضافي تحتاجه", sub: "مدير حساب مخصص من GSS" },
                { num: "100%", label: "متابعة شهرية مضمونة", sub: "فواتير، صيانة، تراخيص" },
                { num: "نقطة", label: "اتصال واحدة فقط", sub: "لكل خدماتكم التشغيلية" },
                { num: "وفر", label: "تكاليف توظيف الفريق", sub: "بدون راتب أو تأمين أو مكتب" },
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

      {/* WE ARE YOUR EMPLOYEES — CORE POSITIONING */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main Positioning Statement */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-primary rounded-3xl p-10 md:p-14 text-white text-center mb-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop&q=80')] bg-cover bg-center" />
            <div className="relative z-10">
              <p className="text-secondary font-bold text-sm uppercase tracking-widest mb-6">الفكرة الأساسية</p>
              <h2 className="text-3xl md:text-5xl font-black leading-tight mb-6">
                نحن موظفوكم التشغيليون
              </h2>
              <p className="text-white/80 text-xl leading-relaxed max-w-3xl mx-auto mb-8">
                معظم المنشآت لا تُضيف خدمات المساندة الإدارية التشغيلية لأنها تعتقد أن هذه المهام تحتاج موظفين فعليين. هذا صحيح — لكن هؤلاء الموظفين يمكن أن يكونوا فريق GSS.
              </p>
              <div className="inline-block bg-secondary text-primary font-black text-xl md:text-2xl px-8 py-4 rounded-2xl">
                فقط أرسلوا طلبكم — ونحن نتابع حتى الإنجاز ✓
              </div>
            </div>
          </motion.div>

          {/* The Insight */}
          <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <span className="inline-block bg-amber-50 text-amber-700 font-bold text-sm px-4 py-1.5 rounded-full mb-5">لماذا لا تفعله كثير من الشركات؟</span>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 leading-tight">
                هذه المهام لا يُنجزها نظام — تحتاج إنساناً يتابع
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                الفاتورة المتأخرة، البلاغ المعلّق، الترخيص على وشك الانتهاء، الموظف الذي لم يُجدَّد له التأمين — هذه مشاكل لا تُحلّها برامج إدارة، بل تحتاج شخصاً يرفع الهاتف ويتابع.
              </p>
              <p className="text-gray-700 font-bold text-lg leading-relaxed">
                لهذا السبب تحديداً كثير من الشركات تعاني: إما تُوظّف ناساً لهذا الغرض وتتحمل التكاليف، أو تتجاهل هذه المهام وتتحمل العواقب.
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8">
              <p className="font-black text-gray-900 text-xl mb-5">GSS هو الخيار الثالث:</p>
              <ul className="space-y-4">
                {[
                  { icon: CheckCircle2, text: "فريق بشري حقيقي يعرف منشأتكم ويتابع كل شيء", color: "text-green-600" },
                  { icon: CheckCircle2, text: "بدون رواتب، مكاتب، تأمين، أو تدريب", color: "text-green-600" },
                  { icon: CheckCircle2, text: "متاح يومياً — للطلبات العادية والحالات الطارئة", color: "text-green-600" },
                  { icon: CheckCircle2, text: "يُصدر تقارير شهرية واضحة لكل الإدارات", color: "text-green-600" },
                  { icon: CheckCircle2, text: "يُنبّه مسبقاً قبل انتهاء أي ترخيص أو عقد", color: "text-green-600" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <item.icon size={20} className={`${item.color} mt-0.5 flex-shrink-0`} />
                    <span className="text-gray-800 font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* What we handle — the full task grid */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
              ما الذي يتابعه فريق GSS نيابةً عنكم؟
            </h3>
            <p className="text-gray-500 text-center mb-10">كل هذه المهام كان الموظفون يقومون بها — الآن يتولاها فريق GSS</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EMPLOYEE_TASKS.map((block, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-primary px-5 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center">
                    <block.icon size={18} className="text-secondary" />
                  </div>
                  <p className="text-white font-bold text-sm">{block.category}</p>
                </div>
                <ul className="p-5 space-y-3">
                  {block.tasks.map((task, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <Send size={12} className="text-primary mt-1 flex-shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* CTA inside the section */}
          <div className="text-center mt-12">
            <p className="text-gray-500 text-lg mb-6">
              كل هذه المهام أصبحت الآن مهمة GSS — لا مهمة موظفيكم
            </p>
            <Link href="/register/company">
              <Button size="lg" className="h-14 px-12 text-lg font-bold" data-testid="cta-employees-section">
                سجّل منشأتك وابدأ الآن <ArrowLeft className="mr-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* REAL SCENARIO */}
      <section id="scenario" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-50 text-red-600 font-bold text-sm px-4 py-1.5 rounded-full mb-4">سيناريو حقيقي</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">تخيّل: منشأة لها 5 فروع في الرياض</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">هذه المنشأة تتعامل يومياً مع:</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {PAIN_POINTS.map((pt, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl p-5">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <pt.icon size={20} className="text-red-500" />
                </div>
                <p className="text-gray-800 text-sm leading-relaxed">{pt.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-red-600 text-white rounded-3xl p-8 text-center">
            <p className="text-2xl font-bold mb-3">النتيجة؟</p>
            <p className="text-red-100 text-lg leading-relaxed max-w-2xl mx-auto">
              موظف أو أكثر يقضون وقتهم في متابعة هذه المهام، والأخطاء تتراكم، والتكاليف ترتفع، والإدارة لا تعرف أين يذهب كل ريال.
            </p>
          </div>
        </div>
      </section>

      {/* ACCOUNT MANAGER CONCEPT */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-primary/10 text-primary font-bold text-sm px-4 py-1.5 rounded-full mb-4">الحل</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">مدير حساب مخصص لمنشأتكم</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              مع منصة GSS، تحصل منشأتكم على مدير حساب متخصص يتابع جميع العمليات التشغيلية نيابةً عنكم — يومياً وأسبوعياً وشهرياً.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {ACCOUNT_MANAGER_TASKS.map((block, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg text-white ${i === 0 ? "bg-blue-500" : i === 1 ? "bg-primary" : "bg-secondary text-primary"}`}>
                    {i === 0 ? "📅" : i === 1 ? "📋" : "📊"}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">يتم تنفيذه</p>
                    <p className="font-black text-gray-900 text-xl">{block.period}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {block.tasks.map((task, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={15} className="text-primary mt-0.5 flex-shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="bg-primary text-white rounded-3xl p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">هذا المدير لا يحتاج:</h3>
              <ul className="space-y-3">
                {["راتباً شهرياً + مزايا وظيفية", "مكتباً أو جهاز حاسوب", "تدريباً أو فترة تأهيل", "إجازات أو بدلات تنقل", "تأميناً صحياً أو تأمين وظيفي"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-red-400/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <X size={12} className="text-red-300" />
                    </div>
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">لكنه يُقدّم:</h3>
              <ul className="space-y-3">
                {["متابعة تشغيلية كاملة طوال الشهر", "تقارير شهرية واضحة لكل الإنفاق", "تنبيهات مسبقة للتراخيص والعقود", "استجابة سريعة لبلاغات الصيانة", "توصيات توفير مبنية على بيانات"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-secondary flex-shrink-0" />
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COST SAVINGS */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-50 text-green-700 font-bold text-sm px-4 py-1.5 rounded-full mb-4">التوفير الفعلي</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">كم ستوفر منشأتكم؟</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              المنشآت متعددة الفروع تحتاج فريقاً كاملاً لإدارة العمليات. هذا ما يكلفها كل شهر — وهو ما تتولاه GSS بدلاً منهم.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {SAVINGS.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <item.icon size={22} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{item.role}</p>
                  <p className="text-red-500 font-semibold text-sm">{item.salary}</p>
                </div>
                <div className="text-red-400">
                  <X size={20} />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-green-600 text-white rounded-3xl p-8 text-center">
            <p className="text-4xl font-black mb-3 text-secondary-foreground">
              توفير محتمل: <span className="text-yellow-300">+34,000 – 55,000 ريال/شهر</span>
            </p>
            <p className="text-green-100 text-lg">
              هذا ما تدفعه المنشآت كرواتب لفريق العمليات الداخلي — بدون GSS.
            </p>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">قبل GSS وبعدها</h2>
            <p className="text-gray-500 text-lg">مقارنة واقعية لكيف تتغير العمليات التشغيلية</p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-sm">
            <div className="grid grid-cols-2 bg-gray-100">
              <div className="px-6 py-4 font-bold text-gray-500 text-center text-sm border-l border-gray-200">قبل GSS ❌</div>
              <div className="px-6 py-4 font-bold text-primary text-center text-sm">مع GSS ✅</div>
            </div>
            {BEFORE_AFTER.map((row, i) => (
              <div key={i} className={`grid grid-cols-2 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <div className="px-6 py-5 border-l border-gray-200 flex items-start gap-3">
                  <X size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600 text-sm leading-relaxed">{row.before}</p>
                </div>
                <div className="px-6 py-5 flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-800 text-sm font-medium leading-relaxed">{row.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">من يستفيد أكثر من GSS؟</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              أي منشأة لديها أكثر من فرع واحد، أو تتعامل مع موردين متعددين، أو تقضي وقتاً في متابعة العمليات اليومية
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SECTORS.map((sector, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-gradient-to-br from-primary/5 to-white border border-primary/10 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <p className="text-4xl mb-4">{sector.icon}</p>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{sector.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{sector.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS — detailed */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">لماذا تختار GSS تحديداً؟</h2>
            <p className="text-slate-400 text-lg">6 مزايا مباشرة تجعل قرار التسجيل سهلاً</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: UserCheck,   title: "مدير حساب مخصص لمنشأتكم", desc: "ليس نظاماً إلكترونياً فقط — شخص حقيقي يعرف احتياجاتكم ويتابع كل شيء بشكل شخصي" },
              { icon: TrendingDown, title: "توفير فعلي في تكاليف التشغيل", desc: "بدائل موردين بأسعار أفضل، اكتشاف تكاليف مخفية، تقليل إعادة التنفيذ" },
              { icon: Layers,       title: "نقطة اتصال واحدة لكل الخدمات", desc: "الصيانة، التراخيص، الفواتير، الاتصالات، النظافة — كل شيء عبر GSS فقط" },
              { icon: BarChart3,    title: "تقارير شهرية وشفافية كاملة", desc: "تعرفون أين يذهب كل ريال وما هي أبرز فرص التوفير في الشهر القادم" },
              { icon: RefreshCcw,   title: "الاستمرار مع موردييكم الحاليين", desc: "لا حاجة لتغيير علاقاتكم — نُنظّم الإدارة فوق ما هو موجود بدون تعطيل" },
              { icon: ShieldCheck,  title: "تنبيهات التراخيص والعقود", desc: "لا مفاجآت — تنبيهات مبكرة قبل انتهاء أي ترخيص أو عقد أو التزام حكومي" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-5 bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon size={22} className="text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL / TRUST */}
      <section className="py-16 bg-secondary/5 border-y border-secondary/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-2xl md:text-3xl font-bold text-primary leading-relaxed mb-6">
            "نحن لا نُدير الطلبات فقط — نُدير العمليات التشغيلية الكاملة لمنشأتكم حتى تتفرغوا لما تجيدونه"
          </p>
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={20} fill="currentColor" className="text-secondary" />)}
          </div>
          <p className="text-gray-500 mt-3 font-medium">فريق GSS — خدمات المساندة العامة</p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            هل منشأتكم تستحق فريق تشغيل احترافي<br />بدون تكاليف التوظيف؟
          </h2>
          <p className="text-white/80 text-lg mb-10 leading-relaxed">
            سجّلوا الآن وسيتواصل مدير الحساب المخصص لدراسة احتياجاتكم التشغيلية وتقديم نموذج الخدمة الأنسب لكم.
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
          <p className="text-white/50 text-sm mt-6">لا يوجد التزام مسبق — فريق GSS سيتواصل معكم لشرح التفاصيل كاملاً</p>
        </div>
      </section>

    </div>
  );
}
