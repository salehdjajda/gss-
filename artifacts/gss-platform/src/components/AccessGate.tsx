import { useState, useEffect, type ReactNode } from "react";

const STORAGE_KEY = "gss_preview_token";
const API_BASE = "/api";

async function checkToken(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/access/check`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data.valid === true;
  } catch {
    return false;
  }
}

async function verifyCode(code: string): Promise<{ valid: boolean; token?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/access/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    return await res.json();
  } catch {
    return { valid: false, error: "تعذّر الاتصال بالخادم" };
  }
}

interface Props {
  children: ReactNode;
}

export function AccessGate({ children }: Props) {
  const enabled = import.meta.env.VITE_PREVIEW_GATE === "true";

  const [status, setStatus] = useState<"checking" | "locked" | "unlocked">("checking");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isAdminPath = window.location.pathname.includes("/preview-admin");
    if (!enabled || isAdminPath) {
      setStatus("unlocked");
      return;
    }
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setStatus("locked");
      return;
    }
    checkToken(stored).then((valid) => {
      setStatus(valid ? "unlocked" : "locked");
      if (!valid) sessionStorage.removeItem(STORAGE_KEY);
    });
  }, [enabled]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError("");
    const result = await verifyCode(code.trim());
    setLoading(false);
    if (result.valid && result.token) {
      sessionStorage.setItem(STORAGE_KEY, result.token);
      setStatus("unlocked");
    } else {
      setError(result.error || "الكود غير صحيح");
      setCode("");
    }
  }

  if (status === "checking") {
    return (
      <div className="min-h-screen bg-[#0B1E3D] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "unlocked") {
    return <>{children}</>;
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#0B1E3D] flex items-center justify-center px-4"
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-5">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">محتوى مقيد</h1>
          <p className="text-white/50 text-sm">أدخل كود الوصول الذي حصلت عليه</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="أدخل رمز الدخول"
              autoFocus
              className="w-full bg-white/10 text-white text-center text-xl font-mono tracking-[0.3em] placeholder:text-white/25 rounded-xl px-4 py-4 outline-none border border-white/10 focus:border-white/30 transition"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || code.length < 4}
            className="w-full py-3.5 rounded-xl bg-[#C9A84C] hover:bg-[#b8963e] text-white font-bold text-base transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "جاري التحقق..." : "دخول"}
          </button>
        </form>

        <p className="text-center text-white/20 text-xs mt-8">
          GSS Platform — وصول مقيد
        </p>
      </div>
    </div>
  );
}
