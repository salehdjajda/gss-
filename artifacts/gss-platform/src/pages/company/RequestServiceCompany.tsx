import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2, ArrowLeft, Lock, ChevronDown, ChevronUp,
  Building2, AlertTriangle, Package, Info,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyAuth } from "@/contexts/AccountAuthContext";

const WORK_ORDERS_KEY = "gss_work_orders";

export type WorkOrderStatus =
  | "received"
  | "work_order"
  | "vendor"
  | "in_progress"
  | "pending_approval"
  | "closed"
  | "invoiced";

export interface WorkOrder {
  id: string;
  accountNumber: string;
  companyName: string;
  category: string;
  subService: string;
  branch: string;
  priority: "urgent" | "high" | "normal" | "scheduled";
  details: string;
  isProcurement: boolean;
  procurementType: string;
  status: WorkOrderStatus;
  statusHistory: Array<{ status: WorkOrderStatus; date: string; note?: string }>;
  submittedAt: string;
  estimatedDays?: number;
  vendorName?: string;
}

export function getWorkOrders(accountNumber: string): WorkOrder[] {
  try {
    const all = JSON.parse(localStorage.getItem(WORK_ORDERS_KEY) || "[]") as WorkOrder[];
    return all.filter(r => r.accountNumber === accountNumber);
  } catch { return []; }
}

export function updateWorkOrderStatus(id: string, newStatus: WorkOrderStatus, note?: string) {
  try {
    const all = JSON.parse(localStorage.getItem(WORK_ORDERS_KEY) || "[]") as WorkOrder[];
    const idx = all.findIndex(o => o.id === id);
    if (idx === -1) return false;
    all[idx].status = newStatus;
    all[idx].statusHistory.push({ status: newStatus, date: new Date().toLocaleString("ar-SA"), note });
    localStorage.setItem(WORK_ORDERS_KEY, JSON.stringify(all));
    return true;
  } catch { return false; }
}

