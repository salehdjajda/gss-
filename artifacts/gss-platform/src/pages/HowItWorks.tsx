import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function HowItWorks() {
  const { lang } = useLanguage();
  const ar = lang === "ar";

  const steps = ar ? [
    {
      num: "01",
      title: "توقيع العقد",
      desc: "تبدأ الرحلة بتوقيع عقد تشغيل بين منشأتكم وGSS، يحدد نطاق الخدمات المطلوبة والشروط المالية المتفق عليها — Pay Per Request أو Managed Monthly Package.",
      badge: "بداية العلاقة",
    },
    {
      num: "02",
      title: "تفعيل حساب المنشأة",
      desc: "يتم إعداد حساب المنشأة داخل منصة GSS وربطه ببيانات الفروع والمواقع، واختيار مدير الحساب المخصص المسؤول عن متابعة عمليات منشأتكم.",
      badge: "الإعداد",
    },
    {
      num: "03",
      title: "إضافة المستخدمين المفوضين",
      desc: "تُحدد المنشأة المستخدمين المخولين برفع الطلبات واعتماد إغلاقها داخل المنصة، مما يضمن الرقابة الكاملة على دورة الطلبات التشغيلية.",
      badge: "الصلاحيات",
    },
    {
      num: "04",
      title: "رفع الطلب",
      desc: "يرفع المستخدم المفوض طلب الخدمة عبر بوابة العميل أو الجوال أو واتساب أو الكول سنتر — مع تحديد نوع الخدمة والموقع ومستوى الأولوية.",
      badge: "الطلب",
    },
    {
      num: "05",
      title: "إصدار أمر العمل",
      desc: "يتولى فريق GSS مراجعة الطلب وفهم المتطلبات التشغيلية وإصدار أمر عمل رسمي يوثّق نطاق الخدمة المطلوبة وجدول التنفيذ.",
      badge: "التوثيق",
    },
    {
      num: "06",
      title: "تحويل الطلب للمورد المناسب",
      desc: "يختار فريق GSS المورد الأنسب من شبكة الموردين المعتمدين بناءً على نوع الطلب والموقع الجغرافي وتقييم الأداء السابق وأفضل سعر متاح.",
      badge: "الاختيار",
    },
    {
      num: "07",
      title: "تنفيذ الخدمة",
      desc: "يشرف فريق GSS على التنفيذ الكامل ويتابع الالتزام بالجودة والوقت المحدد، مع إبقاء المنشأة على اطلاع دائم بحالة الطلب.",
      badge: "التنفيذ",
    },
    {
      num: "08",
      title: "اعتماد الاستلام من العميل",
      desc: "بعد اكتمال التنفيذ، يعتمد المستخدم المفوض في المنشأة استلام الخدمة والتأكيد على مطابقتها للمتطلبات قبل إغلاق الطلب رسمياً.",
      badge: "الاعتماد",
    },
    {
      num: "09",
      title: "إغلاق الطلب",
      desc: "يُغلق الطلب رسمياً داخل المنصة بعد اعتماد العميل، ويُوثّق كاملاً ضمن سجل العمليات التشغيلية للمنشأة للرجوع إليه في أي وقت.",
      badge: "الإغلاق",
    },
    {
      num: "10",
      title: "إدراج الخدمة ضمن الفاتورة الشهرية",
      desc: "تُدرج جميع الخدمات المنفذة خلال الشهر ضمن فاتورة موحدة واضحة تُرسل للمنشأة مع تقرير تشغيلي شامل يوضح كل ما تم تنفيذه.",
      badge: "الفوترة",
    },
  ] : [
    {
      num: "01",
      title: "Contract Signing",
      desc: "The journey begins with signing an operations contract between your facility and GSS, defining the scope of required services and agreed financial terms — Pay Per Request or Managed Monthly Package.",
      badge: "Relationship Start",
    },
    {
      num: "02",
      title: "Facility Account Activation",
      desc: "Your facility's account is set up within the GSS platform and linked to branch and location data, with a dedicated account manager assigned to follow up on your facility's operations.",
      badge: "Setup",
    },
    {
      num: "03",
      title: "Add Authorized Users",
      desc: "The facility designates authorized users who can submit requests and approve closures within the platform, ensuring full control over the operational request cycle.",
      badge: "Permissions",
    },
    {
      num: "04",
      title: "Request Submission",
      desc: "The authorized user submits a service request via the client portal, mobile app, WhatsApp, or call center — specifying service type, location, and priority level.",
      badge: "Request",
    },
    {
      num: "05",
      title: "Work Order Issuance",
      desc: "The GSS team reviews the request, understands the operational requirements, and issues an official work order documenting the required service scope and execution schedule.",
      badge: "Documentation",
    },
    {
      num: "06",
      title: "Routing to the Right Vendor",
      desc: "The GSS team selects the most suitable vendor from the certified network based on request type, geographic location, past performance rating, and best available price.",
      badge: "Selection",
    },
    {
      num: "07",
      title: "Service Execution",
      desc: "The GSS team oversees full execution and monitors quality and time compliance, keeping the facility consistently informed of the request status.",
      badge: "Execution",
    },
    {
      num: "08",
      title: "Client Acceptance Approval",
      desc: "After execution is complete, the facility's authorized user approves service receipt and confirms it meets requirements before the request is officially closed.",
      badge: "Approval",
    },
    {
      num: "09",
      title: "Request Closure",
      desc: "The request is officially closed within the platform after client approval, and fully documented within the facility's operational records for reference at any time.",
      badge: "Closure",
    },
    {
      num: "10",
      title: "Included in Monthly Invoice",
      desc: "All services executed during the month are included in a clear, unified invoice sent to the facility along with a comprehensive operational report detailing everything completed.",
      badge: "Billing",
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
                <div className="flex-shrink-0 w-24 h-24 bg-white border-4 border-secondary text-secondary rounded-full flex items-center justify-center font-bold text-3xl shadow-lg relative z-10 mx-auto md:mx-0">
                  {step.num}
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex-1 relative md:mt-2">
                  <div className="absolute top-10 -right-3 w-6 h-6 bg-white border-t border-r border-gray-100 transform rotate-45 hidden md:block" />
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    <span className="text-xs font-bold bg-secondary/15 text-secondary px-2.5 py-1 rounded-full">{step.badge}</span>
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Banner */}
      <section className="py-12 bg-primary/5 border-t border-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-primary/15 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-5 text-center">
              {ar ? "الدورة التشغيلية بالخلاصة" : "The Operational Cycle in Summary"}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium">
              {(ar
                ? ["توقيع العقد", "تفعيل الحساب", "المستخدمون المفوضون", "رفع الطلب", "أمر عمل", "تحويل للمورد", "التنفيذ", "اعتماد الاستلام", "إغلاق الطلب", "الفاتورة الشهرية"]
                : ["Contract Signing", "Account Activation", "Authorized Users", "Request Submission", "Work Order", "Vendor Routing", "Execution", "Client Approval", "Request Closure", "Monthly Invoice"]
              ).map((step, i, arr) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg">{step}</span>
                  {i < arr.length - 1 && <span className="text-primary font-bold">←</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center bg-white">
        <p className="text-gray-500 mb-6 text-base">
          {ar ? "جاهزون للبدء؟ سجّلوا منشأتكم وسيتواصل معكم فريقنا." : "Ready to start? Register your facility and our team will contact you."}
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
