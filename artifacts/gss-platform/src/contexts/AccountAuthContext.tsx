import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type AccountType = "company" | "vendor" | "consultant";

export interface PortalAccount {
  accountNumber: string;
  name: string;
  phone: string;
  type: AccountType;
  city?: string;
  joinedAt: string;
}

interface AccountAuthState {
  account: PortalAccount | null;
  isLoggedIn: boolean;
  register: (data: RegisterData) => { success: boolean; error?: string; account?: PortalAccount };
  login: (phone: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

interface RegisterData {
  name: string;
  phone: string;
  password: string;
  city?: string;
}

const PREFIX: Record<AccountType, string> = {
  company:    "GSS-COM",
  vendor:     "GSS-VND",
  consultant: "GSS-CNS",
};

function makeKeys(type: AccountType) {
  return {
    accounts: `gss_${type}_accounts`,
    session:  `gss_${type}_session`,
  };
}

function generateNumber(type: AccountType) {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `${PREFIX[type]}-${num}`;
}

function createAccountAuthContext(type: AccountType) {
  const Ctx = createContext<AccountAuthState | null>(null);

  function Provider({ children }: { children: ReactNode }) {
    const keys = makeKeys(type);
    const [account, setAccount] = useState<PortalAccount | null>(null);

    useEffect(() => {
      const raw = localStorage.getItem(keys.session);
      if (raw) {
        try { setAccount(JSON.parse(raw) as PortalAccount); } catch { }
      }
    }, []);

    function getAccounts(): Record<string, { account: PortalAccount; password: string }> {
      try { return JSON.parse(localStorage.getItem(keys.accounts) || "{}"); }
      catch { return {}; }
    }

    function register(data: RegisterData): { success: boolean; error?: string; account?: PortalAccount } {
      const accounts = getAccounts();
      const existing = Object.values(accounts).find(a => a.account.phone === data.phone);
      if (existing) return { success: false, error: "هذا الجوال مسجّل مسبقاً — سجّل الدخول" };

      const newAccount: PortalAccount = {
        accountNumber: generateNumber(type),
        name: data.name,
        phone: data.phone,
        type,
        city: data.city,
        joinedAt: new Date().toLocaleDateString("ar-SA"),
      };
      accounts[data.phone] = { account: newAccount, password: data.password };
      localStorage.setItem(keys.accounts, JSON.stringify(accounts));
      localStorage.setItem(keys.session, JSON.stringify(newAccount));
      setAccount(newAccount);
      return { success: true, account: newAccount };
    }

    function login(phone: string, password: string): { success: boolean; error?: string } {
      const accounts = getAccounts();
      const record = accounts[phone];
      if (!record) return { success: false, error: "الجوال غير مسجّل — أنشئ حساباً أولاً" };
      if (record.password !== password) return { success: false, error: "كلمة المرور غير صحيحة" };
      localStorage.setItem(keys.session, JSON.stringify(record.account));
      setAccount(record.account);
      return { success: true };
    }

    function logout() {
      localStorage.removeItem(keys.session);
      setAccount(null);
    }

    return (
      <Ctx.Provider value={{ account, isLoggedIn: !!account, register, login, logout }}>
        {children}
      </Ctx.Provider>
    );
  }

  function useAuth() {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error(`useAuth must be inside Provider`);
    return ctx;
  }

  return { Provider, useAuth };
}

export const CompanyAuth    = createAccountAuthContext("company");
export const VendorAuth     = createAccountAuthContext("vendor");
export const ConsultantAuth = createAccountAuthContext("consultant");

export function useCompanyAuth()    { return CompanyAuth.useAuth(); }
export function useVendorAuth()     { return VendorAuth.useAuth(); }
export function useConsultantAuth() { return ConsultantAuth.useAuth(); }