const CATS_AR = [
  {
    icon: "🔧", id: "maintenance",
    title: "الصيانة والتشغيل الفني",
    services: ["صيانة الكهرباء والتمديدات الكهربائية", "صيانة المياه والسباكة", "صيانة وتشغيل أنظمة التكييف", "الصيانة الوقائية والدورية", "معالجة الأعطال التشغيلية", "الصيانة الطارئة وخارج الدوام"],
  },
  {
    icon: "🏗️", id: "projects",
    title: "تجهيز الفروع والمواقع",
    services: ["تجهيز مكتب جديد", "افتتاح فرع جديد", "إعادة تأهيل وتطوير موقع قائم", "تجهيز مواقع مؤقتة", "إغلاق وإعادة تسليم موقع"],
  },
  {
    icon: "🏢", id: "work-env",
    title: "بيئة العمل والخدمات الإدارية",
    services: ["خدمات النظافة اليومية والدورية", "خدمات الضيافة والمأكولات والمشروبات", "خدمات الحراسة الأمنية", "المستلزمات والقرطاسية المكتبية", "متابعة المرافق والخدمات اليومية"],
  },
  {
    icon: "🏠", id: "housing",
    title: "إسكان الموظفين",
    services: ["تجهيز مواقع السكن الجديدة", "صيانة المرافق السكنية", "إدارة عقود الإيجار والتأمينات", "متابعة أصول مواقع الإسكان", "تنسيق انتقالات الموظفين وتسليم المواقع"],
  },
  {
    icon: "📡", id: "telecom",
    title: "خدمات الاتصالات والتقنية",
    services: ["خدمات الإنترنت والشبكات", "الخطوط الهاتفية الداخلية والخارجية", "أنظمة الكاميرات والمراقبة", "أنظمة الحضور والانصراف", "الدعم الفني للأجهزة والشبكات"],
  },
  {
    icon: "🚗", id: "fleet",
    title: "الأسطول والمركبات",
    services: ["صيانة المركبات وإصلاح الأعطال", "تجديد الاستمارات والتسجيل", "إدارة التأمين على المركبات", "متابعة حوادث المركبات", "الصيانة الدورية والجدولة"],
  },
  {
    icon: "🚚", id: "transport",
    title: "النقل والخدمات اللوجستية",
    services: ["نقل الموظفين بين المواقع", "نقل المعدات والتجهيزات", "نقل وتخزين الأصول التشغيلية", "تنسيق عمليات الشحن والتوصيل"],
  },
  {
    icon: "🛡️", id: "security",
    title: "الأمن والسلامة",
    services: ["أنظمة الإنذار والإطفاء", "متطلبات الدفاع المدني", "تجهيز مخارج الطوارئ واللافتات", "إجراءات ومخططات الطوارئ", "تفتيش دوري على السلامة"],
  },
  {
    icon: "🎪", id: "events",
    title: "الفعاليات والمناسبات التشغيلية",
    services: ["الفعاليات الداخلية والاجتماعات", "المؤتمرات وورش العمل الكبرى", "الفعاليات الرسمية والاحتفالية", "التجهيزات المؤقتة للمواقع"],
  },
  {
    icon: "💡", id: "consulting",
    title: "الاستشارات التشغيلية",
    services: ["دراسة كفاءة التشغيل وفرص التحسين", "مراجعة عقود الموردين وشروطها", "تحليل التكاليف التشغيلية وفرص التوفير", "إعادة تنظيم إجراءات التشغيل"],
  },
  {
    icon: "📝", id: "vendor-contracts",
    title: "إدارة عقود الموردين",
    services: ["متابعة بنود وتفاصيل العقود", "مراجعة أداء الموردين دورياً", "تجديد العقود وإدارة انتهائها", "تحسين شروط التعاقد وخفض التكاليف"],
  },
  {
    icon: "📊", id: "budget",
    title: "إدارة الميزانية التشغيلية",
    services: ["تتبع المصروفات التشغيلية الشهرية", "تحليل التكاليف وفرص الخفض", "تقارير الميزانية الدورية", "رفع كفاءة الإنفاق التشغيلي"],
  },
  {
    icon: "⚡", id: "emergency",
    title: "الاستجابة للحالات الطارئة",
    services: ["انقطاع الكهرباء المفاجئ", "تسرب المياه والسباكة الطارئة", "أعطال التكييف", "انقطاع الإنترنت الحرج", "بلاغات السلامة الطارئة"],
  },
  {
    icon: "✅", id: "compliance",
    title: "الامتثال التشغيلي",
    services: ["اشتراطات الجهات الحكومية", "الامتثال للوائح التنظيمية", "متابعة السلامة المهنية", "تقارير الامتثال والتدقيق الدوري"],
  },
  {
    icon: "📦", id: "assets",
    title: "إدارة الأصول التشغيلية",
    services: ["تسجيل الأصول وإدارة سجلاتها", "متابعة حالة وموقع الأصول", "تنسيق نقل الأصول بين المواقع", "جدولة صيانة الأصول الدورية"],
  },
  {
    icon: "🪪", id: "licenses",
    title: "إدارة التراخيص التشغيلية",
    services: ["التراخيص البلدية والبيئية", "شهادات واشتراطات الدفاع المدني", "السجل التجاري ووثائق التأسيس", "تصاريح وموافقات الجهات التنظيمية"],
  },
  {
    icon: "🧾", id: "bills",
    title: "متابعة فواتير الخدمات التشغيلية",
    services: ["فواتير الكهرباء والطاقة", "فواتير المياه والصرف", "فواتير الاتصالات والإنترنت", "الإيجارات التشغيلية", "الاشتراكات الخدمية السنوية"],
  },
  {
    icon: "🤝", id: "vendor-mgmt",
    title: "إدارة الموردين الحاليين للمنشأة",
    services: ["تنسيق العمل مع الموردين الحاليين", "متابعة أداء الموردين وتقييمه", "مراجعة الالتزام بالشروط والمواصفات", "مراقبة جودة التنفيذ والتسليم"],
  },
];

