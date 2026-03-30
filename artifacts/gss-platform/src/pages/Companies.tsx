import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Building2, ShieldCheck, Target, TrendingUp, CheckSquare, Clock } from "lucide-react";

export default function Companies() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "إدارة شاملة وموثوقة",
      desc: "نحن ندير كل التفاصيل التشغيلية مع الموردين بالنيابة عنكم لضمان راحة بالكم."
    },
    {
      icon: TrendingUp,
      title: "خفض التكاليف",
      desc: "من خلال تقييماتنا المستمرة وعقودنا الذكية، نساعدكم على تحقيق كفاءة إنفاق عالية."
    },
    {
      icon: CheckSquare,
      title: "جودة معيارية",
      desc: "نضمن تطبيق معايير الجودة في جميع الخدمات المسندة لموردين معتمدين لدينا."
    },
    {
      icon: Target,
      title: "التركيز على الأساسيات",
      desc: "ركزوا على تنمية أعمالكم الأساسية واتركوا مهام الصيانة والنظافة والتشغيل علينا."
    },
    {
      icon: Clock,
      title: "سرعة الاستجابة",
      desc: "متابعة فورية للطلبات الطارئة والروتينية لضمان عدم توقف عمليات منشأتكم."
    },
    {
      icon: Building2,
      title: "فاتورة موحدة",
      desc: "وداعاً لفواتير الموردين المتعددة، تحصلون على فاتورة شهرية واحدة مبسطة ومفصلة."
    }
  ];

  return (
    <div className="pb-24">
      {/* Header */}
      <section className="bg-primary py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">كيف تساعد GSS منشأتكم؟</h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            الشريك التشغيلي الذي يتحمل عنكم عبء إدارة العمليات اليومية لتركزوا على نمو أعمالكم.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6">
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">مستعدون لتحويل نموذج تشغيل منشأتكم؟</h2>
          <p className="text-gray-600 mb-10 text-lg">انضموا الآن وابدأوا في توفير الوقت والجهد والموارد.</p>
          <Link href="/register/company">
            <Button size="lg" className="h-14 px-10 text-lg font-bold">
              تسجيل المنشأة
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
