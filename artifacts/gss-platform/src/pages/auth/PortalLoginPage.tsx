import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff, Phone, Lock, Building2, Wrench, Users, UserCircle2, ArrowRight, ArrowLeft, ShieldCheck, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIndividualAuth } from "@/contexts/IndividualAuthContext";
import { useCompanyAuth, useVendorAuth, useConsultantAuth } from "@/contexts/AccountAuthContext";
import logoImg from "@assets/image_1774909317242.png";

type PortalType = "company" | "vendor" | "consultant" | "individual";

const TYPES: {
  id: PortalType;
  labelAr: string;
  labelEn: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  registerHref: string;
  registerLabelAr: string;
  registerLabelEn: string;
  descAr: string;
}[] = [
  {
    id: "company",
    labelAr: "المنشآت والشركات",
    labelEn: "Facilities",
    icon: Building2,
    color: "text-blue-600",
    bg: "bg-blue-50",
    registerHref: "/register/company",
    registerLabelAr: "تسجيل منشأة جديدة",
    registerLabelEn: "Register New Facility",
    descAr: "انتقل لنموذج تسجيل المنشأة الكامل مع جميع البيانات التشغيلية",
  },
  {
    id: "individual",
    labelAr: "الأفراد",
    labelEn: "Individuals",
    icon: UserCircle2,
    color: "text-green-600",
    bg: "bg-green-50",
    registerHref: "/register/individual",
    registerLabelAr: "تسجيل فرد جديد",
    registerLabelEn: "Register as Individual",
    descAr: "سجّل كفرد واطلب خدماتك التشغيلية",
  },
  {
    id: "vendor",
    labelAr: "الموردون",
    labelEn: "Vendors",
    icon: Wrench,
    color: "text-orange-600",
    bg: "bg-orange-50",
    registerHref: "/register/vendor",
    registerLabelAr: "تسجيل مورد جديد",
    registerLabelEn: "Register as Vendor",
    descAr: "انضم لشبكة الموردين المعتمدين لدى منصة GSS",
  },
  {
    id: "consultant",
    labelAr: "المستشارون",
    labelEn: "Consultants",
    icon: Users,
    color: "text-purple-600",
    bg: "bg-purple-50",
    registerHref: "/register/consultant",
    registerLabelAr: "تسجيل مستشار جديد",
    registerLabelEn: "Register as Consultant",
    descAr: "انضم كشريك نجاح واحصل على دخل من خبرتك",
  },
];

