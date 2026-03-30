import { motion } from "framer-motion";
import { Link } from "wouter";
import { Building2, Briefcase, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Register() {
  const options = [
    {
      title: "منشأة",
      desc: "سجل منشأتك لتنظيم وإدارة عملياتك التشغيلية وتوفير التكاليف.",
      icon: Building2,
      link: "/register/company",
      btnText: "تسجيل كمنشأة"
    },
    {
      title: "مقدم خدمة (مورد)",
      desc: "انضم لشبكة الموردين المعتمدين واحصل على طلبات أعمال مستمرة.",
      icon: Briefcase,
      link: "/register/vendor",
      btnText: "انضم كمورد"
    },
    {
      title: "شريك نجاح (مستشار)",
      desc: "استثمر خبرتك وعلاقاتك في قطاع العمليات وحقق عوائد مجزية.",
      icon: UserCircle,
      link: "/register/consultant",
      btnText: "انضم كمستشار"
    }
  ];

  return (
    <div className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">التسجيل في منصة GSS</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            اختر نوع الحساب الذي يناسب طبيعة عملك للبدء.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {options.map((opt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow"
            >
              <div className="w-20 h-20 bg-primary/5 text-primary rounded-full flex items-center justify-center mb-6">
                <opt.icon size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{opt.title}</h2>
              <p className="text-gray-500 mb-8 flex-1">{opt.desc}</p>
              
              <Link href={opt.link} className="w-full">
                <Button className="w-full h-12 text-base font-bold" variant="outline" data-testid={`register-card-${opt.title}`}>
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
