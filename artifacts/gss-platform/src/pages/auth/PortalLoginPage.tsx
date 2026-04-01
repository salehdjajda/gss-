import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff, Phone, Lock, User, MapPin, Building2, Wrench, Users, UserCircle2, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIndividualAuth } from "@/contexts/IndividualAuthContext";
import { useCompanyAuth, useVendorAuth, useConsultantAuth } from "@/contexts/AccountAuthContext";
import logoImg from "@assets/image_1774909317242.png";

type PortalType = "company" | "vendor" | "consultant" | "individual";

const TYPES: { id: PortalType; labelAr: string; labelEn: string; icon: React.ElementType; color: string; bg: string; registerHref: string }[] = [
  { id: "company",    labelAr: "المنشآت والشركات", labelEn: "Facilities",  icon: Building2,    color: "text-blue-600",   bg: "bg-blue-50",   registerHref: "/register/company" },
  { id: "individual", labelAr: "الأفراد",          labelEn: "Individuals", icon: UserCircle2,  color: "text-green-600",  bg: "bg-green-50",  registerHref: "/register/individual" },
  { id: "vendor",     labelAr: "الموردون",         labelEn: "Vendors",     icon: Wrench,       color: "text-orange-600", bg: "bg-orange-50", registerHref: "/register/vendor" },
  { id: "consultant", labelAr: "المستشارون",       labelEn: "Consultants", icon: Users,        color: "text-purple-600", bg: "bg-purple-50", registerHref: "/register/consultant" },
];

const CITIES_AR = ["الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام", "الخبر", "الطائف", "تبوك", "أبها", "القصيم", "حائل", "جيزان", "نجران", "أخرى"];

function LoginForm({ portalType }: { portalType: PortalType }) {
  const { lang, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginForm, setLoginForm] = useState({ phone: "", password: "" });
  const [regForm, setRegForm] = useState({ name: "", phone: "", password: "", confirmPw: "", city: "" });

  const companyAuth    = useCompanyAuth();
  const vendorAuth     = useVendorAuth();
  const consultantAuth = useConsultantAuth();
  const individualAuth = useIndividualAuth();

  const authMap = {
    company:    companyAuth,
    vendor:     vendorAuth,
    consultant: consultantAuth,
    individual: individualAuth,
  };

  const dashboardMap: Record<PortalType, string> = {
    company:    "/dashboard/company",
    vendor:     "/dashboard/vendor",
    consultant: "/dashboard/consultant",
    individual: "/dashboard/individual",
  };

  const typeInfo = TYPES.find(t => t.id === portalType)!;
  const auth = authMap[portalType];

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const result = auth.login(loginForm.phone, loginForm.password);
    setLoading(false);
    if (!result.success) { setError(result.error || ""); return; }
    navigate(dashboardMap[portalType]);
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (regForm.password !== regForm.confirmPw) {
      setError(lang === "ar" ? "كلمة المرور غير متطابقة" : "Passwords do not match");
      return;
    }
    if (regForm.password.length < 6) {
      setError(lang === "ar" ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل" : "Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const result = auth.register({ name: regForm.name, phone: regForm.phone, password: regForm.password, city: regForm.city || undefined });
    setLoading(false);
    if (!result.success) { setError(result.error || ""); return; }
    navigate(dashboardMap[portalType]);
  }

  const Icon = typeInfo.icon;

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
          onClick={() => { setTab("register"); setError(""); }}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${tab === "register" ? "bg-white shadow text-gray-900" : "text-gray-500"}`}
        >
          {lang === "ar" ? "حساب جديد" : "New Account"}
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
          {error}
        </div>
      )}

      {tab === "login" ? (
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
                placeholder={lang === "ar" ? "05XXXXXXXX" : "05XXXXXXXX"}
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
      ) : (
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              {lang === "ar" ? (portalType === "company" ? "اسم المنشأة / الشركة" : "الاسم الكامل") : "Full Name"}
            </label>
            <div className="relative">
              <User size={16} className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
              <input
                type="text"
                required
                value={regForm.name}
                onChange={e => setRegForm(p => ({ ...p, name: e.target.value }))}
                placeholder={lang === "ar" ? "الاسم..." : "Name..."}
                className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              {lang === "ar" ? "رقم الجوال" : "Phone Number"}
            </label>
            <div className="relative">
              <Phone size={16} className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
              <input
                type="tel"
                required
                value={regForm.phone}
                onChange={e => setRegForm(p => ({ ...p, phone: e.target.value }))}
                placeholder="05XXXXXXXX"
                className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                dir="ltr"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              {lang === "ar" ? "المدينة" : "City"}
            </label>
            <div className="relative">
              <MapPin size={16} className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 pointer-events-none" />
              <select
                value={regForm.city}
                onChange={e => setRegForm(p => ({ ...p, city: e.target.value }))}
                className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white appearance-none"
              >
                <option value="">{lang === "ar" ? "اختر المدينة (اختياري)" : "Select city (optional)"}</option>
                {CITIES_AR.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
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
                minLength={6}
                value={regForm.password}
                onChange={e => setRegForm(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                className="w-full pr-10 pl-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              {lang === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"}
            </label>
            <div className="relative">
              <Lock size={16} className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
              <input
                type={showPw ? "text" : "password"}
                required
                value={regForm.confirmPw}
                onChange={e => setRegForm(p => ({ ...p, confirmPw: e.target.value }))}
                placeholder="••••••••"
                className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
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
                {lang === "ar" ? "إنشاء الحساب" : "Create Account"}
                <Arrow size={15} />
              </>
            )}
          </button>
          {portalType !== "individual" && (
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              {lang === "ar"
                ? "بعد التسجيل يمكنك إكمال بيانات منشأتك من "
                : "After signing up you can complete your profile from "}
              <Link href={typeInfo.registerHref} className="text-primary font-bold hover:underline">
                {lang === "ar" ? "صفحة التسجيل الكامل" : "the full registration page"}
              </Link>
            </p>
          )}
        </form>
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
        <Link href="/">
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
                    className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-transparent bg-white hover:border-primary/30 hover:shadow-md transition-all cursor-pointer text-center`}
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
