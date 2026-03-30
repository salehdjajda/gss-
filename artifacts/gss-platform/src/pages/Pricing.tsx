import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      title: "الدفع حسب الطلب",
      desc: "مناسب للمنشآت ذات الطلبات المتقطعة.",
      price: "رسوم إدارة محددة",
      period: "لكل طلب",
      features: [
        "لا عمولات خفية",
        "تدفع تكلفة الخدمة الفعلية + رسوم إدارة GSS",
        "الوصول لشبكة الموردين المعتمدين",
        "متابعة التنفيذ وضمان الجودة"
      ],
      primary: false
    },
    {
      title: "الاشتراك التشغيلي",
      desc: "مناسب للمنشآت النشطة التي تتطلب متابعة مستمرة.",
      price: "اشتراك شهري",
      period: "أو سنوي",
      features: [
        "مدير حساب مخصص لمنشأتكم",
        "إعفاء من رسوم الإدارة على الطلبات الفردية",
        "تقارير تحليلية شهرية مفصلة",
        "أولوية قصوى في الاستجابة والتنفيذ",
        "تقييم دوري لاحتياجات المنشأة"
      ],
      primary: true
    },
    {
      title: "المشاريع والعقود الكبيرة",
      desc: "للمجمعات التجارية والشركات الكبرى.",
      price: "نسبة متفق عليها",
      period: "من حجم العقد",
      features: [
        "إدارة كاملة للعقود السنوية",
        "مناقصات مغلقة مع أفضل الموردين",
        "إدارة المشاريع التأسيسية للمنشأة",
        "هيكل تسعير مخصص يضمن التوفير"
      ],
      primary: false
    }
  ];

  return (
    <div className="pb-24">
      <section className="bg-primary py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">نموذج مالي شفاف وعادل</h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            نحن لا نأخذ عمولات من الموردين، بل نأخذ رسوم إدارة واضحة من المنشأة لنضمن أن مصلحتنا تكمن في توفير التكاليف عليك.
          </p>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-white rounded-3xl border ${plan.primary ? 'border-primary shadow-xl ring-1 ring-primary' : 'border-gray-200 shadow-sm'} overflow-hidden flex flex-col`}
              >
                {plan.primary && (
                  <div className="bg-primary text-white text-center py-2 text-sm font-bold tracking-wider">
                    الأكثر طلباً
                  </div>
                )}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                  <p className="text-gray-500 mb-6 text-sm min-h-[40px]">{plan.desc}</p>
                  
                  <div className="mb-8 pb-8 border-b border-gray-100">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 mr-2">/{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start">
                        <Check className="text-secondary ml-3 flex-shrink-0" size={20} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/register/company">
                    <Button 
                      variant={plan.primary ? "default" : "outline"} 
                      className="w-full h-12 text-base font-bold"
                    >
                      اختر هذه الباقة
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
