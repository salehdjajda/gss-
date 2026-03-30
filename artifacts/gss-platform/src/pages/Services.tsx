import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Wrench, Sparkles, Truck, Users, Monitor, FileText, Building2,
  ShieldCheck, Car, Home, Calendar, Brain, ArrowLeft,
  CheckCircle2, ClipboardList, Send, Star, Zap, Phone,
  Wind, Droplets, Lightbulb, PaintBucket, HardHat, Leaf,
  Layers, Thermometer, Bug, LayoutGrid, Anchor,
  Square, AlignJustify, ParkingSquare
} from "lucide-react";

const SPECIALIZED = [
  {
    label: "تكييف",
    icon: Wind,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80",
    desc: "تركيب وصيانة أجهزة التكييف والتبريد بجميع أنواعها",
    color: "from-sky-500 to-blue-600",
  },
  {
    label: "سباكة",
    icon: Droplets,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&auto=format&fit=crop&q=80",
    desc: "أعمال السباكة والعزل المائي وصيانة شبكات المياه",
    color: "from-cyan-500 to-teal-600",
  },
  {
    label: "كهرباء",
    icon: Lightbulb,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
    desc: "تمديدات وصيانة الأعمال الكهربائية والإنارة",
    color: "from-yellow-400 to-amber-600",
  },
  {
    label: "دهانات",
    icon: PaintBucket,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80",
    desc: "دهانات داخلية وخارجية بمعايير تشطيب احترافية",
    color: "from-orange-400 to-red-500",
  },
  {
    label: "نجارة وتركيبات",
    icon: HardHat,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=80",
    desc: "أعمال النجارة والتركيبات الخشبية وتجهيز المكاتب",
    color: "from-amber-600 to-yellow-700",
  },
  {
    label: "عشب صناعي",
    icon: Leaf,
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&auto=format&fit=crop&q=80",
    desc: "تركيب وصيانة العشب الصناعي للمساحات الخارجية",
    color: "from-green-500 to-emerald-600",
  },
  {
    label: "لياسة",
    icon: Layers,
    image: "https://images.unsplash.com/photo-1572879023364-ab4f53e9d5fa?w=600&auto=format&fit=crop&q=80",
    desc: "أعمال اللياسة والتشطيبات الجدارية بجميع أنواعها",
    color: "from-slate-400 to-gray-600",
  },
  {
    label: "غرف التبريد",
    icon: Thermometer,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&auto=format&fit=crop&q=80",
    desc: "تركيب وصيانة وتشغيل غرف التبريد والحفظ البارد",
    color: "from-blue-400 to-indigo-600",
  },
  {
    label: "مكافحة الحشرات",
    icon: Bug,
    image: "https://images.unsplash.com/photo-1530126483408-aa533e55bdb2?w=600&auto=format&fit=crop&q=80",
    desc: "رش وقاية دورية ومكافحة الحشرات والقوارض",
    color: "from-lime-500 to-green-700",
  },
  {
    label: "تنظيف",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&auto=format&fit=crop&q=80",
    desc: "تنظيف يومي وعميق للمنشآت والفروع بمواد معتمدة",
    color: "from-violet-500 to-purple-700",
  },
  {
    label: "أرضيات",
    icon: LayoutGrid,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=80",
    desc: "تركيب وصيانة جميع أنواع الأرضيات والبلاط",
    color: "from-stone-500 to-slate-600",
  },
  {
    label: "حوض سباحة",
    icon: Anchor,
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&auto=format&fit=crop&q=80",
    desc: "تنظيف وصيانة وتشغيل أحواض السباحة",
    color: "from-teal-400 to-cyan-600",
  },
  {
    label: "أعمال جبسية",
    icon: Square,
    image: "https://images.unsplash.com/photo-1571504211935-1c936b327411?w=600&auto=format&fit=crop&q=80",
    desc: "تركيب وتشكيل الجبس والديكورات الجبسية المتنوعة",
    color: "from-pink-400 to-rose-500",
  },
  {
    label: "باركيه",
    icon: AlignJustify,
    image: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=600&auto=format&fit=crop&q=80",
    desc: "تركيب وصيانة وتلميع أرضيات الباركيه الخشبي",
    color: "from-yellow-600 to-amber-800",
  },
  {
    label: "مضلات المواقف",
    icon: ParkingSquare,
    image: "https://images.unsplash.com/photo-1614854262340-ab1ca7d079c7?w=600&auto=format&fit=crop&q=80",
    desc: "تصنيع وتركيب وصيانة مظلات مواقف السيارات",
    color: "from-indigo-500 to-blue-700",
  },
];