function LoginForm({ portalType }: { portalType: PortalType }) {
  const { lang, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginForm, setLoginForm] = useState({ phone: "", password: "" });

  const companyAuth    = useCompanyAuth();
  const vendorAuth     = useVendorAuth();
  const consultantAuth = useConsultantAuth();
  const individualAuth = useIndividualAuth();

  const authMap = { company: companyAuth, vendor: vendorAuth, consultant: consultantAuth, individual: individualAuth };
  const dashboardMap: Record<PortalType, string> = {
    company: "/dashboard/company", vendor: "/dashboard/vendor",
    consultant: "/dashboard/consultant", individual: "/dashboard/individual",
  };

  const typeInfo = TYPES.find(t => t.id === portalType)!;
  const auth = authMap[portalType];
  const Icon = typeInfo.icon;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const result = auth.login(loginForm.phone, loginForm.password);
    setLoading(false);
    if (!result.success) { setError(result.error || ""); return; }
    const pendingSvc = sessionStorage.getItem("gss_pending_service");
    if (pendingSvc && portalType === "individual") {
      navigate("/request/service");
    } else if (pendingSvc && portalType === "company") {
      navigate("/request/company-service");
    } else {
      navigate(dashboardMap[portalType]);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl ${typeInfo.bg} mb-6`}>
        <Icon size={18} className={typeInfo.color} />
        <span className={`font-bold text-sm ${typeInfo.color}`}>
          {lang === "ar" ? typeInfo.labelAr : typeInfo.labelEn}
        </span>
      </div>

      <h1 className="text-2xl font-black text-gray-900 mb-1">
        {lang === "ar" ? "مرحباً بك" : "Welcome Back"}
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        {lang === "ar" ? "سجّل دخولك للوصول إلى حسابك" : "Sign in to access your account"}
      </p>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-6">
        <button
          type="button"
          onClick={() => { setTab("login"); setError(""); }}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${tab === "login" ? "bg-white shadow text-gray-900" : "text-gray-500"}`}
        >
          {lang === "ar" ? "تسجيل الدخول" : "Sign In"}
        </button>
        <button
          type="button"
          onClick={() => setTab("register")}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${tab === "register" ? "bg-white shadow text-gray-900" : "text-gray-500"}`}
        >
          {lang === "ar" ? "حساب جديد" : "New Account"}
        </button>
      </div>

      {tab === "login" ? (
        <>
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                {lang === "ar" ? "رقم الجوال" : "Phone Number"}
              </label>
              <div className="relative">
                <Phone size={16} className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={loginForm.phone}
                  onChange={e => setLoginForm(p => ({ ...p, phone: e.target.value }))}
                  placeholder="05XXXXXXXX"
                  className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  dir="ltr"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                {lang === "ar" ? "كلمة المرور" : "Password"}
              </label>
              <div className="relative">
                <Lock size={16} className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
                <input
                  type={showPw ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={loginForm.password}
                  onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full pr-10 pl-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
              ) : (
                <>
                  {lang === "ar" ? "دخول" : "Sign In"}
                  <Arrow size={15} />
                </>
              )}
            </button>
          </form>
        </>
      ) : (
        /* حساب جديد — توجيه لصفحة التسجيل الكاملة */
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className={`p-5 rounded-2xl border-2 border-dashed ${typeInfo.bg} border-${typeInfo.color.replace("text-", "")}/30`}>
            <div className={`w-12 h-12 rounded-xl ${typeInfo.bg} border border-current/20 flex items-center justify-center mb-4`}>
              <Icon size={24} className={typeInfo.color} />
            </div>
            <h3 className="font-black text-gray-900 text-base mb-1">
              {lang === "ar" ? typeInfo.registerLabelAr : typeInfo.registerLabelEn}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              {lang === "ar" ? typeInfo.descAr : typeInfo.descAr}
            </p>
            <Link
              href={typeInfo.registerHref}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white transition-colors ${
                portalType === "company"    ? "bg-blue-600 hover:bg-blue-700" :
                portalType === "individual" ? "bg-green-600 hover:bg-green-700" :
                portalType === "vendor"     ? "bg-orange-600 hover:bg-orange-700" :
                "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              <ExternalLink size={15} />
              {lang === "ar" ? typeInfo.registerLabelAr : typeInfo.registerLabelEn}
            </Link>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-3">
            <span className="text-amber-500 text-lg">💡</span>
            <p className="text-amber-800 text-xs leading-relaxed">
              {lang === "ar"
                ? "بعد إتمام التسجيل ستتمكن من تسجيل الدخول برقم الجوال وكلمة المرور التي اخترتها."
                : "After completing registration, you can sign in using your phone number and the password you chose."}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function PortalLoginPage() {
  const { lang, isRTL } = useLanguage();
  const urlType = new URLSearchParams(window.location.search).get("type") as PortalType | null;
  const validTypes: PortalType[] = ["company", "vendor", "consultant", "individual"];
  const [selectedType, setSelectedType] = useState<PortalType | null>(
    urlType && validTypes.includes(urlType) ? urlType : null
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="overflow-hidden" style={{ height: "38px", width: "190px" }}>
            <img src={logoImg} alt="GSS" style={{ height: "122px", width: "auto", marginTop: "-42px" }} />
          </div>
        </Link>
        <Link href="/login" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-primary hover:bg-gray-50 transition-colors">
          <ShieldCheck size={15} />
          {lang === "ar" ? "إدارة المنصة" : "Platform Admin"}
        </Link>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 py-10">
        {!selectedType ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <h1 className="text-2xl font-black text-gray-900 mb-2 text-center">
              {lang === "ar" ? "تسجيل الدخول" : "Sign In"}
            </h1>
            <p className="text-gray-500 text-sm mb-8 text-center">
              {lang === "ar" ? "اختر نوع حسابك للمتابعة" : "Select your account type to continue"}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {TYPES.map(t => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedType(t.id)}
                    className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-transparent bg-white hover:border-primary/30 hover:shadow-md transition-all cursor-pointer text-center"
                  >
                    <div className={`w-12 h-12 rounded-xl ${t.bg} flex items-center justify-center`}>
                      <Icon size={22} className={t.color} />
                    </div>
                    <span className="font-bold text-sm text-gray-800">
                      {lang === "ar" ? t.labelAr : t.labelEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <button
              type="button"
              onClick={() => setSelectedType(null)}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
            >
              {isRTL ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
              {lang === "ar" ? "تغيير نوع الحساب" : "Change account type"}
            </button>
            <LoginForm portalType={selectedType} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
