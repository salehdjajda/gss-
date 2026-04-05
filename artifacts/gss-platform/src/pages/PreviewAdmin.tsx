import { useState } from "react";

const API_BASE = "/api";

export default function PreviewAdmin() {
  const [secret, setSecret] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!secret.trim()) return;
    setLoading(true);
    setError("");
    setGeneratedCode("");
    try {
      const res = await fetch(`${API_BASE}/access/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: secret.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.code) {
        setGeneratedCode(data.code);
      } else {
        setError(data.error || "فشل إنشاء الكود");
      }
    } catch {
      setError("تعذّر الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#0B1E3D] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-white mb-1">إنشاء كود وصول</h1>
          <p className="text-white/50 text-sm">كل كود يُستخدم مرة واحدة فقط</p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="رمز المدير السري"
            className="w-full bg-white/10 text-white text-center placeholder:text-white/30 rounded-xl px-4 py-4 outline-none border border-white/10 focus:border-white/30 transition"
          />

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading || !secret.trim()}
            className="w-full py-3.5 rounded-xl bg-[#C9A84C] hover:bg-[#b8963e] text-white font-bold text-base transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "جاري الإنشاء..." : "إنشاء كود جديد"}
          </button>
        </form>

        {generatedCode && (
          <div className="mt-8 bg-white/10 rounded-2xl p-6 text-center border border-white/20">
            <p className="text-white/50 text-xs mb-3">الكود الجديد (مرة واحدة فقط)</p>
            <p className="text-white font-mono text-3xl font-bold tracking-[0.3em] mb-5">
              {generatedCode}
            </p>
            <button
              onClick={handleCopy}
              className="w-full py-2.5 rounded-xl bg-white/15 hover:bg-white/20 text-white text-sm font-medium transition"
            >
              {copied ? "✓ تم النسخ" : "نسخ الكود"}
            </button>
            <p className="text-white/30 text-xs mt-3">
              بعد استخدامه مرة واحدة، يحترق تلقائياً
            </p>
          </div>
        )}

        <p className="text-center text-white/20 text-xs mt-8">
          GSS Platform — لوحة إدارة الوصول
        </p>
      </div>
    </div>
  );
}
