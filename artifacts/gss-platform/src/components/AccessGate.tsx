import { useState, useEffect, useCallback, type ReactNode } from "react";

const GUEST_KEY = "gss_guest_token";
const ADMIN_KEY = "gss_admin_token";
const API = "/api";

async function checkSession(token: string): Promise<{ valid: boolean; isAdmin: boolean }> {
  try {
    const res = await fetch(`${API}/access/check`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return { valid: data.valid === true, isAdmin: data.isAdmin === true };
  } catch {
    return { valid: false, isAdmin: false };
  }
}

async function adminLogin(secret: string): Promise<{ valid: boolean; token?: string }> {
  try {
    const res = await fetch(`${API}/access/admin-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret }),
    });
    return await res.json();
  } catch {
    return { valid: false };
  }
}

async function useGuestToken(
  token: string,
): Promise<{ valid: boolean; token?: string; error?: string }> {
  try {
    const res = await fetch(`${API}/access/use-guest?token=${encodeURIComponent(token)}`);
    return await res.json();
  } catch {
    return { valid: false, error: "تعذّر الاتصال بالخادم" };
  }
}

async function generateGuestLink(adminToken: string): Promise<string | null> {
  try {
    const res = await fetch(`${API}/access/admin/generate-link`, {
      method: "POST",
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const data = await res.json();
    return data.token ?? null;
  } catch {
    return null;
  }
}

// ─── Content Guard ─────────────────────────────────────────────────────────────

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
            gap: "16px",
          }}
        >
          <svg
            width="44"
            height="44"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "15px",
              fontFamily: "Arial, sans-serif",
              margin: 0,
            }}
          >
            عُد إلى النافذة للمتابعة
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Admin Panel (floating) ────────────────────────────────────────────────────

function AdminPanel({ adminToken }: { adminToken: string }) {
  const [open, setOpen] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = useCallback(async () => {
    setLoading(true);
    setGeneratedUrl(null);
    const token = await generateGuestLink(adminToken);
    setLoading(false);
    if (token) {
      const url = `${window.location.origin}${window.location.pathname}?g=${token}`;
      setGeneratedUrl(url);
    }
  }, [adminToken]);

  const copy = useCallback(() => {
    if (!generatedUrl) return;
    navigator.clipboard.writeText(generatedUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [generatedUrl]);

  return (
    <div
      dir="rtl"
      style={{
        position: "fixed",
        bottom: 24,
        left: 24,
        zIndex: 9999,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {open && (
        <div
          style={{
            background: "#0B1E3D",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 16,
            padding: 20,
            marginBottom: 12,
            width: 300,
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <p
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 14,
              margin: "0 0 14px",
            }}
          >
            توليد رابط ضيف
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 12,
              margin: "0 0 14px",
              lineHeight: 1.6,
            }}
          >
            أرسل الرابط للضيف — يفتح مرة واحدة فقط ثم ينتهي
          </p>

          {generatedUrl ? (
            <>
              <div
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 8,
                  padding: "10px 12px",
                  marginBottom: 10,
                  wordBreak: "break-all",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.7)",
                  direction: "ltr",
                  textAlign: "left",
                }}
              >
                {generatedUrl}
              </div>
              <button
                onClick={copy}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: 10,
                  background: copied ? "#22c55e" : "#C9A84C",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 13,
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  marginBottom: 8,
                }}
              >
                {copied ? "تم النسخ!" : "نسخ الرابط"}
              </button>
              <button
                onClick={generate}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 12,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                توليد رابط جديد
              </button>
            </>
          ) : (
            <button
              onClick={generate}
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 10,
                background: loading ? "rgba(201,168,76,0.4)" : "#C9A84C",
                color: "white",
                fontWeight: "bold",
                fontSize: 14,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "جاري التوليد..." : "توليد رابط"}
            </button>
          )}
        </div>
      )}

      <button
        onClick={() => {
          setOpen((o) => !o);
          if (!open) {
            setGeneratedUrl(null);
          }
        }}
        title="لوحة المدير"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          borderRadius: 50,
          background: "#0B1E3D",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.8)",
          fontSize: 13,
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        }}
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
        رابط ضيف
      </button>
    </div>
  );
}

// ─── Denied Screen ─────────────────────────────────────────────────────────────

function DeniedScreen({ message }: { message: string }) {
  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#0B1E3D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 320 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "rgba(248,113,113,0.12)",
            marginBottom: 20,
          }}
        >
          <svg width="30" height="30" fill="none" stroke="#f87171" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        </div>
        <h1 style={{ color: "white", fontSize: 20, fontWeight: "bold", margin: "0 0 8px" }}>
          لا يمكن الوصول
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
          {message}
        </p>
        <p style={{ color: "rgba(255,255,255,0.1)", fontSize: 11, marginTop: 40 }}>
          GSS Platform
        </p>
      </div>
    </div>
  );
}

// ─── Loading Screen ────────────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0B1E3D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          border: "2px solid rgba(255,255,255,0.15)",
          borderTop: "2px solid white",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── Access Gate ───────────────────────────────────────────────────────────────

interface Props {
  children: ReactNode;
}

type GateState =
  | { status: "checking" }
  | { status: "unlocked"; isAdmin: boolean; adminToken: string }
  | { status: "denied"; message: string };

export function AccessGate({ children }: Props) {
  const enabled = import.meta.env.VITE_PREVIEW_GATE === "true";
  const [gate, setGate] = useState<GateState>({ status: "checking" });

  useEffect(() => {
    if (!enabled) {
      setGate({ status: "unlocked", isAdmin: false, adminToken: "" });
      return;
    }

    async function init() {
      const params = new URLSearchParams(window.location.search);
      const adminParam = params.get("admin");
      const guestParam = params.get("g");

      // 1. Admin secret in URL → log in, store token, clean URL
      if (adminParam) {
        const result = await adminLogin(adminParam);
        // Always clean the URL regardless of result
        const clean = new URL(window.location.href);
        clean.searchParams.delete("admin");
        window.history.replaceState({}, "", clean.toString());

        if (result.valid && result.token) {
          localStorage.setItem(ADMIN_KEY, result.token);
          setGate({ status: "unlocked", isAdmin: true, adminToken: result.token });
          return;
        }
        setGate({ status: "denied", message: "رابط المدير غير صالح" });
        return;
      }

      // 2. One-time guest token in URL → validate, store session, clean URL
      if (guestParam) {
        const result = await useGuestToken(guestParam);
        // Always clean the URL
        const clean = new URL(window.location.href);
        clean.searchParams.delete("g");
        window.history.replaceState({}, "", clean.toString());

        if (result.valid && result.token) {
          sessionStorage.setItem(GUEST_KEY, result.token);
          setGate({ status: "unlocked", isAdmin: false, adminToken: "" });
          return;
        }
        setGate({
          status: "denied",
          message: result.error ?? "هذا الرابط تم استخدامه مسبقاً أو غير صالح",
        });
        return;
      }

      // 3. Existing admin token in localStorage
      const storedAdmin = localStorage.getItem(ADMIN_KEY);
      if (storedAdmin) {
        const check = await checkSession(storedAdmin);
        if (check.valid && check.isAdmin) {
          setGate({ status: "unlocked", isAdmin: true, adminToken: storedAdmin });
          return;
        }
        localStorage.removeItem(ADMIN_KEY);
      }

      // 4. Existing guest session in sessionStorage
      const storedGuest = sessionStorage.getItem(GUEST_KEY);
      if (storedGuest) {
        const check = await checkSession(storedGuest);
        if (check.valid) {
          setGate({ status: "unlocked", isAdmin: false, adminToken: "" });
          return;
        }
        sessionStorage.removeItem(GUEST_KEY);
      }

      // 5. No valid access
      setGate({ status: "denied", message: "ليس لديك رابط وصول صالح" });
    }

    init();
  }, [enabled]);

  if (gate.status === "checking") return <LoadingScreen />;

  if (gate.status === "denied") return <DeniedScreen message={gate.message} />;

  return (
    <ContentGuard>
      {children}
      {gate.isAdmin && gate.adminToken && (
        <AdminPanel adminToken={gate.adminToken} />
      )}
    </ContentGuard>
  );
}
