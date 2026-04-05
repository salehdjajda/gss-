import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ShieldCheck } from "lucide-react";

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
      desc: "تُحدد المنشأة المستخدمين المخولين برفع الطلبات واعتماد إغلاقها داخل المنصة، مما يضمن الرقابة الكاملة على دورة الطلبات التشغيلية.",
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
      desc: "يراجع فريق GSS الطلب ويُعدّ عرض التكلفة الشامل نيابةً عنكم — يشمل نطاق العمل والتكلفة التقديرية ومدة التنفيذ.",
      badge: "تقييم التكلفة",
      highlight: false,
    },
    {
      num: "06",
      title: "اعتماد التكلفة من المنشأة",
      desc: "يقوم الشخص المفوض لدى المنشأة باعتماد عرض التكلفة المقدم. بمجرد موافقتكم على التكلفة، يبدأ فريق GSS فوراً بتحريك الطلب للتنفيذ.",
      badge: "اعتماد إلزامي",
      highlight: true,
    },
    {
      num: "07",
      title: "إصدار أمر العمل",
      desc: "بعد الاعتماد، يُصدر فريق GSS أمر عمل رسمي يوثّق نطاق الخدمة وجدول التنفيذ. يبدأ فريق GSS بالتنسيق الكامل مع فريق التنفيذ لضمان انطلاق الخدمة في أسرع وقت.",
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
      desc: "The facility designates authorized users who can submit requests and approve closures within the platform, ensuring full control over the operational request cycle.",
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
      desc: "The GSS team reviews the request and prepares a comprehensive cost proposal on your behalf — covering scope of work, estimated cost, and execution timeline.",
      badge: "Cost Assessment",
      highlight: false,
    },
    {
      num: "06",
      title: "Cost Approval by the Facility",
      desc: "The authorized person at the facility approves the submitted cost proposal. Once you approve, the GSS team immediately moves the request into execution.",
      badge: "Mandatory Approval",
      highlight: true,
    },
    {
      num: "07",
      title: "Work Order Issuance",
      desc: "After approval, the GSS team issues an official work order documenting the service scope and execution schedule. The GSS team then begins full coordination with the execution team to ensure the service launches as quickly as possible.",
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
            <div className="text-center pt-2">
              <p className="text-sm text-gray-500">
                {ar ? "للاطلاع على السياسات والأحكام التشغيلية الكاملة: " : "For the full operational policies and terms: "}
                <Link href="/terms" className="text-primary font-medium underline underline-offset-2">
                  {ar ? "الشروط والأحكام" : "Terms & Conditions"}
                </Link>
              </p>
            </div>
          </div>
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