const CATS_EN = [
  { icon: "🔧", id: "maintenance", title: "Technical Maintenance & Operations", services: ["Electrical & Wiring Maintenance", "Water & Plumbing Maintenance", "AC System Maintenance & Operation", "Preventive & Periodic Maintenance", "Operational Fault Resolution", "Emergency & After-Hours Maintenance"] },
  { icon: "🏗️", id: "projects", title: "Branch & Site Setup", services: ["New Office Setup", "New Branch Opening", "Site Rehabilitation & Development", "Temporary Site Setup", "Site Closure & Handover"] },
  { icon: "🏢", id: "work-env", title: "Work Environment & Admin Services", services: ["Daily & Periodic Cleaning Services", "Hospitality & Food Services", "Security Guard Services", "Office Supplies & Stationery", "Daily Utilities & Facilities Monitoring"] },
  { icon: "🏠", id: "housing", title: "Employee Housing", services: ["New Housing Site Setup", "Residential Facility Maintenance", "Lease & Insurance Contract Management", "Housing Asset Tracking", "Employee Relocation & Site Handover"] },
  { icon: "📡", id: "telecom", title: "Telecom & Technology Services", services: ["Internet & Network Services", "Internal & External Phone Lines", "Camera & Surveillance Systems", "Attendance & Access Systems", "Technical Support for Devices & Networks"] },
  { icon: "🚗", id: "fleet", title: "Fleet & Vehicles", services: ["Vehicle Maintenance & Repairs", "Registration & Re-registration", "Vehicle Insurance Management", "Accident Follow-up", "Periodic Maintenance Scheduling"] },
  { icon: "🚚", id: "transport", title: "Transport & Logistics", services: ["Employee Transport Between Sites", "Equipment & Fixture Transport", "Asset Storage & Transfer", "Shipping & Delivery Coordination"] },
  { icon: "🛡️", id: "security", title: "Security & Safety", services: ["Alarm & Fire Suppression Systems", "Civil Defense Requirements", "Emergency Exit & Signage Setup", "Emergency Procedures & Plans", "Periodic Safety Inspection"] },
  { icon: "🎪", id: "events", title: "Operational Events & Occasions", services: ["Internal Events & Meetings", "Large Conferences & Workshops", "Official & Ceremonial Events", "Temporary Site Setups"] },
  { icon: "💡", id: "consulting", title: "Operational Consulting", services: ["Efficiency Study & Improvement Opportunities", "Vendor Contract Review", "Cost Analysis & Savings", "Operations Reorganization"] },
  { icon: "📝", id: "vendor-contracts", title: "Vendor Contract Management", services: ["Contract Terms Monitoring", "Periodic Vendor Performance Review", "Contract Renewal Management", "Contract Condition Improvement"] },
  { icon: "📊", id: "budget", title: "Operational Budget Management", services: ["Monthly Expense Tracking", "Cost Analysis & Reduction", "Periodic Budget Reports", "Operational Spending Efficiency"] },
  { icon: "⚡", id: "emergency", title: "Emergency Response", services: ["Sudden Power Outage", "Water Leak & Emergency Plumbing", "AC System Failure", "Critical Internet Outage", "Safety Emergency Reports"] },
  { icon: "✅", id: "compliance", title: "Operational Compliance", services: ["Government Entity Requirements", "Regulatory Compliance", "Occupational Safety Monitoring", "Compliance & Audit Reports"] },
  { icon: "📦", id: "assets", title: "Operational Asset Management", services: ["Asset Registration & Records", "Asset Status & Location Tracking", "Asset Transfer Coordination", "Asset Maintenance Scheduling"] },
  { icon: "🪪", id: "licenses", title: "Operational License Management", services: ["Municipal & Environmental Licenses", "Civil Defense Certificates & Requirements", "Commercial Registration Documents", "Regulatory Permits & Approvals"] },
  { icon: "🧾", id: "bills", title: "Utility Bill Tracking", services: ["Electricity & Energy Bills", "Water & Drainage Bills", "Telecom & Internet Bills", "Operational Lease Payments", "Annual Service Subscriptions"] },
  { icon: "🤝", id: "vendor-mgmt", title: "Current Vendor Management", services: ["Coordination with Existing Vendors", "Vendor Performance Monitoring", "Contract Terms Compliance Review", "Execution & Delivery Quality Control"] },
];

const PROCUREMENT_ITEMS_AR = [
  { id: "spare_parts",       label: "طلب قطع غيار",       icon: "🔩", desc: "قطع غيار للصيانة والإصلاح" },
  { id: "materials",         label: "طلب مواد تشغيلية",   icon: "📦", desc: "مواد ومستلزمات التشغيل" },
  { id: "equipment",         label: "طلب أجهزة ومعدات",   icon: "💻", desc: "أجهزة وأدوات تشغيلية" },
  { id: "quotation",         label: "طلب عرض سعر",         icon: "💰", desc: "الحصول على أفضل عرض سعر" },
  { id: "supply_followup",   label: "متابعة التوريد",       icon: "🚚", desc: "متابعة توريد وتسليم" },
];

