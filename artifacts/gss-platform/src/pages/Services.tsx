import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Wrench, Sparkles, Truck, Users, Monitor, FileText, Building2,
  ShieldCheck, Car, Home, Calendar, Brain, ArrowLeft, CheckCircle2,
  Zap, Droplets, Flame, ClipboardList, Send, Phone, Star
} from "lucide-react";

const CATEGORIES = [
  {
    id: "maintenance",
    label: "خدمات الصيانة",
    icon: Wrench,
    color: "blue",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&auto=format&fit=crop&q=80",
    description: "صيانة شاملة لجميع منشآتكم وفروعكم مع ضمان استمرارية التشغيل",
    services: [
      "صيانة عامة للمنشآت",
      "صيانة التكييف وأنظمة HVAC",
      "صيانة كهربائية وإنارة",
      "سباكة وعزل مائي",
      "صيانة مصاعد وسلالم كهربائية",
      "طلاء وأعمال ديكورية",
      "صيانة أنظمة الإطفاء والإنذار",
      "صيانة الواجهات والنوافذ",
    ],
  },
  {
    id: "cleaning",
    label: "النظافة والتعقيم",
    icon: Sparkles,
    color: "green",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&auto=format&fit=crop&q=80",
    description: "خدمات نظافة يومية وعميقة وتعقيم بمعايير صحية عالية",
    services: [
      "تنظيف يومي للمكاتب والمنشآت",
      "تنظيف عميق دوري",
      "تعقيم ومكافحة حشرات وقوارض",
      "تنظيف الواجهات الزجاجية",
      "تنظيف وتعقيم المطابخ والمطاعم",
      "تنظيف المستودعات والمصانع",
      "خدمات غسيل الكنب والسجاد",
      "إدارة المخلفات والنفايات",
    ],
  },
  {
    id: "transport",
    label: "النقل واللوجستيات",
    icon: Truck,
    color: "orange",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&auto=format&fit=crop&q=80",
    description: "حلول نقل متكاملة للموظفين والبضائع والمعدات",
    services: [
      "نقل الموظفين (باصات – رحلات يومية)",
      "توصيل البضائع والشحنات",
      "نقل الأثاث والمعدات",
      "خدمات الرسل والتوصيل السريع",
      "تأجير سيارات وفانات بسائق",
      "نقل الآلات والمعدات الثقيلة",
      "خدمات التخليص الجمركي",
      "إدارة حركة المركبات",
    ],
  },
  {
    id: "labor",
    label: "توريد العمالة",
    icon: Users,
    color: "purple",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop&q=80",
    description: "توفير الكوادر البشرية المناسبة لتشغيل منشآتكم بكفاءة",
    services: [
      "عمالة تشغيلية يومية أو موسمية",
      "موظفو استقبال وسكرتارية",
      "حراسة وأمن",
      "عمالة مستودعات وإنتاج",
      "طاقم تنظيف داخلي",
      "سائقون ومشغلو معدات",
      "عمال بناء وتجهيز",
      "طاقم فعاليات مؤقت",
    ],
  },
  {
    id: "it",
    label: "تقنية المعلومات",
    icon: Monitor,
    color: "cyan",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
    description: "دعم تقني متكامل لبنيتكم التحتية الرقمية",
    services: [
      "صيانة وإصلاح الحواسيب والأجهزة",
      "تركيب وصيانة شبكات الإنترنت",
      "أنظمة مراقبة وكاميرات CCTV",
      "أنظمة التحكم في الدخول",
      "طباعة مركزية وإدارة الطابعات",
      "نسخ احتياطي وحماية البيانات",
      "أنظمة الحضور والانصراف",
      "دعم فني وصيانة دورية",
    ],
  },
  {
    id: "licensing",
    label: "التراخيص والشؤون الحكومية",
    icon: FileText,
    color: "yellow",
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&auto=format&fit=crop&q=80",
    description: "إنجاز المعاملات الحكومية والتراخيص دون عناء",
    services: [
      "تجديد السجل التجاري",
      "تراخيص البلدية والمواصفات",
      "شهادات السلامة وإطفاء الحرائق",
      "تراخيص الإعلانات واللافتات",
      "شهادات الجودة والاعتماد",
      "التعامل مع شؤون العمل والزكاة",
      "تأشيرات الاستقدام",
      "الخدمات الحكومية الإلكترونية",
    ],
  },
  {
    id: "branch-setup",
    label: "تجهيز وإعداد الفروع",
    icon: Building2,
    color: "indigo",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&auto=format&fit=crop&q=80",
    description: "تجهيز فروعكم الجديدة من الصفر حتى الافتتاح",
    services: [
      "تصميم وتنفيذ الديكور الداخلي",
      "تركيب الأثاث والتجهيزات",
      "أعمال التمديدات الكهربائية",
      "تركيب لوحات ويافطات المنشأة",
      "تجهيز المطابخ والاستراحات",
      "تركيب أنظمة التكييف",
      "تجهيز غرف الخوادم والتقنية",
      "إدارة مشاريع التجهيز الكامل",
    ],
  },
  {
    id: "security",
    label: "الأمن والسلامة",
    icon: ShieldCheck,
    color: "red",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
    description: "منظومة أمن وسلامة متكاملة لحماية منشآتكم",
    services: [
      "خدمات الحراسة والأمن",
      "أنظمة إنذار الحريق والإطفاء",
      "تركيب وصيانة كاميرات المراقبة",
      "فحص أنظمة السلامة الدورية",
      "التدريب على إجراءات الطوارئ",
      "تقييمات مخاطر السلامة",
      "إدارة بطاقات الدخول",
      "خدمات الصحة والسلامة المهنية",
    ],
  },
  {
    id: "fleet",
    label: "إدارة الأسطول",
    icon: Car,
    color: "slate",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&auto=format&fit=crop&q=80",
    description: "إدارة وصيانة أسطول مركبات منشأتكم بكفاءة",
    services: [
      "صيانة دورية للمركبات",
      "تتبع وإدارة حركة الأسطول",
      "تأمين وترخيص المركبات",
      "إدارة استهلاك الوقود",
      "فحص وتجديد مركبات الأسطول",
      "استبدال وتأجير مركبات بديلة",
      "إدارة المخالفات والتوثيق",
      "برامج توفير تكاليف الأسطول",
    ],
  },
  {
    id: "housing",
    label: "إسكان الموظفين",
    icon: Home,
    color: "teal",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=80",
    description: "توفير وإدارة وحدات سكنية لموظفيكم",
    services: [
      "إيجاد وتأجير وحدات سكنية",
      "إدارة عقود الإسكان",
      "صيانة وتجهيز الوحدات السكنية",
      "إدارة خدمات المجمعات السكنية",
      "التنظيف والخدمات المنزلية",
      "خدمات النقل من وإلى السكن",
      "توفير سكن مؤقت للزوار",
      "إدارة تحصيل الإيجارات",
    ],
  },
  {
    id: "events",
    label: "الفعاليات والمناسبات",
    icon: Calendar,
    color: "pink",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80",
    description: "تنظيم وإدارة فعاليات منشأتكم باحترافية كاملة",
    services: [
      "تنظيم اجتماعات واجتماعات الإدارة",
      "تجهيز وإدارة المؤتمرات",
      "فعاليات افتتاح الفروع",
      "تنظيم حفلات التكريم والجوائز",
      "تجهيز غرف الاجتماعات",
      "خدمات الضيافة والكاترينغ",
      "التصوير والتوثيق المهني",
      "فعاليات التدريب والتطوير",
    ],
  },
  {
    id: "consulting",
    label: "الاستشارات التشغيلية",
    icon: Brain,
    color: "amber",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
    description: "استشارات متخصصة لتحسين كفاءة التشغيل وتوفير التكاليف",
    highlight: true,
    services: [
      "تحليل وتدقيق المصروفات التشغيلية",
      "اكتشاف فرص التوفير في الإنفاق",
      "تحسين إجراءات سلاسل الإمداد",
      "مراجعة وإعادة هيكلة عقود الموردين",
      "استشارات اختيار الموردين المناسبين",
      "تحليل الأداء التشغيلي وتقييمه",
      "تصميم إجراءات وعمليات التشغيل",
      "استشارات الامتثال والمتطلبات التنظيمية",
    ],
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", badge: "bg-blue-100 text-blue-700" },
  green: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", badge: "bg-green-100 text-green-700" },
  orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", badge: "bg-orange-100 text-orange-700" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", badge: "bg-purple-100 text-purple-700" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200", badge: "bg-cyan-100 text-cyan-700" },
  yellow: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", badge: "bg-yellow-100 text-yellow-800" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", badge: "bg-indigo-100 text-indigo-700" },
  red: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", badge: "bg-red-100 text-red-700" },
  slate: { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200", badge: "bg-slate-100 text-slate-700" },
  teal: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200", badge: "bg-teal-100 text-teal-700" },
  pink: { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200", badge: "bg-pink-100 text-pink-700" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", badge: "bg-amber-100 text-amber-800" },
};

export default function Services() {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [customForm, setCustomForm] = useState({ name: "", phone: "", email: "", description: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customForm.description) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setSubmitting(false);
    setCustomForm({ name: "", phone: "", email: "", description: "" });
    toast({ title: "تم استلام طلبك بنجاح", description: "سيتواصل معك فريق GSS لدراسة طلبك قريباً." });
  };

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative bg-primary py-24 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 to-primary/90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">الخدمات التشغيلية</h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            تغطي منصة GSS جميع الخدمات التشغيلية التي تحتاجها منشأتكم — من الصيانة والنظافة حتى الاستشارات التشغيلية المتخصصة. نقطة اتصال واحدة لكل شيء.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => { setActiveCategory(cat.id); document.getElementById(cat.id)?.scrollIntoView({ behavior: "smooth" }); }}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${activeCategory === cat.id ? "bg-secondary text-primary border-secondary" : "bg-white/10 border-white/30 text-white hover:bg-white/20"}`}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "+12", label: "تصنيف خدمي" },
              { num: "+80", label: "نوع خدمة تشغيلية" },
              { num: "شامل", label: "تغطية جميع المناطق" },
              { num: "مرن", label: "نموذج تسعير شفاف" },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-3xl font-black text-secondary">{item.num}</p>
                <p className="text-slate-400 text-sm mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {CATEGORIES.map((cat, idx) => {
            const colors = colorMap[cat.color];
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={cat.id}
                id={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`rounded-3xl overflow-hidden border ${colors.border} ${cat.highlight ? "ring-2 ring-secondary shadow-xl" : "shadow-sm"}`}
              >
                {cat.highlight && (
                  <div className="bg-secondary text-primary text-center py-2 text-sm font-bold flex items-center justify-center gap-2">
                    <Star size={16} /> الخدمة الأساسية — تساعدكم على توفير التكاليف التشغيلية <Star size={16} />
                  </div>
                )}
                <div className={`grid lg:grid-cols-2 ${!isEven ? "lg:grid-flow-col-dense" : ""}`}>
                  {/* Image */}
                  <div className={`relative h-64 lg:h-auto ${!isEven ? "lg:col-start-2" : ""}`}>
                    <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 ${colors.bg} opacity-20`}></div>
                    <div className="absolute top-4 right-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${colors.badge}`}>
                        <cat.icon size={28} />
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className={`p-8 lg:p-10 bg-white ${!isEven ? "lg:col-start-1" : ""}`}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{cat.label}</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">{cat.description}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cat.services.map((service, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 size={16} className={`mt-0.5 flex-shrink-0 ${colors.text}`} />
                          {service}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex gap-3">
                      <Link href="/register/company">
                        <Button className="font-bold" size="sm">
                          طلب هذه الخدمة
                        </Button>
                      </Link>
                      <Link href="/contact">
                        <Button variant="outline" size="sm" className={`border-current ${colors.text} hover:opacity-80`}>
                          استفسار
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Custom Request Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ClipboardList size={32} className="text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">خدمة غير مذكورة؟ ارفع طلبك!</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              إذا كانت خدمتكم المطلوبة غير مدرجة في القائمة أعلاه، أرسل لنا وصفاً لاحتياجكم وسيقوم فريق GSS بدراسته وتقديم حل تشغيلي مناسب.
            </p>
          </div>

          <form onSubmit={handleCustomSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                <Input value={customForm.name} onChange={e => setCustomForm(p => ({ ...p, name: e.target.value }))} placeholder="اسمك أو اسم المنشأة" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم الجوال</label>
                <Input dir="ltr" value={customForm.phone} onChange={e => setCustomForm(p => ({ ...p, phone: e.target.value }))} placeholder="05xxxxxxxx" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
              <Input dir="ltr" type="email" value={customForm.email} onChange={e => setCustomForm(p => ({ ...p, email: e.target.value }))} placeholder="example@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">وصف الخدمة المطلوبة <span className="text-red-500">*</span></label>
              <Textarea
                value={customForm.description}
                onChange={e => setCustomForm(p => ({ ...p, description: e.target.value }))}
                placeholder="صف باختصار ما تحتاجه منشأتكم، وسيتواصل معك فريق GSS لدراسة الطلب وتقديم حل مناسب..."
                rows={4}
                required
              />
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
              <strong>ملاحظة:</strong> هذا النموذج لدراسة الطلب فقط. سيتواصل معك فريق GSS خلال 24–48 ساعة لمناقشة الطلب وتحديد إمكانية التنفيذ.
            </div>
            <Button type="submit" className="w-full h-12 text-base font-bold" disabled={submitting} data-testid="btn-submit-custom-request">
              {submitting ? "جاري الإرسال..." : (
                <span className="flex items-center justify-center gap-2">
                  <Send size={18} />
                  إرسال الطلب
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            أو تواصل معنا مباشرة على{" "}
            <Link href="/contact" className="text-primary font-semibold hover:underline">صفحة التواصل</Link>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">هل أنتم مستعدون لتبسيط تشغيل منشأتكم؟</h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            سجّلوا الآن وسيتولى فريق GSS إدارة جميع خدماتكم التشغيلية عبر نقطة اتصال واحدة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register/company">
              <Button size="lg" className="h-14 px-10 text-lg font-bold bg-secondary hover:bg-secondary/90 text-primary" data-testid="cta-services-register">
                سجّل منشأتك الآن <ArrowLeft className="mr-2" size={20} />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg text-white border-white hover:bg-white/10">
                تواصل معنا
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
