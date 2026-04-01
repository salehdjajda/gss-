import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type UserRole = "admin" | "staff" | "user";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStaff: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "gss_auth_token";
const API_BASE = "/api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
  });

  /** Restore session from localStorage on mount */
  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) {
      setState((s) => ({ ...s, isLoading: false }));
      return;
    }
    // Verify token is still valid via /auth/me
    fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${stored}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.user) {
          setState({ user: data.user, token: stored, isLoading: false });
        } else {
          localStorage.removeItem(TOKEN_KEY);
          setState({ user: null, token: null, isLoading: false });
        }
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setState({ user: null, token: null, isLoading: false });
      });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error || "خطأ في الدخول" };
      localStorage.setItem(TOKEN_KEY, data.token);
      setState({ user: data.user, token: data.token, isLoading: false });
      return { success: true };
    } catch {
      return { success: false, error: "تعذّر الاتصال بالخادم. حاول مرة أخرى." };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setState({ user: null, token: null, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        isAuthenticated: !!state.user,
        isAdmin: state.user?.role === "admin",
        isStaff: state.user?.role === "staff" || state.user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

/** Helper: returns the stored token for use in fetch calls */
export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}