const PROCUREMENT_ITEMS_EN = [
  { id: "spare_parts",       label: "Spare Parts Request",     icon: "🔩", desc: "Spare parts for maintenance & repair" },
  { id: "materials",         label: "Operational Materials",   icon: "📦", desc: "Materials and operational supplies" },
  { id: "equipment",         label: "Equipment & Devices",     icon: "💻", desc: "Operational tools & equipment" },
  { id: "quotation",         label: "Price Quotation Request", icon: "💰", desc: "Get best quote from vendor network" },
  { id: "supply_followup",   label: "Supply Follow-up",        icon: "🚚", desc: "Track supply and delivery" },
];

const PRIORITY_AR = [
  { val: "urgent",    label: "طارئ — خلال ساعات",    color: "border-red-400 bg-red-50 text-red-700" },
  { val: "high",      label: "عاجل — خلال 24 ساعة",  color: "border-orange-400 bg-orange-50 text-orange-700" },
  { val: "normal",    label: "عادي — خلال أسبوع",    color: "border-primary bg-primary/5 text-primary" },
  { val: "scheduled", label: "مجدول — بحسب الاتفاق", color: "border-gray-300 bg-gray-50 text-gray-600" },
];

const PRIORITY_EN = [
  { val: "urgent",    label: "Emergency — Within Hours", color: "border-red-400 bg-red-50 text-red-700" },
  { val: "high",      label: "Urgent — Within 24h",      color: "border-orange-400 bg-orange-50 text-orange-700" },
  { val: "normal",    label: "Normal — Within a Week",   color: "border-primary bg-primary/5 text-primary" },
  { val: "scheduled", label: "Scheduled — As Agreed",    color: "border-gray-300 bg-gray-50 text-gray-600" },
];