const CATEGORIES = [
  {
    id: "maintenance",
    label: "الصيانة والتشغيل",
    icon: Wrench,
    color: "blue",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop&q=80",
    description: "استقبال ومتابعة جميع طلبات الصيانة الدورية والاستباقية للمرافق والفروع مع الإشراف على تنفيذها وتقييم الأصول.",
    services: [
      "استقبال طلبات الصيانة والتشغيل للمرافق والفروع",
      "الإشراف على أعمال الصيانة الدورية والاستباقية",
      "متابعة توريد واستبدال وتقييم الأصول والأثاث المكتبي",
      "صيانة أنظمة السلامة والحريق بشكل دوري",
      "متابعة أنظمة كاميرات المراقبة الأمنية للمرافق",
      "صيانة التكييف وأنظمة HVAC",
      "أعمال السباكة والعزل المائي",
      "الطلاء وأعمال الديكور والتشطيبات",
    ],
  },
  {
    id: "utilities",
    label: "إدارة الكهرباء والمياه",
    icon: Zap,
    color: "yellow",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=80",
    description: "إدارة فواتير الكهرباء والمياه وتسويتها مع مُلّاك المباني والجهات المعنية ومتابعة الانقطاعات وإعادة الخدمة.",
    services: [
      "تعريف الفواتير مع ملاك المباني وإحصاء حسابات الكهرباء والمياه",
      "إصدار ومراجعة فواتير الكهرباء والمياه شهرياً",
      "إرسال الفواتير للمالية ومتابعة السداد مع القطاعات",
      "التواصل مع شركتَي الكهرباء والمياه لمتابعة بلاغات الانقطاع",
      "متابعة أعمال الصيانة وإعادة الخدمة بعد الفصل",
      "تنسيق توصيل الخدمات للفروع والمواقع الجديدة",
      "مراقبة استهلاك الطاقة والمياه وتقارير التوفير",
      "تسوية النزاعات مع مزودي الخدمة العامة",
    ],
  },
  {
    id: "projects",
    label: "تجهيز الفروع والمشاريع",
    icon: Building2,
    color: "indigo",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=80",
    description: "متابعة جميع مهام التجهيز للمشاريع الجديدة والحالية — من الافتتاح والإغلاق والترميم والنقل — مع استيفاء المتطلبات الحكومية.",
    services: [
      "متابعة تجهيز المهام الجديدة والحالية: افتتاح، إغلاق، ترميم، نقل",
      "المساندة في توفير المتطلبات الحكومية للمشاريع",
      "متابعة التجهيزات الفنية للمواقع والمكاتب والفروع",
      "تركيب اللوحات التجارية النظامية والكاميرات الأمنية",
      "أنظمة السلامة ومتطلبات الدفاع المدني",
      "المتابعة والإشراف على إخلاء المواقع والمخالصات",
      "إدارة تسليم المواقع للمؤجرين عند انتهاء العقود",
      "إدارة مشاريع التجهيز الكامل من الصفر حتى الافتتاح",
    ],
  },
  {
    id: "hq-projects",
    label: "مشاريع الإدارة الرئيسية",
    icon: ClipboardList,
    color: "teal",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=80",
    description: "تجهيز بيئة العمل المناسبة للموظفين الجدد والحاليين بما في ذلك المعدات والاتصالات والمواقف والسكن.",
    services: [
      "تجهيز المكاتب للموظفين الجدد والحاليين",
      "تأمين أجهزة الهاتف والتحويلات والاتصالات المحلية",
      "متابعة التجهيزات المكتبية وكروت العمل ولوحات الأسماء",
      "تأمين مواقف للسيارات حسب السياسة والتوفر",
      "تأمين السكن والتنقل حسب الاحتياج والتوجيه",
      "متابعة التجهيزات التقنية مع قسم تقنية المعلومات",
      "تجهيز بيئة عمل مناسبة للموظفين",
      "متابعة كافة المتطلبات اللوجستية للموارد البشرية",
    ],
  },
  {
    id: "housing",
    label: "إسكان الموظفين",
    icon: Home,
    color: "green",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
    description: "متابعة إثبات سكن الموظفين وإصدار التصاريح والبحث عن المواقع المناسبة وإتمام إجراءات التعاقد والإشراف على التشغيل.",
    services: [
      "متابعة إثبات سكن الموظفين عبر منصة الإيجار مع الإدارات",
      "متابعة إصدار تصاريح السكن الجماعي للمباني السكنية",
      "البحث عن مواقع سكن وإتمام كافة الإجراءات مع المؤجرين",
      "متابعة السير على إجراءات السكن مع الإدارات المعنية",
      "إعداد تقارير السكن ورفعها للمكتب الرئيسي",
      "متابعة إخلاء المواقع وتسليمها للمؤجرين",
      "إدارة خدمات التنظيف والصيانة للوحدات السكنية",
      "تنسيق خدمات النقل من وإلى السكن",
    ],
  },
  {
    id: "telecom",
    label: "خدمات الاتصالات",
    icon: Phone,
    color: "cyan",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
    description: "تأسيس وإدارة جميع خدمات الهاتف والإنترنت ودوائر البيانات والراوترات للمواقع والفروع مع متابعة الفواتير والشكاوى.",
    services: [
      "تأسيس وتفعيل وإلغاء جميع الخدمات الهاتفية والإنترنت",
      "تزويد القطاعات بالخدمات: دوائر البيانات، هاتف ثابت، جوال، راوترات",
      "إدارة حسابات المجموعة وطباعة الفواتير الشهرية",
      "توزيع الفواتير على القطاعات ومتابعة السداد",
      "دراسة الخدمات البديلة والعروض مع مزودي الخدمة",
      "متابعة بلاغات الصيانة والشكاوى على الخدمات",
      "متابعة أرقام السنترال الرئيسي وتأسيس التحويلات الداخلية",
      "إدارة التسجيلات الصوتية والترحيبية للمجموعة",
    ],
  },
  {
    id: "admin",
    label: "الخدمات الإدارية",
    icon: FileText,
    color: "purple",
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&auto=format&fit=crop&q=80",
    description: "إدارة خدمات الاستقبال والخدمات المكتبية والمراسلة والبريد وتوزيع المستلزمات مع الإشراف على موظفي الخدمات.",
    services: [
      "الإشراف على خدمات الاستقبال ومتابعة الأعطال الفنية والتسجيلات الصوتية",
      "الإشراف على التحويلات الداخلية والتسجيلات الترحيبية",
      "الإشراف على مأموري الخدمات في المكتب الرئيسي والفروع",
      "الإشراف على المراسلين ومتابعة الورديات والإجازات",
      "رفع طلبات للمشتريات لتوفير المواد الاستهلاكية (مطبخ، نظافة، مياه)",
      "متابعة إصدار بطاقات استلام وتسليم البريد السعودي",
      "متابعة الاستلام والتسليم والتوزيع والفواتير للمكتب الرئيسي والفروع",
      "التنسيق مع شركات البريد والتوصيل وإدارة صناديق البريد",
    ],
  },
  {
    id: "fleet",
    label: "إدارة الأسطول والمركبات",
    icon: Car,
    color: "slate",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop&q=80",
    description: "إدارة شاملة لأسطول المركبات المملوكة والمستأجرة من تطبيق السياسات وإعداد التقارير وصيانة المركبات وإدارة المخالفات.",
    services: [
      "تطبيق سياسات استخدام السيارات للموظفين المستحقين",
      "إعداد تقرير دوري شامل عن سيارات المجموعة (المملوكة والمستأجرة)",
      "توثيق كافة التفاصيل المالية وتواريخ انتهاء العقود",
      "متابعة الفواتير الشهرية مع الإدارة المالية وشركات السيارات",
      "متابعة الشكاوى والحوادث وأعمال الصيانة الدورية للمركبات",
      "توفير طاقات المواقف الداخلية والخارجية وتنظيمها",
      "إدارة برنامج الخدمة المرورية (TAMM): مخالفات، تقارير، تجديدات",
      "نقل الملكيات وتسجيل المستخدمين والتفاوض المحلي والدولي",
    ],
  },
  {
    id: "transport",
    label: "النقل والخدمات اللوجستية",
    icon: Truck,
    color: "orange",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&auto=format&fit=crop&q=80",
    description: "خدمات نقل متكاملة للموظفين والبضائع والمعدات مع إدارة حركة المركبات وخدمات التخليص.",
    services: [
      "نقل الموظفين (باصات – رحلات يومية ودورية)",
      "توصيل البضائع والشحنات بين الفروع والمواقع",
      "نقل الأثاث والمعدات عند الانتقال والترميم",
      "خدمات الرسل والتوصيل السريع للمكاتب والفروع",
      "تأجير سيارات وفانات بسائق حسب الحاجة",
      "نقل الآلات والمعدات الثقيلة",
      "خدمات التخليص الجمركي والشحن",
      "تنسيق ورديات السائقين والمراسلين وإجازاتهم",
    ],
  },
  {
    id: "security",
    label: "الأمن والسلامة",
    icon: ShieldCheck,
    color: "red",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    description: "منظومة أمن وسلامة متكاملة لحماية منشآتكم تشمل الحراسة والأنظمة التقنية والتدريب على إجراءات الطوارئ.",
    services: [
      "خدمات الحراسة والأمن للمرافق والفروع",
      "أنظمة إنذار الحريق والإطفاء وصيانتها الدورية",
      "تركيب وصيانة كاميرات المراقبة وأنظمة CCTV",
      "فحص أنظمة السلامة ومتطلبات الدفاع المدني",
      "التدريب على إجراءات الطوارئ والإخلاء",
      "تقييمات مخاطر السلامة المهنية",
      "إدارة بطاقات الدخول للموظفين والزوار",
      "متابعة بلاغات الصيانة لأنظمة الأمن",
    ],
  },
  {
    id: "events",
    label: "الفعاليات والمناسبات",
    icon: Calendar,
    color: "pink",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
    description: "تنظيم وإدارة فعاليات المنشأة باحترافية كاملة من اجتماعات الإدارة حتى حفلات التكريم وافتتاح الفروع.",
    services: [
      "تنظيم اجتماعات الإدارة والاجتماعات العامة",
      "تجهيز وإدارة المؤتمرات والملتقيات",
      "فعاليات افتتاح الفروع والمشاريع الجديدة",
      "تنظيم حفلات التكريم والجوائز والمناسبات الداخلية",
      "تجهيز غرف الاجتماعات والأجهزة التقنية",
      "خدمات الضيافة والكاترينغ للفعاليات",
      "التصوير والتوثيق المهني للمناسبات",
      "فعاليات التدريب والتطوير وورش العمل",
    ],
  },
  {
    id: "consulting",
    label: "الاستشارات التشغيلية",
    icon: Brain,
    color: "amber",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
    description: "استشارات متخصصة لتحسين كفاءة التشغيل وتوفير التكاليف من خلال خبراء ميدانيين متخصصين في قطاعات متعددة.",
    highlight: true,
    services: [
      "تحليل وتدقيق المصروفات التشغيلية واكتشاف فرص التوفير",
      "مراجعة وإعادة هيكلة عقود الموردين والخدمات",
      "تحسين إجراءات سلاسل الإمداد والمشتريات",
      "استشارات اختيار الموردين المناسبين وتقييمهم",
      "تحليل الأداء التشغيلي للفروع والمرافق",
      "تصميم إجراءات وعمليات التشغيل الموحدة",
      "استشارات استيفاء المتطلبات التنظيمية والحكومية",
      "دراسات جدوى لمشاريع التوسع والفروع الجديدة",
    ],
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  blue:   { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200",   badge: "bg-blue-100 text-blue-700" },
  green:  { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  badge: "bg-green-100 text-green-700" },
  orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", badge: "bg-orange-100 text-orange-700" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", badge: "bg-purple-100 text-purple-700" },
  cyan:   { bg: "bg-cyan-50",   text: "text-cyan-700",   border: "border-cyan-200",   badge: "bg-cyan-100 text-cyan-700" },
  yellow: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", badge: "bg-yellow-100 text-yellow-800" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", badge: "bg-indigo-100 text-indigo-700" },
  red:    { bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200",    badge: "bg-red-100 text-red-700" },
  slate:  { bg: "bg-slate-50",  text: "text-slate-700",  border: "border-slate-200",  badge: "bg-slate-100 text-slate-700" },
  teal:   { bg: "bg-teal-50",   text: "text-teal-700",   border: "border-teal-200",   badge: "bg-teal-100 text-teal-700" },
  pink:   { bg: "bg-pink-50",   text: "text-pink-700",   border: "border-pink-200",   badge: "bg-pink-100 text-pink-700" },
  amber:  { bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-200",  badge: "bg-amber-100 text-amber-800" },
};

export default function Services() {
  const { toast } = useToast();
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative bg-primary py-24 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 to-primary/90" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">الخدمات التشغيلية الشاملة</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            تغطي منصة GSS جميع احتياجات قسم خدمات المساندة العامة — من الصيانة والكهرباء والمياه وإدارة الأسطول حتى الاستشارات التشغيلية. نقطة اتصال واحدة لكل شيء.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => scrollTo(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${cat.highlight ? "bg-secondary text-primary border-secondary" : "bg-white/10 border-white/30 text-white hover:bg-white/20"}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "12", label: "تصنيف خدمي متكامل" },
              { num: "+90", label: "مهمة تشغيلية مغطاة" },
              { num: "واحدة", label: "نقطة تنسيق لكل الطلبات" },
              { num: "شفاف", label: "نموذج تسعير واضح مسبقاً" },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-3xl font-black text-secondary">{item.num}</p>
                <p className="text-slate-400 text-sm mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-secondary/10 text-primary text-sm font-bold px-4 py-1.5 rounded-full mb-4">الخدمات التخصصية</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">أعمال الصيانة والتجهيز المتخصصة</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              نغطي جميع أعمال الصيانة والتجهيز المتخصصة من خلال شبكة موردين معتمدين — سواء طلب واحد أو مشروع كامل.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {SPECIALIZED.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
              >
                {/* Background Image */}
                <div className="h-40 relative">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-75 group-hover:opacity-85 transition-opacity`} />
                  {/* Icon */}
                  <div className="absolute top-3 right-3 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <item.icon size={18} className="text-white" />
                  </div>
                </div>
                {/* Label */}
                <div className="p-3 bg-white border border-gray-100 border-t-0">
                  <p className="font-bold text-gray-900 text-sm text-center">{item.label}</p>
                  <p className="text-gray-500 text-xs text-center mt-1 leading-relaxed hidden group-hover:block">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/register/company">
              <Button size="lg" className="h-12 px-10 font-bold">
                اطلب أي خدمة من هذه الخدمات <ArrowLeft className="mr-2" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
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
                  <div className="bg-secondary text-primary text-center py-2.5 text-sm font-bold flex items-center justify-center gap-2">
                    <Star size={16} /> الخدمة الأساسية — توفير فعلي في التكاليف التشغيلية <Star size={16} />
                  </div>
                )}
                <div className={`grid lg:grid-cols-2 ${!isEven ? "lg:grid-flow-col-dense" : ""}`}>
                  {/* Image */}
                  <div className={`relative h-64 lg:h-auto min-h-[260px] ${!isEven ? "lg:col-start-2" : ""}`}>
                    <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 ${colors.bg} opacity-25`} />
                    <div className="absolute top-4 right-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${colors.badge}`}>
                        <cat.icon size={28} />
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className={`p-8 lg:p-10 bg-white ${!isEven ? "lg:col-start-1" : ""}`}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{cat.label}</h2>
                    <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">{cat.description}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cat.services.map((service, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 size={15} className={`mt-0.5 flex-shrink-0 ${colors.text}`} />
                          {service}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex gap-3 flex-wrap">
                      <Link href="/register/company">
                        <Button size="sm" className="font-bold">طلب هذه الخدمة</Button>
                      </Link>
                      <Link href="/contact">
                        <Button variant="outline" size="sm" className={`${colors.text} border-current hover:opacity-80`}>
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

      {/* Custom Request */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ClipboardList size={32} className="text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">خدمة غير مذكورة؟ ارفع طلبك</h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto">
              إذا كانت الخدمة المطلوبة غير مدرجة أعلاه، أخبرنا باحتياجكم التشغيلي وسيتولى فريق GSS دراسته وتقديم الحل المناسب.
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
              <label className="block text-sm font-medium text-gray-700 mb-1">وصف الاحتياج التشغيلي <span className="text-red-500">*</span></label>
              <Textarea
                value={customForm.description}
                onChange={e => setCustomForm(p => ({ ...p, description: e.target.value }))}
                placeholder="صف باختصار ما تحتاجه منشأتكم، وسيتواصل معك فريق GSS لدراسة الطلب وتقديم حل مناسب..."
                rows={4}
                required
              />
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
              <strong>ملاحظة:</strong> سيتواصل معك فريق GSS خلال 24–48 ساعة لمناقشة طلبك والتحقق من إمكانية التنفيذ.
            </div>
            <Button type="submit" className="w-full h-12 text-base font-bold" disabled={submitting} data-testid="btn-submit-custom-request">
              {submitting ? "جاري الإرسال..." : (
                <span className="flex items-center justify-center gap-2"><Send size={18} /> إرسال الطلب</span>
              )}
            </Button>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">هل أنتم مستعدون لتبسيط تشغيل منشأتكم؟</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
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
