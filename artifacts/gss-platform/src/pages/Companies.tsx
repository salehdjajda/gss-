import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  TrendingDown,
  Users,
  RefreshCcw,
  Network,
  BarChart3,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

export default function Companies() {
  const benefits = [
    {
      number: "01",
      icon: ShieldCheck,
      title: "توفير الوقت الإداري",
      desc: "إدارة جميع الخدمات التشغيلية عبر نقطة اتصال واحدة بدلاً من التواصل مع عدة موردين ومتابعة التنفيذ بشكل يومي.",
      result: "تقليل العبء التشغيلي على الإدارات الداخلية",
      details: [
        "قناة طلب واحدة لجميع الخدمات",
        "فريق GSS يتابع التنفيذ نيابةً عنكم",
        "تقارير حالة لحظية دون مجهود",
      ],
    },
    {
      number: "02",
      icon: TrendingDown,
      title: "تقليل التكاليف التشغيلية غير المباشرة",
      desc: "نساعد منشأتكم على تقليل المصروفات الناتجة عن تعدد الموردين، وضعف التنسيق، وتفاوت الأسعار، وعدم وضوح مستوى الخدمة، وتكرار تنفيذ الأعمال.",
      result: "ترشيد الإنفاق التشغيلي بصورة مستدامة",
      details: [
        "مقارنة أسعار السوق لكل خدمة",
        "اكتشاف فرص التوفير في المصروفات",
        "تجنب التكاليف الناتجة عن إعادة التنفيذ",
      ],
    },
    {
      number: "03",
      icon: Users,
      title: "العمل كفريق تشغيل خارجي لمنشأتكم",
      desc: "تعمل منصة GSS كامتداد لفريقكم الداخلي دون الحاجة إلى توظيف فريق متابعة وتشغيل مستقل.",
      result: "توفير تكاليف التوظيف والإدارة الداخلية",
      details: [
        "دون توظيف مدير تشغيل",
        "دون توظيف مشرف مرافق",
        "دون توظيف منسق خدمات أو متابع موردين",
      ],
    },
    {
      number: "04",
      icon: RefreshCcw,
      title: "الاستمرار مع الموردين الحاليين دون تغييرهم",
      desc: "يمكن لمنشأتكم الاستمرار في العمل مع مورديكم الحاليين بينما تتولى منصة GSS تنظيم التنفيذ وتحسين المتابعة ورفع جودة الأداء.",
      result: "لا تغيير في العلاقات التعاقدية القائمة",
      details: [
        "تنظيم التنفيذ ومتابعة الأداء",
        "تحليل الأسعار مقارنةً بالسوق",
        "تحسين جودة الخدمة المقدمة",
      ],
    },
    {
      number: "05",
      icon: Network,
      title: "توفير بدائل تشغيلية أفضل عند الحاجة",
      desc: "في حال ارتفاع التكلفة أو انخفاض الجودة لدى أحد الموردين، توفر المنصة شبكة موردين معتمدين كبدائل مناسبة دون تعطيل الأعمال.",
      result: "استمرارية التشغيل في جميع الأوقات",
      details: [
        "شبكة موردين معتمدين في مختلف المجالات",
        "تغيير سلس دون تعطيل العمليات",
        "أفضل قيمة مقابل التكلفة",
      ],
    },
    {
      number: "06",
      icon: BarChart3,
      title: "تقارير تشغيلية تساعد في اتخاذ القرار",
      desc: "توفر منصة GSS تقارير تشغيلية دورية تساعد الإدارات على متابعة الأداء وتحليل المصروفات التشغيلية واكتشاف فرص التوفير.",
      result: "رؤية واضحة وشفافة لكل ريال ينفق",
      details: [
        "متابعة الأداء ومؤشرات الجودة",
        "تحليل المصروفات وفرص التوفير",
        "قرارات تشغيلية مبنية على بيانات",
      ],
    },
  ];

  return (
    <div className="pb-24">
      {/* Header */}
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            كيف تساعد منصة GSS منشأتكم؟
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            نساعد منشأتكم على تقليل التكاليف التشغيلية وتحسين كفاءة إدارة الخدمات اليومية دون الحاجة إلى توظيف فريق تشغيل داخلي.
          </p>
        </div>
      </section>

      {/* Intro text */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            تعمل منصة GSS كمدير عمليات خارجي يدعم منشأتكم في تنظيم الطلبات التشغيلية ومتابعة الموردين وتحليل المصروفات التشغيلية واقتراح الحلول البديلة الأكثر كفاءة، بما يساهم في تقليل التكاليف وتحسين جودة التنفيذ.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="p-8 grid md:grid-cols-3 gap-8 items-start">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl font-black text-primary/10">{benefit.number}</span>
                      <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                        <benefit.icon size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">{benefit.desc}</p>
                    <div className="inline-flex items-center gap-2 text-secondary font-semibold text-sm bg-secondary/5 rounded-lg px-4 py-2">
                      <CheckCircle2 size={16} />
                      {benefit.result}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">يشمل ذلك:</p>
                    <ul className="space-y-2">
                      {benefit.details.map((detail, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Operational Reports Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                نساعدكم على اكتشاف فرص التوفير وتحسين المصروفات التشغيلية
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                لا تقتصر تقارير منصة GSS على متابعة الطلبات فقط، بل تساعد منشأتكم على تحليل المصروفات التشغيلية واكتشاف فرص التوفير واقتراح حلول بديلة أكثر كفاءة.
              </p>
              <p className="text-secondary font-bold text-lg">
                نعمل كشريك تشغيل داعم يساعدكم على اتخاذ قرارات تشغيلية أفضل على المدى الطويل.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                "تحليل المصروفات التشغيلية",
                "اكتشاف فرص التوفير",
                "اقتراح حلول بديلة أكثر كفاءة",
                "تحسين اختيار الموردين",
                "دعم اتخاذ القرار الإداري",
                "تقارير دورية شاملة",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-slate-800 rounded-xl px-4 py-3"
                >
                  <CheckCircle2 size={16} className="text-secondary flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            مستعدون لتحويل نموذج تشغيل منشأتكم؟
          </h2>
          <p className="text-gray-600 mb-10 text-lg leading-relaxed">
            سجّل منشأتكم الآن وسيقوم فريق GSS بدراسة احتياجاتكم التشغيلية واقتراح النموذج الأنسب لكم.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register/company">
              <Button
                size="lg"
                className="h-14 px-10 text-lg font-bold"
                data-testid="cta-register-company"
              >
                سجل منشأتك الآن
                <ArrowLeft className="mr-2" size={20} />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-10 text-lg border-primary text-primary hover:bg-primary hover:text-white"
                data-testid="link-how-it-works"
              >
                استكشف آلية العمل
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
