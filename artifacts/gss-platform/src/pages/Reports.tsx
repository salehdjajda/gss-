import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PieChart, BarChart3, LineChart, FileText } from "lucide-react";

export default function Reports() {
  const reports = [
    {
      icon: PieChart,
      title: "تحليل المصروفات",
      desc: "تقارير تفصيلية توضح أين يتم إنفاق الميزانية التشغيلية، موزعة حسب الأقسام ونوع الخدمات للتحكم الأمثل في التدفق المالي."
    },
    {
      icon: LineChart,
      title: "اكتشاف فرص التوفير",
      desc: "تحليل مقارن للموردين والأسعار لتقديم توصيات مدعومة بالبيانات لخفض التكاليف المستمرة دون التضحية بالجودة."
    },
    {
      icon: BarChart3,
      title: "أداء الموردين",
      desc: "تقييم أداء الفنيين ومقدمي الخدمات بناءً على سرعة الاستجابة، جودة العمل، والالتزام بالوقت."
    },
    {
      icon: FileText,
      title: "دعم القرار الإداري",
      desc: "ملخصات تنفيذية دورية مجهزة خصيصاً للإدارة العليا تساعد في اتخاذ قرارات استراتيجية مبنية على حقائق وأرقام."
    }
  ];

  return (
    <div className="pb-24">
      <section className="bg-primary py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">التقارير التشغيلية الذكية</h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            البيانات هي النفط الجديد. في GSS نترجم عملياتك اليومية إلى رؤى استراتيجية.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-slate-50 p-10 rounded-3xl flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">لماذا التقارير التشغيلية مهمة؟</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                غالباً ما تفقد المنشآت السيطرة على مصروفات الصيانة والنظافة وغيرها من العمليات بسبب تعدد الموردين وعدم وجود مركزية في حفظ البيانات.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                منصة GSS تجمع كل هذه البيانات وتصدر لك تقارير ديناميكية شفافة تغنيك عن العمل اليدوي في الإكسيل، وتضع الحقائق أمامك لاتخاذ قرار سليم.
              </p>
            </div>
            <div className="bg-primary/5 rounded-3xl p-10 flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" alt="Data Analysis" className="rounded-2xl shadow-lg" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reports.map((report, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mb-4">
                  <report.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{report.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{report.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="text-center pb-12">
          <Link href="/register/company">
            <Button size="lg" className="h-14 px-10 text-lg font-bold">احصل على تقاريرك الآن</Button>
          </Link>
      </div>
    </div>
  );
}
