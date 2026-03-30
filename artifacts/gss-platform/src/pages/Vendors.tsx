import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Star, Briefcase, CalendarClock, Shield, Award } from "lucide-react";

export default function Vendors() {
  const benefits = [
    {
      icon: Briefcase,
      title: "تدفق مستمر للعمل",
      desc: "احصل على طلبات مستمرة من منشآت وشركات موثوقة دون الحاجة للبحث عن عملاء."
    },
    {
      icon: Shield,
      title: "ضمان الحقوق",
      desc: "نحن نضمن مستحقاتك المالية بمجرد إتمام العمل وفق المعايير المتفق عليها."
    },
    {
      icon: CalendarClock,
      title: "دفعات منتظمة",
      desc: "نظام مالي مستقر يضمن لك تسديد الدفعات في أوقاتها المحددة."
    },
    {
      icon: Award,
      title: "بيئة احترافية",
      desc: "العمل مع منشآت محترفة وواضحة المتطلبات تحت إشراف فريقنا الهندسي."
    },
    {
      icon: Star,
      title: "تقييم عادل",
      desc: "نظام تقييم مبني على جودة العمل، المورد المتميز يحصل على حصة أكبر من الطلبات."
    }
  ];

  return (
    <div className="pb-24">
      <section className="bg-primary py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">انضم لشبكة الموردين المعتمدين</h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            نبحث عن شركاء يتميزون بالجودة والالتزام لتقديم خدماتهم لأكبر المنشآت.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">لماذا تنضم كـ مورد في GSS؟</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-gray-50 border border-gray-100"
              >
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-10 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-2/3">
              <h3 className="text-3xl font-bold mb-4">هل أنت مستعد لزيادة حجم أعمالك؟</h3>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                سجل الآن في شبكة الموردين. سيقوم فريقنا بمراجعة طلبك والتواصل معك لاستكمال إجراءات الاعتماد.
              </p>
              <ul className="space-y-3 mb-8">
                {['شركات صيانة ونظافة', 'مؤسسات مقاولات', 'مزودي خدمات تقنية', 'فنيين مستقلين معتمدين'].map((item, i) => (
                  <li key={i} className="flex items-center text-slate-200">
                    <CheckCircle2 className="text-secondary ml-3" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/register/vendor">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-bold h-14 px-10 text-lg">
                  سجل كمورد الآن
                </Button>
              </Link>
            </div>
            <div className="md:w-1/3 flex justify-center">
               <div className="w-full max-w-[300px] aspect-square bg-slate-800 rounded-full flex items-center justify-center p-8 border-4 border-slate-700">
                 <Briefcase size={80} className="text-secondary opacity-80" />
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
