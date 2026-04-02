import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft, ArrowRight, Lock, ChevronDown, ChevronUp, Building2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyAuth } from "@/contexts/AccountAuthContext";

const CATS_AR = [
  { icon: "🔧", title: "الصيانة التشغيلية", services: ["تكييف وتبريد", "كهرباء وإنارة", "سباكة وصرف صحي", "صيانة عامة للمنشأة", "مصاعد وسلالم كهربائية", "مكافحة الحشرات والقوارض"] },
  { icon: "🏗️", title: "أعمال التشطيب والتجهيز", services: ["دهانات ولياسة", "نجارة وتركيبات", "أرضيات وتبليط", "أعمال جبسية", "عزل حراري ومائي", "تجهيز مطابخ تجارية"] },
  { icon: "🔒", title: "الأنظمة الأمنية والتقنية", services: ["كاميرات مراقبة وأنظمة أمنية", "شبكات وواي فاي", "أنظمة التحكم بالدخول", "أنظمة إنذار وسلامة", "أبواب أوتوماتيكية"] },
  { icon: "🧹", title: "خدمات النظافة", services: ["تنظيف يومي للمكاتب", "تنظيف عميق دوري", "تنظيف الواجهات", "تعقيم وتطهير", "تنظيف ما بعد التشطيب"] },
  { icon: "🌿", title: "الخدمات الخارجية", services: ["حدائق وتنسيق المناظر", "مظلات وسواتر", "مواقف ذكية", "تركيب اللوحات والواجهات", "مسابح وأحواض"] },
  { icon: "⚡", title: "الطاقة والبنية التحتية", services: ["طاقة احتياطية ومولدات", "أنظمة UPS", "أنظمة تشغيل المباني BMS", "أنظمة الطاقة الشمسية", "صيانة محطات الكهرباء"] },
  { icon: "📦", title: "التوريد والخدمات اللوجستية", services: ["توريد مستلزمات تشغيلية", "معدات تجارية", "أجهزة مكتبية وإلكترونيات", "نقل وشحن"] },
  { icon: "📋", title: "الخدمات الإدارية", services: ["متابعة فواتير الخدمات", "تجديد التراخيص التشغيلية", "إدارة عقود الموردين", "الشؤون الحكومية"] },
];

const CATS_EN = [
  { icon: "🔧", title: "Operational Maintenance", services: ["AC & Cooling", "Electrical & Lighting", "Plumbing & Drainage", "General Facility Maintenance", "Elevators & Escalators", "Pest Control"] },
  { icon: "🏗️", title: "Finishing & Fit-Out", services: ["Painting & Plastering", "Carpentry", "Tiling & Flooring", "Gypsum Works", "Insulation", "Commercial Kitchen Fit-Out"] },
  { icon: "🔒", title: "Security & Tech Systems", services: ["CCTV & Security Systems", "Networks & Wi-Fi", "Access Control Systems", "Alarm & Safety Systems", "Automatic Doors"] },
  { icon: "🧹", title: "Cleaning Services", services: ["Daily Office Cleaning", "Deep Periodic Cleaning", "Facade Cleaning", "Sanitization", "Post-Construction Cleaning"] },
  { icon: "🌿", title: "Outdoor Services", services: ["Landscaping & Gardens", "Shade Structures", "Smart Parking", "Signage & Facades", "Swimming Pools"] },
  { icon: "⚡", title: "Energy & Infrastructure", services: ["Backup Power & Generators", "UPS Systems", "Building Management Systems", "Solar Energy Systems", "Electrical Maintenance"] },
  { icon: "📦", title: "Supply & Logistics", services: ["Operational Supplies", "Commercial Equipment", "Office Equipment & Electronics", "Transport & Shipping"] },
  { icon: "📋", title: "Administrative Services", services: ["Utility Bill Follow-Up", "License Renewal", "Vendor Contract Management", "Government Affairs"] },
];

const COMPANY_REQUESTS_KEY = "gss_company_requests";

export interface CompanyServiceRequest {
  id: string;
  accountNumber: string;
  companyName: string;
  service: string;
  details: string;
  preferredTime: string;
  status: "pending" | "confirmed" | "in_progress" | "completed";
  submittedAt: string;
}

