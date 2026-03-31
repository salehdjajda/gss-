import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface IndividualAccount {
  accountNumber: string;
  name: string;
  phone: string;
  city: string;
  email?: string;
  joinedAt: string;
}

export interface ServiceRequest {
  id: string;
  accountNumber: string;
  service: string;
  details: string;
  city: string;
  preferredTime: string;
  status: "pending" | "confirmed" | "in_progress" | "completed";
  submittedAt: string;
}

interface IndividualAuthState {
  account: IndividualAccount | null;
  requests: ServiceRequest[];
  isLoggedIn: boolean;
  register: (data: RegisterData) => { success: boolean; error?: string; account?: IndividualAccount };
  login: (phone: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  submitRequest: (data: RequestData) => ServiceRequest;
}

interface RegisterData {
  name: string;
  phone: string;
  city: string;
  password: string;
}

interface RequestData {
  service: string;
  details: string;
  preferredTime: string;
}

const ACCOUNTS_KEY = "gss_individual_accounts";
const SESSION_KEY  = "gss_individual_session";
const REQUESTS_KEY = "gss_individual_requests";

function generateAccountNumber(): string {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `GSS-IND-${num}`;
}

const IndividualAuthContext = createContext<IndividualAuthState | null>(null);

export function IndividualAuthProvider({ children }: { children: ReactNode }) {
  const [account, setAccount]   = useState<IndividualAccount | null>(null);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      try {
        const acc = JSON.parse(session) as IndividualAccount;
        setAccount(acc);
        loadRequests(acc.accountNumber);
      } catch { }
    }
  }, []);

  function loadRequests(accountNumber: string) {
    try {
      const all = JSON.parse(localStorage.getItem(REQUESTS_KEY) || "[]") as ServiceRequest[];
      setRequests(all.filter(r => r.accountNumber === accountNumber));
    } catch {
      setRequests([]);
    }
  }

  function getAccounts(): Record<string, { account: IndividualAccount; password: string }> {
    try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "{}"); }
    catch { return {}; }
  }

  function register(data: RegisterData): { success: boolean; error?: string; account?: IndividualAccount } {
    const accounts = getAccounts();
    const existing = Object.values(accounts).find(a => a.account.phone === data.phone);
    if (existing) return { success: false, error: "هذا الجوال مسجّل مسبقاً — سجّل الدخول" };

    const newAccount: IndividualAccount = {
      accountNumber: generateAccountNumber(),
      name: data.name,
      phone: data.phone,
      city: data.city,
      joinedAt: new Date().toLocaleDateString("ar-SA"),
    };

    accounts[newAccount.phone] = { account: newAccount, password: data.password };
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    localStorage.setItem(SESSION_KEY, JSON.stringify(newAccount));
    setAccount(newAccount);
    loadRequests(newAccount.accountNumber);
    return { success: true, account: newAccount };
  }

  function login(phone: string, password: string): { success: boolean; error?: string } {
    const accounts = getAccounts();
    const record   = accounts[phone];
    if (!record) return { success: false, error: "الجوال غير مسجّل — أنشئ حساباً أولاً" };
    if (record.password !== password) return { success: false, error: "كلمة المرور غير صحيحة" };

    localStorage.setItem(SESSION_KEY, JSON.stringify(record.account));
    setAccount(record.account);
    loadRequests(record.account.accountNumber);
    return { success: true };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setAccount(null);
    setRequests([]);
  }

  function submitRequest(data: RequestData): ServiceRequest {
    if (!account) throw new Error("Not logged in");
    const req: ServiceRequest = {
      id: `REQ-${Date.now()}`,
      accountNumber: account.accountNumber,
      service: data.service,
      details: data.details,
      preferredTime: data.preferredTime,
      city: account.city,
      status: "pending",
      submittedAt: new Date().toLocaleString("ar-SA"),
    };
    const all = JSON.parse(localStorage.getItem(REQUESTS_KEY) || "[]") as ServiceRequest[];
    all.push(req);
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(all));
    setRequests(prev => [...prev, req]);
    return req;
  }

  return (
    <IndividualAuthContext.Provider value={{
      account, requests, isLoggedIn: !!account,
      register, login, logout, submitRequest,
    }}>
      {children}
    </IndividualAuthContext.Provider>
  );
}

export function useIndividualAuth() {
  const ctx = useContext(IndividualAuthContext);
  if (!ctx) throw new Error("useIndividualAuth must be used inside IndividualAuthProvider");
  return ctx;
}
