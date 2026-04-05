import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check, Zap, Building2, FileText, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Pricing() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const payPerRequestFeatures = isAr ? [
    { icon: "📩", text: "دفع رسوم خدمة لكل طلب يتم تنفيذه" },
    { icon: "🔧", text: "التنسيق مع الموردين المناسبين لكل طلب" },
    { icon: "💰", text: "توفير عروض أسعار من شبكة موردين معتمدين" },
    { icon: "✅", text: "متابعة تنفيذ الخدمة حتى إغلاق الطلب" },
    { icon: "📊", text: "إصدار أمر عمل رسمي لكل طلب" },
    { icon: "📁", text: "توثيق جميع الطلبات داخل المنصة" },
    { icon: "🛠", text: "التأكد من جودة التنفيذ قبل اعتماد الإغلاق" },
  ] : [
    { icon: "📩", text: "Pay a service fee per executed request" },
    { icon: "🔧", text: "Coordinate with the right vendors per request" },
    { icon: "💰", text: "Provide quotes from certified vendor network" },
    { icon: "✅", text: "Follow up on execution until closure" },
    { icon: "📊", text: "Issue an official work order per request" },
    { icon: "📁", text: "Document all requests inside the platform" },
    { icon: "🛠", text: "Verify execution quality before closure approval" },
  ];

  const payPerRequestWhen = isAr ? [
    "المنشآت التي لديها طلبات تشغيلية غير منتظمة أو موسمية",
    "المنشآت التي تريد تجربة المنصة قبل الالتزام بباقة شهرية",
    "المنشآت الصغيرة ذات الاحتياجات التشغيلية المحدودة",
    "إذا كانت المنشأة لديها فريق داخلي يتابع جزءاً من الأعمال",
  ] : [
    "Facilities with irregular or seasonal operational requests",
    "Facilities that want to try the platform before committing to a monthly package",
    "Small facilities with limited operational needs",
    "If the facility has an internal team handling part of operations",
  ];

  const managedPackageFeatures = isAr ? [
    { icon: "📅", text: "رسوم اشتراك شهرية ثابتة تشمل إدارة العمليات التشغيلية" },
    { icon: "👤", text: "مدير حساب مخصص يتابع جميع العمليات يومياً وأسبوعياً وشهرياً" },
    { icon: "📊", text: "تقارير تشغيلية دورية مفصلة (أسبوعية وشهرية)" },
    { icon: "⏰", text: "تنبيهات مسبقة لانتهاء العقود والتراخيص" },
    { icon: "🏢", text: "متابعة الفروع والمواقع بشكل مركزي" },
    { icon: "💰", text: "فاتورة موحدة شهرية لجميع الخدمات المنفذة" },
    { icon: "⚡", text: "أولوية قصوى في الاستجابة والتنفيذ" },
    { icon: "🔁", text: "إدارة عقود الموردين وتجديدها" },
    { icon: "📈", text: "تحليل المصروفات التشغيلية وفرص التوفير" },
    { icon: "🗓", text: "اجتماعات مراجعة تشغيلية دورية مع الإدارة" },
  ] : [
    { icon: "📅", text: "Fixed monthly subscription covering operational management" },
    { icon: "👤", text: "Dedicated account manager following up daily, weekly, and monthly" },
    { icon: "📊", text: "Detailed periodic operational reports (weekly & monthly)" },
    { icon: "⏰", text: "Early alerts for contract and license expiry" },
    { icon: "🏢", text: "Centralized branch and site monitoring" },
    { icon: "💰", text: "Unified monthly invoice for all executed services" },
    { icon: "⚡", text: "Top priority response and execution" },
    { icon: "🔁", text: "Vendor contract management and renewal" },
    { icon: "📈", text: "Operational expense analysis and savings opportunities" },
    { icon: "🗓", text: "Periodic operational review meetings with management" },
  ];

  const managedPackageWhen = isAr ? [
    "المنشآت متعددة الفروع أو ذات التشغيل المستمر",
    "المنشآت التي تريد شريكاً تشغيلياً خارجياً يدير كل شيء",
    "المنشآت الكبيرة التي تبحث عن كفاءة تشغيلية أعلى",
    "الشركات التي تريد استبدال فريق عمليات داخلي بتكلفة أقل",
  ] : [
    "Multi-branch facilities or those with continuous operations",
    "Facilities looking for an external operations partner to manage everything",
    "Large facilities seeking higher operational efficiency",
    "Companies wanting to replace an internal operations team at lower cost",
  ];

  const addOnServices = isAr ? [
    "خدمات منفذة خارج نطاق الباقة الشهرية",
    "المشتريات التشغيلية (قطع غيار، مواد، أجهزة)",
    "خدمات التجهيز والمشاريع التشغيلية الكبرى",
    "الاستشارات التشغيلية المتخصصة",
  ] : [
    "Services executed outside the monthly package scope",
    "Operational procurement (spare parts, materials, equipment)",
    "Setup services and large operational projects",
    "Specialized operational consulting",
  ];

  const procurementItems = isAr ? [
    "طلب قطع غيار",
    "طلب مواد تشغيلية",
    "طلب أجهزة ومعدات",
    "طلب عرض سعر",
    "متابعة التوريد",
  ] : [
    "Spare Parts Request",
    "Operational Materials Request",
    "Equipment & Devices Request",
    "Price Quotation Request",
    "Supply Follow-up",
  ];

  return (
    <div className="pb-0">

      {/* HERO */}
      <section className="bg-primary py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-secondary/20 text-secondary font-bold text-sm px-4 py-1.5 rounded-full mb-6">
            {isAr ? "نموذج التعاقد المالي" : "Financial Contract Model"}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isAr ? "خياران للتعاقد — مرونة تناسب منشأتكم" : "Two Contract Models — Flexibility for Your Facility"}
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-3xl mx-auto">
            {isAr
              ? "تعتمد منصة GSS على خيارين واضحين للتعاقد مع المنشآت — اختاروا ما يناسب احتياجاتكم التشغيلية."
              : "GSS Platform offers two clear contract options for facilities — choose what suits your operational needs."}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2.5 text-sm font-bold">
              <span className="text-secondary">●</span>
              {isAr ? "الدفع حسب الطلب" : "Pay Per Request"}
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2.5 text-sm font-bold">
              <span className="text-secondary">●</span>
              {isAr ? "اشتراك شهري لإدارة التشغيل" : "Managed Monthly Package"}
            </span>
          </div>
        </div>
      </section>

      {/* PAY PER REQUEST */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Zap size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">{isAr ? "الخيار الأول" : "Option One"}</p>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {isAr ? "الدفع حسب الطلب (Pay Per Request)" : "Pay Per Request"}
                  </h2>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-full px-3 py-1 mb-5">
                <Check size={12} />
                {isAr ? "مناسب للمنشآت ذات الاحتياجات غير المنتظمة" : "Suitable for facilities with irregular needs"}
              </span>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {isAr
                  ? "تدفع المنشأة رسوم خدمة محددة مقابل كل طلب تشغيلي يتم تنفيذه، دون أي التزام بباقة شهرية ثابتة."
                  : "The facility pays a defined service fee for each executed operational request, with no commitment to a fixed monthly package."}
              </p>
              <ul className="space-y-3 mb-8">
                {payPerRequestFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-lg shrink-0 mt-0.5">{f.icon}</span>
                    <span className="text-gray-700 text-sm leading-relaxed">{f.text}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-amber-50 border border-amber-100 rounded-2xl px-5 py-3 text-sm text-amber-800">
                {isAr
                  ? "يتم احتساب رسوم الخدمة لكل طلب حسب نوع الخدمة ونطاقها ومتطلبات التنفيذ."
                  : "Service fees are calculated per request based on service type, scope, and execution requirements."}
              </div>
            </motion.div>

            {/* Right */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="bg-primary/5 border border-primary/10 rounded-3xl p-7">
                <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="text-primary">✦</span>
                  {isAr ? "متى يكون هذا الخيار مناسباً؟" : "When Is This Option Right for You?"}
                </h3>
                <ul className="space-y-4 mb-8">
                  {payPerRequestWhen.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={16} className="text-primary mt-0.5 shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register/company?model=on-demand">
                  <Button className="w-full font-bold">
                    {isAr ? "سجّل بنموذج حسب الطلب" : "Register with Pay Per Request"}
                  </Button>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* MANAGED MONTHLY PACKAGE */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-bold rounded-full px-4 py-1.5 mb-5">
              <Building2 size={13} />
              {isAr ? "الباقة الشهرية الموصى بها للمنشآت الكبيرة" : "Recommended Monthly Package for Large Facilities"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isAr ? "اشتراك شهري لإدارة التشغيل (Managed Monthly Package)" : "Managed Monthly Package"}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {isAr
                ? "باقة متكاملة لإدارة جميع العمليات التشغيلية للمنشأة عبر GSS بشريك تشغيل خارجي محترف."
                : "A comprehensive package for managing all facility operational processes through GSS as a professional external operations partner."}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="bg-white border-2 border-primary rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                    <FileText size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">{isAr ? "الخيار الثاني" : "Option Two"}</p>
                    <h3 className="text-xl font-bold text-gray-900">{isAr ? "الباقة الشهرية الشاملة" : "Managed Monthly Package"}</h3>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {managedPackageFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-lg shrink-0 mt-0.5">{f.icon}</span>
                      <span className="text-gray-700 text-sm leading-relaxed">{f.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700 mb-5">
                  {isAr
                    ? "تُضاف رسوم منفصلة للخدمات المنفذة خارج نطاق الباقة الشهرية المتفق عليها."
                    : "Separate fees are added for services executed outside the agreed monthly package scope."}
                </div>
                <Link href="/register/company?model=monthly">
                  <Button className="w-full font-bold bg-primary hover:bg-primary/90 h-12">
                    {isAr ? "سجّل وابدأ بالباقة الشهرية" : "Register for Monthly Package"}
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-primary">✦</span>
                    {isAr ? "متى تكون هذه الباقة مناسبة؟" : "When Is This Package Right for You?"}
                  </h3>
                  <ul className="space-y-3">
                    {managedPackageWhen.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check size={16} className="text-primary mt-0.5 shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <AlertCircle size={16} className="text-primary" />
                    {isAr ? "الخدمات ذات رسوم إضافية" : "Services with Additional Fees"}
                  </h3>
                  <p className="text-gray-500 text-xs mb-4">
                    {isAr
                      ? "في حال تطلّب تنفيذ الخدمة توفير مواد أو أجهزة أو قطع غيار، يتم احتساب التكلفة الفعلية بشكل منفصل."
                      : "If service execution requires procuring materials, equipment, or spare parts, the actual cost is calculated separately."}
                  </p>
                  <ul className="space-y-2">
                    {addOnServices.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-primary font-bold mt-0.5">+</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* PROCUREMENT NOTE */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {isAr ? "المشتريات التشغيلية المرتبطة بطلبات التنفيذ" : "Operational Procurement Linked to Execution Requests"}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {isAr
                ? "في حال تطلّب تنفيذ أي خدمة توفير مواد أو أجهزة أو قطع غيار، يحق لمنصة GSS طلب دفعة مقدمة قبل المباشرة بالتنفيذ. يشمل ذلك:"
                : "If any service execution requires procuring materials, equipment, or spare parts, GSS Platform has the right to request a down payment before proceeding. This includes:"}
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {procurementItems.map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-primary" />
                  </div>
                  <span className="font-medium text-sm text-gray-800">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-3 text-sm text-amber-800">
              {isAr
                ? "يُطلب من المنشأة اعتماد مسبق لأي مشتريات تتجاوز الحد المتفق عليه في العقد."
                : "Facilities are required to give prior approval for any procurement exceeding the contract-agreed threshold."}
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE PREPARATION FEES */}
      <section className="py-16 bg-amber-50 border-t border-amber-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <AlertCircle size={22} className="text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {isAr ? "رسوم إعداد العروض التشغيلية" : "Operational Quote Preparation Fees"}
                </h2>
                <p className="text-gray-500 text-sm">
                  {isAr ? "يختلف هذا البند بين عملاء الخدمة حسب الطلب وعملاء الباقة الشهرية" : "This clause differs between Pay Per Request clients and monthly package subscribers"}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-6">
              <div className="bg-white border border-amber-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🔧</span>
                  <h3 className="font-bold text-gray-900 text-sm">{isAr ? "الخدمة حسب الطلب" : "Pay Per Request"}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {isAr
                    ? "في بعض الطلبات التشغيلية التي تتطلب إعداد عرض فني أو مالي مفصل — كالزيارات الميدانية أو دراسات نطاق العمل أو التحليل التقني — تعتبر عملية إعداد العرض جزءًا من الخدمة التشغيلية المقدمة من منصة GSS، ويجوز احتساب رسوم خدمة في حال عدم اعتماد التنفيذ."
                    : "For operational requests requiring a detailed technical or financial proposal — such as site visits, scope studies, or technical analysis — the quote preparation process is considered part of the operational service provided by GSS, and a service fee may apply if execution is not approved."}
                </p>
                <div className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                  {isAr ? "يتم إشعار المنشأة مسبقًا قبل البدء في إعداد أي عرض يترتب عليه رسوم." : "The facility is notified in advance before preparing any quote that may incur fees."}
                </div>
              </div>
              <div className="bg-white border border-green-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">📋</span>
                  <h3 className="font-bold text-gray-900 text-sm">{isAr ? "الباقة الشهرية المدارة" : "Managed Monthly Package"}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {isAr
                    ? "تشمل خدمات الاشتراك إعداد عروض الأسعار والدراسات التشغيلية والتنسيق الفني ضمن نطاق خدمات المتابعة المستمرة دون رسوم إضافية على إعداد العروض."
                    : "Subscription services include quote preparation, operational studies, and technical coordination within the scope of continuous follow-up services — at no additional charge for quote preparation."}
                </p>
                <div className="mt-3 text-xs text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2 flex items-center gap-1.5">
                  <Check size={12} className="text-green-600 flex-shrink-0" />
                  {isAr ? "لا تُحتسب رسوم إعداد العروض على عملاء الباقة الشهرية." : "No quote preparation fees charged for monthly package subscribers."}
                </div>
              </div>
            </div>

            <div className="bg-white border border-amber-200 rounded-xl px-5 py-3 text-sm text-amber-800 flex items-start gap-3">
              <Zap size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <p>
                {isAr
                  ? "في حال إعداد عرض فني أو مالي بناءً على طلب المنشأة ولم يتم اعتماد التنفيذ، يحق لمنصة GSS احتساب رسوم الخدمة التشغيلية حسب طبيعة الطلب ونطاقه."
                  : "If a technical or financial proposal is prepared at the facility's request and execution is not approved, GSS Platform has the right to charge an operational service fee based on the nature and scope of the request."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LARGE PROJECTS */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 bg-white/15 rounded-2xl flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <h2 className="text-2xl font-bold">
                  {isAr ? "عقود التشغيل الكبيرة والمشاريع الخاصة" : "Large Operational Contracts & Custom Projects"}
                </h2>
              </div>
              <p className="text-white/75 text-sm leading-relaxed mb-8">
                {isAr
                  ? "للمشاريع التشغيلية الكبرى أو العقود السنوية الشاملة، تتولى منصة GSS إدارة المشروع بالكامل بالتنسيق مع الموردين المعتمدين وفق شروط تعاقدية مخصصة."
                  : "For large operational projects or comprehensive annual contracts, GSS Platform fully manages the project in coordination with certified vendors under custom contract terms."}
              </p>
              <ul className="space-y-3 mb-8">
                {(isAr ? [
                  "إدارة مناقصات الموردين التشغيلية",
                  "تنسيق الموردين المشاركين في المشروع",
                  "متابعة التنفيذ حتى التسليم",
                  "إدارة العقود التشغيلية طويلة المدى",
                  "إعداد تقارير متابعة المشروع الدورية",
                ] : [
                  "Operational vendor tender management",
                  "Coordinating participating vendors",
                  "Execution follow-up until delivery",
                  "Long-term operational contract management",
                  "Periodic project progress reporting",
                ]).map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={15} className="text-secondary mt-0.5 shrink-0" />
                    <span className="text-white/85 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-sm text-white/70">
                {isAr
                  ? "يتم تحديد نسبة الإدارة مسبقاً حسب حجم المشروع ونطاق العمل."
                  : "The management fee is determined upfront based on project size and scope."}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 border border-white/15 rounded-2xl p-5 text-center">
                <p className="text-4xl font-black text-secondary mb-2">{isAr ? "مخصص" : "Custom"}</p>
                <p className="text-white/70 text-sm">{isAr ? "تسعير حسب نطاق المشروع وحجمه" : "Pricing based on project scope and size"}</p>
              </div>
              <Link href="/register/company?model=both">
                <Button size="lg" className="w-full h-13 font-bold bg-secondary hover:bg-secondary/90 text-primary">
                  {isAr ? "ابدأ حسب الطلب + احصل على عرض باقة شهرية" : "Start Pay-Per-Request + Get Monthly Package Offer"}
                </Button>
              </Link>
              <Link href="/register/company">
                <Button size="lg" variant="outline" className="w-full h-11 font-bold text-white border-white hover:bg-white/10">
                  {isAr ? "عرض جميع نماذج الخدمة" : "View All Service Models"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
