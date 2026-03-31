import { useState } from "react";
import { useLocation } from "wouter";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import {
  LayoutDashboard, Building2, Users, ClipboardList, Wrench,
  FileBarChart2, Truck, UserCheck, LogOut, Bell, Search,
  CheckCircle2, Clock, AlertCircle, XCircle, ChevronLeft,
  TrendingUp, Phone, Mail, Calendar, Eye, Filter, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoImg from "@assets/image_1774909317242.png";

type TabKey =
  | "overview"
  | "companies"
  | "individuals"
  | "requests"
  | "services"
  | "reports"
  | "vendors"
  | "consultants";

const TABS = [
  { key: "overview", label: "نظرة عامة", icon: LayoutDashboard },
  { key: "companies", label: "المنشآت", icon: Building2 },
  { key: "individuals", label: "الأفراد", icon: Users },
  { key: "requests", label: "الطلبات", icon: ClipboardList },
  { key: "services", label: "الخدمات", icon: Wrench },
  { key: "reports", label: "التقارير", icon: FileBarChart2 },
  { key: "vendors", label: "الموردون", icon: Truck },
  { key: "consultants", label: "المستشارون", icon: UserCheck },
] as const;

const STATS = [
  { label: "منشآت مسجلة", value: "0", icon: Building2, color: "bg-blue-50 text-blue-600", trend: "" },
  { label: "أفراد مسجلون", value: "0", icon: Users, color: "bg-green-50 text-green-600", trend: "" },
  { label: "طلبات نشطة", value: "0", icon: ClipboardList, color: "bg-amber-50 text-amber-600", trend: "" },
  { label: "موردون معتمدون", value: "0", icon: Truck, color: "bg-purple-50 text-purple-600", trend: "" },
];

const MOCK_COMPANIES: Array<{ name: string; contact: string; phone: string; package: string; status: string; date: string }> = [];
const MOCK_INDIVIDUALS: Array<{ name: string; phone: string; service: string; status: string; date: string }> = [];
const MOCK_REQUESTS: Array<{ id: string; client: string; service: string; priority: string; status: string; date: string }> = [];
const MOCK_VENDORS: Array<{ name: string; specialty: string; city: string; rating: string; status: string }> = [];

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  active: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
  approved: "bg-green-100 text-green-700",
};

const STATUS_LABEL: Record<string, string> = {
  pending: "قيد المراجعة",
  active: "نشط",
  completed: "مكتمل",
  cancelled: "ملغي",
  approved: "معتمد",
};

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-gray-400">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
        <ClipboardList size={32} className="text-gray-300" />
      </div>
      <p className="text-lg font-semibold text-gray-500 mb-1">لا توجد بيانات بعد</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
}

