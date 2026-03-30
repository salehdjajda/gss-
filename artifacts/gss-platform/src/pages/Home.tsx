import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Wrench, Briefcase, ChartLine, ShieldCheck, Clock, Coins, CheckCircle2 } from "lucide-react";

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-primary pt-24 pb-32 lg:pt-32 lg:pb-40 overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/100"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              مدير العمليات الخارجي لخدمات منشأتكم التشغيلية
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              نوفر للمنشآت نقطة اتصال واحدة لإدارة جميع الخدمات التشغيلية اليومية بفعالية. نحن لسنا مجرد وسيط، بل ندير العمليات، ونضمن الجودة، ونوفر التكاليف.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register/company">
                <Button size="lg" className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-primary font-bold h-14 px-8 text-lg" data-testid="hero-btn-company">
                  أنا منشأة
                </Button>
              </Link>
              <Link href="/register/vendor">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg text-white border-white hover:bg-white/10" data-testid="hero-btn-vendor">
                  أنا مقدم خدمة (مورد)
                </Button>
              </Link>
              <Link href="/register/consultant">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto h-14 px-8 text-lg text-slate-300 hover:text-white hover:bg-white/5" data-testid="hero-btn-consultant">
                  أنا مستشار تشغيلي
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What GSS Offers */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">ماذا تقدم GSS للمنشآت؟</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">منظومة متكاملة لرفع كفاءة التشغيل وخفض التكاليف الإدارية.</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: ShieldCheck, title: "نقطة اتصال واحدة", desc: "ندير جميع موردي الخدمات بدلاً عنك، لا حاجة للتواصل مع عشرات الجهات." },
              { icon: Coins, title: "تحسين التكاليف", desc: "نحلل المصروفات ونكتشف فرص التوفير دون المساس بجودة الخدمة." },
              { icon: CheckCircle2, title: "ضمان الجودة", desc: "فريقنا يتابع التنفيذ ويتأكد من إنجاز العمل حسب المعايير المتفق عليها." },
              { icon: ChartLine, title: "تقارير أداء", desc: "تقارير دورية شفافة توضح الأداء المالي والتشغيلي للموردين." },
              { icon: Clock, title: "توفير الوقت", desc: "تفريغ فريقك للتركيز على النشاط الأساسي للمنشأة بدلاً من المتابعة." },
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-6">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-primary mb-6">كيف تعمل المنصة؟</h2>
              <p className="text-gray-600 mb-10 text-lg">آلية عمل سلسة وموثوقة لضمان تنفيذ طلباتكم بأعلى جودة.</p>
              
              <div className="space-y-8">
                {[
                  { step: "1", title: "إرسال الطلب", desc: "ترفع المنشأة طلب الصيانة أو الخدمة عبر المنصة." },
                  { step: "2", title: "تحليل الاحتياج", desc: "يقوم فريقنا بفهم المتطلبات الدقيقة للخدمة." },
                  { step: "3", title: "اختيار المورد", desc: "نسند المهمة لأفضل مورد معتمد ومناسب." },
                  { step: "4", title: "متابعة التنفيذ", desc: "نشرف على سير العمل حتى إتمامه بنجاح." },
                  { step: "5", title: "إصدار التقارير", desc: "نقدم تقرير إنجاز وفاتورة موحدة للمنشأة." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-xl border border-secondary/20">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf" alt="Office environment" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-primary/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-primary py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">جاهز لتنظيم عملياتك التشغيلية؟</h2>
          <p className="text-xl text-primary-foreground/80 mb-10">انضم إلى مئات المنشآت التي تثق في GSS لإدارة عملياتها اليومية.</p>
          <Link href="/register/company">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-bold h-14 px-10 text-lg">
              سجل منشأتك الآن
              <ArrowLeft className="ml-2 mr-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
