import { useState } from "react";
import { useLocation } from "wouter";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Eye, EyeOff, AlertCircle } from "lucide-react";
import logoImg from "@assets/image_1774909317242.png";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setTimeout(() => {
      const ok = login(password);
      if (ok) {
        setLocation("/admin/dashboard");
      } else {
        setError(true);
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary/90 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-primary px-8 py-10 text-center">
            <div className="overflow-hidden mx-auto mb-4" style={{ height: "46px", width: "210px" }}>
              <img
                src={logoImg}
                alt="GSS"
                style={{ height: "140px", width: "auto", marginTop: "-48px", mixBlendMode: "screen", filter: "invert(1) hue-rotate(180deg) brightness(1.15) contrast(1.1)" }}
              />
            </div>
            <div className="flex items-center justify-center gap-2 mt-3">
              <Shield size={18} className="text-secondary" />
              <span className="text-white font-bold text-lg">لوحة التحكم الإدارية</span>
            </div>
            <p className="text-primary-foreground/70 text-sm mt-1">GSS Admin Panel</p>
          </div>

          <div className="px-8 py-10">
            <p className="text-gray-500 text-sm text-center mb-8">
              هذه المنطقة مخصصة لفريق GSS الداخلي فقط
            </p>
            <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">كلمة المرور</label>
                <div className="relative">
                  <Input
                    type={showPass ? "text" : "password"}
                    placeholder="أدخل كلمة مرور الإدارة"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(false); }}
                    className={`h-12 pr-4 pl-10 text-base ${error ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {error && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                    <AlertCircle size={14} />
                    <span>كلمة المرور غير صحيحة</span>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-bold"
                disabled={!password || loading}
              >
                {loading ? "جاري التحقق..." : "دخول"}
              </Button>
            </form>
          </div>
        </div>
        <p className="text-center text-slate-400 text-xs mt-6">
          © {new Date().getFullYear()} General Support Services — للاستخدام الداخلي فقط
        </p>
      </div>
    </div>
  );
}
