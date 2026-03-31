import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ArrowLeft, ArrowRight, UserCircle2, Phone, Lock, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIndividualAuth } from "@/contexts/IndividualAuthContext";

const CITIES_AR = ["الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام", "الخبر", "الطائف", "تبوك", "أبها", "القصيم", "حائل", "جيزان", "نجران", "الجوف", "أخرى"];
const CITIES_EN = ["Riyadh", "Jeddah", "Makkah", "Madinah", "Dammam", "Khobar", "Taif", "Tabuk", "Abha", "Qassim", "Hail", "Jazan", "Najran", "Al-Jouf", "Other"];

export default function RegisterIndividual() {
  const { lang, isRTL } = useLanguage();
  const { register }    = useIndividualAuth();
  const [, navigate]    = useLocation();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const CITIES = lang === "ar" ? CITIES_AR : CITIES_EN;

  const [tab,     setTab]    = useState<"register" | "login">("register");
  const [showPw,  setShowPw] = useState(false);
  const [loading, setLoading]= useState(false);
  const [error,   setError]  = useState("");

  const [regForm, setRegForm] = useState({ name: "", phone: "", city: "", password: "", confirmPw: "" });
  const [loginForm, setLoginForm] = useState({ phone: "", password: "" });

  const { login } = useIndividualAuth();

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
    const result = register({ name: regForm.name, phone: regForm.phone, city: regForm.city, password: regForm.password });
    setLoading(false);
    if (!result.success) { setError(result.error || ""); return; }
    navigate("/dashboard/individual");
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const result = login(loginForm.phone, loginForm.password);
    setLoading(false);
    if (!result.success) { setError(result.error || ""); return; }
    navigate("/dashboard/individual");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserCircle2 size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {lang === "ar" ? "بوابة الأفراد — منصة GSS" : "Individual Portal — GSS Platform"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {lang === "ar" ? "سجّل حسابك واحصل على رقم عضويتك" : "Register your account and get your membership number"}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
          <button
            onClick={() => { setTab("register"); setError(""); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === "register" ? "bg-white shadow text-primary" : "text-gray-500"}`}
          >
            {lang === "ar" ? "حساب جديد" : "New Account"}
          </button>
          <button
            onClick={() => { setTab("login"); setError(""); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === "login" ? "bg-white shadow text-primary" : "text-gray-500"}`}
          >
            {lang === "ar" ? "تسجيل الدخول" : "Sign In"}
          </button>
        </div>

        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">

          {/* ── REGISTER ── */}
          {tab === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  {lang === "ar" ? "الاسم الكامل" : "Full Name"} *
                </label>
                <div className="relative">
                  <UserCircle2 size={16} className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400" />
                  <input type="text" required
                    value={regForm.name}
                    onChange={e => setRegForm({ ...regForm, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl ps-9 pe-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    placeholder={lang === "ar" ? "محمد أحمد" : "John Smith"}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  {lang === "ar" ? "رقم الجوال" : "Phone Number"} *
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400" />
                  <input type="tel" required dir="ltr"
                    value={regForm.phone}
                    onChange={e => setRegForm({ ...regForm, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl ps-9 pe-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    placeholder="05XXXXXXXX"
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  {lang === "ar" ? "المدينة" : "City"} *
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400" />
                  <select required
                    value={regForm.city}
                    onChange={e => setRegForm({ ...regForm, city: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl ps-9 pe-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white appearance-none"
                  >
                    <option value="">{lang === "ar" ? "اختر مدينتك" : "Select your city"}</option>
                    {CITIES.map((c, i) => <option key={i} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  {lang === "ar" ? "كلمة المرور" : "Password"} *
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400" />
                  <input type={showPw ? "text" : "password"} required
                    value={regForm.password}
                    onChange={e => setRegForm({ ...regForm, password: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl ps-9 pe-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    placeholder={lang === "ar" ? "6 أحرف على الأقل" : "At least 6 characters"}
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute top-1/2 -translate-y-1/2 end-3 text-gray-400 hover:text-gray-600">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  {lang === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"} *
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400" />
                  <input type={showPw ? "text" : "password"} required
                    value={regForm.confirmPw}
                    onChange={e => setRegForm({ ...regForm, confirmPw: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl ps-9 pe-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    placeholder={lang === "ar" ? "أعد كتابة كلمة المرور" : "Re-enter password"}
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

              <Button type="submit" className="w-full h-12 font-bold text-base" disabled={loading}>
                {loading
                  ? (lang === "ar" ? "جاري إنشاء الحساب..." : "Creating account...")
                  : (lang === "ar" ? "أنشئ حسابي واحصل على رقم العضوية" : "Create My Account")}
                {!loading && <Arrow className="ms-2" size={18} />}
              </Button>

              <div className="bg-green-50 rounded-2xl px-4 py-3 text-xs text-green-700 text-center leading-relaxed">
                {lang === "ar"
                  ? "✓ سعر المورد المباشر  ✓ فنيون مرخصون  ✓ ضمان الجودة"
                  : "✓ Direct Vendor Price  ✓ Licensed Technicians  ✓ Quality Guarantee"}
              </div>
            </form>
          )}

          {/* ── LOGIN ── */}
          {tab === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  {lang === "ar" ? "رقم الجوال" : "Phone Number"} *
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400" />
                  <input type="tel" required dir="ltr"
                    value={loginForm.phone}
                    onChange={e => setLoginForm({ ...loginForm, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl ps-9 pe-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    placeholder="05XXXXXXXX"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  {lang === "ar" ? "كلمة المرور" : "Password"} *
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400" />
                  <input type={showPw ? "text" : "password"} required
                    value={loginForm.password}
                    onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl ps-9 pe-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute top-1/2 -translate-y-1/2 end-3 text-gray-400 hover:text-gray-600">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

              <Button type="submit" className="w-full h-12 font-bold text-base" disabled={loading}>
                {loading
                  ? (lang === "ar" ? "جاري تسجيل الدخول..." : "Signing in...")
                  : (lang === "ar" ? "سجّل الدخول" : "Sign In")}
                {!loading && <Arrow className="ms-2" size={18} />}
              </Button>

              <p className="text-center text-sm text-gray-500">
                {lang === "ar" ? "ليس لديك حساب؟ " : "No account? "}
                <button type="button" onClick={() => setTab("register")} className="text-primary font-bold hover:underline">
                  {lang === "ar" ? "سجّل الآن" : "Register now"}
                </button>
              </p>
            </form>
          )}
        </motion.div>

        <p className="text-center text-gray-400 text-xs mt-5">
          {lang === "ar"
            ? "بالتسجيل توافق على شروط الخدمة وسياسة الخصوصية الخاصة بمنصة GSS"
            : "By registering you agree to GSS Platform's Terms of Service and Privacy Policy"}
        </p>
      </div>
    </div>
  );
}
