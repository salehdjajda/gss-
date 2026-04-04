import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyAuth } from "@/contexts/AccountAuthContext";
import {
  Wrench, Sparkles, Truck, Users, Monitor, FileText, Building2,
  ShieldCheck, Car, Home, Calendar, Brain, ArrowLeft,
  CheckCircle2, ClipboardList, Send, Star, Zap, Phone,
  Wind, Droplets, Lightbulb, PaintBucket, HardHat, Leaf,
  Layers, Thermometer, Bug, LayoutGrid, Anchor,
  Square, AlignJustify, ParkingSquare,
  Briefcase, TrendingDown, AlertTriangle, ClipboardCheck, Package,
  BarChart3, Receipt, UserCog, BadgeCheck,
  Camera, Wifi, DoorOpen, ArrowUpDown, BatteryCharging, Utensils, Shield,
  User, X as XIcon
} from "lucide-react";

const SPECIALIZED = [
  {
    label: "تكييف",
    icon: Wind,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80",
    desc: "تركيب وصيانة أجهزة التكييف والتبريد بجميع أنواعها",
    color: "from-sky-500 to-blue-600",
    items: ["تركيب مكيفات سبليت وكاسيت", "صيانة وإصلاح أعطال التكييف", "تنظيف الفلاتر والوحدات", "خدمات التبريد التجاري", "أنظمة التكييف المركزي"],
  },
  {
    label: "كهرباء",
    icon: Lightbulb,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
    desc: "تمديدات وصيانة الأعمال الكهربائية والإنارة",
    color: "from-yellow-400 to-amber-600",
    items: ["تمديدات كهربائية", "صيانة لوحات الكهرباء", "تركيب الإنارة", "معالجة الأعطال الكهربائية", "تمديدات التيار الخفيف"],
  },
  {
    label: "سباكة",
    icon: Droplets,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&auto=format&fit=crop&q=80",
    desc: "أعمال السباكة والعزل المائي وصيانة شبكات المياه",
    color: "from-cyan-500 to-teal-600",
    items: ["صيانة شبكات المياه", "إصلاح أعطال السباكة", "تركيب الأدوات الصحية", "أعمال العزل المائي", "صيانة خزانات المياه"],
  },
  {
    label: "أجهزة ومعدات المرافق",
    icon: Monitor,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop&q=80",
    desc: "تنسيق صيانة وتوريد وتركيب أجهزة ومعدات المرافق التشغيلية",
    color: "from-purple-500 to-indigo-600",
    items: ["أجهزة المطابخ التشغيلية", "صيانة الثلاجات التجارية", "أجهزة الغسيل للمنشآت", "توريد وتركيب المعدات", "معدات الاستراحات والمطاعم"],
  },
  {
    label: "أرضيات",
    icon: LayoutGrid,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=80",
    desc: "تركيب وصيانة جميع أنواع الأرضيات والبلاط والباركيه الخشبي",
    color: "from-stone-500 to-slate-600",
    items: ["تركيب البلاط والسيراميك", "تركيب الباركيه الخشبي", "تركيب الرخام والجرانيت", "صيانة وتلميع الأرضيات", "تركيب السجاد"],
  },
  {
    label: "دهانات",
    icon: PaintBucket,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80",
    desc: "دهانات داخلية وخارجية بمعايير تشطيب احترافية",
    color: "from-orange-400 to-red-500",
    items: ["دهانات داخلية للجدران والأسقف", "دهانات خارجية للمباني", "دهانات إيبوكسي للأرضيات", "معالجة الرطوبة والتشققات", "دهانات الواجهات والأسطح"],
  },
  {
    label: "نجارة",
    icon: HardHat,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=80",
    desc: "أعمال النجارة والتركيبات الخشبية وتجهيز المكاتب والمطابخ",
    color: "from-amber-600 to-yellow-700",
    items: ["تركيب الأبواب الخشبية", "تجهيز المطابخ الخشبية", "تركيب الخزائن المدمجة", "صيانة الأثاث وإصلاحه", "تجهيز وتركيب المكاتب"],
  },
  {
    label: "جبس",
    icon: Square,
    image: "https://images.unsplash.com/photo-1571504211935-1c936b327411?w=600&auto=format&fit=crop&q=80",
    desc: "تركيب وتشكيل الجبس والديكورات الجبسية ولياسة الجدران",
    color: "from-pink-400 to-rose-500",
    items: ["تركيب ألواح الجبسبورد", "ديكورات الجبس والأسقف", "لياسة الجدران والأسقف", "أسقف مستعارة", "تشطيبات جبسية احترافية"],
  },
  {
    label: "عزل",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80",
    desc: "أعمال العزل الحراري والمائي للأسطح والجدران والأرضيات",
    color: "from-slate-500 to-gray-700",
    items: ["عزل حراري للأسطح والجدران", "عزل مائي للحمامات والمطابخ", "عزل مائي للأسطح الخارجية", "معالجة تسربات المياه", "أنظمة الحماية من الرطوبة"],
  },
  {
    label: "تنظيف",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&auto=format&fit=crop&q=80",
    desc: "تنظيف يومي وعميق للمنشآت والفروع بمواد معتمدة",
    color: "from-violet-500 to-purple-700",
    items: ["تنظيف يومي للمكاتب والمنشآت", "تنظيف عميق دوري", "تنظيف الواجهات الزجاجية", "تعقيم وتطهير الأسطح", "تنظيف ما بعد التشطيب"],
  },
  {
    label: "مكافحة حشرات",
    icon: Bug,
    image: "https://images.unsplash.com/photo-1530126483408-aa533e55bdb2?w=600&auto=format&fit=crop&q=80",
    desc: "رش وقاية دورية ومكافحة الحشرات والقوارض",
    color: "from-lime-500 to-green-700",
    items: ["رش حشرات", "مكافحة النمل الأبيض", "مكافحة القوارض", "تعقيم المنشآت", "تعقيم مواقع التشغيل"],
  },
  {
    label: "كاميرات وأنظمة أمنية",
    icon: Camera,
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80",
    desc: "تنظيم توريد وتركيب وصيانة أنظمة المراقبة والتحكم الأمني",
    color: "from-slate-600 to-gray-800",
    items: ["كاميرات المراقبة", "أنظمة التسجيل", "أنظمة التحكم بالدخول", "أجهزة البصمة والحضور", "أنظمة الإنذار"],
  },
  {
    label: "شبكات وتقنية",
    icon: Wifi,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
    desc: "تنسيق تجهيز وصيانة البنية التقنية للمواقع والمكاتب",
    color: "from-blue-500 to-indigo-700",
    items: ["الشبكات الداخلية LAN", "نقاط الإنترنت والواي فاي", "تمديدات الشبكات", "الراوترات والسويتشات", "السيرفرات الصغيرة"],
  },
  {
    label: "اتصالات",
    icon: Phone,
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&auto=format&fit=crop&q=80",
    desc: "تنظيم خدمات الهاتف والإنترنت والسنترالات التشغيلية",
    color: "from-cyan-600 to-blue-700",
    items: ["السنترالات الهاتفية", "الهواتف المكتبية", "خدمات الإنترنت التجارية", "إدارة الفواتير التقنية", "دوائر البيانات"],
  },
  {
    label: "أبواب أوتوماتيكية",
    icon: DoorOpen,
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&auto=format&fit=crop&q=80",
    desc: "تنسيق تركيب وصيانة الأبواب الذكية والبوابات الكهربائية",
    color: "from-gray-500 to-slate-700",
    items: ["الأبواب الزجاجية الأوتوماتيكية", "أبواب الرول للمستودعات", "البوابات الكهربائية", "بوابات مواقف السيارات", "أنظمة التحكم بالمداخل"],
  },
  {
    label: "مصاعد",
    icon: ArrowUpDown,
    image: "https://images.unsplash.com/photo-1567452839976-89f0ef04e77b?w=600&auto=format&fit=crop&q=80",
    desc: "تنظيم صيانة وفحص وتشغيل أنظمة المصاعد",
    color: "from-neutral-500 to-stone-700",
    items: ["الصيانة الدورية للمصاعد", "الفحص الفني والسلامة", "إصلاح أعطال المصاعد", "صيانة السلالم الكهربائية", "تحديثات تشغيلية"],
  },
  {
    label: "مسابح",
    icon: Anchor,
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&auto=format&fit=crop&q=80",
    desc: "تنظيف وصيانة وتشغيل أحواض السباحة",
    color: "from-teal-400 to-cyan-600",
    items: ["تنظيف وتعقيم المسابح", "صيانة مضخات المياه", "صيانة أنظمة الفلترة", "معالجة مياه السباحة كيميائياً", "إصلاح أعطال التجهيزات"],
  },
  {
    label: "حدائق",
    icon: Leaf,
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&auto=format&fit=crop&q=80",
    desc: "تنسيق المناظر الطبيعية والزراعة والعشب الصناعي",
    color: "from-green-500 to-emerald-700",
    items: ["تنسيق المناظر الطبيعية", "تركيب العشب الصناعي", "زراعة النباتات والأشجار", "أنظمة الري الأوتوماتيكي", "صيانة الحدائق الدورية"],
  },
  {
    label: "مظلات وسواتر",
    icon: ParkingSquare,
    image: "https://images.unsplash.com/photo-1614854262340-ab1ca7d079c7?w=600&auto=format&fit=crop&q=80",
    desc: "تصنيع وتركيب وصيانة المظلات والسواتر",
    color: "from-indigo-500 to-blue-700",
    items: ["مظلات مواقف السيارات", "سواتر الخصوصية", "مظلات الحدائق والمسابح", "بيوت الشعر والخيام", "هياكل التظليل الكبيرة"],
  },
  {
    label: "واجهات ولوحات",
    icon: Layers,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80",
    desc: "تركيب اللوحات التجارية والإعلانية وواجهات المباني",
    color: "from-rose-500 to-pink-700",
    items: ["لوحات المحلات التجارية", "واجهات الألمنيوم والكمبوزيت", "اللوحات الإعلانية الخارجية", "الشاشات الرقمية الخارجية", "واجهات الزجاج الهيكلي"],
  },
  {
    label: "معدات تجارية",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop&q=80",
    desc: "تنسيق توريد وتركيب وصيانة معدات الأنشطة التجارية",
    color: "from-amber-500 to-orange-700",
    items: ["معدات المطابخ التجارية", "أجهزة المقاهي والمطاعم", "ثلاجات العرض التجارية", "أنظمة نقاط البيع POS", "الشاشات الرقمية الداخلية"],
  },
  {
    label: "أنظمة تشغيل المباني",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&auto=format&fit=crop&q=80",
    desc: "تجهيز وصيانة الأنظمة التشغيلية للمباني الكبيرة",
    color: "from-blue-600 to-indigo-800",
    items: ["أنظمة إدارة المباني BMS", "أنظمة التحكم المركزي", "أنظمة الإنذار والسلامة", "أنظمة التشغيل الذكي", "أتمتة المنشآت"],
  },
  {
    label: "طاقة احتياطية",
    icon: BatteryCharging,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
    desc: "توريد وتركيب وصيانة أنظمة الطاقة الاحتياطية",
    color: "from-yellow-500 to-amber-700",
    items: ["تركيب المولدات وصيانتها", "أنظمة UPS للحماية", "البطاريات الصناعية", "أنظمة الطاقة الشمسية الاحتياطية", "صيانة منظومات الطاقة"],
  },
  {
    label: "مواقف ذكية",
    icon: Car,
    image: "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?w=600&auto=format&fit=crop&q=80",
    desc: "تركيب وتشغيل أنظمة إدارة مواقف السيارات الذكية",
    color: "from-slate-600 to-blue-800",
    items: ["بوابات الدخول الذكية", "أنظمة التذاكر الإلكترونية", "أنظمة العدادات", "لوحات التوجيه الذكي", "أنظمة الدفع الإلكتروني"],
  },
];

