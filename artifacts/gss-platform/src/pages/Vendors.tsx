import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Star,
  Briefcase,
  ShieldCheck,
  Award,
  ArrowLeft,
  TrendingUp,
  Users,
  Banknote,
} from "lucide-react";

export default function Vendors() {
  const benefits = [
    {
      icon: Briefcase,
      title: "استقبال طلبات عمل مباشرة",
      desc: "استقبل طلبات تشغيلية مباشرة من شركات ومنشآت متعددة في مختلف القطاعات داخل المملكة.",
    },
    {
      icon: Banknote,
      title: "لا عمولات على الخدمات اليومية",
      desc: "في الطلبات التشغيلية اليومية، لا يتم فرض أي عمولة على المورد. تقدّم سعرك للجهة المستفيدة بشفافية كاملة دون أي إضافة.",
    },
    {
      icon: TrendingUp,
      title: "فرص مشاريع أكبر",
      desc: "شارك في مشاريع تشغيلية أكبر من خلال المنصة بعد إبلاغك مسبقاً بآلية التسعير قبل الطرح.",
    },
    {
      icon: Star,
      title: "تقييم مهني وعادل",
      desc: "نظام تقييم مبني على جودة العمل والالتزام والسرعة. المورد المتميز يحصل على حصة أكبر من الطلبات.",
    },
    {
      icon: Users,
      title: "تسويق خدماتك داخل الشبكة",
      desc: "انضمامك لشبكة GSS يفتح لك أبواب التواصل مع شركات وعملاء جدد دون الحاجة للبحث المستقل.",
    },
    {
      icon: Award,
      title: "بيئة تشغيلية احترافية",
      desc: "العمل مع منشآت واضحة المتطلبات تحت إدارة وإشراف فريق GSS لضمان سير العمل بكل احترافية.",
    },
  ];

  return (
    <div className="pb-24">
      {/* Header */}
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            انضم إلى شبكة الموردين المعتمدين لدى منصة GSS
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            شبكة تشغيلية متخصصة تربطك مباشرةً بالشركات والمنشآت الباحثة عن شركاء تنفيذ موثوقين لتلبية احتياجاتها التشغيلية بشكل مستمر.
          </p>
        </div>
      </section>

      {/* Invitation Letter */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <ShieldCheck size={24} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-primary/60 uppercase tracking-wider">دعوة رسمية</p>
                <h2 className="text-xl font-bold text-primary">GSS Vendor Network Program</h2>
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              يسرّ منصة GSS – General Support Services دعوتكم للانضمام إلى شبكة الموردين والفنيين المعتمدين لديها، وهي شبكة تشغيلية متخصصة تربط الموردين مباشرة بالشركات والمنشآت الباحثة عن شركاء تنفيذ موثوقين.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              تعمل منصة GSS كمدير تشغيل خارجي لعدد من الشركات والمنشآت، حيث نقوم بإدارة طلباتهم التشغيلية اليومية وربطها مباشرة بشبكة الموردين المعتمدين لتنفيذها وفق أعلى معايير الجودة والكفاءة.
            </p>
            <p className="text-gray-600 leading-relaxed">
              يجري العمل حالياً على توسيع شبكة الموردين المعتمدين لتغطية الطلبات التشغيلية الحالية والمتزايدة لدى عملاء المنصة في مختلف القطاعات.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              مزايا الانضمام إلى شبكة GSS
            </h2>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-5">
                  <benefit.icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Financial Model Explanation */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">آلية العمل المالي داخل منصة GSS</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle2 size={24} className="text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-4">في الطلبات التشغيلية اليومية</h3>
              <p className="text-slate-300 leading-relaxed">
                تتحمل الشركة العميلة رسوم إدارة التشغيل بالكامل، ولا يتم فرض أي عمولة على المورد أو إضافة أي مبلغ على السعر المقدم من قبلكم للجهات المستفيدة من الخدمة.
              </p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp size={24} className="text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-4">في المشاريع الكبيرة</h3>
              <p className="text-slate-300 leading-relaxed">
                تعمل منصة GSS كمدير للمشروع، ويتم إبلاغ المورد مسبقاً بنسبة إدارة المشروع قبل طرحه للتنفيذ، ويُتاح له قبول المشاركة أو الاعتذار بكل شفافية ووضوح.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We're Looking For */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                هدفنا من بناء شبكة الموردين
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                إنشاء شبكة تشغيلية موثوقة طويلة المدى تعتمد على الجودة والالتزام والسرعة والشفافية، بما يضمن تدفّق فرص عمل مستمرة ومستقرة للموردين المعتمدين داخل المنصة.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {["الجودة", "الالتزام", "السرعة", "الشفافية"].map((val, i) => (
                  <div key={i} className="flex items-center gap-3 bg-primary/5 rounded-xl px-5 py-3">
                    <CheckCircle2 size={18} className="text-primary" />
                    <span className="font-bold text-primary">{val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-6">من يمكنه الانضمام؟</h3>
              <ul className="space-y-4">
                {[
                  "شركات الصيانة والخدمات التشغيلية",
                  "مؤسسات النظافة والمرافق",
                  "شركات ومؤسسات النقل والخدمات اللوجستية",
                  "مزودو خدمات تقنية المعلومات",
                  "مقاولو البناء والتجهيز",
                  "الفنيون والمختصون المهنيون المستقلون",
                  "شركات توريد العمالة والخدمات الإدارية",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 size={18} className="text-secondary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary/5 border-t border-secondary/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            انضمامكم إلى GSS Vendor Network يفتح لكم فرص تعاون مباشرة
          </h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            مع شركات متعددة في مختلف القطاعات داخل المملكة. يسعدنا تسجيلكم ضمن شبكة الموردين والفنيين المعتمدين.
          </p>
          <Link href="/register/vendor">
            <Button
              size="lg"
              className="h-14 px-10 text-lg font-bold"
              data-testid="cta-register-vendor"
            >
              ابدأ التسجيل كمورد
              <ArrowLeft className="mr-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