export default function RequestServiceCompany() {
  const { lang } = useLanguage();
  const ar = lang === "ar";
  const { account, isLoggedIn } = useCompanyAuth();
  const [, navigate] = useLocation();

  const CATS = ar ? CATS_AR : CATS_EN;
  const PROCUREMENT_ITEMS = ar ? PROCUREMENT_ITEMS_AR : PROCUREMENT_ITEMS_EN;
  const PRIORITY_OPTIONS = ar ? PRIORITY_AR : PRIORITY_EN;

  const [step, setStep] = useState(1);
  const [requestType, setRequestType] = useState<"service" | "procurement">("service");
  const [selectedCatIdx, setSelectedCatIdx] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState("");
  const [selectedProcurement, setSelectedProcurement] = useState("");
  const [branch, setBranch] = useState("");
  const [priority, setPriority] = useState("normal");
  const [details, setDetails] = useState("");
  const [customService, setCustomService] = useState("");
  const [openCat, setOpenCat] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState("");

  const effectiveService = requestType === "procurement"
    ? selectedProcurement
    : (selectedService || (customService ? `${ar ? "خدمة مخصصة: " : "Custom: "}${customService}` : ""));

  const step1Valid = !!effectiveService;
  const step2Valid = !!branch && !!priority;
  const step3Valid = !!details.trim();

  function goStep(n: number) { setStep(n); window.scrollTo({ top: 0, behavior: "smooth" }); }

  if (!isLoggedIn || !account) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <Lock size={28} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">{ar ? "يجب تسجيل الدخول أولاً" : "Sign In Required"}</h2>
        <p className="text-gray-500 text-sm text-center max-w-xs">
          {ar ? "لرفع طلب خدمة يجب أن يكون لديك حساب منشأة على منصة GSS" : "To submit a service request, you need a facility account on GSS Platform"}
        </p>
        <div className="flex gap-3">
          <Link href="/register/company"><Button className="font-bold">{ar ? "سجّل منشأتك" : "Register Facility"}</Button></Link>
          <Link href="/portal/login?type=company"><Button variant="outline">{ar ? "تسجيل الدخول" : "Sign In"}</Button></Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{ar ? "تم استلام طلبك!" : "Request Received!"}</h2>
          <p className="text-xs font-mono text-primary mb-1">{submittedId}</p>
          <p className="text-gray-500 text-sm leading-relaxed mb-2">
            {ar
              ? "سيتولى فريق GSS مراجعة الطلب وإصدار أمر العمل الرسمي وإشعارك خلال ساعات."
              : "The GSS team will review the request, issue the official work order, and notify you within hours."}
          </p>
          {requestType === "procurement" && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5 text-xs text-amber-800 text-start">
              <strong>{ar ? "ملاحظة مشتريات: " : "Procurement Note: "}</strong>
              {ar ? "قد يُطلب منكم دفعة مقدمة قبل البدء بعملية التوريد." : "A down payment may be required before procurement begins."}
            </div>
          )}
          <div className="flex flex-col gap-3">
            <Link href="/dashboard/company/work-orders">
              <Button className="w-full font-bold">{ar ? "تابع أوامر العمل" : "Track Work Orders"}</Button>
            </Link>
            <Button variant="outline" className="w-full font-bold"
              onClick={() => { setSubmitted(false); setStep(1); setSelectedService(""); setSelectedProcurement(""); setDetails(""); setBranch(""); setCustomService(""); }}>
              {ar ? "طلب آخر" : "New Request"}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!account || !effectiveService) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const id = `WO-${Date.now()}`;
    const cat = CATS.find((_, i) => i === selectedCatIdx);
    const wo: WorkOrder = {
      id,
      accountNumber: account.accountNumber,
      companyName: account.name,
      category: requestType === "procurement" ? (ar ? "المشتريات التشغيلية" : "Operational Procurement") : (cat?.title || ""),
      subService: effectiveService,
      branch,
      priority: priority as WorkOrder["priority"],
      details,
      isProcurement: requestType === "procurement",
      procurementType: requestType === "procurement" ? selectedProcurement : "",
      status: "received",
      statusHistory: [{ status: "received", date: new Date().toLocaleString("ar-SA") }],
      submittedAt: new Date().toLocaleString("ar-SA"),
      estimatedDays: priority === "urgent" ? 1 : priority === "high" ? 3 : 7,
    };
    const all = JSON.parse(localStorage.getItem(WORK_ORDERS_KEY) || "[]") as WorkOrder[];
    all.push(wo);
    localStorage.setItem(WORK_ORDERS_KEY, JSON.stringify(all));
    setSubmittedId(id);
    setLoading(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-primary text-white py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-block bg-white/10 text-white/80 font-bold text-xs px-3 py-1 rounded-full mb-3">
                {ar ? "بوابة العميل — رفع طلب تشغيلي" : "Client Portal — Submit Operational Request"}
              </span>
              <h1 className="text-2xl font-bold">{ar ? "طلب خدمة تشغيلية" : "Operational Service Request"}</h1>
            </div>
            <div className="text-end">
              <p className="text-xs text-white/60">{ar ? "رقم الحساب" : "Account"}</p>
              <p className="font-mono text-sm font-bold text-secondary">{account.accountNumber}</p>
              <p className="text-xs text-white/70 mt-0.5">{account.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-6">
            {[1, 2, 3].map(n => (
              <div key={n} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  step > n ? "bg-secondary border-secondary text-primary" :
                  step === n ? "bg-white border-white text-primary" :
                  "bg-white/10 border-white/30 text-white/50"
                }`}>
                  {step > n ? "✓" : n}
                </div>
                <span className={`text-xs font-medium ${step >= n ? "text-white" : "text-white/40"}`}>
                  {ar
                    ? [null, "الخدمة", "الموقع والأولوية", "التفاصيل والإرسال"][n]
                    : [null, "Service", "Location & Priority", "Details & Submit"][n]
                  }
                </span>
                {n < 3 && <div className="w-8 h-0.5 bg-white/20 mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-8">
        {/* STEP 1: Service Selection */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex gap-3 mb-6">
              <button type="button" onClick={() => setRequestType("service")}
                className={`flex-1 py-3 rounded-2xl text-sm font-bold border-2 transition-all ${requestType === "service" ? "border-primary bg-primary text-white" : "border-gray-200 bg-white text-gray-600 hover:border-primary/30"}`}>
                🔧 {ar ? "طلب خدمة تشغيلية" : "Service Request"}
              </button>
              <button type="button" onClick={() => setRequestType("procurement")}
                className={`flex-1 py-3 rounded-2xl text-sm font-bold border-2 transition-all ${requestType === "procurement" ? "border-secondary bg-secondary/10 text-secondary border-secondary" : "border-gray-200 bg-white text-gray-600 hover:border-secondary/30"}`}>
                📦 {ar ? "طلب مشتريات" : "Procurement Request"}
              </button>
            </div>

            {requestType === "service" ? (
              <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden mb-4">
                <div className="px-5 py-4 border-b border-gray-50">
                  <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    <span className="bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-black">1</span>
                    {ar ? "اختر التصنيف والخدمة" : "Choose Category & Service"}
                    {selectedService && (
                      <span className="text-primary text-xs font-medium bg-primary/10 px-2 py-0.5 rounded-full">
                        ✓ {selectedService}
                      </span>
                    )}
                  </h2>
                </div>
                <div className="divide-y divide-gray-50">
                  {CATS.map((cat, ci) => (
                    <div key={ci}>
                      <button type="button" onClick={() => setOpenCat(openCat === ci ? null : ci)}
                        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors text-start">
                        <span className="flex items-center gap-2.5">
                          <span className="text-lg">{cat.icon}</span>
                          <span className="font-medium text-gray-800 text-sm">{cat.title}</span>
                        </span>
                        {openCat === ci ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                      </button>
                      {openCat === ci && (
                        <div className="px-5 pb-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {cat.services.map((svc, si) => (
                            <button key={si} type="button"
                              onClick={() => { setSelectedService(svc); setSelectedCatIdx(ci); setCustomService(""); }}
                              className={`text-start text-sm px-3 py-2.5 rounded-xl border transition-all ${
                                selectedService === svc
                                  ? "bg-primary text-white border-primary font-bold"
                                  : "border-gray-100 text-gray-600 hover:border-primary/40 hover:bg-primary/5"
                              }`}
                            >
                              {selectedService === svc && "✓ "}{svc}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Unlisted service option */}
                  <div className="px-5 py-4 bg-gray-50/50">
                    <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                      <Info size={12} />
                      {ar ? "خدمة غير مذكورة في القائمة:" : "Service not listed above:"}
                    </p>
                    <input type="text"
                      value={customService}
                      onChange={e => { setCustomService(e.target.value); if (e.target.value) { setSelectedService(""); setSelectedCatIdx(null); } }}
                      className="w-full border border-dashed border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
                      placeholder={ar ? "اكتب الخدمة التي تحتاجها..." : "Describe the service you need..."}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 mb-4">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 text-sm text-amber-800">
                  <strong>{ar ? "تنبيه: " : "Notice: "}</strong>
                  {ar
                    ? "قد تتطلب طلبات المشتريات دفعة مقدمة قبل البدء بالتوريد. سيتم إبلاغكم بذلك قبل التنفيذ."
                    : "Procurement requests may require a down payment before supply begins. You will be notified in advance."}
                </div>
                {PROCUREMENT_ITEMS.map((item) => (
                  <button key={item.id} type="button"
                    onClick={() => setSelectedProcurement(item.label)}
                    className={`w-full text-start flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all ${
                      selectedProcurement === item.label
                        ? "border-secondary bg-secondary/5"
                        : "border-gray-200 bg-white hover:border-secondary/40"
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <p className={`font-bold text-sm ${selectedProcurement === item.label ? "text-secondary" : "text-gray-800"}`}>
                        {selectedProcurement === item.label && "✓ "}{item.label}
                      </p>
                      <p className="text-gray-400 text-xs">{item.desc}</p>
                    </div>
                    {selectedProcurement === item.label && (
                      <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                        <CheckCircle2 size={14} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            <Button className="w-full h-12 font-bold" disabled={!step1Valid}
              onClick={() => goStep(2)}>
              {ar ? "التالي — الموقع والأولوية" : "Next — Location & Priority"} <ArrowLeft className="ms-2" size={18} />
            </Button>
          </motion.div>
        )}

        {/* STEP 2: Branch + Priority */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl px-5 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">{ar ? "الخدمة المختارة" : "Selected Service"}</p>
                <p className="font-bold text-primary text-sm">{effectiveService}</p>
              </div>
              <button type="button" onClick={() => goStep(1)} className="text-xs text-gray-400 underline">{ar ? "تغيير" : "Change"}</button>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2 mb-4">
                <Building2 size={16} className="text-primary" />
                {ar ? "الفرع أو الموقع" : "Branch or Location"}
              </h2>
              <input type="text" value={branch} onChange={e => setBranch(e.target.value)} required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                placeholder={ar ? "مثال: الرياض — الفرع الرئيسي / مستودع جدة / موقع المشروع" : "e.g., Riyadh Main Branch / Jeddah Warehouse / Project Site"}
              />
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2 mb-4">
                <AlertTriangle size={16} className="text-primary" />
                {ar ? "مستوى الأولوية" : "Priority Level"}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {PRIORITY_OPTIONS.map(opt => (
                  <button key={opt.val} type="button" onClick={() => setPriority(opt.val)}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border-2 transition-all text-start leading-tight ${
                      priority === opt.val ? opt.color + " font-black" : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}>
                    {priority === opt.val && "● "}{opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 h-12 font-bold border-gray-200" onClick={() => goStep(1)}>
                {ar ? "السابق" : "Back"}
              </Button>
              <Button className="flex-1 h-12 font-bold" disabled={!step2Valid} onClick={() => goStep(3)}>
                {ar ? "التالي" : "Next"} <ArrowLeft className="ms-2" size={18} />
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Details + Submit */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-primary/5 border border-primary/10 rounded-2xl px-5 py-3 space-y-1 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">{ar ? "الخدمة" : "Service"}</span>
                  <span className="font-bold text-primary text-xs">{effectiveService}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">{ar ? "الموقع" : "Location"}</span>
                  <span className="text-gray-700 text-xs">{branch}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">{ar ? "الأولوية" : "Priority"}</span>
                  <span className="text-gray-700 text-xs">
                    {PRIORITY_OPTIONS.find(p => p.val === priority)?.label}
                  </span>
                </div>
                <button type="button" onClick={() => goStep(1)} className="text-xs text-primary/70 underline block">
                  {ar ? "تعديل" : "Edit"}
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2 mb-3">
                  <Package size={16} className="text-primary" />
                  {ar ? "تفاصيل الطلب (مطلوب)" : "Request Details (Required)"}
                </h2>
                <textarea required rows={5} value={details} onChange={e => setDetails(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                  placeholder={ar
                    ? "صف الطلب بالتفصيل — نوع المشكلة، الكميات، المواصفات، وأي متطلبات خاصة..."
                    : "Describe the request in detail — issue type, quantities, specifications, and special requirements..."}
                />
              </div>

              {requestType === "procurement" && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 text-sm text-amber-900">
                  <p className="font-bold mb-1">{ar ? "تنبيه المشتريات:" : "Procurement Note:"}</p>
                  <p className="text-xs leading-relaxed">
                    {ar
                      ? "سيقوم فريق GSS بمقارنة عروض الأسعار من الموردين المعتمدين وإشعارك بأفضل سعر قبل التنفيذ. يحق للمنصة طلب دفعة مقدمة قبل بدء التوريد."
                      : "The GSS team will compare quotes from certified vendors and notify you of the best price before proceeding. The platform may request a down payment before supply begins."}
                  </p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 text-xs text-blue-800 leading-relaxed">
                <p className="font-bold mb-1 flex items-center gap-2">
                  <Info size={14} className="text-blue-500 flex-shrink-0" />
                  {ar ? "تنبيه قبل الإرسال:" : "Pre-Submission Notice:"}
                </p>
                <p>
                  {ar
                    ? "قد يتطلب بعض الطلبات إعداد عرض فني أو زيارة ميدانية أو تنسيق مع الموردين. في هذه الحالة سيتم إشعاركم مسبقًا بأي رسوم مرتبطة بإعداد العرض قبل البدء في دراسته. لا يُعتبر الطلب أمر تنفيذ ملزمًا إلا بعد اعتماد التكلفة من الجهة المفوضة."
                    : "Some requests may require a technical proposal, site visit, or vendor coordination. In such cases, you will be notified in advance of any fees related to quote preparation before it begins. A request is not a binding execution order until the cost is approved by the authorized party."}
                </p>
                {ar && (
                  <p className="mt-2 text-blue-600 font-medium">
                    عملاء الباقات التشغيلية لا يتم احتساب رسوم إعداد عروض الأسعار عليهم.
                  </p>
                )}
                {!ar && (
                  <p className="mt-2 text-blue-600 font-medium">
                    Operational package subscribers are not charged for quote preparation fees.
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" type="button" className="flex-1 h-12 font-bold border-gray-200" onClick={() => goStep(2)}>
                  {ar ? "السابق" : "Back"}
                </Button>
                <Button type="submit" className="flex-1 h-12 font-bold" disabled={loading || !step3Valid}>
                  {loading
                    ? (ar ? "جاري الإرسال..." : "Submitting...")
                    : (ar ? "إرسال الطلب" : "Submit Request")}
                  {!loading && <ArrowLeft className="ms-2" size={18} />}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