const CATEGORIES = [
  {
    id: "maintenance",
    label: "الصيانة والتشغيل الفني",
    icon: Wrench,
    color: "blue",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop&q=80",
    description: "تنظم منصة GSS طلبات الصيانة التشغيلية الفنية للمرافق والفروع وتتابع تنفيذها بالتنسيق مع الموردين المعتمدين حتى إغلاق الطلب.",
    services: [
      "صيانة الكهرباء والتمديدات الكهربائية",
      "صيانة المياه والسباكة",
      "صيانة وتشغيل أنظمة التكييف",
      "الصيانة الوقائية والدورية",
      "معالجة الأعطال التشغيلية",
      "الصيانة الطارئة وخارج الدوام",
    ],
  },
  {
    id: "projects",
    label: "تجهيز الفروع والمواقع",
    icon: Building2,
    color: "indigo",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=80",
    description: "تدير منصة GSS تنسيق تجهيز الفروع والمواقع الجديدة والقائمة حتى جاهزيتها للتشغيل.",
    services: [
      "تجهيز مكتب جديد",
      "افتتاح فرع جديد",
      "إعادة تأهيل وتطوير موقع قائم",
      "تجهيز مواقع مؤقتة",
      "إغلاق وإعادة تسليم موقع",
    ],
  },
  {
    id: "work-environment",
    label: "بيئة العمل والخدمات الإدارية",
    icon: Monitor,
    color: "teal",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=80",
    description: "تنظم منصة GSS الخدمات التشغيلية اليومية المرتبطة بالمكاتب والفروع لضمان استمرارية بيئة العمل بكفاءة.",
    services: [
      "خدمات النظافة اليومية والدورية",
      "خدمات الضيافة والمأكولات والمشروبات",
      "خدمات الحراسة الأمنية",
      "المستلزمات والقرطاسية المكتبية",
      "متابعة المرافق والخدمات اليومية",
    ],
  },
  {
    id: "housing",
    label: "إسكان الموظفين",
    icon: Home,
    color: "green",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
    description: "تقوم منصة GSS بتنظيم ومتابعة الخدمات المرتبطة بإسكان الموظفين بالتنسيق مع الجهات ذات العلاقة.",
    services: [
      "تجهيز مواقع السكن الجديدة",
      "صيانة المرافق السكنية",
      "إدارة عقود الإيجار والتأمينات",
      "متابعة أصول مواقع الإسكان",
      "تنسيق انتقالات الموظفين وتسليم المواقع",
    ],
  },
  {
    id: "telecom",
    label: "خدمات الاتصالات والتقنية",
    icon: Phone,
    color: "cyan",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
    description: "تنظم منصة GSS خدمات الاتصالات والإنترنت والأنظمة التقنية التشغيلية للمواقع والفروع.",
    services: [
      "خدمات الإنترنت والشبكات",
      "الخطوط الهاتفية الداخلية والخارجية",
      "أنظمة الكاميرات والمراقبة",
      "أنظمة الحضور والانصراف",
      "الدعم الفني للأجهزة والشبكات",
    ],
  },
  {
    id: "fleet",
    label: "الأسطول والمركبات",
    icon: Car,
    color: "slate",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop&q=80",
    description: "تنظم منصة GSS الخدمات التشغيلية المرتبطة بأسطول المركبات.",
    services: [
      "صيانة المركبات وإصلاح الأعطال",
      "تجديد الاستمارات والتسجيل",
      "إدارة التأمين على المركبات",
      "متابعة حوادث المركبات",
      "الصيانة الدورية والجدولة",
    ],
  },
  {
    id: "transport",
    label: "النقل والخدمات اللوجستية",
    icon: Truck,
    color: "orange",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&auto=format&fit=crop&q=80",
    description: "تنظم منصة GSS خدمات النقل والخدمات اللوجستية المرتبطة بالمرافق والموظفين والمعدات.",
    services: [
      "نقل الموظفين بين المواقع",
      "نقل المعدات والتجهيزات",
      "نقل وتخزين الأصول التشغيلية",
      "تنسيق عمليات الشحن والتوصيل",
    ],
  },
  {
    id: "security",
    label: "الأمن والسلامة",
    icon: ShieldCheck,
    color: "red",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    description: "تتابع منصة GSS تنفيذ خدمات الأمن والسلامة بالتنسيق مع الجهات المختصة.",
    services: [
      "أنظمة الإنذار والإطفاء",
      "متطلبات الدفاع المدني",
      "تجهيز مخارج الطوارئ واللافتات",
      "إجراءات ومخططات الطوارئ",
      "تفتيش دوري على السلامة",
    ],
  },
  {
    id: "events",
    label: "الفعاليات والمناسبات التشغيلية",
    icon: Calendar,
    color: "pink",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
    description: "تنظم منصة GSS تجهيز الخدمات التشغيلية المرتبطة بالفعاليات والمناسبات.",
    services: [
      "الفعاليات الداخلية والاجتماعات",
      "المؤتمرات وورش العمل الكبرى",
      "الفعاليات الرسمية والاحتفالية",
      "التجهيزات المؤقتة للمواقع",
    ],
  },
  {
    id: "consulting",
    label: "الاستشارات التشغيلية",
    icon: Brain,
    color: "amber",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
    description: "تقدم منصة GSS دعماً استشارياً لتحسين كفاءة التشغيل وتقليل المصروفات التشغيلية.",
    highlight: true,
    services: [
      "دراسة كفاءة التشغيل وفرص التحسين",
      "مراجعة عقود الموردين وشروطها",
      "تحليل التكاليف التشغيلية وفرص التوفير",
      "إعادة تنظيم إجراءات التشغيل",
    ],
  },
  {
    id: "vendor-contracts",
    label: "إدارة عقود الموردين",
    icon: Briefcase,
    color: "purple",
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&auto=format&fit=crop&q=80",
    description: "تنظم منصة GSS عقود الموردين التشغيلية وتتابع تنفيذها والتزامهم بالشروط.",
    services: [
      "متابعة بنود وتفاصيل العقود",
      "مراجعة أداء الموردين دورياً",
      "تجديد العقود وإدارة انتهائها",
      "تحسين شروط التعاقد وخفض التكاليف",
    ],
  },
  {
    id: "budget",
    label: "الميزانية التشغيلية",
    icon: BarChart3,
    color: "lime",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=80",
    description: "تساعد منصة GSS المنشآت على ضبط المصروفات التشغيلية المرتبطة بالخدمات.",
    services: [
      "تتبع المصروفات التشغيلية الشهرية",
      "تحليل التكاليف وفرص الخفض",
      "تقارير الميزانية الدورية",
      "رفع كفاءة الإنفاق التشغيلي",
    ],
  },
  {
    id: "emergency",
    label: "الاستجابة للحالات الطارئة",
    icon: AlertTriangle,
    color: "rose",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80",
    description: "تنظم منصة GSS الاستجابة السريعة للأعطال التشغيلية المفاجئة.",
    services: [
      "انقطاع الكهرباء المفاجئ",
      "تسرب المياه والسباكة الطارئة",
      "أعطال التكييف",
      "انقطاع الإنترنت الحرج",
      "بلاغات السلامة الطارئة",
    ],
  },
  {
    id: "compliance",
    label: "الامتثال التشغيلي",
    icon: ClipboardCheck,
    color: "stone",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop&q=80",
    description: "تدعم منصة GSS المنشآت في متابعة الالتزام بالاشتراطات التشغيلية والتنظيمية.",
    services: [
      "اشتراطات الجهات الحكومية",
      "الامتثال للوائح التنظيمية",
      "متابعة السلامة المهنية",
      "تقارير الامتثال والتدقيق الدوري",
    ],
  },
  {
    id: "assets",
    label: "إدارة الأصول التشغيلية",
    icon: Package,
    color: "violet",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=80",
    description: "تنظم منصة GSS متابعة الأصول التشغيلية للمرافق والفروع وتوثيقها وجدولة صيانتها.",
    services: [
      "تسجيل الأصول وإدارة سجلاتها",
      "متابعة حالة وموقع الأصول",
      "تنسيق نقل الأصول بين المواقع",
      "جدولة صيانة الأصول الدورية",
    ],
  },
  {
    id: "licenses",
    label: "إدارة التراخيص التشغيلية",
    icon: BadgeCheck,
    color: "emerald",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80",
    description: "تتابع منصة GSS جميع التراخيص والاشتراطات التنظيمية للمنشآت وتُنبّه قبل انتهائها لضمان الامتثال الكامل وتفادي أي توقف تشغيلي.",
    services: [
      "التراخيص البلدية والبيئية",
      "شهادات واشتراطات الدفاع المدني",
      "السجل التجاري ووثائق التأسيس",
      "تصاريح وموافقات الجهات التنظيمية",
    ],
  },
  {
    id: "bills-tracking",
    label: "متابعة فواتير الخدمات التشغيلية",
    icon: Receipt,
    color: "sky",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=80",
    description: "تتولى منصة GSS رصد وتتبع جميع فواتير الخدمات التشغيلية للمنشأة، وتُحلل الاستهلاك وتُنبّه عند الشذوذ لتحقيق تحكم أفضل في التكاليف — وهي ميزة تنافسية تُميّز GSS في السوق.",
    highlight: true,
    services: [
      "فواتير الكهرباء والطاقة",
      "فواتير المياه والصرف",
      "فواتير الاتصالات والإنترنت",
      "الإيجارات التشغيلية",
      "الاشتراكات الخدمية السنوية",
    ],
  },
  {
    id: "vendor-management",
    label: "إدارة الموردين الحاليين للمنشأة",
    icon: UserCog,
    color: "fuchsia",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=80",
    description: "تُدير منصة GSS العلاقة مع موردي المنشأة الحاليين وتُقيّم أداءهم وجودة تنفيذهم، واقتراح بدائل أكثر كفاءة عند الحاجة.",
    services: [
      "تنسيق العمل مع الموردين الحاليين",
      "متابعة أداء الموردين وتقييمه",
      "مراجعة الالتزام بالشروط والمواصفات",
      "مراقبة جودة التنفيذ والتسليم",
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
  lime:   { bg: "bg-lime-50",   text: "text-lime-700",   border: "border-lime-200",   badge: "bg-lime-100 text-lime-700" },
  rose:   { bg: "bg-rose-50",   text: "text-rose-700",   border: "border-rose-200",   badge: "bg-rose-100 text-rose-700" },
  stone:   { bg: "bg-stone-50",   text: "text-stone-700",   border: "border-stone-200",   badge: "bg-stone-100 text-stone-700" },
  violet:  { bg: "bg-violet-50",  text: "text-violet-700",  border: "border-violet-200",  badge: "bg-violet-100 text-violet-700" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700" },
  sky:     { bg: "bg-sky-50",     text: "text-sky-700",     border: "border-sky-200",     badge: "bg-sky-100 text-sky-700" },
  fuchsia: { bg: "bg-fuchsia-50", text: "text-fuchsia-700", border: "border-fuchsia-200", badge: "bg-fuchsia-100 text-fuchsia-700" },
};

const CATEGORIES_EN: Record<string, { label: string; description: string; services: string[] }> = {
  maintenance:      { label: "Maintenance & Operations",        description: "GSS organizes operational maintenance requests for facilities and branches, coordinating with certified vendors until closure.", services: ["Organize daily & periodic maintenance requests", "Follow up on preventive maintenance", "Coordinate facility operational repairs", "Monitor operational asset readiness", "Coordinate site technical improvements"] },
  utilities:        { label: "Electricity & Water",             description: "GSS manages electricity and water services, coordinating with service providers to ensure operational continuity.", services: ["Follow up on electricity & water service requests", "Monitor operational bills and organize payments", "Coordinate with providers during outages", "Follow up on new site service connections", "Monitor consumption patterns and alert on unusual spikes"] },
  projects:         { label: "Branch & Site Setup",             description: "GSS manages the coordination of setting up new and existing branches and sites until they are ready for operation.", services: ["Follow up on new site setup", "Coordinate regulatory requirements", "Monitor facility operational infrastructure setup", "Coordinate handover and delivery procedures"] },
  "work-environment":{ label: "Work Environment & Admin Services", description: "GSS organizes daily operational services for offices and branches to ensure smooth operations.", services: ["Organize daily operational service requests", "Follow up on essential operational supply provisions", "Coordinate internal courier and shipping services", "Monitor inter-site delivery operations", "Organize internal correspondence services"] },
  housing:          { label: "Employee Housing",                description: "GSS organizes and follows up on employee housing services in coordination with relevant parties.", services: ["Coordinate housing site setup", "Follow up on regulatory housing requirements", "Coordinate with landlords and service providers", "Monitor housing facility operational services", "Organize site evacuation and handover procedures"] },
  telecom:          { label: "Telecom Services",                description: "GSS organizes telecom, internet, and operational technical services for sites and branches.", services: ["Organize telecom service requests", "Monitor telecom and internet bills", "Coordinate with providers for fault resolution", "Study appropriate operational alternatives", "Monitor internal phone systems"] },
  fleet:            { label: "Fleet & Vehicles",                description: "GSS organizes operational services related to the vehicle fleet.", services: ["Follow up on vehicle service requests", "Monitor vehicle contracts and bills", "Coordinate with regulatory authorities", "Follow up on vehicle operational maintenance", "Prepare fleet usage reports"] },
  transport:        { label: "Transport & Logistics",           description: "GSS organizes transport and logistics services related to facilities, employees, and equipment.", services: ["Organize inter-site transport services", "Follow up on equipment transport", "Coordinate shipping and delivery services", "Organize logistics for operational projects"] },
  security:         { label: "Security & Safety",               description: "GSS follows up on security and safety service implementation in coordination with relevant authorities.", services: ["Organize guard services", "Monitor safety and alarm systems", "Monitor fire suppression systems", "Coordinate with regulatory authorities", "Coordinate emergency and evacuation procedures"] },
  events:           { label: "Events & Occasions",              description: "GSS organizes operational services related to events and occasions.", services: ["Coordinate meeting venue setup", "Follow up on event logistics", "Organize branch opening setups", "Follow up on workshop and conference setups", "Coordinate hospitality and documentation services"] },
  consulting:       { label: "Operational Consulting",          description: "GSS provides advisory support to improve operational efficiency and reduce operational expenses.", services: ["Analyze operational expenses", "Review vendor contracts", "Improve operational procedures", "Support appropriate vendor selection", "Analyze site and branch performance", "Develop unified operational procedures", "Support regulatory compliance", "Contribute to branch expansion studies"] },
  "vendor-contracts": { label: "Vendor Contracts",             description: "GSS organizes operational vendor contracts and follows up on their execution.", services: ["Follow up on vendor contracts", "Coordinate contract renewals", "Analyze contract compliance levels", "Suggest operational alternatives when needed"] },
  budget:           { label: "Operational Budget",              description: "GSS helps facilities control operational expenses related to services.", services: ["Monitor operational service budgets", "Analyze expense variances", "Compare costs across sites", "Suggest lower-cost operational solutions", "Prepare decision-support reports"] },
  emergency:        { label: "Emergency Response",              description: "GSS organizes rapid response to sudden operational failures.", services: ["Coordinate emergency fault response", "Follow up on sudden outage cases", "Coordinate with vendors for urgent intervention", "Follow up on critical report closure"] },
  compliance:         { label: "Operational Compliance",          description: "GSS supports facilities in following up on operational regulatory requirements.", services: ["Follow up on civil defense requirements", "Follow up on municipality requirements", "Follow up on occupational safety requirements", "Follow up on operational licenses"] },
  assets:             { label: "Operational Assets",              description: "GSS organizes monitoring of operational assets for facilities and branches.", services: ["Organize operational asset records", "Monitor technical asset status", "Coordinate asset replacement when needed", "Prepare asset status reports"] },
  licenses:           { label: "Operational License Management", description: "GSS tracks all licenses and regulatory requirements for facilities, alerting before expiry to ensure full compliance and avoid operational disruption.", services: ["Follow up on municipal licenses", "Follow up on civil defense requirements", "Follow up on health licenses", "Follow up on regulatory authority permits", "Monitor operational service bills"] },
  "bills-tracking":   { label: "Operational Bills Tracking",     description: "GSS monitors all operational service bills for the facility, analyzes consumption, and alerts on anomalies for better cost control — a key competitive advantage in the market.", services: ["Follow up on electricity bills", "Follow up on water bills", "Follow up on telecom bills", "Monitor operational lease payments"] },
  "vendor-management": { label: "Facility Vendor Management",   description: "GSS manages relationships with the facility's existing vendors, evaluates their performance and execution quality, and suggests more efficient alternatives when needed.", services: ["Organize relationships with current vendors", "Monitor execution quality", "Evaluate operational performance", "Suggest alternatives when needed"] },
};

const SPECIALIZED_EN: Record<string, { label: string; desc: string }> = {
  "تكييف":                    { label: "Air Conditioning",       desc: "Installation and maintenance of all types of AC and cooling systems" },
  "كهرباء":                   { label: "Electrical",             desc: "Electrical works, wiring, and lighting maintenance" },
  "سباكة":                    { label: "Plumbing",               desc: "Plumbing, waterproofing, and water network maintenance" },
  "أجهزة ومعدات المرافق":      { label: "Facility Appliances & Equipment", desc: "Coordinating maintenance, supply, and installation of operational facility appliances and equipment" },
  "أرضيات":                   { label: "Flooring",               desc: "Installation and maintenance of all types of flooring, tiles, and parquet" },
  "دهانات":                   { label: "Painting",               desc: "Interior and exterior painting with professional finishing standards" },
  "نجارة":                    { label: "Carpentry",              desc: "Carpentry, wood installations, office and kitchen setup" },
  "جبس":                      { label: "Gypsum Works",           desc: "Gypsum installation, shaping, and wall plastering" },
  "عزل":                      { label: "Insulation",             desc: "Thermal and waterproofing insulation for roofs, walls, and floors" },
  "تنظيف":                    { label: "Cleaning",               desc: "Daily and deep cleaning of facilities and branches" },
  "مكافحة حشرات":             { label: "Pest Control",           desc: "Periodic pest and rodent control" },
  "كاميرات وأنظمة أمنية":    { label: "CCTV & Security",        desc: "Supply, installation, and maintenance of surveillance and access control systems" },
  "شبكات وتقنية":             { label: "Networks & IT",          desc: "Technical infrastructure setup for sites and offices — networks, internet, and servers" },
  "اتصالات":                  { label: "Telecom",                desc: "Phone, internet, and PBX services and coordination with service providers" },
  "أبواب أوتوماتيكية":        { label: "Automatic Doors",        desc: "Installation and maintenance of automatic glass doors, rolling shutters, and electric gates" },
  "مصاعد":                    { label: "Elevators",              desc: "Maintenance, inspection, and operation of elevators and escalators" },
  "مسابح":                    { label: "Swimming Pools",         desc: "Cleaning, maintenance, and operation of swimming pools" },
  "حدائق":                    { label: "Gardens & Landscaping",  desc: "Landscaping, planting, artificial grass, and garden maintenance" },
  "مظلات وسواتر":             { label: "Shades & Canopies",      desc: "Manufacturing, installation, and maintenance of shades, canopies, and parking covers" },
  "واجهات ولوحات":            { label: "Facades & Signage",      desc: "Installation of commercial signs, advertising boards, and building facades" },
  "معدات تجارية":             { label: "Commercial Equipment",   desc: "Supply, installation, and maintenance of commercial kitchen and café equipment" },
  "أنظمة تشغيل المباني":      { label: "Building Systems (BMS)", desc: "Setup and maintenance of BMS, alarm systems, and central control for buildings" },
  "طاقة احتياطية":            { label: "Backup Power",           desc: "Supply, installation, and maintenance of generators, UPS, and backup power systems" },
  "مواقف ذكية":               { label: "Smart Parking",          desc: "Installation and operation of smart car park management systems for complexes and facilities" },
};

// All specialized items as searchable services
const SPECIALIZED_SEARCHABLE = SPECIALIZED.flatMap(item => [
  { service: item.label, category: "أعمال متخصصة" },
  { service: item.desc, category: "أعمال متخصصة" },
]);

// Additional services that appear in registration form
const EXTRA_SERVICES = [
  { service: "تكييف وتبريد", category: "الصيانة والتشغيل" },
  { service: "سباكة وصرف صحي", category: "الصيانة والتشغيل" },
  { service: "كهرباء وإنارة", category: "الصيانة والتشغيل" },
  { service: "نجارة وتركيبات", category: "الصيانة والتشغيل" },
  { service: "دهانات ولياسة", category: "الصيانة والتشغيل" },
  { service: "أرضيات وتبليط", category: "الصيانة والتشغيل" },
  { service: "أعمال معدنية وحدادة", category: "الصيانة والتشغيل" },
  { service: "ستالايت وأنظمة بث", category: "الأمن والسلامة" },
  { service: "طفايات حريق", category: "الأمن والسلامة" },
  { service: "تنظيف يومي ودوري", category: "الصيانة والتشغيل" },
  { service: "مكافحة قوارض", category: "الصيانة والتشغيل" },
  { service: "تعقيم وتطهير", category: "الصيانة والتشغيل" },
  { service: "نقل وشحن", category: "النقل والخدمات اللوجستية" },
  { service: "صيانة أجهزة وجوالات", category: "خدمات الاتصالات" },
  { service: "شبكات إنترنت وواي فاي", category: "خدمات الاتصالات" },
  { service: "طابعات وناسخات", category: "خدمات الاتصالات" },
  { service: "التراخيص والتجديدات", category: "الخدمات الإدارية" },
  { service: "الشؤون الحكومية", category: "الخدمات الإدارية" },
  { service: "استقدام عمالة وتأشيرات", category: "الخدمات الإدارية" },
  { service: "ترجمة وثائق", category: "الخدمات الإدارية" },
  { service: "طباعة ومواد دعائية", category: "الخدمات الإدارية" },
  { service: "توريد مياه شرب", category: "الخدمات الإدارية" },
  { service: "إدارة كانتين ومطعم", category: "الخدمات الإدارية" },
  { service: "مصاعد وسلالم كهربائية", category: "الصيانة والتشغيل" },
  { service: "معدات مطابخ تجارية", category: "الصيانة والتشغيل" },
  { service: "تركيب اللوحات التجارية والإعلانية", category: "تجهيز الفروع والمشاريع" },
  { service: "أعمال الديكور والتجهيز الداخلي", category: "تجهيز الفروع والمشاريع" },
  { service: "تجهيز المطابخ التجارية", category: "تجهيز الفروع والمشاريع" },
  { service: "تجهيز غرف الخوادم والبنية التحتية", category: "خدمات الاتصالات" },
  { service: "نظام حضور وانصراف", category: "الخدمات الإدارية" },
  { service: "التوصيل السريع والبريد", category: "النقل والخدمات اللوجستية" },
  { service: "توفير سائقين خاصين", category: "النقل والخدمات اللوجستية" },
  { service: "خدمة استقبال VIP", category: "الخدمات الإدارية" },
  { service: "إدارة مواقف السيارات", category: "إدارة الأسطول والمركبات" },
  { service: "إدارة المخازن والمستودعات", category: "الخدمات الإدارية" },
  { service: "صيانة المصاعد الكهربائية", category: "الصيانة والتشغيل" },
  { service: "أعمال العزل الحراري", category: "الصيانة والتشغيل" },
  { service: "أعمال العزل المائي للأسطح", category: "الصيانة والتشغيل" },
  { service: "تنسيق المناظر الطبيعية والزراعة", category: "الصيانة والتشغيل" },
  { service: "إدارة تجديد عقود الإيجار", category: "مشاريع الإدارة الرئيسية" },
  { service: "خدمات التصوير والإنتاج", category: "الفعاليات والمناسبات" },
  { service: "صيانة أجهزة العرض والشاشات", category: "خدمات الاتصالات" },
];

// Flat list of all searchable services — CATEGORIES + SPECIALIZED + EXTRA
const SEARCHABLE_SERVICES = [
  ...CATEGORIES.flatMap(cat => cat.services.map(s => ({ service: s, category: cat.label }))),
  ...SPECIALIZED_SEARCHABLE,
  ...EXTRA_SERVICES,
];

export default function Services() {
  const { lang } = useLanguage();
  const ar = lang === "ar";
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const companyAuth = useCompanyAuth();

  const [customForm, setCustomForm] = useState({ companyName: "", accountNumber: "", employeeName: "", phone: "", email: "", description: "" });
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [showPortalModal, setShowPortalModal] = useState(false);
  const [pendingService, setPendingService] = useState("");

  function handleServiceClick(serviceName: string) {
    sessionStorage.setItem("gss_pending_service", serviceName);
    if (companyAuth.isLoggedIn) {
      navigate("/request/company-service");
    } else {
      setPendingService(serviceName);
      setShowPortalModal(true);
    }
  }

  const filteredServices = (() => {
    const q = searchQuery.trim();
    if (!q) return [];
    const seen = new Set<string>();
    return SEARCHABLE_SERVICES.filter(item => {
      const matches = item.service.includes(q) || item.category.includes(q);
      if (!matches || seen.has(item.service)) return false;
      seen.add(item.service);
      return true;
    });
  })();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customForm.description) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setSubmitting(false);
    setCustomForm({ companyName: "", accountNumber: "", employeeName: "", phone: "", email: "", description: "" });
    toast({
      title: ar ? "تم استلام طلبك بنجاح" : "Request Received Successfully",
      description: ar ? "سيتواصل معك فريق GSS لدراسة طلبك قريباً." : "The GSS team will contact you shortly to study your request.",
    });
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {ar ? "كتالوج الخدمات التشغيلية للمنشآت" : "Operational Services Catalog for Facilities"}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-10">
            {ar
              ? "تعمل منصة GSS كشريك تشغيل خارجي يتولى تنظيم ومتابعة كافة الخدمات التشغيلية للمنشآت المتعاقدة عبر نقطة اتصال واحدة، والتنسيق مع الموردين المعتمدين حتى إغلاق الطلب."
              : "GSS acts as an external operations partner managing and monitoring all operational services for contracted facilities through a single point of contact, coordinating with certified vendors until request closure."}
          </p>

          {/* Intro above search */}
          <p className="text-white/70 text-sm max-w-2xl mx-auto mb-4 leading-relaxed">
            {ar
              ? "ترفع المنشأة المتعاقدة طلبها عبر المنصة، ويتولى فريق GSS تنظيم الطلب والتنسيق مع الموردين المعتمدين ومتابعة التنفيذ حتى الإغلاق الرسمي."
              : "The contracted facility submits a request through the platform, and GSS's team organizes the request, coordinates with certified vendors, and follows up until official closure."}
          </p>

          {/* Service Search */}
          <div ref={searchRef} className="max-w-xl mx-auto relative mb-10" dir="rtl">
            <div
              className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 cursor-text shadow-xl"
              onClick={() => setIsSearchOpen(true)}
            >
              <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setIsSearchOpen(true); }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder={ar ? "ابحث عن الخدمة التي تحتاجها..." : "Search for the service you need..."}
                className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-base outline-none font-medium"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Results Dropdown */}
            {isSearchOpen && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 text-right">
                <div className="max-h-80 overflow-y-auto">
                  {searchQuery.trim().length === 0 ? (
                    <div className="px-5 py-4 text-gray-400 text-sm text-center">
                      {ar ? "ابدأ الكتابة للبحث من بين 18 تصنيفاً وأكثر من 80 مهمة تشغيلية" : "Start typing to search among 18 categories and 80+ operational tasks"}
                    </div>
                  ) : filteredServices.length > 0 ? (
                    filteredServices.slice(0, 40).map((item, i) => {
                      const cat = CATEGORIES.find(c => c.label === item.category);
                      return (
                        <div
                          key={i}
                          className="px-5 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                          onClick={() => {
                            if (cat) { scrollTo(cat.id); }
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }}
                        >
                          <p className="text-gray-800 text-sm font-medium">{item.service}</p>
                          <p className="text-gray-400 text-xs mt-0.5">{item.category}</p>
                        </div>
                      );
                    })
                  ) : (
                    <div className="px-5 py-4 text-gray-500 text-sm">{ar ? `لا توجد نتائج لـ "${searchQuery}" — جرّب كلمات مختلفة` : `No results for "${searchQuery}" — try different keywords`}</div>
                  )}
                </div>
                {/* Not found option */}
                <button
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(""); scrollTo("custom-request"); }}
                  className="w-full flex items-center gap-3 px-5 py-4 bg-primary/5 hover:bg-primary/10 border-t border-gray-100 transition-colors text-right"
                >
                  <span className="text-lg">🔎</span>
                  <div>
                    <p className="text-primary font-semibold text-sm">{ar ? "خدمة غير موجودة؟" : "Service not found?"}</p>
                    <p className="text-gray-500 text-xs">{ar ? "أرسل طلبك وسنتابع احتياجك مباشرة" : "Send your request and we'll follow up directly"}</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => scrollTo(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${cat.highlight ? "bg-secondary text-primary border-secondary" : "bg-white/10 border-white/30 text-white hover:bg-white/20"}`}
              >
                {ar ? cat.label : (CATEGORIES_EN[cat.id]?.label ?? cat.label)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {(ar ? [
              { num: "18",      label: "تصنيفاً تشغيلياً شاملاً" },
              { num: "+80",     label: "مهمة تشغيلية مغطاة" },
              { num: "واحدة",   label: "نقطة تنسيق لكل الطلبات" },
              { num: "شفاف",    label: "نموذج تسعير واضح مسبقاً" },
            ] : [
              { num: "18",       label: "Operational Service Categories" },
              { num: "80+",      label: "Operational Tasks Covered" },
              { num: "One",      label: "Single Coordination Point" },
              { num: "Transparent", label: "Clear Pre-agreed Pricing" },
            ]).map((item, i) => (
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
            <span className="inline-block bg-secondary/10 text-primary text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              {ar ? "الخدمات الفنية" : "Technical Services"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {ar ? "الخدمات الفنية والتجهيزات المتكاملة" : "Integrated Technical & Setup Services"}
            </h2>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto">
              {ar
                ? "تنظم منصة GSS خدمات التوريد والتركيب والصيانة الفنية عبر شبكة موردين معتمدين — تشمل تجهيز وتشغيل الأنظمة والمرافق والأجهزة للمنشآت المتعاقدة، مع متابعة التنفيذ حتى اكتمال الخدمة وفق متطلباتكم التشغيلية."
                : "GSS organizes supply, installation, and technical maintenance services through a network of certified vendors — covering systems, facilities, and equipment for contracted facilities, with full follow-up until service completion per your operational requirements."}
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
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer"
                onClick={() => handleServiceClick(item.label)}
              >
                {/* Background Image */}
                <div className="h-44 relative">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-75 group-hover:opacity-95 transition-opacity duration-300`} />

                  {/* Icon — visible when not hovering */}
                  <div className="absolute top-3 right-3 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:opacity-0 transition-opacity duration-200">
                    <item.icon size={18} className="text-white" />
                  </div>

                  {/* Items list — visible on hover */}
                  <div className="absolute inset-0 flex flex-col justify-center px-3 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-bold text-xs mb-2 text-center border-b border-white/30 pb-1.5">
                      {ar ? item.label : (SPECIALIZED_EN[item.label]?.label ?? item.label)}
                    </p>
                    <ul className="space-y-1">
                      {item.items.map((sub, j) => (
                        <li key={j} className="text-white/95 text-xs flex items-start gap-1.5">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-white/80 flex-shrink-0" />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Label */}
                <div className="p-3 bg-white border border-gray-100 border-t-0">
                  <p className="font-bold text-gray-900 text-sm text-center">{ar ? item.label : (SPECIALIZED_EN[item.label]?.label ?? item.label)}</p>
                </div>
              </motion.div>
            ))}

            {/* Custom / unlisted service card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              onClick={() => scrollTo("custom-request")}
              className="group rounded-2xl overflow-hidden border-2 border-dashed border-primary/30 hover:border-primary/60 cursor-pointer transition-all hover:shadow-lg"
            >
              <div className="h-40 bg-primary/5 group-hover:bg-primary/10 transition-colors flex flex-col items-center justify-center gap-2 relative">
                <div className="w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <span className="text-2xl text-primary font-bold leading-none">+</span>
                </div>
                <p className="text-primary/60 text-xs text-center px-2">{ar ? "ارفع طلبك" : "Submit Request"}</p>
              </div>
              <div className="p-3 bg-white border border-dashed border-primary/20 border-t-0">
                <p className="font-bold text-primary text-sm text-center">{ar ? "خدمة غير مذكورة؟" : "Service not listed?"}</p>
                <p className="text-gray-400 text-xs text-center mt-1">{ar ? "أرسل طلبك وسنتابعه" : "Send your request"}</p>
              </div>
            </motion.div>
          </div>
          <div className="text-center mt-10">
            <Link href="/register/company">
              <Button size="lg" className="h-12 px-10 font-bold">
                {ar ? "اطلب أي خدمة من هذه الخدمات" : "Request Any of These Services"} <ArrowLeft className="mr-2" size={18} />
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
                    <Star size={16} /> {ar ? "الخدمة الأساسية — توفير فعلي في التكاليف التشغيلية" : "Core Service — Actual Savings on Operational Costs"} <Star size={16} />
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {ar ? cat.label : (CATEGORIES_EN[cat.id]?.label ?? cat.label)}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">
                      {ar ? cat.description : (CATEGORIES_EN[cat.id]?.description ?? cat.description)}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(ar ? cat.services : (CATEGORIES_EN[cat.id]?.services ?? cat.services)).map((service, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 size={15} className={`mt-0.5 flex-shrink-0 ${colors.text}`} />
                          {service}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex gap-3 flex-wrap">
                      <button
                        type="button"
                        onClick={() => handleServiceClick(ar ? cat.label : (CATEGORIES_EN[cat.id]?.label ?? cat.label))}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors"
                      >
                        {ar ? "طلب هذه الخدمة" : "Request This Service"}
                      </button>
                      <Link href="/contact">
                        <Button variant="outline" size="sm" className={`${colors.text} border-current hover:opacity-80`}>
                          {ar ? "استفسار" : "Inquire"}
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
      <section id="custom-request" className="py-20 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ClipboardList size={32} className="text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {ar ? "خدمة غير مذكورة؟ ارفع طلبك" : "Service Not Listed? Submit Your Request"}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto">
              {ar
                ? "إذا كانت الخدمة المطلوبة غير مدرجة أعلاه، أخبرنا باحتياجكم التشغيلي وسيتولى فريق GSS دراسته وتقديم الحل المناسب."
                : "If the service you need is not listed above, tell us about your operational need and the GSS team will study it and provide a suitable solution."}
            </p>
          </div>
          <form onSubmit={handleCustomSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{ar ? "اسم المنشأة" : "Facility Name"} <span className="text-red-500">*</span></label>
                <Input value={customForm.companyName} onChange={e => setCustomForm(p => ({ ...p, companyName: e.target.value }))} placeholder={ar ? "اسم الشركة أو المنشأة" : "Company or facility name"} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{ar ? "رقم حساب المنشأة" : "Facility Account Number"}</label>
                <Input dir="ltr" value={customForm.accountNumber} onChange={e => setCustomForm(p => ({ ...p, accountNumber: e.target.value }))} placeholder="GSS-YYYY-XXXXX" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{ar ? "اسم الموظف المخوّل بالتواصل" : "Authorized Contact Name"} <span className="text-red-500">*</span></label>
                <Input value={customForm.employeeName} onChange={e => setCustomForm(p => ({ ...p, employeeName: e.target.value }))} placeholder={ar ? "الاسم حسب العقد" : "Name as per contract"} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{ar ? "رقم الجوال" : "Mobile Number"} <span className="text-red-500">*</span></label>
                <Input dir="ltr" value={customForm.phone} onChange={e => setCustomForm(p => ({ ...p, phone: e.target.value }))} placeholder="05xxxxxxxx" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{ar ? "البريد الإلكتروني" : "Email Address"}</label>
              <Input dir="ltr" type="email" value={customForm.email} onChange={e => setCustomForm(p => ({ ...p, email: e.target.value }))} placeholder="example@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{ar ? "وصف الاحتياج التشغيلي" : "Operational Need Description"} <span className="text-red-500">*</span></label>
              <Textarea
                value={customForm.description}
                onChange={e => setCustomForm(p => ({ ...p, description: e.target.value }))}
                placeholder={ar ? "صف باختصار الاحتياج التشغيلي لمنشأتكم، وسيتواصل معكم فريق GSS لدراسة الطلب وتقديم حل مناسب..." : "Briefly describe your facility's operational need, and the GSS team will get in touch to study and provide a suitable solution..."}
                rows={4}
                required
              />
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
              <strong>{ar ? "ملاحظة:" : "Note:"}</strong> {ar ? "سيتواصل معك فريق GSS خلال 24–48 ساعة لمناقشة طلبك والتحقق من إمكانية التنفيذ." : "The GSS team will contact you within 24–48 hours to discuss your request and verify feasibility."}
            </div>
            <Button type="submit" className="w-full h-12 text-base font-bold" disabled={submitting} data-testid="btn-submit-custom-request">
              {submitting ? (ar ? "جاري الإرسال..." : "Sending...") : (
                <span className="flex items-center justify-center gap-2"><Send size={18} /> {ar ? "إرسال الطلب" : "Submit Request"}</span>
              )}
            </Button>
          </form>
        </div>
      </section>

      {/* Operational Procurement Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-secondary/20 text-secondary font-bold text-xs px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              {ar ? "المشتريات التشغيلية" : "Operational Procurement"}
            </span>
            <h2 className="text-3xl font-bold mb-4">
              {ar ? "المشتريات التشغيلية المرتبطة بطلبات الخدمة" : "Operational Procurement Linked to Service Requests"}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
              {ar
                ? "في حال تطلّب تنفيذ أي خدمة توفير مواد أو قطع غيار أو أجهزة، تتولى GSS إدارة عملية التوريد كاملة — مع إمكانية طلب دفعة مقدمة قبل البدء."
                : "If any service execution requires procuring materials, spare parts, or equipment, GSS manages the entire procurement process — with the option to request a down payment before starting."}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {(ar ? [
              { icon: "🔩", label: "طلب قطع غيار",         desc: "توفير قطع الغيار اللازمة للصيانة والإصلاح" },
              { icon: "📦", label: "طلب مواد تشغيلية",     desc: "مواد ومستلزمات تشغيل الفروع والمواقع" },
              { icon: "💻", label: "طلب أجهزة ومعدات",     desc: "أجهزة وأدوات تشغيلية حسب المواصفات" },
              { icon: "💰", label: "طلب عرض سعر",           desc: "الحصول على أفضل عرض سعر من شبكة الموردين" },
              { icon: "🚚", label: "متابعة التوريد",         desc: "متابعة عمليات التوريد والتسليم حتى الاستلام" },
            ] : [
              { icon: "🔩", label: "Spare Parts Request",        desc: "Procuring spare parts needed for maintenance & repair" },
              { icon: "📦", label: "Operational Materials",       desc: "Materials and supplies for branch and site operations" },
              { icon: "💻", label: "Equipment & Devices",         desc: "Operational tools and equipment per specifications" },
              { icon: "💰", label: "Price Quotation Request",     desc: "Best quote from the certified vendor network" },
              { icon: "🚚", label: "Supply Follow-up",            desc: "Full procurement and delivery tracking until receipt" },
            ]).map((item, i) => (
              <div key={i} className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 hover:border-secondary/40 transition-all">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-white mb-1.5 text-base">{item.label}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-amber-500/10 border border-amber-400/30 rounded-2xl px-6 py-4 text-sm text-amber-300 text-center">
            <strong className="font-bold">
              {ar ? "ملاحظة مشتريات: " : "Procurement Note: "}
            </strong>
            {ar
              ? "يحق لمنصة GSS طلب دفعة مقدمة قبل البدء بأي عملية شراء — يتم الاتفاق على قيمتها مسبقاً ضمن حدود العقد المتفق عليه."
              : "GSS Platform reserves the right to request a down payment before starting any procurement process — the amount is agreed upon in advance within the contract limits."}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            {ar ? "هل أنت مستعد للبدء مع GSS؟" : "Ready to Get Started with GSS?"}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {ar
              ? "سجّل منشأتكم وسيتولى فريق GSS تنظيم جميع خدماتكم التشغيلية عبر نقطة اتصال واحدة وشبكة موردين معتمدين."
              : "Register your facility and the GSS team will organize all your operational services through a single point of contact and a certified vendor network."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register/company">
              <Button size="lg" className="h-14 px-10 text-lg font-bold bg-secondary hover:bg-secondary/90 text-primary" data-testid="cta-services-register">
                {ar ? "سجّل منشأتكم" : "Register Your Facility"} <ArrowLeft className="mr-2" size={20} />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg text-white border-white hover:bg-white/10">
                {ar ? "تواصل معنا" : "Contact Us"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Portal Selection Modal */}
      {showPortalModal && (
        <div
          className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4"
          onClick={() => setShowPortalModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowPortalModal(false)}
              className="absolute top-4 left-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <XIcon size={18} />
            </button>
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                {ar ? "اطلب الخدمة:" : "Request Service:"}
              </h2>
              <p className="text-primary font-bold text-base mb-1">{pendingService}</p>
              <p className="text-gray-500 text-sm">
                {ar ? "سجّل دخولك أو أنشئ حساباً للمتابعة" : "Sign in or create an account to continue"}
              </p>
            </div>
            <div className="flex flex-col gap-3 mb-5">
              <button
                type="button"
                onClick={() => { setShowPortalModal(false); navigate("/register/company"); }}
                className="flex flex-col items-center gap-2.5 p-5 rounded-2xl border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Building2 size={22} className="text-blue-600" />
                </div>
                <span className="font-bold text-sm text-gray-800">{ar ? "منشأة / شركة" : "Facility / Company"}</span>
                <span className="text-gray-400 text-xs text-center leading-tight">
                  {ar ? "للمنشآت والشركات المتعاقدة" : "For contracted facilities & companies"}
                </span>
              </button>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-xs">
                {ar ? "لديك حساب بالفعل؟ " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => { setShowPortalModal(false); navigate("/portal/login"); }}
                  className="text-primary font-bold hover:underline"
                >
                  {ar ? "سجّل الدخول" : "Sign In"}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
