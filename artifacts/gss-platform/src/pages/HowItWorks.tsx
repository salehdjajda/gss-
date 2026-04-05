import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, CheckCircle2, ShieldCheck, AlertCircle, Info, FileText } from "lucide-react";

export default function HowItWorks() {
  const { lang } = useLanguage();
  const ar = lang === "ar";

  const steps = ar ? [
    {
      num: "01",
      title: "توقيع العقد",
      desc: "تبدأ الرحلة بتوقيع عقد تشغيل بين منشأتكم وGSS، يحدد نطاق الخدمات المطلوبة والشروط المالية المتفق عليها — الخدمة حسب الطلب أو الباقة الشهرية المدارة.",
      badge: "بداية العلاقة",
      highlight: false,
    },
    {
      num: "02",
      title: "تفعيل الحساب",
      desc: "يتم إعداد حساب المنشأة داخل منصة GSS وربطه ببيانات الفروع والمواقع، واختيار مدير الحساب المخصص المسؤول عن متابعة عمليات منشأتكم.",
      badge: "الإعداد",
      highlight: false,
    },
    {
      num: "03",
      title: "تحديد المستخدمين المفوضين",
      desc: "تُحدد المنشأة المستخدمين المخولين برفع الطلبات واعتماد إغلاقها داخل المنصة، مما يضمن الرقابة الكاملة على دورة الطلبات التشغيلية. تُعدّ الطلبات الصادرة من المستخدمين المفوضين طلبات رسمية ملزمة بعد اعتماد التكلفة.",
      badge: "الصلاحيات",
      highlight: false,
    },
    {
      num: "04",
      title: "رفع طلب الخدمة",
      desc: "يرفع المستخدم المفوض طلب الخدمة عبر بوابة العميل أو الجوال أو واتساب أو الكول سنتر — مع تحديد نوع الخدمة والموقع ومستوى الأولوية.",
      badge: "الطلب",
      highlight: false,
    },
    {
      num: "05",
      title: "مراجعة الطلب وتحديد التكلفة",
      desc: "يراجع فريق GSS الطلب ويُعدّ عرض التكلفة المبدئي الذي يشمل نطاق العمل والتكلفة التقديرية ومدة التنفيذ — دون الإفصاح عن اسم المورد في هذه المرحلة، لحماية إجراءات التنسيق التشغيلي.",
      badge: "تقييم التكلفة",
      highlight: false,
    },
    {
      num: "06",
      title: "اعتماد التكلفة من المنشأة",
      desc: "يقوم الشخص المفوض لدى المنشأة باعتماد عرض التكلفة المقدم. لا يُعتبر طلب الخدمة أمر تنفيذ ملزمًا إلا بعد اعتماد التكلفة من الجهة المخولة داخل المنشأة.",
      badge: "اعتماد إلزامي",
      highlight: true,
    },
    {
      num: "07",
      title: "إصدار أمر العمل",
      desc: "بعد الاعتماد، يُصدر فريق GSS أمر عمل رسمي يوثّق نطاق الخدمة وجدول التنفيذ. في هذه المرحلة يتم تزويد المنشأة ببيانات المورد المكلّف والتفاصيل التنفيذية الكاملة.",
      badge: "التوثيق",
      highlight: false,
    },
    {
      num: "08",
      title: "تحويل الطلب للمورد المعتمد",
      desc: "يختار فريق GSS المورد الأنسب من شبكة الموردين المعتمدين بناءً على نوع الطلب والموقع الجغرافي وتقييم الأداء السابق وأفضل سعر متاح.",
      badge: "الاختيار",
      highlight: false,
    },
    {
      num: "09",
      title: "تنفيذ الخدمة",
      desc: "يشرف فريق GSS على التنفيذ الكامل ويتابع الالتزام بالجودة والوقت المحدد، مع إبقاء المنشأة على اطلاع دائم بحالة الطلب.",
      badge: "التنفيذ",
      highlight: false,
    },
    {
      num: "10",
      title: "تقرير الإنجاز",
      desc: "تُصدر منصة GSS تقرير إنجاز لكل طلب بعد اكتمال التنفيذ لضمان جودة التنفيذ ومطابقته للمتطلبات، قبل تحويله لمرحلة اعتماد الاستلام.",
      badge: "ضمان الجودة",
      highlight: false,
    },
    {
      num: "11",
      title: "اعتماد الاستلام من المنشأة",
      desc: "يعتمد المستخدم المفوض في المنشأة استلام الخدمة والتأكيد على مطابقتها للمتطلبات المتفق عليها قبل إغلاق الطلب رسمياً.",
      badge: "الاعتماد",
      highlight: false,
    },
    {
      num: "12",
      title: "إغلاق الطلب",
      desc: "يُغلق الطلب رسمياً داخل المنصة بعد اعتماد العميل، ويُوثّق كاملاً ضمن سجل العمليات التشغيلية للمنشأة للرجوع إليه في أي وقت.",
      badge: "الإغلاق",
      highlight: false,
    },
    {
      num: "13",
      title: "الفاتورة الشهرية",
      desc: "تُدرج جميع الخدمات المنفذة خلال الشهر ضمن فاتورة موحدة واضحة تُرسل للمنشأة مع تقرير تشغيلي شامل يوضح كل ما تم تنفيذه.",
      badge: "الفوترة",
      highlight: false,
    },
  ] : [
    {
      num: "01",
      title: "Contract Signing",
      desc: "The journey begins with signing an operations contract between your facility and GSS, defining the scope of required services and agreed financial terms — Pay Per Request or Managed Monthly Package.",
      badge: "Relationship Start",
      highlight: false,
    },
    {
      num: "02",
      title: "Account Activation",
      desc: "Your facility's account is set up within the GSS platform and linked to branch and location data, with a dedicated account manager assigned to follow up on your facility's operations.",
      badge: "Setup",
      highlight: false,
    },
    {
      num: "03",
      title: "Designate Authorized Users",
      desc: "The facility designates authorized users who can submit requests and approve closures within the platform, ensuring full control over the operational request cycle. Requests issued by authorized users are considered official and binding after cost approval.",
      badge: "Permissions",
      highlight: false,
    },
    {
      num: "04",
      title: "Service Request Submission",
      desc: "The authorized user submits a service request via the client portal, mobile app, WhatsApp, or call center — specifying service type, location, and priority level.",
      badge: "Request",
      highlight: false,
    },
    {
      num: "05",
      title: "Request Review & Cost Assessment",
      desc: "The GSS team reviews the request and prepares an initial cost proposal covering scope of work, estimated cost, and execution timeline — without disclosing the vendor name at this stage, to protect operational coordination procedures.",
      badge: "Cost Assessment",
      highlight: false,
    },
    {
      num: "06",
      title: "Cost Approval by the Facility",
      desc: "The authorized person at the facility approves the submitted cost proposal. A service request is not considered a binding execution order until the cost is approved by the authorized party within the facility.",
      badge: "Mandatory Approval",
      highlight: true,
    },
    {
      num: "07",
      title: "Work Order Issuance",
      desc: "After approval, the GSS team issues an official work order documenting the service scope and execution schedule. At this stage, the facility is provided with the assigned vendor's information and full execution details.",
      badge: "Documentation",
      highlight: false,
    },
    {
      num: "08",
      title: "Routing to Certified Vendor",
      desc: "The GSS team selects the most suitable vendor from the certified network based on request type, geographic location, past performance rating, and best available price.",
      badge: "Selection",
      highlight: false,
    },
    {
      num: "09",
      title: "Service Execution",
      desc: "The GSS team oversees full execution and monitors quality and time compliance, keeping the facility consistently informed of the request status.",
      badge: "Execution",
      highlight: false,
    },
    {
      num: "10",
      title: "Completion Report",
      desc: "GSS Platform issues a completion report for each request after execution is complete, ensuring quality and compliance with requirements — before advancing to client acceptance.",
      badge: "Quality Assurance",
      highlight: false,
    },
    {
      num: "11",
      title: "Client Acceptance Approval",
      desc: "The facility's authorized user approves service receipt and confirms it meets the agreed requirements before the request is officially closed.",
      badge: "Approval",
      highlight: false,
    },
    {
      num: "12",
      title: "Request Closure",
      desc: "The request is officially closed within the platform after client approval, and fully documented within the facility's operational records for reference at any time.",
      badge: "Closure",
      highlight: false,
    },
    {
      num: "13",
      title: "Monthly Invoice",
      desc: "All services executed during the month are included in a clear, unified invoice sent to the facility along with a comprehensive operational report detailing everything completed.",
      badge: "Billing",
      highlight: false,
    },
  ];

  return (
    <div className="pb-24">
      <section className="bg-primary py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-secondary/20 text-secondary font-bold text-sm px-4 py-1.5 rounded-full mb-6">
            {ar ? "دورة التشغيل" : "Operations Cycle"}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {ar ? "رحلة الخدمة داخل منصة GSS" : "The Service Journey Inside GSS"}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {ar
              ? "من توقيع العقد حتى الفاتورة الشهرية — دورة تشغيل واضحة ومنظمة لكل طلب تشغيلي في منشأتكم."
              : "From contract signing to the monthly invoice — a clear and organized operations cycle for every operational request at your facility."}
          </p>
        </div>
      </section>

      {/* Steps Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute top-0 bottom-0 right-12 w-0.5 bg-gray-200 hidden md:block" />
          <div className="space-y-12 relative">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex flex-col md:flex-row gap-8 items-start"
              >
                <div className={`flex-shrink-0 w-24 h-24 rounded-full flex items-center justify-center font-bold text-3xl shadow-lg relative z-10 mx-auto md:mx-0 ${step.highlight ? "bg-amber-500 border-4 border-amber-300 text-white" : "bg-white border-4 border-secondary text-secondary"}`}>
                  {step.num}
                </div>
                <div className={`p-8 rounded-2xl shadow-sm flex-1 relative md:mt-2 ${step.highlight ? "bg-amber-50 border-2 border-amber-200" : "bg-white border border-gray-100"}`}>
                  <div className={`absolute top-10 -right-3 w-6 h-6 transform rotate-45 hidden md:block ${step.highlight ? "bg-amber-50 border-t border-r border-amber-200" : "bg-white border-t border-r border-gray-100"}`} />
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${step.highlight ? "bg-amber-200 text-amber-900" : "bg-secondary/15 text-secondary"}`}>{step.badge}</span>
                    {step.highlight && <ShieldCheck size={16} className="text-amber-600" />}
                  </div>
                  <p className={`text-base leading-relaxed ${step.highlight ? "text-amber-900" : "text-gray-600"}`}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Banner */}
      <section className="py-12 bg-primary/5 border-t border-primary/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-primary/15 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-5 text-center">
              {ar ? "الدورة التشغيلية بالخلاصة" : "The Operational Cycle in Summary"}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium mb-6">
              {(ar
                ? ["توقيع العقد", "تفعيل الحساب", "المستخدمون المفوضون", "رفع الطلب", "تحديد التكلفة", "اعتماد التكلفة ✓", "أمر العمل", "تحويل للمورد", "التنفيذ", "تقرير الإنجاز", "اعتماد الاستلام", "إغلاق الطلب", "الفاتورة الشهرية"]
                : ["Contract Signing", "Account Activation", "Authorized Users", "Request Submission", "Cost Assessment", "Cost Approval ✓", "Work Order", "Vendor Routing", "Execution", "Completion Report", "Client Approval", "Request Closure", "Monthly Invoice"]
              ).map((step, i, arr) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`px-3 py-1.5 rounded-lg font-medium ${i === 5 ? "bg-amber-100 text-amber-800 font-bold" : "bg-primary/10 text-primary"}`}>{step}</span>
                  {i < arr.length - 1 && <span className="text-primary font-bold">←</span>}
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 flex items-start gap-3 text-sm text-amber-800">
              <ShieldCheck size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p>
                <strong>{ar ? "ملاحظة قانونية: " : "Legal Note: "}</strong>
                {ar
                  ? "لا يُعتبر طلب الخدمة أمر تنفيذ ملزمًا إلا بعد اعتماد التكلفة من الشخص المفوض لدى المنشأة."
                  : "A service request is not considered a binding execution order until the cost is approved by the authorized person at the facility."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Quote Policy — Two Phases */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-slate-50 border border-slate-200 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <FileText size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{ar ? "آلية تقديم عروض الأسعار" : "Quote Submission Process"}</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {ar
                ? "تقوم منصة GSS بتقديم عرض تكلفة مبدئي يشمل نطاق العمل والتكلفة التقديرية ومدة التنفيذ دون تحديد اسم المورد المنفذ. ويتم تزويد المنشأة ببيانات المورد والتفاصيل التنفيذية بعد اعتماد التكلفة وإصدار أمر العمل، وذلك لضمان كفاءة التنسيق التشغيلي وحماية جودة التنفيذ."
                : "GSS Platform provides an initial cost proposal covering the scope of work, estimated cost, and execution timeline — without specifying the vendor's name. The facility is provided with vendor details and execution specifics only after cost approval and work order issuance, to ensure operational coordination efficiency and protect execution quality."}
            </p>
          </motion.div>

          {/* Quote Preparation Fees */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="bg-amber-50 border border-amber-200 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <AlertCircle size={20} className="text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{ar ? "سياسة إعداد عروض الأسعار" : "Quote Preparation Policy"}</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              {ar
                ? "في الطلبات التشغيلية ضمن نظام الخدمة حسب الطلب، قد يتطلب إعداد عرض التكلفة القيام بزيارة ميدانية أو دراسة نطاق العمل أو التنسيق مع الموردين أو إعداد تحليل فني أو مالي."
                : "For operational requests under the Pay Per Request model, preparing a cost proposal may require a site visit, scope study, vendor coordination, or technical/financial analysis."}
            </p>
            <p className="text-amber-800 text-sm leading-relaxed font-medium">
              {ar
                ? "في هذه الحالات، يُعد إعداد العرض جزءًا من الخدمة التشغيلية المقدمة، وقد تترتب عليه رسوم خدمة في حال عدم اعتماد التنفيذ. يتم إشعار المنشأة بذلك مسبقًا قبل البدء في إعداد العرض."
                : "In such cases, quote preparation is considered part of the operational service provided, and a service fee may apply if execution is not approved. The facility will be notified in advance before quote preparation begins."}
            </p>
          </motion.div>

          {/* On-Demand vs Subscription */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-slate-50 border border-slate-200 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Info size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{ar ? "الفرق بين الخدمة حسب الطلب والاشتراك التشغيلي" : "Pay Per Request vs. Operational Subscription"}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-white border border-blue-100 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🔧</span>
                  <h4 className="font-bold text-gray-900 text-sm">{ar ? "الخدمة حسب الطلب" : "Pay Per Request"}</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {ar
                    ? "تتيح للمنشأة تنفيذ الخدمات التشغيلية عند الحاجة دون اشتراك ثابت، مع اعتماد التكلفة قبل التنفيذ لكل طلب بشكل مستقل لضمان الشفافية الكاملة في التكاليف. قد تنطبق رسوم على إعداد عروض الأسعار المتطلبة لدراسة ميدانية أو تقنية."
                    : "Allows the facility to execute operational services as needed without a fixed subscription, with cost approval before execution for each request independently to ensure full cost transparency. Fees may apply for quotes requiring site or technical studies."}
                </p>
              </div>
              <div className="bg-white border border-amber-100 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">📋</span>
                  <h4 className="font-bold text-gray-900 text-sm">{ar ? "الاشتراك التشغيلي الشهري" : "Monthly Operational Subscription"}</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {ar
                    ? "تشمل خدمات الاشتراك إعداد عروض الأسعار والدراسات التشغيلية والتنسيق الفني ضمن نطاق خدمات المتابعة المستمرة دون رسوم إضافية على إعداد العروض. المنشآت المشتركة تستفيد من أولوية الاستجابة ومدير حساب مخصص."
                    : "Subscription services include quote preparation, operational studies, and technical coordination within the scope of continuous follow-up services — without additional fees for quote preparation. Subscribed facilities benefit from priority response and a dedicated account manager."}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Vendor Protection */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="bg-primary/5 border border-primary/20 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <ShieldCheck size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{ar ? "حماية الموردين وإدارة التنسيق" : "Vendor Protection & Coordination Management"}</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {ar
                ? "تحتفظ منصة GSS بحق إدارة التنسيق مع الموردين المعتمدين لديها، ولا يتم الإفصاح عن بيانات المورد قبل اعتماد التكلفة وإصدار أمر العمل، باعتبار ذلك جزءًا من إجراءات إدارة الخدمة التشغيلية."
                : "GSS Platform retains the right to manage coordination with its certified vendors. Vendor information is not disclosed prior to cost approval and work order issuance, as this is part of the operational service management procedures."}
            </p>
          </motion.div>

          {/* Vendor Payment Terms Policy */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-slate-50 border border-slate-200 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center">
                <FileText size={20} className="text-slate-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{ar ? "سياسة آجال السداد مع الموردين المعتمدين" : "Payment Terms Policy with Certified Vendors"}</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {ar
                ? "تعتمد منصة GSS شبكة موردين معتمدين يتم الاتفاق معهم مسبقًا على شروط السداد وفق سياسات تشغيلية واضحة تشمل مدد سداد مختلفة حسب طبيعة الخدمة ونوع المشروع. وعند استلام طلب خدمة، تقوم GSS باختيار المورد المناسب بناءً على توافق شروط التنفيذ وآجال السداد المعتمدة لدى المنشأة مع سياسات المورد. ولا يتم إصدار أمر العمل إلا بعد التأكد من توافق شروط الدفع بين الطرفين."
                : "GSS Platform operates a certified vendor network with pre-agreed payment terms according to clear operational policies covering varying payment periods based on the nature of the service and project type. When a request is received, GSS selects the appropriate vendor based on alignment between the execution terms and the facility's approved payment policy and the vendor's terms. A work order is only issued after confirming payment term compatibility between both parties."}
            </p>
          </motion.div>

          {/* Facility's Existing Vendors */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }} className="bg-blue-50 border border-blue-100 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Info size={20} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{ar ? "إدارة الموردين الحاليين لدى المنشأة" : "Managing the Facility's Existing Vendors"}</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              {ar
                ? "في حال رغبت المنشأة بالاستمرار مع مورديها الحاليين، تقوم منصة GSS بإدارة ومتابعة تنفيذ الطلبات التشغيلية معهم وفق نطاق الخدمة المتفق عليه، دون أن تكون طرفًا ماليًا في العلاقة التعاقدية بينهم."
                : "If a facility wishes to continue with its existing vendors, GSS Platform manages and follows up on operational request execution with them according to the agreed service scope — without being a financial party in the contractual relationship between them."}
            </p>
            <div className="bg-white border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
              {ar
                ? "تبقى مسؤولية السداد مباشرة بين المنشأة والمورد، بينما يقتصر دور المنصة على التنسيق والمتابعة التشغيلية وإصدار تقارير الإنجاز."
                : "Payment responsibility remains directly between the facility and the vendor. The platform's role is limited to operational coordination, follow-up, and issuing completion reports."}
            </div>
          </motion.div>

          {/* Vendor Matching by Payment Terms */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="bg-green-50 border border-green-100 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 size={20} className="text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{ar ? "اختيار المورد وفق سياسة السداد المعتمدة" : "Vendor Selection Based on Approved Payment Policy"}</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {ar
                ? "تقوم منصة GSS باختيار المورد المناسب لكل طلب خدمة بناءً على معايير متكاملة:"
                : "GSS Platform selects the appropriate vendor for each service request based on comprehensive criteria:"}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {(ar ? [
                "طبيعة الخدمة",
                "سرعة التنفيذ",
                "الموقع الجغرافي",
                "مستوى الجودة",
                "شروط السداد المعتمدة",
                "تاريخ الأداء التشغيلي",
              ] : [
                "Nature of Service",
                "Execution Speed",
                "Geographic Location",
                "Quality Level",
                "Approved Payment Terms",
                "Operational Performance History",
              ]).map((item, i) => (
                <div key={i} className="bg-white border border-green-100 rounded-lg px-3 py-2 flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-green-500 flex-shrink-0" />
                  <span className="text-xs font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-white border border-green-200 rounded-xl px-4 py-3 text-xs text-green-800">
              {ar
                ? "عند اعتماد المنشأة لسياسة سداد محددة (30 أو 60 أو 90 يوم)، يتم ترشيح الموردين القادرين على العمل وفق نفس شروط الدفع فقط — مما يحمي الطرفين ويضمن استمرار التشغيل دون خلافات مالية."
                : "When a facility adopts a specific payment policy (Net 30, 60, or 90 days), only vendors capable of working under the same payment terms are nominated — protecting both parties and ensuring continuous operations without financial disputes."}
            </div>
          </motion.div>

          {/* GSS not a Financial Intermediary */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }} className="bg-amber-50 border border-amber-200 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <AlertCircle size={20} className="text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{ar ? "GSS ليست طرفًا ماليًا في عمليات السداد" : "GSS is Not a Financial Party in Payment Transactions"}</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {ar
                ? "لا تكون منصة GSS طرفًا ماليًا في عمليات السداد بين المنشأة والمورد. يقتصر دور المنصة على إدارة الطلبات التشغيلية والتنسيق والمتابعة حتى إغلاق الخدمة وفق المعايير المعتمدة. تُصدر GSS فاتورة منفصلة لرسوم إدارة الخدمة — وهي مستقلة تمامًا عن فواتير الموردين المنفذين."
                : "GSS Platform is not a financial party in payment transactions between the facility and the vendor. The platform's role is limited to operational request management, coordination, and follow-up until service closure per approved standards. GSS issues a separate invoice for its service management fees — entirely independent of the executing vendors' invoices."}
            </p>
          </motion.div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center bg-gray-50 border-t border-gray-100">
        <p className="text-gray-500 mb-6 text-base">
          {ar ? "جاهزون للبدء؟ اختاروا نموذج الخدمة المناسب وسجّلوا منشأتكم." : "Ready to start? Choose your service model and register your facility."}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/register/company">
            <Button size="lg" className="h-14 px-10 text-lg font-bold">
              {ar ? "سجّل منشأتكم" : "Register Your Facility"} <ArrowLeft className="mr-2" size={18} />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold border-primary text-primary hover:bg-primary hover:text-white">
              {ar ? "نماذج التعاقد" : "Pricing Models"}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