function SectionHeader({ title, count, onSearch }: { title: string; count: number; onSearch?: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-0.5">إجمالي: {count} سجل</p>
      </div>
      <div className="flex items-center gap-3">
        {onSearch && (
          <div className="relative">
            <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="بحث..."
              className="pr-9 h-9 w-52 text-sm"
              onChange={e => onSearch(e.target.value)}
            />
          </div>
        )}
        <Button variant="outline" size="sm" className="gap-2 text-xs h-9">
          <Filter size={13} />
          فلترة
        </Button>
        <Button variant="outline" size="sm" className="gap-2 text-xs h-9">
          <Download size={13} />
          تصدير
        </Button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { logout } = useAdminAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    setLocation("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-16"} bg-slate-900 flex flex-col transition-all duration-300 flex-shrink-0 min-h-screen`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          {sidebarOpen && (
            <div className="overflow-hidden" style={{ height: "38px", width: "175px" }}>
              <img
                src={logoImg}
                alt="GSS"
                style={{ height: "115px", width: "auto", marginTop: "-40px", mixBlendMode: "screen", filter: "invert(1) hue-rotate(180deg) brightness(1.15) contrast(1.1)" }}
              />
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-400 hover:text-white p-1 rounded"
          >
            <ChevronLeft size={18} className={`transition-transform ${sidebarOpen ? "" : "rotate-180"}`} />
          </button>
        </div>

        {sidebarOpen && (
          <div className="px-4 py-2 border-b border-slate-800">
            <p className="text-xs text-slate-500 font-medium">لوحة التحكم الإدارية</p>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as TabKey)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeTab === key
                  ? "bg-primary text-white font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
          >
            <LogOut size={18} className="flex-shrink-0" />
            {sidebarOpen && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              {TABS.find(t => t.key === activeTab)?.label}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {new Date().toLocaleDateString("ar-SA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5">
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">G</div>
              <span className="text-sm font-semibold text-primary">مدير النظام</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {STATS.map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className={`w-11 h-11 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                      <stat.icon size={22} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Info Banner */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex items-start gap-4">
                <TrendingUp size={24} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">المنصة في مرحلة الإطلاق</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    لوحة التحكم جاهزة لاستقبال البيانات. بمجرد تسجيل أول منشأة أو فرد عبر نماذج الموقع، ستظهر بياناتهم هنا تلقائياً في كل الأقسام.
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-5">إجراءات سريعة</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "عرض المنشآت", icon: Building2, tab: "companies" as TabKey },
                    { label: "عرض الطلبات", icon: ClipboardList, tab: "requests" as TabKey },
                    { label: "إدارة الموردين", icon: Truck, tab: "vendors" as TabKey },
                    { label: "التقارير", icon: FileBarChart2, tab: "reports" as TabKey },
                  ].map(action => (
                    <button
                      key={action.label}
                      onClick={() => setActiveTab(action.tab)}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-gray-100 hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                      <action.icon size={22} className="text-gray-400 group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium text-gray-600 group-hover:text-primary">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-5">معلومات الدعم والتواصل</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                    <Phone size={18} className="text-green-600" />
                    <div>
                      <p className="text-xs text-gray-500">رقم الجوال</p>
                      <p className="font-bold text-gray-900" dir="ltr">+966 59 598 0004</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                    <Mail size={18} className="text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">البريد الإلكتروني</p>
                      <p className="font-bold text-gray-900">info@gss-platform.sa</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
                    <Calendar size={18} className="text-amber-600" />
                    <div>
                      <p className="text-xs text-gray-500">المكتب الرئيسي</p>
                      <p className="font-bold text-gray-900">جدة، المملكة العربية السعودية</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* COMPANIES */}
          {activeTab === "companies" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <SectionHeader title="المنشآت المسجلة" count={MOCK_COMPANIES.length} onSearch={() => {}} />
              {MOCK_COMPANIES.length === 0 ? (
                <EmptyState label="لم تُسجَّل أي منشأة بعد. ستظهر هنا بعد اكتمال طلبات التسجيل." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-right py-3 px-3 font-semibold text-gray-600">المنشأة</th>
                        <th className="text-right py-3 px-3 font-semibold text-gray-600">المسؤول</th>
                        <th className="text-right py-3 px-3 font-semibold text-gray-600">الجوال</th>
                        <th className="text-right py-3 px-3 font-semibold text-gray-600">الباقة</th>
                        <th className="text-right py-3 px-3 font-semibold text-gray-600">الحالة</th>
                        <th className="text-right py-3 px-3 font-semibold text-gray-600">التسجيل</th>
                        <th className="py-3 px-3" />
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_COMPANIES.map((c, i) => (
                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-3 px-3 font-medium text-gray-900">{c.name}</td>
                          <td className="py-3 px-3 text-gray-600">{c.contact}</td>
                          <td className="py-3 px-3 text-gray-600" dir="ltr">{c.phone}</td>
                          <td className="py-3 px-3 text-gray-600">{c.package}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_BADGE[c.status]}`}>
                              {STATUS_LABEL[c.status]}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-gray-500">{c.date}</td>
                          <td className="py-3 px-3">
                            <button className="text-primary hover:text-primary/70"><Eye size={15} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* INDIVIDUALS */}
          {activeTab === "individuals" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <SectionHeader title="الأفراد المسجلون" count={MOCK_INDIVIDUALS.length} onSearch={() => {}} />
              {MOCK_INDIVIDUALS.length === 0 ? (
                <EmptyState label="لم يُسجَّل أي فرد بعد. ستظهر هنا طلبات الأفراد بعد التسجيل." />
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-right py-3 px-3 font-semibold text-gray-600">الاسم</th>
                      <th className="text-right py-3 px-3 font-semibold text-gray-600">الجوال</th>
                      <th className="text-right py-3 px-3 font-semibold text-gray-600">الخدمة المطلوبة</th>
                      <th className="text-right py-3 px-3 font-semibold text-gray-600">الحالة</th>
                      <th className="text-right py-3 px-3 font-semibold text-gray-600">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_INDIVIDUALS.map((ind, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-3 px-3 font-medium text-gray-900">{ind.name}</td>
                        <td className="py-3 px-3 text-gray-600" dir="ltr">{ind.phone}</td>
                        <td className="py-3 px-3 text-gray-600">{ind.service}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_BADGE[ind.status]}`}>
                            {STATUS_LABEL[ind.status]}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-gray-500">{ind.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* REQUESTS */}
          {activeTab === "requests" && (
            <div className="space-y-5">
              {/* Status filters */}
              <div className="flex gap-3 flex-wrap">
                {[
                  { label: "الكل", icon: ClipboardList, count: 0 },
                  { label: "قيد المراجعة", icon: Clock, count: 0 },
                  { label: "نشط", icon: CheckCircle2, count: 0 },
                  { label: "مكتمل", icon: CheckCircle2, count: 0 },
                  { label: "ملغي", icon: XCircle, count: 0 },
                ].map(f => (
                  <div key={f.label} className="bg-white rounded-xl px-4 py-2.5 shadow-sm border border-gray-100 flex items-center gap-2">
                    <f.icon size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{f.label}</span>
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-1.5 py-0.5 rounded-full">{f.count}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <SectionHeader title="جميع الطلبات" count={MOCK_REQUESTS.length} onSearch={() => {}} />
                {MOCK_REQUESTS.length === 0 ? (
                  <EmptyState label="لا توجد طلبات خدمة حتى الآن. ستظهر هنا فور إرسالها من المشتركين." />
                ) : null}
              </div>
            </div>
          )}

          {/* SERVICES */}
          {activeTab === "services" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <SectionHeader title="الخدمات التشغيلية" count={0} />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
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
                ].map((svc) => (
                  <div key={svc} className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between group hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200 group-hover:border-primary/40">
                        <Wrench size={14} className="text-gray-400 group-hover:text-primary" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-primary">{svc}</span>
                    </div>
                    <span className="text-xs text-gray-400">0 طلب</span>
                  </div>
                ))}
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
                    <div className={`w-11 h-11 ${r.color} rounded-xl flex items-center justify-center mb-4`}>
                      <r.icon size={20} />
                    </div>
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
                <EmptyState label="لم يُرسَل أي تقرير بعد. ستظهر هنا التقارير المُرسلة للمشتركين." />
              </div>
            </div>
          )}

          {/* VENDORS */}
          {activeTab === "vendors" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <SectionHeader title="الموردون المعتمدون" count={MOCK_VENDORS.length} onSearch={() => {}} />
              {MOCK_VENDORS.length === 0 ? (
                <EmptyState label="لم يُسجَّل أي مورد بعد. ستظهر هنا طلبات الانضمام للموردين." />
              ) : null}
            </div>
          )}

          {/* CONSULTANTS */}
          {activeTab === "consultants" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <SectionHeader title="المستشارون المعتمدون" count={0} />
              <EmptyState label="لم يُسجَّل أي مستشار بعد. ستظهر هنا طلبات انضمام المستشارين." />
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
