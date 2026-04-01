import { useState, useEffect, useCallback, useRef, Fragment } from "react";
import { useLocation } from "wouter";
import { useAuth, getAuthToken } from "@/contexts/AuthContext";
import {
  LayoutDashboard, Building2, Users, ClipboardList, Wrench,
  FileBarChart2, Truck, UserCheck, LogOut, Bell, Search,
  CheckCircle2, Clock, AlertCircle, XCircle, ChevronLeft,
  TrendingUp, Phone, Mail, Calendar, Eye, Filter, Download,
  RefreshCw, ChevronDown, MessageSquare, ShieldCheck, UserPlus,
  Shield, UserX, KeyRound, UserCog, StickyNote, Send, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoImg from "@assets/image_1774909317242.png";

type TabKey = "overview" | "companies" | "vendors" | "consultants" | "contacts" | "services" | "reports" | "users";

const TABS = [
  { key: "overview",     label: "نظرة عامة",     icon: LayoutDashboard },
  { key: "companies",    label: "المنشآت",        icon: Building2 },
  { key: "vendors",      label: "الموردون والفنيون", icon: Truck },
  { key: "consultants",  label: "المستشارون",      icon: UserCheck },
  { key: "contacts",     label: "الدعم والرسائل",  icon: MessageSquare },
  { key: "services",     label: "الخدمات",         icon: Wrench },
  { key: "reports",      label: "التقارير",         icon: FileBarChart2 },
  { key: "users",        label: "المستخدمون",      icon: ShieldCheck },
] as const;

const STATUS_OPTIONS = [
  { value: "pending",   label: "قيد المراجعة",  color: "bg-amber-100 text-amber-700" },
  { value: "active",    label: "نشط / معتمد",    color: "bg-green-100 text-green-700" },
  { value: "rejected",  label: "مرفوض",          color: "bg-red-100 text-red-700" },
  { value: "completed", label: "مكتمل",          color: "bg-blue-100 text-blue-700" },
];

const CONTACT_STATUS_OPTIONS = [
  { value: "new",          label: "جديد",           color: "bg-blue-100 text-blue-700" },
  { value: "in_progress",  label: "قيد المعالجة",   color: "bg-amber-100 text-amber-700" },
  { value: "resolved",     label: "تم الحل",        color: "bg-green-100 text-green-700" },
];

function getStatusBadge(status: string, options = STATUS_OPTIONS) {
  const opt = options.find(o => o.value === status);
  return opt ? { color: opt.color, label: opt.label } : { color: "bg-gray-100 text-gray-600", label: status };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric" });
}

function authHeaders(): HeadersInit {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" };
}

async function apiGet(path: string) {
  const r = await fetch(`/api${path}`, { headers: authHeaders() });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

async function apiPatch(path: string, body: object) {
  const r = await fetch(`/api${path}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

function StatusDropdown({
  id, current, options, onUpdate,
}: { id: number; current: string; options: typeof STATUS_OPTIONS; onUpdate: (id: number, status: string) => void }) {
  const [open, setOpen] = useState(false);
  const badge = getStatusBadge(current, options);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${badge.color} hover:opacity-80 transition`}
      >
        {badge.label}
        <ChevronDown size={11} />
      </button>
      {open && (
        <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 min-w-[140px]">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onUpdate(id, opt.value); setOpen(false); }}
              className={`w-full text-right px-3 py-1.5 text-xs font-medium hover:bg-gray-50 ${opt.color} mx-0`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SectionHeader({ title, count, onSearch, onRefresh }: {
  title: string; count: number;
  onSearch?: (v: string) => void;
  onRefresh?: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-0.5">إجمالي: {count} سجل</p>
      </div>
      <div className="flex items-center gap-2">
        {onSearch && (
          <div className="relative">
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input placeholder="بحث..." className="pr-8 h-9 w-48 text-sm" onChange={e => onSearch(e.target.value)} />
          </div>
        )}
        {onRefresh && (
          <Button variant="outline" size="sm" className="h-9 gap-1 text-xs" onClick={onRefresh}>
            <RefreshCw size={13} />
            تحديث
          </Button>
        )}
        <Button variant="outline" size="sm" className="h-9 gap-1 text-xs">
          <Download size={13} />
          تصدير
        </Button>
      </div>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
        <ClipboardList size={28} className="text-gray-300" />
      </div>
      <p className="text-base font-semibold text-gray-500 mb-1">لا توجد سجلات بعد</p>
      <p className="text-sm text-gray-400 text-center max-w-sm">{label}</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <RefreshCw size={24} className="text-primary animate-spin" />
    </div>
  );
}

/** Assignment dropdown — admin assigns a record to a staff member */
function AssignDropdown({
  entityType, entityId, currentAssignedId, currentAssignedName,
  staffList, isAdmin, onAssigned,
}: {
  entityType: string; entityId: number;
  currentAssignedId?: number | null; currentAssignedName?: string | null;
  staffList: any[]; isAdmin: boolean;
  onAssigned: (id: number, assignedTo: number | null, name: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  async function assign(staffId: number | null, staffName: string | null) {
    setSaving(true);
    setOpen(false);
    const r = await fetch(`/api/admin/assign/${entityType}/${entityId}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ assignedTo: staffId }),
    });
    setSaving(false);
    if (r.ok) onAssigned(entityId, staffId, staffName);
  }

  if (!isAdmin) {
    return currentAssignedName ? (
      <span className="flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
        <UserCog size={11} />{currentAssignedName}
      </span>
    ) : <span className="text-xs text-gray-300">—</span>;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        disabled={saving}
        className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border transition ${currentAssignedId ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"}`}
      >
        <UserCog size={11} />
        {saving ? "جاري..." : currentAssignedName || "إسناد"}
        <ChevronDown size={10} />
      </button>
      {open && (
        <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-30 py-1 min-w-[170px]">
          <button
            onClick={() => assign(null, null)}
            className="w-full text-right px-3 py-2 text-xs text-gray-400 hover:bg-gray-50"
          >
            ❌ إلغاء الإسناد
          </button>
          {staffList.map(s => (
            <button
              key={s.id}
              onClick={() => assign(s.id, s.name)}
              className={`w-full text-right px-3 py-2 text-xs hover:bg-blue-50 hover:text-blue-700 ${currentAssignedId === s.id ? "font-bold text-blue-700 bg-blue-50/60" : "text-gray-700"}`}
            >
              {s.name} <span className="text-gray-400">({s.role})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Inline notes panel for a specific record */
function NotesPanel({ entityType, entityId, onClose }: { entityType: string; entityId: number; onClose: () => void }) {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/admin/notes/${entityType}/${entityId}`, { headers: authHeaders() })
      .then(r => r.json()).then(data => { setNotes(data); setLoading(false); });
  }, [entityType, entityId]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [notes]);

  async function sendNote() {
    if (!newNote.trim()) return;
    setSending(true);
    const r = await fetch(`/api/admin/notes/${entityType}/${entityId}`, {
      method: "POST", headers: authHeaders(), body: JSON.stringify({ note: newNote.trim() }),
    });
    const data = await r.json();
    setSending(false);
    if (r.ok) { setNotes(prev => [...prev, data]); setNewNote(""); }
  }

  return (
    <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold text-gray-700 flex items-center gap-1.5"><StickyNote size={13} /> الملاحظات الداخلية</h4>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
      </div>
      <div className="max-h-48 overflow-y-auto space-y-2 mb-3">
        {loading && <p className="text-xs text-gray-400 text-center py-4">جاري التحميل...</p>}
        {!loading && notes.length === 0 && <p className="text-xs text-gray-400 text-center py-4">لا توجد ملاحظات بعد</p>}
        {notes.map(n => (
          <div key={n.id} className="bg-white border border-gray-100 rounded-lg p-2.5">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${n.userRole === "admin" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>{n.userName}</span>
              <span className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleDateString("ar-SA", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">{n.note}</p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-2">
        <input
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendNote()}
          placeholder="أضف ملاحظة..."
          className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendNote}
          disabled={sending || !newNote.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-1"
        >
          <Send size={11} />
          إرسال
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { logout, user, isAdmin } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");

  const [stats, setStats] = useState<Record<string, number>>({});
  const [companies, setCompanies] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [consultants, setConsultants] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [sysUsers, setSysUsers] = useState<any[]>([]);
  const [staffList, setStaffList] = useState<any[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [newUserForm, setNewUserForm] = useState({ name: "", email: "", password: "", role: "staff" as "admin"|"staff"|"user", show: false });
  const [newUserError, setNewUserError] = useState("");
  // Notes panel state: which record is expanded
  const [openNotes, setOpenNotes] = useState<{ type: string; id: number } | null>(null);

  const fetchData = useCallback(async (tab: TabKey) => {
    setLoading(prev => ({ ...prev, [tab]: true }));
    try {
      if (tab === "overview") {
        const s = await apiGet("/admin/stats");
        setStats(s);
      } else if (tab === "companies") {
        setCompanies(await apiGet("/admin/companies"));
      } else if (tab === "vendors") {
        setVendors(await apiGet("/admin/vendors"));
      } else if (tab === "consultants") {
        setConsultants(await apiGet("/admin/consultants"));
      } else if (tab === "contacts") {
        setContacts(await apiGet("/admin/contacts"));
      } else if (tab === "users") {
        setSysUsers(await apiGet("/admin/users"));
      }
    } catch (e) {
      console.error("Admin fetch error", e);
    } finally {
      setLoading(prev => ({ ...prev, [tab]: false }));
    }
  }, []);

  useEffect(() => { fetchData(activeTab); }, [activeTab, fetchData]);
  useEffect(() => {
    apiGet("/admin/stats").then(setStats).catch(() => {});
    apiGet("/admin/staff-list").then(setStaffList).catch(() => {});
  }, []);

  const handleLogout = () => { logout(); setLocation("/login"); };

  const updateCompanyStatus = async (id: number, status: string) => {
    await apiPatch(`/admin/companies/${id}/status`, { status });
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };
  const updateVendorStatus = async (id: number, status: string) => {
    await apiPatch(`/admin/vendors/${id}/status`, { status });
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status } : v));
  };
  const updateConsultantStatus = async (id: number, status: string) => {
    await apiPatch(`/admin/consultants/${id}/status`, { status });
    setConsultants(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };
  const updateContactStatus = async (id: number, status: string) => {
    await apiPatch(`/admin/contacts/${id}/status`, { status });
    setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  // Assignment helpers
  const onCompanyAssigned = (id: number, assignedTo: number | null, name: string | null) =>
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, assignedTo, assignedToName: name } : c));
  const onVendorAssigned = (id: number, assignedTo: number | null, name: string | null) =>
    setVendors(prev => prev.map(v => v.id === id ? { ...v, assignedTo, assignedToName: name } : v));
  const onConsultantAssigned = (id: number, assignedTo: number | null, name: string | null) =>
    setConsultants(prev => prev.map(c => c.id === id ? { ...c, assignedTo, assignedToName: name } : c));
  const onContactAssigned = (id: number, assignedTo: number | null, name: string | null) =>
    setContacts(prev => prev.map(c => c.id === id ? { ...c, assignedTo, assignedToName: name } : c));

  const toggleNotes = (type: string, id: number) =>
    setOpenNotes(prev => prev?.type === type && prev?.id === id ? null : { type, id });

  const toggleUserActive = async (id: number, isActive: boolean) => {
    await apiPatch(`/admin/users/${id}`, { isActive });
    setSysUsers(prev => prev.map(u => u.id === id ? { ...u, isActive } : u));
  };

  const changeUserRole = async (id: number, role: string) => {
    await apiPatch(`/admin/users/${id}`, { role });
    setSysUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));
  };

  const createUser = async () => {
    setNewUserError("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ name: newUserForm.name, email: newUserForm.email, password: newUserForm.password, role: newUserForm.role }),
      });
      const data = await res.json();
      if (!res.ok) { setNewUserError(data.error || "خطأ في إنشاء الحساب"); return; }
      setNewUserForm({ name: "", email: "", password: "", role: "staff", show: false });
      fetchData("users");
    } catch { setNewUserError("خطأ في الاتصال بالخادم"); }
  };

  const filtered = <T extends Record<string, any>>(rows: T[]) =>
    !search ? rows : rows.filter(r =>
      Object.values(r).some(v => String(v ?? "").toLowerCase().includes(search.toLowerCase()))
    );

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-16"} bg-slate-900 flex flex-col transition-all duration-300 flex-shrink-0 min-h-screen`}>
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          {sidebarOpen && (
            <div className="overflow-hidden" style={{ height: "38px", width: "175px" }}>
              <img src={logoImg} alt="GSS" style={{ height: "115px", width: "auto", marginTop: "-40px", mixBlendMode: "screen", filter: "invert(1) hue-rotate(180deg) brightness(1.15) contrast(1.1)" }} />
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white p-1 rounded">
            <ChevronLeft size={18} className={`transition-transform ${sidebarOpen ? "" : "rotate-180"}`} />
          </button>
        </div>
        {sidebarOpen && (
          <div className="px-4 py-2 border-b border-slate-800">
            <p className="text-xs text-slate-500 font-medium">لوحة التحكم الإدارية</p>
          </div>
        )}
        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {TABS.map(({ key, label, icon: Icon }) => {
            const count = key === "companies" ? stats.companies :
                          key === "vendors" ? stats.vendors :
                          key === "consultants" ? stats.consultants :
                          key === "contacts" ? stats.contacts : undefined;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key as TabKey)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === key ? "bg-primary text-white font-semibold" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
              >
                <Icon size={18} className="flex-shrink-0" />
                {sidebarOpen && (
                  <span className="flex-1 text-right">{label}</span>
                )}
                {sidebarOpen && count !== undefined && count > 0 && (
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${activeTab === key ? "bg-white/20 text-white" : "bg-slate-700 text-slate-300"}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-slate-800 space-y-1">
          {sidebarOpen && user && (
            <div className="px-3 py-2 rounded-lg bg-slate-800/60 mb-2">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <p className="text-xs text-slate-400 truncate" dir="ltr">{user.email}</p>
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded mt-1 inline-block ${user.role === "admin" ? "bg-red-900/50 text-red-300" : user.role === "staff" ? "bg-amber-900/50 text-amber-300" : "bg-blue-900/50 text-blue-300"}`}>
                {user.role === "admin" ? "Admin" : user.role === "staff" ? "Staff" : "User"}
              </span>
            </div>
          )}
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors">
            <LogOut size={18} className="flex-shrink-0" />
            {sidebarOpen && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-lg font-bold text-gray-900">{TABS.find(t => t.key === activeTab)?.label}</h1>
            <p className="text-xs text-gray-400 mt-0.5">{new Date().toLocaleDateString("ar-SA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Bell size={20} />
              {(stats.contacts ?? 0) > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />}
            </button>
            <div className="flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5">
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">G</div>
              <span className="text-sm font-semibold text-primary">مدير النظام</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: "منشآت مسجلة", value: stats.companies ?? 0, icon: Building2, color: "bg-blue-50 text-blue-600", tab: "companies" as TabKey },
                  { label: "موردون وفنيون", value: stats.vendors ?? 0, icon: Truck, color: "bg-purple-50 text-purple-600", tab: "vendors" as TabKey },
                  { label: "مستشارون", value: stats.consultants ?? 0, icon: UserCheck, color: "bg-green-50 text-green-600", tab: "consultants" as TabKey },
                  { label: "رسائل ودعم", value: stats.contacts ?? 0, icon: MessageSquare, color: "bg-amber-50 text-amber-600", tab: "contacts" as TabKey },
                ].map(stat => (
                  <button key={stat.label} onClick={() => setActiveTab(stat.tab)} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-right hover:border-primary/40 transition-colors">
                    <div className={`w-11 h-11 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                      <stat.icon size={22} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </button>
                ))}
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex items-start gap-4">
                <TrendingUp size={24} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">
                    {(stats.companies ?? 0) + (stats.vendors ?? 0) + (stats.consultants ?? 0) === 0
                      ? "المنصة في مرحلة الإطلاق — جاهزة لاستقبال البيانات"
                      : `إجمالي السجلات: ${(stats.companies ?? 0) + (stats.vendors ?? 0) + (stats.consultants ?? 0) + (stats.contacts ?? 0)}`}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    بمجرد تسجيل المنشآت والأفراد والموردين عبر الموقع، تظهر بياناتهم هنا فورياً وبشكل كامل.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Phone size={18} className="text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500">رقم الجوال</p>
                    <p className="font-bold text-gray-900" dir="ltr">+966 59 598 0004</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Mail size={18} className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">البريد الإلكتروني</p>
                    <p className="font-bold text-gray-900">info@gss-platform.sa</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Calendar size={18} className="text-amber-600" />
                  <div>
                    <p className="text-xs text-gray-500">المكتب الرئيسي</p>
                    <p className="font-bold text-gray-900">جدة، المملكة العربية السعودية</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* COMPANIES */}
          {activeTab === "companies" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <SectionHeader title="المنشآت المسجلة" count={companies.length} onSearch={setSearch} onRefresh={() => fetchData("companies")} />
              {loading.companies ? <LoadingState /> : filtered(companies).length === 0 ? (
                <EmptyState label="لم تُسجَّل أي منشأة بعد. ستظهر هنا فور اكتمال طلب التسجيل." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-right">
                        <th className="py-3 px-3 font-semibold text-gray-600">رقم الحساب</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">المنشأة</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">المدينة</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">المسؤول</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">الجوال</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">الباقة</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">الموظف</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">الحالة</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">ملاحظات</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">التاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered(companies).map((c: any) => (
                        <Fragment key={c.id}>
                          <tr className="border-b border-gray-50 hover:bg-gray-50/80">
                            <td className="py-3 px-3 font-mono text-xs text-primary font-bold">{c.accountNumber || `#${c.id}`}</td>
                            <td className="py-3 px-3 font-semibold text-gray-900">{c.companyName}</td>
                            <td className="py-3 px-3 text-gray-600">{c.city}</td>
                            <td className="py-3 px-3 text-gray-600">{c.contactName}</td>
                            <td className="py-3 px-3 text-gray-600" dir="ltr">{c.phone}</td>
                            <td className="py-3 px-3 text-gray-500 text-xs">{c.selectedPackage || "—"}</td>
                            <td className="py-3 px-3">
                              <AssignDropdown entityType="company" entityId={c.id} currentAssignedId={c.assignedTo} currentAssignedName={c.assignedToName} staffList={staffList} isAdmin={isAdmin} onAssigned={onCompanyAssigned} />
                            </td>
                            <td className="py-3 px-3">
                              <StatusDropdown id={c.id} current={c.status} options={STATUS_OPTIONS} onUpdate={updateCompanyStatus} />
                            </td>
                            <td className="py-3 px-3">
                              <button onClick={() => toggleNotes("company", c.id)} className={`text-xs flex items-center gap-1 px-2 py-1 rounded-lg transition ${openNotes?.type === "company" && openNotes?.id === c.id ? "bg-amber-100 text-amber-700" : "text-gray-400 hover:text-amber-600 hover:bg-amber-50"}`}>
                                <StickyNote size={12} /> ملاحظات
                              </button>
                            </td>
                            <td className="py-3 px-3 text-gray-400 text-xs">{formatDate(c.createdAt)}</td>
                          </tr>
                          {openNotes?.type === "company" && openNotes?.id === c.id && (
                            <tr><td colSpan={10} className="px-3 pb-3">
                              <NotesPanel entityType="company" entityId={c.id} onClose={() => setOpenNotes(null)} />
                            </td></tr>
                          )}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* VENDORS */}
          {activeTab === "vendors" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <SectionHeader title="الموردون والفنيون المسجلون" count={vendors.length} onSearch={setSearch} onRefresh={() => fetchData("vendors")} />
              {loading.vendors ? <LoadingState /> : filtered(vendors).length === 0 ? (
                <EmptyState label="لم يُسجَّل أي مورد بعد. ستظهر هنا طلبات الانضمام للموردين والفنيين." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-right">
                        <th className="py-3 px-3 font-semibold text-gray-600">الاسم</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">النوع</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">الجوال</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">نطاق الخدمة</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">الموظف</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">الحالة</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">ملاحظات</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">التاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered(vendors).map((v: any) => (
                        <Fragment key={v.id}>
                          <tr className="border-b border-gray-50 hover:bg-gray-50/80">
                            <td className="py-3 px-3 font-semibold text-gray-900">{v.name}</td>
                            <td className="py-3 px-3 text-gray-600">{v.vendorType}</td>
                            <td className="py-3 px-3 text-gray-600" dir="ltr">{v.phone}</td>
                            <td className="py-3 px-3 text-gray-500 text-xs">{v.serviceScope}</td>
                            <td className="py-3 px-3">
                              <AssignDropdown entityType="vendor" entityId={v.id} currentAssignedId={v.assignedTo} currentAssignedName={v.assignedToName} staffList={staffList} isAdmin={isAdmin} onAssigned={onVendorAssigned} />
                            </td>
                            <td className="py-3 px-3">
                              <StatusDropdown id={v.id} current={v.status} options={STATUS_OPTIONS} onUpdate={updateVendorStatus} />
                            </td>
                            <td className="py-3 px-3">
                              <button onClick={() => toggleNotes("vendor", v.id)} className={`text-xs flex items-center gap-1 px-2 py-1 rounded-lg transition ${openNotes?.type === "vendor" && openNotes?.id === v.id ? "bg-amber-100 text-amber-700" : "text-gray-400 hover:text-amber-600 hover:bg-amber-50"}`}>
                                <StickyNote size={12} /> ملاحظات
                              </button>
                            </td>
                            <td className="py-3 px-3 text-gray-400 text-xs">{formatDate(v.createdAt)}</td>
                          </tr>
                          {openNotes?.type === "vendor" && openNotes?.id === v.id && (
                            <tr><td colSpan={8} className="px-3 pb-3">
                              <NotesPanel entityType="vendor" entityId={v.id} onClose={() => setOpenNotes(null)} />
                            </td></tr>
                          )}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* CONSULTANTS */}
          {activeTab === "consultants" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <SectionHeader title="المستشارون المسجلون" count={consultants.length} onSearch={setSearch} onRefresh={() => fetchData("consultants")} />
              {loading.consultants ? <LoadingState /> : filtered(consultants).length === 0 ? (
                <EmptyState label="لم يُسجَّل أي مستشار بعد. ستظهر هنا طلبات انضمام المستشارين وخبراء التشغيل." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-right">
                        <th className="py-3 px-3 font-semibold text-gray-600">الاسم</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">المدينة</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">الجوال</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">مجال الخبرة</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">سنوات</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">الموظف</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">الحالة</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">ملاحظات</th>
                        <th className="py-3 px-3 font-semibold text-gray-600">التاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered(consultants).map((c: any) => (
                        <Fragment key={c.id}>
                          <tr className="border-b border-gray-50 hover:bg-gray-50/80">
                            <td className="py-3 px-3 font-semibold text-gray-900">{c.name}</td>
                            <td className="py-3 px-3 text-gray-600">{c.city}</td>
                            <td className="py-3 px-3 text-gray-600" dir="ltr">{c.phone}</td>
                            <td className="py-3 px-3 text-gray-500 text-xs">{c.expertiseArea}</td>
                            <td className="py-3 px-3 text-gray-500 text-center">{c.yearsOfExperience ?? "—"}</td>
                            <td className="py-3 px-3">
                              <AssignDropdown entityType="consultant" entityId={c.id} currentAssignedId={c.assignedTo} currentAssignedName={c.assignedToName} staffList={staffList} isAdmin={isAdmin} onAssigned={onConsultantAssigned} />
                            </td>
                            <td className="py-3 px-3">
                              <StatusDropdown id={c.id} current={c.status} options={STATUS_OPTIONS} onUpdate={updateConsultantStatus} />
                            </td>
                            <td className="py-3 px-3">
                              <button onClick={() => toggleNotes("consultant", c.id)} className={`text-xs flex items-center gap-1 px-2 py-1 rounded-lg transition ${openNotes?.type === "consultant" && openNotes?.id === c.id ? "bg-amber-100 text-amber-700" : "text-gray-400 hover:text-amber-600 hover:bg-amber-50"}`}>
                                <StickyNote size={12} /> ملاحظات
                              </button>
                            </td>
                            <td className="py-3 px-3 text-gray-400 text-xs">{formatDate(c.createdAt)}</td>
                          </tr>
                          {openNotes?.type === "consultant" && openNotes?.id === c.id && (
                            <tr><td colSpan={9} className="px-3 pb-3">
                              <NotesPanel entityType="consultant" entityId={c.id} onClose={() => setOpenNotes(null)} />
                            </td></tr>
                          )}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* CONTACTS / SUPPORT */}
          {activeTab === "contacts" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <SectionHeader title="الرسائل وطلبات الدعم الفني" count={contacts.length} onSearch={setSearch} onRefresh={() => fetchData("contacts")} />
              {loading.contacts ? <LoadingState /> : filtered(contacts).length === 0 ? (
                <EmptyState label="لا توجد رسائل أو طلبات دعم بعد. ستظهر هنا فور إرسالها من الموقع." />
              ) : (
                <div className="space-y-4">
                  {filtered(contacts).map((c: any) => {
                    const badge = getStatusBadge(c.status, CONTACT_STATUS_OPTIONS);
                    return (
                      <div key={c.id} className="border border-gray-100 rounded-xl p-5 hover:border-primary/30 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <span className="font-bold text-gray-900">{c.name}</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${badge.color}`}>{badge.label}</span>
                              <AssignDropdown entityType="contact" entityId={c.id} currentAssignedId={c.assignedTo} currentAssignedName={c.assignedToName} staffList={staffList} isAdmin={isAdmin} onAssigned={onContactAssigned} />
                            </div>
                            <p className="text-xs text-gray-500 mb-1">
                              <span className="font-medium">الموضوع:</span> {c.subject || "—"}
                            </p>
                            <p className="text-sm text-gray-700 leading-relaxed mb-3">{c.message}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <span dir="ltr">{c.phone || "—"}</span>
                              <span>{c.email}</span>
                              <span>{formatDate(c.createdAt)}</span>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <StatusDropdown id={c.id} current={c.status} options={CONTACT_STATUS_OPTIONS} onUpdate={updateContactStatus} />
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2 pt-3 border-t border-gray-50 flex-wrap">
                          <a href={`mailto:${c.email}?subject=رد على استفسارك - GSS Platform`} className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition">
                            <Mail size={12} />
                            رد بالبريد
                          </a>
                          {c.phone && (
                            <a href={`https://wa.me/966${c.phone.replace(/^0/, "")}`} target="_blank" rel="noopener noreferrer" className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition">
                              <Phone size={12} />
                              واتساب
                            </a>
                          )}
                          <button onClick={() => toggleNotes("contact", c.id)} className={`text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg transition ${openNotes?.type === "contact" && openNotes?.id === c.id ? "bg-amber-100 text-amber-700" : "bg-gray-50 text-gray-400 hover:bg-amber-50 hover:text-amber-600"}`}>
                            <StickyNote size={12} /> ملاحظات
                          </button>
                        </div>
                        {openNotes?.type === "contact" && openNotes?.id === c.id && (
                          <NotesPanel entityType="contact" entityId={c.id} onClose={() => setOpenNotes(null)} />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* SERVICES */}
          {activeTab === "services" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <SectionHeader title="الخدمات التشغيلية" count={9} />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "أعمال النظافة والتعقيم",
                  "الأمن والحراسة",
                  "الصيانة الدورية",
                  "إدارة النفايات",
                  "خدمات الطباعة والأرشفة",
                  "الخدمات اللوجستية الداخلية",
                  "صيانة المصاعد والكهرباء",
                  "خدمات المطاعم والتموين",
                  "إدارة طلبات الطوارئ",
                ].map(svc => (
                  <div key={svc} className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center gap-3 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200 group-hover:border-primary/40 flex-shrink-0">
                      <Wrench size={14} className="text-gray-400 group-hover:text-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-primary">{svc}</span>
                      <p className="text-xs text-gray-400 mt-0.5">{stats.serviceRequests ?? 0} طلب</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* USERS MANAGEMENT */}
          {activeTab === "users" && (
            <div className="space-y-5">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">إدارة المستخدمين والصلاحيات</h2>
                    <p className="text-sm text-gray-500 mt-0.5">إجمالي: {sysUsers.length} مستخدم</p>
                  </div>
                  <Button
                    size="sm"
                    className="gap-2 text-xs"
                    onClick={() => setNewUserForm(f => ({ ...f, show: !f.show }))}
                  >
                    <UserPlus size={13} />
                    إضافة مستخدم
                  </Button>
                </div>

                {/* Add User Form */}
                {newUserForm.show && (
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
                    <h3 className="font-semibold text-gray-800 mb-4 text-sm">إنشاء حساب جديد</h3>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">الاسم</label>
                        <Input
                          placeholder="الاسم الكامل"
                          value={newUserForm.name}
                          onChange={e => setNewUserForm(f => ({ ...f, name: e.target.value }))}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">البريد الإلكتروني</label>
                        <Input
                          type="email"
                          placeholder="email@gss.sa"
                          value={newUserForm.email}
                          onChange={e => setNewUserForm(f => ({ ...f, email: e.target.value }))}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">كلمة المرور (8+ أحرف)</label>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          value={newUserForm.password}
                          onChange={e => setNewUserForm(f => ({ ...f, password: e.target.value }))}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">الصلاحية</label>
                        <select
                          value={newUserForm.role}
                          onChange={e => setNewUserForm(f => ({ ...f, role: e.target.value as any }))}
                          className="w-full h-9 border border-gray-300 rounded-lg px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <option value="admin">مدير (Admin)</option>
                          <option value="staff">موظف (Staff)</option>
                          <option value="user">مستخدم (User)</option>
                        </select>
                      </div>
                    </div>
                    {newUserError && (
                      <p className="text-red-600 text-xs mb-3">{newUserError}</p>
                    )}
                    <div className="flex gap-2">
                      <Button size="sm" className="text-xs gap-1.5" onClick={createUser}>
                        <UserPlus size={12} />
                        إنشاء الحساب
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs" onClick={() => setNewUserForm(f => ({ ...f, show: false }))}>
                        إلغاء
                      </Button>
                    </div>
                  </div>
                )}

                {/* Users Table */}
                {loading.users ? <LoadingState /> : sysUsers.length === 0 ? (
                  <EmptyState label="لا يوجد مستخدمون حتى الآن" />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-right font-semibold text-gray-500 pb-3 pr-0">الاسم</th>
                          <th className="text-right font-semibold text-gray-500 pb-3">البريد الإلكتروني</th>
                          <th className="text-right font-semibold text-gray-500 pb-3">الصلاحية</th>
                          <th className="text-right font-semibold text-gray-500 pb-3">الحالة</th>
                          <th className="text-right font-semibold text-gray-500 pb-3">آخر دخول</th>
                          <th className="text-right font-semibold text-gray-500 pb-3">إجراءات</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {sysUsers.map(u => (
                          <tr key={u.id} className="hover:bg-gray-50/50">
                            <td className="py-3 pr-0 font-medium text-gray-900">{u.name}</td>
                            <td className="py-3 text-gray-500 font-mono text-xs" dir="ltr">{u.email}</td>
                            <td className="py-3">
                              <select
                                value={u.role}
                                onChange={e => changeUserRole(u.id, e.target.value)}
                                disabled={u.id === user?.id}
                                className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                              >
                                <option value="admin">🔴 Admin</option>
                                <option value="staff">🟡 Staff</option>
                                <option value="user">🟢 User</option>
                              </select>
                            </td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${u.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                                {u.isActive ? "نشط" : "موقوف"}
                              </span>
                            </td>
                            <td className="py-3 text-xs text-gray-400">
                              {u.lastLoginAt ? formatDate(u.lastLoginAt) : "لم يدخل بعد"}
                            </td>
                            <td className="py-3">
                              {u.id !== user?.id && (
                                <button
                                  onClick={() => toggleUserActive(u.id, !u.isActive)}
                                  className={`text-xs px-2 py-1 rounded-lg flex items-center gap-1 transition ${u.isActive ? "text-red-600 hover:bg-red-50" : "text-green-600 hover:bg-green-50"}`}
                                >
                                  {u.isActive ? <><UserX size={11} />إيقاف</> : <><UserCheck size={11} />تفعيل</>}
                                </button>
                              )}
                              {u.id === user?.id && <span className="text-xs text-gray-400">أنت</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <Shield size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-amber-800">تذكير أمني</p>
                  <p className="text-xs text-amber-700 mt-1">
                    صلاحية Admin تُمكّن الوصول الكامل لجميع البيانات والإعدادات. امنح هذه الصلاحية فقط للأشخاص الموثوقين. الموظفون (Staff) يمكنهم مشاهدة البيانات وتحديث الحالات فقط.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* REPORTS */}
          {activeTab === "reports" && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { title: "تقارير شهرية", desc: "تقارير الأداء والمتابعة الشهرية لكل منشأة", icon: FileBarChart2, color: "bg-blue-50 text-blue-600" },
                  { title: "تقارير المصروفات", desc: "تحليل تفصيلي لمصروفات الخدمات لكل منشأة", icon: TrendingUp, color: "bg-green-50 text-green-600" },
                  { title: "تقارير الإنجاز", desc: "معدلات إنجاز الطلبات وتقييم الموردين", icon: CheckCircle2, color: "bg-purple-50 text-purple-600" },
                ].map(r => (
                  <div key={r.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className={`w-11 h-11 ${r.color} rounded-xl flex items-center justify-center mb-4`}><r.icon size={20} /></div>
                    <h3 className="font-bold text-gray-900 mb-2">{r.title}</h3>
                    <p className="text-sm text-gray-500 mb-5 leading-relaxed">{r.desc}</p>
                    <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                      <Download size={13} />
                      إنشاء تقرير
                    </Button>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <SectionHeader title="سجل التقارير المُرسلة" count={0} />
                <EmptyState label="لم يُرسَل أي تقرير بعد. ستظهر هنا التقارير التي يتم إرسالها للمشتركين." />
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