export function getCompanyRequests(accountNumber: string): CompanyServiceRequest[] {
  try {
    const all = JSON.parse(localStorage.getItem(COMPANY_REQUESTS_KEY) || "[]") as CompanyServiceRequest[];
    return all.filter(r => r.accountNumber === accountNumber);
  } catch { return []; }
}

export default function RequestServiceCompany() {
  const { lang, isRTL } = useLanguage();
  const { account, isLoggedIn } = useCompanyAuth();
  const [, navigate] = useLocation();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const CATS = lang === "ar" ? CATS_AR : CATS_EN;

  const [selectedService, setSelectedService] = useState(() => {
    const pending = sessionStorage.getItem("gss_pending_service");
    if (pending) { sessionStorage.removeItem("gss_pending_service"); return pending; }
    return "";
  });
  const [details, setDetails] = useState("");
  const [preferredTime, setTime] = useState("");
  const [openCat, setOpenCat] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isLoggedIn || !account) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <Lock size={28} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          {lang === "ar" ? "يجب تسجيل الدخول أولاً" : "Sign In Required"}
        </h2>
        <p className="text-gray-500 text-sm text-center max-w-xs">
          {lang === "ar"
            ? "لرفع طلب خدمة يجب أن يكون لديك حساب منشأة على منصة GSS"
            : "To submit a service request, you need a facility account on GSS Platform"}
        </p>
        <div className="flex gap-3">
          <Link href="/register/company">
            <Button className="font-bold">{lang === "ar" ? "سجّل منشأتك" : "Register Facility"}</Button>
          </Link>
          <Link href="/portal/login?type=company">
            <Button variant="outline">{lang === "ar" ? "تسجيل الدخول" : "Sign In"}</Button>
          </Link>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {lang === "ar" ? "تم إرسال طلبك!" : "Request Submitted!"}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-2">
            {lang === "ar"
              ? "سيتواصل معك فريق GSS خلال ساعات لتأكيد العرض والموعد."
              : "The GSS team will contact you within hours to confirm the offer and schedule."}
          </p>
          <p className="text-xs text-gray-400 mb-8">
            {lang === "ar" ? "رقم حسابك: " : "Account: "}
            <span className="font-mono font-bold text-primary">{account.accountNumber}</span>
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/dashboard/company">
              <Button className="w-full font-bold">
                {lang === "ar" ? "عرض طلباتي" : "View My Requests"}
              </Button>
            </Link>
            <Button variant="outline" className="w-full font-bold"
              onClick={() => { setSubmitted(false); setSelectedService(""); setDetails(""); setTime(""); }}>
              {lang === "ar" ? "طلب آخر" : "Another Request"}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedService || !account) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const req: CompanyServiceRequest = {
      id: `CREQ-${Date.now()}`,
      accountNumber: account.accountNumber,
      companyName: account.name,
      service: selectedService,
      details,
      preferredTime,
      status: "pending",
      submittedAt: new Date().toLocaleString("ar-SA"),
    };
    const all = JSON.parse(localStorage.getItem(COMPANY_REQUESTS_KEY) || "[]") as CompanyServiceRequest[];
    all.push(req);
    localStorage.setItem(COMPANY_REQUESTS_KEY, JSON.stringify(all));
    setLoading(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-1">
            <div>
              <span className="inline-block bg-blue-100 text-blue-700 font-bold text-xs px-3 py-1 rounded-full mb-3 flex items-center gap-1.5">
                <Building2 size={12} />
                {lang === "ar" ? "طلب خدمة — المنشآت" : "Service Request — Facilities"}
              </span>
              <h1 className="text-2xl font-bold text-gray-900">
                {lang === "ar" ? "اختر الخدمة التي تحتاجها" : "Choose the Service You Need"}
              </h1>
            </div>
            <div className="text-end shrink-0">
              <p className="text-xs text-gray-400">{lang === "ar" ? "رقم الحساب" : "Account"}</p>
              <p className="font-mono text-xs font-bold text-primary">{account.accountNumber}</p>
              <p className="text-xs text-gray-500 mt-0.5">{account.name}</p>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <span className="bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-black">1</span>
                {lang === "ar" ? "اختر الخدمة" : "Select the Service"}
                {selectedService && <span className="text-primary text-xs font-medium">← {selectedService}</span>}
              </h2>
            </div>
            <div className="divide-y divide-gray-50">
              {CATS.map((cat, ci) => (
                <div key={ci}>
                  <button type="button" onClick={() => setOpenCat(openCat === ci ? null : ci)}
                    className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors text-start">
                    <span className="flex items-center gap-2.5">
                      <span className="text-xl">{cat.icon}</span>
                      <span className="font-medium text-gray-800 text-sm">{cat.title}</span>
                    </span>
                    {openCat === ci ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </button>
                  {openCat === ci && (
                    <div className="px-5 pb-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cat.services.map((svc, si) => (
                        <button key={si} type="button"
                          onClick={() => setSelectedService(svc)}
                          className={`text-start text-sm px-3 py-2.5 rounded-xl border transition-all ${
                            selectedService === svc
                              ? "bg-primary text-white border-primary font-bold"
                              : "border-gray-100 text-gray-600 hover:border-primary/40 hover:bg-gray-50"
                          }`}
                        >
                          {selectedService === svc && "✓ "}{svc}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="px-5 py-3">
                <p className="text-xs text-gray-400 mb-2">
                  {lang === "ar" ? "أو حدد خدمة مخصصة:" : "Or specify a custom service:"}
                </p>
                <input type="text"
                  value={selectedService.startsWith("__custom__") ? selectedService.replace("__custom__", "") : ""}
                  onChange={e => setSelectedService(e.target.value ? "__custom__" + e.target.value : "")}
                  className="w-full border border-dashed border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  placeholder={lang === "ar" ? "اكتب الخدمة المطلوبة..." : "Type the service you need..."}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-5">
            <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2 mb-3">
              <span className="bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-black">2</span>
              {lang === "ar" ? "تفاصيل الطلب" : "Request Details"}
            </h2>
            <textarea required rows={4}
              value={details}
              onChange={e => setDetails(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
              placeholder={lang === "ar"
                ? "صف ما تحتاجه بالتفصيل — الموقع، عدد الفروع، حجم الطلب، وأي متطلبات خاصة"
                : "Describe your needs in detail — location, number of branches, scope, and any special requirements"}
            />
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-5">
            <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2 mb-3">
              <span className="bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-black">3</span>
              {lang === "ar" ? "الوقت المناسب للتنفيذ" : "Preferred Execution Time"}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { val: "urgent",     ar: "عاجل (خلال 24 ساعة)",  en: "Urgent (within 24h)" },
                { val: "this_week",  ar: "هذا الأسبوع",            en: "This Week" },
                { val: "next_week",  ar: "الأسبوع القادم",         en: "Next Week" },
                { val: "scheduled",  ar: "بحسب الجدول",            en: "Per Schedule" },
              ].map(opt => (
                <button key={opt.val} type="button"
                  onClick={() => setTime(opt.val)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                    preferredTime === opt.val
                      ? "bg-primary text-white border-primary"
                      : "border-gray-200 text-gray-600 hover:border-primary/40"
                  }`}
                >
                  {lang === "ar" ? opt.ar : opt.en}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl px-5 py-3 flex flex-wrap gap-4 justify-center text-xs text-blue-700 font-medium">
            {(lang === "ar"
              ? ["✓ موردون معتمدون", "✓ أسعار تنافسية", "✓ تقارير متابعة دورية"]
              : ["✓ Certified Vendors", "✓ Competitive Pricing", "✓ Regular Progress Reports"]
            ).map((b, i) => <span key={i}>{b}</span>)}
          </div>

          <Button type="submit" size="lg" className="w-full h-13 text-base font-bold"
            disabled={loading || !selectedService || !details}>
            {loading
              ? (lang === "ar" ? "جاري الإرسال..." : "Sending...")
              : (lang === "ar" ? "أرسل طلب الخدمة" : "Submit Service Request")}
            {!loading && <Arrow className="ms-2" size={18} />}
          </Button>
        </form>
      </div>
    </div>
  );
}
