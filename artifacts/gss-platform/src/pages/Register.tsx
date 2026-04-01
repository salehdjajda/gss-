import { motion } from "framer-motion";
import { Link } from "wouter";
import { Building2, Briefcase, UserCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Register() {
  const clientOptions = [
    {
      title: "فرد",
      desc: "سجّل كفرد واطلب خدماتك التشغيلية (صيانة، نظافة، IT وغيرها) بسهولة.",
      icon: User,
      link: "/register/individual",
      btnText: "تسجيل كفرد",
      highlight: false,
    },
    {
      title: "منشأة",
      desc: "سجّل منشأتك لتنظيم وإدارة عملياتك التشغيلية بالكامل عبر نقطة اتصال واحدة.",
      icon: Building2,
      link: "/register/company",
      btnText: "تسجيل كمنشأة",
      highlight: true,
    },
  ];

  const partnerOptions = [
    {
      title: "مقدم خدمة (مورد)",
      desc: "انضم لشبكة الموردين المعتمدين واحصل على طلبات أعمال مستمرة.",
      icon: Briefcase,
      link: "/register/vendor",
      btnText: "انضم كمورد",
    },
    {
      title: "شريك نجاح (مستشار)",
      desc: "استثمر خبرتك وعلاقاتك في قطاع العمليات وحقق عوائد مجزية.",
      icon: UserCircle,
      link: "/register/consultant",
      btnText: "انضم كمستشار",
    },
  ];

  return (
    <div className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-primary mb-4">التسجيل في منصة GSS</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            اختر نوع الحساب الذي يناسبك للبدء في استخدام المنصة.
          </p>
        </div>

        {/* Client accounts */}
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">
          أنت تريد طلب خدمة
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
          {clientOptions.map((opt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white rounded-3xl p-8 shadow-sm border flex flex-col items-center text-center hover:shadow-md transition-shadow ${
                opt.highlight ? "border-primary/30 ring-1 ring-primary/10" : "border-gray-100"
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${
                opt.highlight ? "bg-primary text-white" : "bg-primary/5 text-primary"
              }`}>
                <opt.icon size={32} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{opt.title}</h2>
              <p className="text-gray-500 text-sm mb-6 flex-1 leading-relaxed">{opt.desc}</p>
              <Link href={opt.link} className="w-full">
                <Button
                  className="w-full h-11 text-base font-bold"
                  variant={opt.highlight ? "default" : "outline"}
                  data-testid={`register-card-${opt.title}`}
                >
                  {opt.btnText}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Partner accounts */}
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">
          أنت تريد الانضمام كشريك
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {partnerOptions.map((opt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mb-4">
                <opt.icon size={28} />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">{opt.title}</h2>
              <p className="text-gray-500 text-sm mb-5 flex-1 leading-relaxed">{opt.desc}</p>
              <Link href={opt.link} className="w-full">
                <Button className="w-full h-10 font-bold" variant="outline" data-testid={`register-card-${opt.title}`}>
                  {opt.btnText}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
