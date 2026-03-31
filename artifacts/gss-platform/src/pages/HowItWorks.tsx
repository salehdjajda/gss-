import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HowItWorks() {
  const { lang } = useLanguage();
  const ar = lang === "ar";

  const steps = ar ? [
    {
      num: "01",
      title: "إرسال الطلب",
      desc: "عبر لوحة تحكم المنشأة، يتم إرسال طلب الخدمة (صيانة، نظافة، IT، إلخ) مع توضيح التفاصيل والموقع وتحديد مستوى الأهمية."
    },
    {
      num: "02",
      title: "تحليل الاحتياج",
      desc: "يقوم فريق العمليات في GSS بمراجعة الطلب وفهم المتطلبات التقنية والمادية، وقد يتم التواصل للاستيضاح إن لزم الأمر."
    },
    {
      num: "03",
      title: "اختيار المورد",
      desc: "نعتمد على قاعدة بياناتنا الواسعة لإسناد الطلب للمورد أو الفني الأنسب والأعلى كفاءة والأقرب جغرافياً، ونتولى مفاوضة السعر."
    },
    {
      num: "04",
      title: "متابعة التنفيذ",
      desc: "يشرف فريقنا على التنفيذ خطوة بخطوة، نضمن التزام المورد بالوقت والجودة، ونبقي المنشأة على اطلاع بحالة الطلب حية."
    },
    {
      num: "05",
      title: "الإغلاق والتقارير",
      desc: "بعد التأكد من رضا العميل وإنجاز العمل، يُغلق الطلب وتُصدر تقارير أداء دورية توضح المصروفات وتفاصيل العمليات المنجزة."
    }
  ] : [
    {
      num: "01",
      title: "Submit Request",
      desc: "Through the facility dashboard, submit a service request (maintenance, cleaning, IT, etc.) with details, location, and priority level."
    },
    {
      num: "02",
      title: "Needs Analysis",
      desc: "GSS operations team reviews the request and understands technical and material requirements, reaching out for clarification if needed."
    },
    {
      num: "03",
      title: "Vendor Selection",
      desc: "We leverage our extensive database to assign the most suitable, highest-quality, and geographically closest vendor or technician, then negotiate pricing."
    },
    {
      num: "04",
      title: "Execution Monitoring",
      desc: "Our team oversees execution step by step, ensuring vendor compliance with time and quality standards, keeping the facility updated on request status."
    },
    {
      num: "05",
      title: "Closure & Reports",
      desc: "After confirming client satisfaction and work completion, the request is closed and periodic performance reports are issued showing expenditures and operation details."
    }
  ];

  return (
    <div className="pb-24">
      <section className="bg-primary py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {ar ? "آلية العمل في منصة GSS" : "How GSS Works"}
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            {ar
              ? "صممنا سير العمل ليكون شفافاً، موثوقاً، ويضمن التدخل البشري الخبير في كل مرحلة."
              : "We designed our workflow to be transparent, reliable, and ensure expert human involvement at every stage."}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute top-0 bottom-0 right-12 w-0.5 bg-gray-200 hidden md:block"></div>

          <div className="space-y-16 relative">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-8 items-start"
              >
                <div className="flex-shrink-0 w-24 h-24 bg-white border-4 border-secondary text-secondary rounded-full flex items-center justify-center font-bold text-3xl shadow-lg relative z-10 mx-auto md:mx-0">
                  {step.num}
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex-1 relative md:mt-2">
                  <div className="absolute top-10 -right-3 w-6 h-6 bg-white border-t border-r border-gray-100 transform rotate-45 hidden md:block"></div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 text-center">
        <Link href="/register/company">
          <Button size="lg" className="h-14 px-10 text-lg font-bold">
            {ar ? "ابدأ تجربتك الآن" : "Get Started Today"}
          </Button>
        </Link>
      </section>
    </div>
  );
}
