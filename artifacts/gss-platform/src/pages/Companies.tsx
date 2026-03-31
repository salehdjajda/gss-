import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck, TrendingDown, Users, RefreshCcw, Network,
  BarChart3, CheckCircle2, ArrowLeft, X, UserCheck,
  FileText, Building2, Star, Layers,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Companies() {
  const { lang } = useLanguage();
  const ar = lang === "ar";

  const serviceCategories = ar ? [
    { emoji: "🔧", name: "صيانة وتشغيل",  desc: "تكييف، كهرباء، سباكة، نجارة وأكثر" },
    { emoji: "📄", name: "تراخيص وحكومي", desc: "تجديد التراخيص، شؤون حكومية، دفاع مدني" },
    { emoji: "🧹", name: "نظافة وخدمات",  desc: "نظافة، مكافحة حشرات، نقل وشحن" },
    { emoji: "💧", name: "مالي وإداري",    desc: "فواتير، إيجارات، أسطول، وثائق" },
  ] : [
    { emoji: "🔧", name: "Maintenance & Operations", desc: "AC, electrical, plumbing, carpentry and more" },
    { emoji: "📄", name: "Licenses & Government",    desc: "License renewal, government affairs, civil defense" },
    { emoji: "🧹", name: "Cleaning & Services",      desc: "Cleaning, pest control, transport & shipping" },
    { emoji: "💧", name: "Financial & Admin",         desc: "Bills, rentals, fleet, documents" },
  ];

  const sectors = ar ? [
    { name: "سلاسل المطاعم والمقاهي",              icon: "🍽️", desc: "فروع متعددة + تراخيص صحية + صيانة معدات + عقود نظافة" },
    { name: "متاجر التجزئة والسوبرماركت",          icon: "🛒", desc: "تبريد + كاميرات + تكييف + تجهيز فروع + موردون متعددون" },
    { name: "المستشفيات والعيادات والمراكز الطبية", icon: "🏥", desc: "تراخيص صحية + صيانة أجهزة + تنظيف متخصص + عقود تشغيل" },
    { name: "الشركات متعددة الفروع والمكاتب",      icon: "🏢", desc: "كهرباء + اتصالات + نظافة + إيجارات + خدمات مكتبية" },
    { name: "شركات المقاولات والتطوير العقاري",    icon: "🏗️", desc: "مواقع تشغيل متعددة + موردون + معدات + متابعة عقود" },
    { name: "المدارس والمراكز التعليمية",           icon: "🎓", desc: "تراخيص تعليم + صيانة مرافق + نقل + تجهيزات تشغيلية" },
    { name: "الفنادق والشقق المفروشة",              icon: "🏨", desc: "صيانة مستمرة + تجهيز غرف + خدمات تشغيل يومية" },
    { name: "المولات والمراكز التجارية",            icon: "🏬", desc: "إدارة مرافق + عقود صيانة + أمن وسلامة + موردون متعددون" },
    { name: "شركات النقل والخدمات اللوجستية",      icon: "🚚", desc: "إدارة أسطول + مستودعات + عقود تشغيل + مواقع متعددة" },
    { name: "المصانع والمنشآت الصناعية",            icon: "🏭", desc: "مرافق تشغيل + عقود صيانة + خدمات فنية + متابعة موردين" },
    { name: "شركات التوزيع والمستودعات",            icon: "🧴", desc: "مواقع متعددة + تجهيزات تشغيل + نقل + صيانة دورية" },
    { name: "الجهات الحكومية وشبه الحكومية",        icon: "🏛️", desc: "تنسيق خدمات تشغيل + متابعة موردين + إدارة مرافق" },
    { name: "الشركات الناشئة سريعة النمو",          icon: "🚀", desc: "توسع سريع + تجهيز مواقع + موردون متعددون + متابعة تشغيل" },
  ] : [
    { name: "Restaurant & Café Chains",         icon: "🍽️", desc: "Multiple branches + health licenses + equipment maintenance + cleaning contracts" },
    { name: "Retail & Supermarkets",            icon: "🛒", desc: "Cooling + cameras + AC + branch setup + multiple vendors" },
    { name: "Hospitals, Clinics & Medical Centers", icon: "🏥", desc: "Health licenses + equipment maintenance + specialized cleaning + operation contracts" },
    { name: "Multi-Branch Companies & Offices", icon: "🏢", desc: "Electricity + telecom + cleaning + rentals + office services" },
    { name: "Contracting & Real Estate",        icon: "🏗️", desc: "Multiple operation sites + vendors + equipment + contract follow-up" },
    { name: "Schools & Educational Centers",    icon: "🎓", desc: "Education licenses + facility maintenance + transport + operational setups" },
    { name: "Hotels & Furnished Apartments",    icon: "🏨", desc: "Continuous maintenance + room setup + daily operation services" },
    { name: "Malls & Commercial Centers",       icon: "🏬", desc: "Facility management + maintenance contracts + security & safety + multiple vendors" },
    { name: "Transport & Logistics Companies",  icon: "🚚", desc: "Fleet management + warehouses + operation contracts + multiple sites" },
    { name: "Factories & Industrial Facilities",icon: "🏭", desc: "Operation facilities + maintenance contracts + technical services + vendor follow-up" },
    { name: "Distribution & Warehouse Companies",icon: "🧴", desc: "Multiple sites + operational setups + transport + periodic maintenance" },
    { name: "Government & Semi-Government",     icon: "🏛️", desc: "Operational service coordination + vendor follow-up + facility management" },
    { name: "Fast-Growing Startups",            icon: "🚀", desc: "Rapid expansion + site setup + multiple vendors + operation follow-up" },
  ];

  const savings = ar ? [
    { role: "مدير تشغيل",   icon: Users },
    { role: "مشرف مرافق",   icon: Building2 },
    { role: "منسق موردين",  icon: Network },
    { role: "متابع تراخيص", icon: FileText },
  ] : [
    { role: "Operations Manager",    icon: Users },
    { role: "Facilities Supervisor", icon: Building2 },
    { role: "Vendor Coordinator",    icon: Network },
    { role: "License Tracker",       icon: FileText },
  ];

  const heroStats = ar ? [
    { num: "صفر",   label: "موظف إضافي",          sub: "مدير حساب مخصص من GSS" },
    { num: "100%",  label: "متابعة شهرية مضمونة", sub: "فواتير، صيانة، تراخيص" },
    { num: "نقطة", label: "اتصال واحدة فقط",      sub: "لكل خدماتكم التشغيلية" },
    { num: "وفر",  label: "تكاليف التوظيف",        sub: "بدون راتب أو تأمين أو مكتب" },
  ] : [
    { num: "Zero",  label: "Extra Employees",         sub: "Dedicated GSS account manager" },
    { num: "100%",  label: "Guaranteed Monthly Follow-up", sub: "Bills, maintenance, licenses" },
    { num: "One",   label: "Point of Contact",         sub: "For all your operational services" },
    { num: "Save",  label: "Hiring Costs",             sub: "No salary, insurance, or office" },
  ];

  const noItems = ar
    ? ["راتب شهري + مزايا وظيفية", "مكتب أو جهاز", "تدريب أو تأهيل", "إجازات أو تأمين صحي"]
    : ["Monthly salary + benefits", "Office or equipment", "Training or onboarding", "Leave or health insurance"];

  const yesItems = ar
    ? ["متابعة تشغيلية كاملة طوال الشهر", "تقارير شهرية بكل الإنفاق", "تنبيهات مبكرة للتراخيص والعقود", "استجابة سريعة لبلاغات الصيانة"]
    : ["Full operational follow-up all month", "Monthly reports on all spending", "Early alerts for licenses and contracts", "Fast response to maintenance reports"];

  const benefits = ar ? [
    { icon: UserCheck,   title: "مدير حساب مخصص",             desc: "شخص حقيقي يعرف منشأتكم ويتابع كل شيء — ليس نظاماً إلكترونياً فقط" },
    { icon: TrendingDown, title: "توفير فعلي في التكاليف",     desc: "بدائل بأسعار أفضل، اكتشاف تكاليف مخفية، تقليل إعادة التنفيذ" },
    { icon: Layers,       title: "نقطة اتصال واحدة",            desc: "الصيانة، التراخيص، الفواتير — كل شيء عبر GSS فقط" },
    { icon: BarChart3,    title: "تقارير شهرية وشفافية كاملة", desc: "تعرفون أين يذهب كل ريال وما هي فرص التوفير" },
    { icon: RefreshCcw,   title: "لا حاجة لتغيير موردييكم",    desc: "نُنظّم الإدارة فوق ما هو موجود — بدون أي تعطيل" },
    { icon: ShieldCheck,  title: "تنبيهات مبكرة للتراخيص",     desc: "لا مفاجآت — تنبيه قبل 60 يوماً من انتهاء أي ترخيص أو عقد" },
  ] : [
    { icon: UserCheck,   title: "Dedicated Account Manager",      desc: "A real person who knows your facility and follows up on everything — not just software" },
    { icon: TrendingDown, title: "Real Cost Savings",              desc: "Better-priced alternatives, discovering hidden costs, reducing rework" },
    { icon: Layers,       title: "Single Point of Contact",        desc: "Maintenance, licenses, bills — everything through GSS only" },
    { icon: BarChart3,    title: "Monthly Reports & Full Transparency", desc: "You know where every riyal goes and what savings opportunities exist" },
    { icon: RefreshCcw,   title: "No Need to Change Your Vendors", desc: "We organize management on top of what exists — without any disruption" },
    { icon: ShieldCheck,  title: "Early License Alerts",           desc: "No surprises — 60-day alert before any license or contract expires" },
  ];

  return (
    <div className="pb-0">

      {/* HERO */}
      <section className="relative bg-primary py-28 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary/90" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-secondary/20 text-secondary font-bold text-sm px-4 py-1.5 rounded-full mb-6">
                {ar ? "للمنشآت والشركات" : "For Facilities & Companies"}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {ar ? (
                  <>منشأتك تحتاج<br /><span className="text-secondary">مدير عمليات خارجي</span><br />لا موظف إضافي</>
                ) : (
                  <>Your Facility Needs<br /><span className="text-secondary">an External Operations Manager</span><br />Not More Employees</>
                )}
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-10">
                {ar
                  ? "كل منشأة تتحمل يومياً عبء الفواتير والصيانة والتراخيص وعشرات الموردين — نحن نتولى هذا كله بدلاً منكم."
                  : "Every facility bears daily burdens of bills, maintenance, licenses, and dozens of vendors — we handle all of this on your behalf."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register/company">
                  <Button size="lg" className="h-14 px-10 text-lg font-bold bg-secondary hover:bg-secondary/90 text-primary" data-testid="cta-hero-register">
                    {ar ? "سجّل منشأتك مجاناً" : "Register Your Facility Free"} <ArrowLeft className="mr-2" size={20} />
                  </Button>
                </Link>
                <Link href="#scenario">
                  <Button size="lg" variant="outline" className="h-14 px-10 text-lg text-white border-white hover:bg-white/10">
                    {ar ? "شوف السيناريو الحقيقي" : "See the Real Scenario"}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {heroStats.map((item, i) => (
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

      {/* CORE POSITIONING */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="inline-block bg-amber-50 text-amber-700 font-bold text-sm px-4 py-1.5 rounded-full mb-5">
                {ar ? "الفكرة الأساسية" : "The Core Idea"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                {ar ? (<>نحن موظفوكم<br />التشغيليون</>) : (<>We Are Your<br />Operations Team</>)}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {ar
                  ? "الفاتورة المتأخرة، البلاغ المعلّق، الترخيص على وشك الانتهاء — هذه مشاكل لا تُحلّها برامج إدارة، بل تحتاج شخصاً يرفع الهاتف ويتابع. نحن ذلك الشخص."
                  : "The overdue bill, the pending report, the expiring license — these problems aren't solved by management software. They need someone to pick up the phone and follow up. That's us."}
              </p>
              <Link href="/register/company">
                <Button size="lg" className="font-bold" data-testid="cta-positioning">
                  {ar ? "ابدأ الآن" : "Get Started"} <ArrowLeft className="mr-2" size={18} />
                </Button>
              </Link>
            </div>
            <div className="bg-primary rounded-3xl p-8 text-white">
              <p className="font-black text-xl mb-6">{ar ? "GSS هو الخيار الثالث — بدلاً من:" : "GSS is the Third Option — Instead of:"}</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-5 py-4">
                  <X size={18} className="text-red-400 flex-shrink-0" />
                  <span className="text-white/85">{ar ? "توظيف فريق داخلي وتحمّل رواتبه" : "Hiring an internal team and bearing its salaries"}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-5 py-4">
                  <X size={18} className="text-red-400 flex-shrink-0" />
                  <span className="text-white/85">{ar ? "تجاهل المهام وتراكم المشاكل" : "Ignoring tasks and letting problems accumulate"}</span>
                </div>
                <div className="flex items-center gap-3 bg-secondary/20 border border-secondary/30 rounded-2xl px-5 py-4">
                  <CheckCircle2 size={18} className="text-secondary flex-shrink-0" />
                  <span className="font-bold text-white">{ar ? "فريق GSS يتولى كل شيء — بدون تكاليف التوظيف" : "GSS team handles everything — without hiring costs"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{ar ? "ما الذي نتابعه نيابةً عنكم؟" : "What Do We Follow Up on Your Behalf?"}</h3>
            <p className="text-gray-500">{ar ? "أكثر من 25 خدمة تشغيلية — موزّعة على 4 محاور رئيسية" : "Over 25 operational services — across 4 main pillars"}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {serviceCategories.map((cat, i) => (
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
              {ar
                ? "📲 أرسل طلبك → نجلب أفضل عرض من موردين معتمدين → نتابع حتى الإنجاز ✅"
                : "📲 Submit your request → We get the best offer from certified vendors → We follow up until done ✅"}
            </p>
            <Link href="/register/company" className="flex-shrink-0">
              <Button variant="outline" size="sm" className="font-bold border-primary text-primary" data-testid="cta-how-it-works">
                {ar ? "سجّل وجرّب" : "Register & Try"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* REAL SCENARIO */}
      <section id="scenario" className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-primary/10 text-primary font-bold text-sm px-4 py-1.5 rounded-full mb-3">
              {ar ? "السيناريو الحقيقي" : "The Real Scenario"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {ar ? "يوم عمل عادي — بفرق واحد" : "A Normal Work Day — With One Difference"}
            </h2>
            <p className="text-gray-500 mt-2 text-base">
              {ar ? "نفس اليوم، نفس المنشأة — قبل GSS وبعدها" : "Same day, same facility — before and after GSS"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white border-2 border-red-200 rounded-3xl p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <X size={18} className="text-red-500" />
                </div>
                <h3 className="font-black text-gray-800 text-lg">{ar ? "بدون GSS" : "Without GSS"}</h3>
              </div>
              <ul className="space-y-4">
                {(ar ? [
                  { time: "8 ص",  event: "تكييف فرع الرياض عطلان — تتصل بـ 3 موردين ولا أحد يرد" },
                  { time: "10 ص", event: "فاتورة كهرباء غير مألوفة — لا أحد يعرف سببها" },
                  { time: "12 م", event: "ترخيص صحي ينتهي بعد أسبوعين — اكتشفته بالصدفة" },
                  { time: "3 م",  event: "موظف قضى 4 ساعات في متابعة طلب صيانة لم يُغلق بعد" },
                ] : [
                  { time: "8AM",  event: "Riyadh branch AC broken — you call 3 vendors, none respond" },
                  { time: "10AM", event: "Unusual electricity bill — nobody knows why" },
                  { time: "12PM", event: "Health license expires in two weeks — discovered by chance" },
                  { time: "3PM",  event: "An employee spent 4 hours following up on a maintenance request still not closed" },
                ]).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-xs font-bold text-red-400 bg-red-50 px-2 py-1 rounded-lg mt-0.5 w-14 text-center flex-shrink-0">{item.time}</span>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.event}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-red-50 rounded-2xl px-4 py-3 text-center">
                <p className="text-red-600 font-bold text-sm">{ar ? "النتيجة: يوم ضائع، مشاكل متراكمة" : "Result: A wasted day, accumulating problems"}</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white border-2 border-primary/30 rounded-3xl p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-primary" />
                </div>
                <h3 className="font-black text-gray-800 text-lg">{ar ? "مع GSS" : "With GSS"}</h3>
              </div>
              <ul className="space-y-4">
                {(ar ? [
                  { time: "8 ص",  event: "GSS توجّه المورد المعتمد فوراً — الإغلاق في نفس اليوم" },
                  { time: "10 ص", event: "GSS تراجع الفاتورة وترسل تقريراً موضّحاً بالأسباب" },
                  { time: "12 م", event: "GSS نبّهتك قبل 60 يوماً — التجديد جارٍ بدون أي تدخل منك" },
                  { time: "3 م",  event: "موظفك يركّز على عمله — GSS تتابع حتى الإغلاق" },
                ] : [
                  { time: "8AM",  event: "GSS directs the certified vendor immediately — closed same day" },
                  { time: "10AM", event: "GSS reviews the bill and sends a report explaining the reasons" },
                  { time: "12PM", event: "GSS alerted you 60 days ago — renewal in progress without any involvement from you" },
                  { time: "3PM",  event: "Your employee focuses on their work — GSS follows up until closure" },
                ]).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg mt-0.5 w-14 text-center flex-shrink-0">{item.time}</span>
                    <p className="text-gray-700 text-sm leading-relaxed font-medium">{item.event}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-primary/10 rounded-2xl px-4 py-3 text-center">
                <p className="text-primary font-bold text-sm">{ar ? "النتيجة: كل شيء مُغلق، أنت تركّز على عملك" : "Result: Everything closed, you focus on your work"}</p>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-primary text-white rounded-2xl px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/90 font-medium text-center sm:text-right">
              {ar ? "نقطة اتصال واحدة — متابعة كاملة — تقرير شهري واضح" : "One point of contact — full follow-up — clear monthly report"}
            </p>
            <Link href="/register/company" className="flex-shrink-0">
              <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold px-6" data-testid="cta-scenario">
                {ar ? "ابدأ الآن" : "Get Started"} <ArrowLeft className="mr-1" size={16} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ACCOUNT MANAGER */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary font-bold text-sm px-4 py-1.5 rounded-full mb-4">
              {ar ? "الحل" : "The Solution"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {ar ? "مدير حساب مخصص لمنشأتكم" : "A Dedicated Account Manager for Your Facility"}
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              {ar ? "يتابع جميع عملياتكم التشغيلية — يومياً وأسبوعياً وشهرياً" : "Follows all your operational activities — daily, weekly, and monthly"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {(ar ? [
              { icon: "📅", period: "يومياً",   items: ["استقبال البلاغات وتوجيهها للموردين", "متابعة التنفيذ وتأكيد الإغلاق"] },
              { icon: "📋", period: "أسبوعياً", items: ["مراجعة الطلبات المفتوحة", "تقرير أداء الموردين"] },
              { icon: "📊", period: "شهرياً",   items: ["فاتورة موحدة لكل فرع", "تقرير تشغيلي شامل + تنبيه التراخيص"] },
            ] : [
              { icon: "📅", period: "Daily",   items: ["Receive reports and direct to vendors", "Follow execution and confirm closure"] },
              { icon: "📋", period: "Weekly", items: ["Review open requests", "Vendor performance report"] },
              { icon: "📊", period: "Monthly",   items: ["Unified invoice per branch", "Full operational report + license alerts"] },
            ]).map((block, i) => (
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

          <div className="bg-primary text-white rounded-3xl p-8 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="font-bold text-lg mb-4 text-white/70">{ar ? "لا يحتاج:" : "Doesn't require:"}</h3>
              <ul className="space-y-2">
                {noItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/75 text-sm">
                    <X size={14} className="text-red-400 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">{ar ? "لكنه يُقدّم:" : "But delivers:"}</h3>
              <ul className="space-y-2">
                {yesItems.map((item, i) => (
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
            <span className="inline-block bg-green-50 text-green-700 font-bold text-sm px-4 py-1.5 rounded-full mb-3">
              {ar ? "التوفير الفعلي" : "Actual Savings"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {ar ? "وفّروا تكاليف فريق العمليات بالكامل" : "Save the Full Cost of an Operations Team"}
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              {ar
                ? "المنشآت تدفع رواتب ثابتة لهؤلاء كل شهر — GSS تتولى مهامهم جميعاً بدون أي من هذه التكاليف"
                : "Facilities pay fixed salaries for these roles every month — GSS handles all their tasks without any of those costs"}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {savings.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white border border-gray-200 rounded-2xl p-5 text-center relative">
                <div className="w-11 h-11 bg-red-50 text-red-400 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <item.icon size={20} />
                </div>
                <p className="font-bold text-gray-800 text-sm">{item.role}</p>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 rounded-full flex items-center justify-center">
                  <X size={12} className="text-white" />
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-green-600 text-white rounded-3xl p-8 text-center">
            <p className="text-2xl md:text-3xl font-black mb-3">
              {ar ? "مع GSS — لا رواتب، لا مكاتب، لا تأمين، لا تدريب" : "With GSS — No salaries, offices, insurance, or training"}
            </p>
            <p className="text-green-100 text-base">
              {ar ? "تحصلون على نفس الكفاءة التشغيلية بجزء بسيط من التكلفة" : "You get the same operational efficiency at a fraction of the cost"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {ar ? "من يستفيد أكثر من خدمات GSS؟" : "Who Benefits Most from GSS?"}
            </h2>
            <p className="text-gray-500 text-base max-w-2xl mx-auto">
              {ar
                ? "أي منشأة لديها أكثر من موقع، أو تتعامل مع عدة موردين، أو تحتاج متابعة تشغيلية مستمرة للخدمات اليومية"
                : "Any facility with more than one location, dealing with multiple vendors, or needing continuous operational follow-up for daily services"}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {sectors.map((sector, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="bg-primary/5 border border-primary/10 rounded-2xl p-5 hover:border-primary/30 hover:shadow-sm transition-all">
                <p className="text-3xl mb-3">{sector.icon}</p>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{sector.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{sector.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-primary/5 border border-primary/20 rounded-2xl px-7 py-5 text-center">
            <p className="text-gray-700 text-base leading-relaxed">
              {ar ? (
                <>إذا كانت منشأتكم تعتمد على موردين متعددين أو تحتاج متابعة تشغيلية مستمرة للفروع والخدمات اليومية —{" "}<span className="font-bold text-primary">فغالباً ستستفيدون من نموذج التشغيل الذي تقدمه GSS.</span></>
              ) : (
                <>If your facility relies on multiple vendors or needs continuous operational follow-up for branches and daily services —{" "}<span className="font-bold text-primary">you will most likely benefit from GSS's operational model.</span></>
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{ar ? "لماذا GSS تحديداً؟" : "Why GSS Specifically?"}</h2>
            <p className="text-slate-400 text-base">{ar ? "6 مزايا مباشرة تجعل قرار التسجيل سهلاً" : "6 direct advantages that make the registration decision easy"}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((item, i) => (
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
            {ar ? (<>فريق تشغيل احترافي لمنشأتكم<br />بدون تكاليف التوظيف</>) : (<>Professional Operations Team for Your Facility<br />Without Hiring Costs</>)}
          </h2>
          <p className="text-white/75 text-lg mb-10">
            {ar ? "سجّلوا الآن وسيتواصل مدير الحساب المخصص لدراسة احتياجاتكم." : "Register now and the dedicated account manager will contact you to study your needs."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register/company">
              <Button size="lg" className="h-14 px-12 text-xl font-bold bg-secondary hover:bg-secondary/90 text-primary" data-testid="cta-register-company-bottom">
                {ar ? "سجّل منشأتك الآن — مجاناً" : "Register Your Facility Now — Free"} <ArrowLeft className="mr-2" size={22} />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg text-white border-white hover:bg-white/10">
                {ar ? "تواصل معنا أولاً" : "Contact Us First"}
              </Button>
            </Link>
          </div>
          <p className="text-white/40 text-sm mt-6">
            {ar ? "لا يوجد التزام مسبق — فريق GSS سيتواصل معكم لشرح التفاصيل" : "No prior commitment — GSS team will contact you to explain the details"}
          </p>
        </div>
      </section>

    </div>
  );
}
