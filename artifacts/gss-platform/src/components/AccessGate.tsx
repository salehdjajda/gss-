import { useState, useEffect, type ReactNode } from "react";

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

async function verifyPassword(
  password: string,
): Promise<{ valid: boolean; token?: string; error?: string }> {
  try {
    const res = await fetch(`${API}/access/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    return await res.json();
  } catch {
    return { valid: false, error: "تعذّر الاتصال بالخادم" };
  }
}

// ─── Content Guard — hides content when window loses focus ───────────────────

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

// ─── Access Gate ─────────────────────────────────────────────────────────────

interface Props {
  children: ReactNode;
}

export function AccessGate({ children }: Props) {
  const enabled = import.meta.env.VITE_PREVIEW_GATE === "true";

  const [status, setStatus] = useState<"checking" | "locked" | "unlocked">(
    "checking",
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setStatus("unlocked");
      return;
    }
    const token = sessionStorage.getItem(STORAGE_KEY);
    if (!token) {
      setStatus("locked");
      return;
    }
    checkToken(token).then((valid) => {
      if (valid) setStatus("unlocked");
      else {
        sessionStorage.removeItem(STORAGE_KEY);
        setStatus("locked");
      }
    });
  }, [enabled]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError("");
    const result = await verifyPassword(password.trim());
    setLoading(false);
    if (result.valid && result.token) {
      sessionStorage.setItem(STORAGE_KEY, result.token);
      setStatus("unlocked");
    } else {
      setError(result.error || "الرمز غير صحيح");
      setPassword("");
    }
  }

  if (status === "checking") {
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

  if (status === "unlocked") {
    return <ContentGuard>{children}</ContentGuard>;
  }

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
      <div style={{ width: "100%", maxWidth: 360 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "rgba(255,255,255,0.08)",
              marginBottom: 20,
            }}
          >
            <svg
              width="30"
              height="30"
              fill="none"
              stroke="white"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <h1
            style={{
              color: "white",
              fontSize: 22,
              fontWeight: "bold",
              margin: "0 0 6px",
            }}
          >
            محتوى مقيد
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: 0 }}>
            أدخل الرمز السري للمتابعة
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="الرمز السري"
            autoFocus
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.08)",
              color: "white",
              textAlign: "center",
              fontSize: 20,
              letterSpacing: "0.2em",
              padding: "16px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)",
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          {error && (
            <p style={{ color: "#f87171", fontSize: 13, textAlign: "center", margin: 0 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password.trim()}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 12,
              background: loading || !password.trim() ? "rgba(201,168,76,0.4)" : "#C9A84C",
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
              border: "none",
              cursor: loading || !password.trim() ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loading ? "جاري التحقق..." : "دخول"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.12)",
            fontSize: 11,
            marginTop: 40,
          }}
        >
          GSS Platform
        </p>
      </div>
    </div>
  );
}
