import { useState, useEffect, useCallback, type ReactNode } from "react";

const STORAGE_KEY = "gss_preview_token";
const API = "/api";

async function checkToken(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${API}/access/check`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return (await res.json()).valid === true;
  } catch {
    return false;
  }
}

async function requestOTP(): Promise<{ requestId: string } | null> {
  try {
    const res = await fetch(`${API}/access/request-otp`, { method: "POST" });
    return await res.json();
  } catch {
    return null;
  }
}

async function verifyOTP(
  requestId: string,
  otp: string,
): Promise<{ valid: boolean; token?: string; error?: string }> {
  try {
    const res = await fetch(`${API}/access/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId, otp }),
    });
    return await res.json();
  } catch {
    return { valid: false, error: "تعذّر الاتصال بالخادم" };
  }
}

// ─── Content Guard (blur on focus loss) ─────────────────────────────────────

function ContentGuard({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onHide = () => setHidden(true);
    const onShow = () => setHidden(false);
    const onVisibility = () => setHidden(document.hidden);

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", onHide);
    window.addEventListener("focus", onShow);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", onHide);
      window.removeEventListener("focus", onShow);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {children}
      {hidden && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#0B1E3D",
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <svg width="48" height="48" fill="none" stroke="white" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "15px", fontFamily: "Arial" }}>
            عُد إلى النافذة للمتابعة
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Main AccessGate ─────────────────────────────────────────────────────────

type Step = "checking" | "request" | "enter-otp" | "unlocked";

interface Props {
  children: ReactNode;
}

export function AccessGate({ children }: Props) {
  const enabled = import.meta.env.VITE_PREVIEW_GATE === "true";

  const [step, setStep] = useState<Step>("checking");
  const [requestId, setRequestId] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (!enabled) { setStep("unlocked"); return; }
    const token = sessionStorage.getItem(STORAGE_KEY);
    if (!token) { setStep("request"); return; }
    checkToken(token).then((valid) => {
      if (valid) setStep("unlocked");
      else { sessionStorage.removeItem(STORAGE_KEY); setStep("request"); }
    });
  }, [enabled]);

  const handleRequest = useCallback(async () => {
    setRequesting(true);
    setError("");
    const result = await requestOTP();
    setRequesting(false);
    if (!result) { setError("تعذّر الاتصال، حاول مرة أخرى"); return; }
    setRequestId(result.requestId);
    setStep("enter-otp");
  }, []);

  const handleVerify = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!otp.trim()) return;
      setVerifying(true);
      setError("");
      const result = await verifyOTP(requestId, otp.trim());
      setVerifying(false);
      if (result.valid && result.token) {
        sessionStorage.setItem(STORAGE_KEY, result.token);
        setStep("unlocked");
      } else {
        setError(result.error || "الرمز غير صحيح");
        setOtp("");
      }
    },
    [requestId, otp],
  );

  if (step === "checking") {
    return (
      <div className="min-h-screen bg-[#0B1E3D] flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (step === "unlocked") {
    return <ContentGuard>{children}</ContentGuard>;
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#0B1E3D] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo / Lock Icon */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-5">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">محتوى مقيد</h1>
          <p className="text-white/50 text-sm">
            {step === "request"
              ? "هذا المحتوى متاح بإذن فقط"
              : "أدخل الرمز الذي أرسله لك المدير"}
          </p>
        </div>

        {/* Step: Request OTP */}
        {step === "request" && (
          <div className="space-y-4">
            <button
              onClick={handleRequest}
              disabled={requesting}
              className="w-full py-4 rounded-xl bg-[#C9A84C] hover:bg-[#b8963e] text-white font-bold text-base transition disabled:opacity-50"
            >
              {requesting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                  جاري الإرسال...
                </span>
              ) : (
                "طلب رمز الدخول"
              )}
            </button>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <p className="text-white/25 text-xs text-center leading-relaxed">
              سيتلقى المدير إشعاراً ويرسل لك رمز الدخول
            </p>
          </div>
        )}

        {/* Step: Enter OTP */}
        {step === "enter-otp" && (
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center mb-2">
              <p className="text-green-400 text-sm font-medium">✓ تم إرسال الطلب إلى المدير</p>
              <p className="text-white/40 text-xs mt-1">انتظر الرمز منه ثم أدخله أدناه</p>
            </div>

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="أدخل رمز التحقق"
              autoFocus
              inputMode="numeric"
              className="w-full bg-white/10 text-white text-center text-2xl font-mono tracking-[0.25em] placeholder:text-white/25 placeholder:text-base placeholder:tracking-normal rounded-xl px-4 py-4 outline-none border border-white/10 focus:border-[#C9A84C]/60 transition"
            />

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={verifying || !otp.trim()}
              className="w-full py-3.5 rounded-xl bg-[#C9A84C] hover:bg-[#b8963e] text-white font-bold text-base transition disabled:opacity-40"
            >
              {verifying ? "جاري التحقق..." : "دخول"}
            </button>

            <button
              type="button"
              onClick={() => { setStep("request"); setOtp(""); setError(""); }}
              className="w-full py-2 text-white/30 hover:text-white/50 text-sm transition"
            >
              طلب رمز جديد
            </button>
          </form>
        )}

        <p className="text-center text-white/15 text-xs mt-10">GSS Platform</p>
      </div>
    </div>
  );
}
