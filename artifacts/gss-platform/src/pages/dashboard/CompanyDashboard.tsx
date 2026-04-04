import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Activity, CheckCircle2, Clock, Package, PlusCircle, ClipboardList, LogOut,
  Building2, Users, FileText, Wrench, AlertTriangle, ChevronRight, Bell,
  BarChart3, MapPin, UserCheck, Lock, FileCheck, Truck, X,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyAuth } from "@/contexts/AccountAuthContext";
import { getWorkOrders, WorkOrder, WorkOrderStatus, updateWorkOrderStatus } from "@/pages/company/RequestServiceCompany";

const STAGES_AR: { key: WorkOrderStatus; label: string; color: string; bgColor: string }[] = [
  { key: "received",         label: "مُستلم",           color: "text-gray-500",    bgColor: "bg-gray-100" },
  { key: "work_order",       label: "أمر عمل",          color: "text-blue-700",    bgColor: "bg-blue-100" },
  { key: "vendor",           label: "تحويل للمورد",     color: "text-purple-700",  bgColor: "bg-purple-100" },
  { key: "in_progress",      label: "جاري التنفيذ",     color: "text-yellow-700",  bgColor: "bg-yellow-100" },
  { key: "pending_approval", label: "اعتماد العميل",    color: "text-orange-700",  bgColor: "bg-orange-100" },
  { key: "closed",           label: "مُغلق",             color: "text-green-700",   bgColor: "bg-green-100" },
  { key: "invoiced",         label: "في الفاتورة",      color: "text-primary",     bgColor: "bg-primary/10" },
];

const STAGES_EN: { key: WorkOrderStatus; label: string; color: string; bgColor: string }[] = [
  { key: "received",         label: "Received",      color: "text-gray-500",    bgColor: "bg-gray-100" },
  { key: "work_order",       label: "Work Order",    color: "text-blue-700",    bgColor: "bg-blue-100" },
  { key: "vendor",           label: "To Vendor",     color: "text-purple-700",  bgColor: "bg-purple-100" },
  { key: "in_progress",      label: "In Progress",   color: "text-yellow-700",  bgColor: "bg-yellow-100" },
  { key: "pending_approval", label: "Needs Approval",color: "text-orange-700",  bgColor: "bg-orange-100" },
  { key: "closed",           label: "Closed",        color: "text-green-700",   bgColor: "bg-green-100" },
  { key: "invoiced",         label: "Invoiced",      color: "text-primary",     bgColor: "bg-primary/10" },
];

const PRIORITY_AR: Record<WorkOrder["priority"], string> = { urgent: "طارئ", high: "عاجل", normal: "عادي", scheduled: "مجدول" };
const PRIORITY_EN: Record<WorkOrder["priority"], string> = { urgent: "Emergency", high: "Urgent", normal: "Normal", scheduled: "Scheduled" };

const MOCK_BRANCHES_AR = [
  { name: "الرئيسي — الرياض", openOrders: 2, status: "normal" },
  { name: "فرع جدة",           openOrders: 1, status: "normal" },
  { name: "فرع الدمام",        openOrders: 0, status: "good" },
];

const MOCK_BRANCHES_EN = [
  { name: "HQ — Riyadh",     openOrders: 2, status: "normal" },
  { name: "Jeddah Branch",   openOrders: 1, status: "normal" },
  { name: "Dammam Branch",   openOrders: 0, status: "good" },
];

const MOCK_USERS_AR = [
  { name: "فهد العتيبي",    role: "مدير العمليات",  permissions: "رفع الطلبات — اعتماد الإغلاق" },
  { name: "نورة السالم",    role: "المنسق التشغيلي", permissions: "رفع الطلبات فقط" },
  { name: "خالد المطيري",   role: "مشرف الفروع",    permissions: "رفع الطلبات — متابعة أوامر العمل" },
];

const MOCK_USERS_EN = [
  { name: "Fahad Al-Otaibi",  role: "Operations Manager",    permissions: "Submit — Approve Closure" },
  { name: "Noura Al-Salem",   role: "Operations Coordinator", permissions: "Submit Only" },
  { name: "Khalid Al-Mutairi",role: "Branch Supervisor",     permissions: "Submit — Track Work Orders" },
];

const MOCK_INVOICES_AR = [
  { month: "مارس 2026",   amount: "18,450",   status: "paid",    orders: 12 },
  { month: "فبراير 2026", amount: "22,780",   status: "paid",    orders: 15 },
  { month: "يناير 2026",  amount: "14,200",   status: "paid",    orders: 9  },
];

const MOCK_INVOICES_EN = [
  { month: "March 2026",    amount: "18,450",  status: "paid",    orders: 12 },
  { month: "February 2026", amount: "22,780",  status: "paid",    orders: 15 },
  { month: "January 2026",  amount: "14,200",  status: "paid",    orders: 9  },
];

type TabKey = "overview" | "workorders" | "branches" | "invoice" | "users" | "reports";

export default function CompanyDashboard() {
  const { lang } = useLanguage();
  const ar = lang === "ar";
  const { account, isLoggedIn, logout } = useCompanyAuth();
  const stages = ar ? STAGES_AR : STAGES_EN;
  const priorityLabels = ar ? PRIORITY_AR : PRIORITY_EN;
  const BRANCHES = ar ? MOCK_BRANCHES_AR : MOCK_BRANCHES_EN;
  const USERS = ar ? MOCK_USERS_AR : MOCK_USERS_EN;
  const INVOICES = ar ? MOCK_INVOICES_AR : MOCK_INVOICES_EN;

  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [refreshKey, setRefreshKey] = useState(0);
  const [approving, setApproving] = useState<string | null>(null);

  const workOrders = account ? getWorkOrders(account.accountNumber) : [];
  const pending = workOrders.filter(o => !["closed", "invoiced"].includes(o.status));
  const needsApproval = workOrders.filter(o => o.status === "pending_approval");
  const completed = workOrders.filter(o => ["closed", "invoiced"].includes(o.status));
  const recent = [...workOrders].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 5);

  async function handleApprove(id: string) {
    setApproving(id);
    await new Promise(r => setTimeout(r, 500));
    updateWorkOrderStatus(id, "closed", ar ? "اعتمد العميل الاستلام" : "Client approved closure");
    setApproving(null);
    setRefreshKey(k => k + 1);
  }

  if (!isLoggedIn || !account) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <Lock size={48} className="text-gray-200" />
        <p className="text-gray-600 font-medium">{ar ? "يرجى تسجيل الدخول أولاً" : "Please sign in first"}</p>
        <Link href="/portal/login?type=company"><Button>{ar ? "تسجيل الدخول" : "Sign In"}</Button></Link>
      </div>
    );
  }

  const tabs: { key: TabKey; label: string; icon: any; badge?: number }[] = [
    { key: "overview",   label: ar ? "نظرة عامة"   : "Overview",        icon: BarChart3 },
    { key: "workorders", label: ar ? "أوامر العمل" : "Work Orders",      icon: ClipboardList, badge: pending.length || undefined },
    { key: "branches",   label: ar ? "الفروع"       : "Branches",        icon: MapPin },
    { key: "invoice",    label: ar ? "الفواتير"     : "Invoices",        icon: FileText },
    { key: "users",      label: ar ? "المستخدمون"  : "Delegated Users", icon: Users },
    { key: "reports",    label: ar ? "التقارير"     : "Reports",         icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50" key={refreshKey}>
      {/* Header */}
      <div className="bg-primary text-white px-4 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-white/60 text-xs mb-0.5">{ar ? "بوابة إدارة التشغيل المؤسسي" : "Institutional Operations Management Portal"}</p>
            <h1 className="text-2xl font-bold">{account.name}</h1>
            <p className="text-white/70 text-sm mt-1 font-mono">{account.accountNumber}</p>
          </div>
          <div className="flex items-center gap-3">
            {needsApproval.length > 0 && (
              <div className="bg-orange-500 text-white rounded-full px-3 py-1.5 text-xs font-bold flex items-center gap-1.5">
                <Bell size={12} />
                {ar ? `${needsApproval.length} تحتاج اعتماد` : `${needsApproval.length} need approval`}
              </div>
            )}
            <Link href="/request/company-service">
              <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold gap-1.5">
                <PlusCircle size={15} />
                {ar ? "طلب جديد" : "New Request"}
              </Button>
            </Link>
            <button type="button" onClick={logout}
              className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-colors">
              <LogOut size={15} />
              {ar ? "خروج" : "Sign Out"}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-4 text-sm font-medium border-b-2 transition-all shrink-0 whitespace-nowrap relative ${
                    activeTab === tab.key
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}>
                  <Icon size={15} />
                  {tab.label}
                  {tab.badge ? (
                    <span className="bg-orange-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {tab.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: ar ? "إجمالي أوامر العمل" : "Total Work Orders", value: workOrders.length, icon: Package,      color: "text-primary",     bg: "bg-primary/10" },
                { label: ar ? "جارية وقيد التنفيذ" : "Active & In Progress", value: pending.length, icon: Activity,    color: "text-blue-600",    bg: "bg-blue-50" },
                { label: ar ? "تحتاج اعتمادكم"    : "Needs Your Approval",value: needsApproval.length, icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
                { label: ar ? "مكتملة ومغلقة"     : "Completed & Closed", value: completed.length, icon: CheckCircle2, color: "text-green-600",   bg: "bg-green-50" },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{s.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${s.bg} ${s.color}`}>
                    <s.icon size={22} />
                  </div>
                </div>
              ))}
            </div>

            {/* Needs approval alert */}
            {needsApproval.length > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
                <h3 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                  <AlertTriangle size={16} /> {ar ? "تحتاج اعتمادكم" : "Awaiting Your Approval"}
                </h3>
                <div className="space-y-2">
                  {needsApproval.map(order => (
                    <div key={order.id} className="bg-white rounded-xl px-4 py-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{order.subService}</p>
                        <p className="text-xs text-gray-400">{order.id} — {order.branch}</p>
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold shrink-0"
                        disabled={approving === order.id}
                        onClick={() => handleApprove(order.id)}>
                        {approving === order.id ? "..." : (ar ? "اعتماد الاستلام" : "Approve")}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent work orders */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <ClipboardList size={18} className="text-primary" />
                  {ar ? "أحدث أوامر العمل" : "Recent Work Orders"}
                </h2>
                <button onClick={() => setActiveTab("workorders")} className="text-xs text-primary flex items-center gap-1">
                  {ar ? "عرض الكل" : "View All"} <ChevronRight size={14} className={ar ? "rotate-180" : ""} />
                </button>
              </div>
              {recent.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                  <ClipboardList size={40} className="text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm mb-4">{ar ? "لا توجد أوامر عمل حتى الآن" : "No work orders yet"}</p>
                  <Link href="/request/company-service">
                    <Button className="font-bold gap-2"><PlusCircle size={15} /> {ar ? "أرفع أول طلب" : "Submit First Request"}</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recent.map(order => {
                    const stage = stages.find(s => s.key === order.status);
                    return (
                      <div key={order.id} className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex items-center justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-mono text-xs text-gray-300">{order.id}</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stage?.bgColor} ${stage?.color}`}>{stage?.label}</span>
                            {order.isProcurement && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">{ar ? "مشتريات" : "Procurement"}</span>}
                          </div>
                          <p className="font-bold text-gray-900 text-sm truncate">{order.subService}</p>
                          <p className="text-xs text-gray-400">{order.branch} · {order.submittedAt}</p>
                        </div>
                        {order.status === "pending_approval" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold shrink-0"
                            disabled={approving === order.id}
                            onClick={() => handleApprove(order.id)}>
                            {ar ? "اعتماد" : "Approve"}
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { tab: "workorders" as TabKey, label: ar ? "أوامر العمل" : "Work Orders",       icon: ClipboardList, color: "bg-blue-50 text-blue-600" },
                { tab: "branches"   as TabKey, label: ar ? "الفروع"      : "Branches",           icon: MapPin,        color: "bg-purple-50 text-purple-600" },
                { tab: "invoice"    as TabKey, label: ar ? "الفواتير"    : "Invoices",           icon: FileText,      color: "bg-green-50 text-green-600" },
                { tab: "users"      as TabKey, label: ar ? "المستخدمون" : "Delegated Users",    icon: Users,         color: "bg-orange-50 text-orange-600" },
              ].map(link => (
                <button key={link.tab} type="button" onClick={() => setActiveTab(link.tab)}
                  className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col items-center gap-2 hover:border-primary/20 hover:shadow-sm transition-all">
                  <div className={`p-3 rounded-xl ${link.color}`}><link.icon size={20} /></div>
                  <span className="text-xs font-bold text-gray-700">{link.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* WORK ORDERS TAB */}
        {activeTab === "workorders" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-gray-900 text-lg">{ar ? "أوامر العمل" : "Work Orders"}</h2>
              <div className="flex gap-2">
                <Link href="/dashboard/company/work-orders">
                  <Button variant="outline" size="sm" className="text-xs font-bold">
                    {ar ? "صفحة أوامر العمل" : "Full Work Orders Page"}
                    <ChevronRight size={13} className={`ms-1 ${ar ? "rotate-180" : ""}`} />
                  </Button>
                </Link>
                <Link href="/request/company-service">
                  <Button size="sm" className="gap-1.5 text-xs font-bold">
                    <PlusCircle size={13} />{ar ? "طلب جديد" : "New Request"}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Lifecycle note */}
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 mb-5">
              <p className="text-xs font-bold text-primary mb-2">{ar ? "دورة أمر العمل (7 مراحل):" : "Work Order Lifecycle (7 stages):"}</p>
              <div className="flex items-center gap-1 flex-wrap text-xs text-gray-600">
                {stages.map((s, i) => (
                  <span key={s.key} className="flex items-center gap-1">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${s.bgColor} ${s.color}`}>{s.label}</span>
                    {i < stages.length - 1 && <span className="text-gray-300">→</span>}
                  </span>
                ))}
              </div>
            </div>

            {workOrders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <ClipboardList size={40} className="text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-4">{ar ? "لا توجد أوامر عمل" : "No work orders"}</p>
                <Link href="/request/company-service">
                  <Button className="font-bold gap-2"><PlusCircle size={15} />{ar ? "ارفع طلباً" : "Submit Request"}</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {[...workOrders].sort((a, b) => b.id.localeCompare(a.id)).map(order => {
                  const stage = stages.find(s => s.key === order.status);
                  return (
                    <div key={order.id + refreshKey} className="bg-white rounded-2xl border border-gray-100 px-5 py-4">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-mono text-xs text-gray-300">{order.id}</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stage?.bgColor} ${stage?.color}`}>{stage?.label}</span>
                            <span className="text-xs text-gray-300">{priorityLabels[order.priority]}</span>
                            {order.isProcurement && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">{ar ? "مشتريات" : "Procurement"}</span>}
                          </div>
                          <p className="font-bold text-gray-900 text-sm">{order.subService}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{order.category} — {order.branch}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {order.status === "pending_approval" && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold"
                              disabled={approving === order.id}
                              onClick={() => handleApprove(order.id)}>
                              {approving === order.id ? "..." : (ar ? "اعتماد الاستلام" : "Approve & Close")}
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-300">{order.submittedAt}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* BRANCHES TAB */}
        {activeTab === "branches" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-gray-900 text-lg">{ar ? "متابعة الفروع والمواقع" : "Branches & Sites"}</h2>
              <Button variant="outline" size="sm" className="text-xs font-bold gap-1.5">
                <Building2 size={13} />{ar ? "إضافة فرع" : "Add Branch"}
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {BRANCHES.map((branch, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-primary/10 rounded-xl"><MapPin size={16} className="text-primary" /></div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      branch.status === "good" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {branch.status === "good" ? (ar ? "لا توجد طلبات" : "No Open Orders") : (ar ? "نشط" : "Active")}
                    </span>
                  </div>
                  <p className="font-bold text-gray-900 text-sm mb-1">{branch.name}</p>
                  <p className="text-xs text-gray-400">
                    {branch.openOrders > 0
                      ? (ar ? `${branch.openOrders} طلبات جارية` : `${branch.openOrders} open orders`)
                      : (ar ? "لا توجد طلبات جارية" : "No active orders")}
                  </p>
                  {branch.openOrders > 0 && (
                    <button onClick={() => setActiveTab("workorders")} className="text-xs text-primary mt-3 flex items-center gap-1">
                      {ar ? "عرض أوامر العمل" : "View Work Orders"} <ChevronRight size={12} className={ar ? "rotate-180" : ""} />
                    </button>
                  )}
                </div>
              ))}
              {/* Add branch placeholder */}
              <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-5 flex flex-col items-center justify-center gap-2 text-center cursor-pointer hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Building2 size={18} className="text-gray-400" />
                </div>
                <p className="text-xs text-gray-400 font-medium">{ar ? "إضافة فرع جديد" : "Add New Branch"}</p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/10 rounded-2xl px-5 py-4 text-sm text-primary/80">
              <p className="font-bold mb-1">{ar ? "إدارة الفروع الموحدة:" : "Unified Branch Management:"}</p>
              <p className="text-xs leading-relaxed">
                {ar
                  ? "يمكنكم رفع طلبات خدمة مباشرة لأي فرع أو موقع، ومتابعة أوامر العمل لكل موقع على حدة عبر بوابة واحدة موحدة."
                  : "You can submit service requests directly for any branch or site and track work orders per location through a single unified portal."}
              </p>
            </div>
          </motion.div>
        )}

        {/* INVOICE TAB */}
        {activeTab === "invoice" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-gray-900 text-lg">{ar ? "الفواتير الشهرية الموحدة" : "Monthly Unified Invoices"}</h2>
              <div className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full">
                {ar ? "نموذج عرض" : "Display Preview"}
              </div>
            </div>

            {/* Current month */}
            <div className="bg-primary rounded-2xl text-white p-6 mb-6">
              <p className="text-white/60 text-xs mb-1">{ar ? "الفاتورة الجارية" : "Current Invoice"}</p>
              <p className="text-xl font-bold mb-1">{ar ? "أبريل 2026" : "April 2026"}</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold">{ar ? "0 ريال" : "SAR 0"}</p>
                  <p className="text-white/70 text-xs mt-1">
                    {workOrders.length > 0
                      ? (ar ? `${workOrders.length} أوامر عمل جارية` : `${workOrders.length} active work orders`)
                      : (ar ? "لا توجد أوامر عمل بعد" : "No work orders yet")}
                  </p>
                </div>
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {ar ? "مفتوحة" : "Open"}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {INVOICES.map((inv, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{inv.month}</p>
                    <p className="text-xs text-gray-400">{ar ? `${inv.orders} أوامر عمل` : `${inv.orders} work orders`}</p>
                  </div>
                  <div className="text-end">
                    <p className="font-bold text-gray-900 text-sm">{inv.amount} {ar ? "ريال" : "SAR"}</p>
                    <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                      {ar ? "مسدّدة" : "Paid"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 text-sm text-amber-900">
              <p className="font-bold mb-1">{ar ? "ملاحظة الفوترة:" : "Billing Note:"}</p>
              <p className="text-xs leading-relaxed">
                {ar
                  ? "تُجمع جميع أوامر العمل في فاتورة شهرية موحدة. تُرفق بها تفاصيل كل خدمة والمورد المنفذ وتاريخ الإغلاق. تصلكم الفاتورة في اليوم الأول من كل شهر."
                  : "All work orders are consolidated into a monthly unified invoice with full details of each service, executing vendor, and closure date. Invoices are issued on the 1st of every month."}
              </p>
            </div>
          </motion.div>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-bold text-gray-900 text-lg">{ar ? "إدارة المستخدمين المفوضين" : "Delegated Users Management"}</h2>
                <p className="text-xs text-gray-400 mt-1">
                  {ar ? "المستخدمون المخوّلون برفع الطلبات والتصرف باسم المنشأة" : "Users authorized to submit requests and act on behalf of the facility"}
                </p>
              </div>
              <Button variant="outline" size="sm" className="text-xs font-bold gap-1.5">
                <Users size={13} />{ar ? "دعوة مستخدم" : "Invite User"}
              </Button>
            </div>

            <div className="space-y-3 mb-6">
              {/* Account owner */}
              <div className="bg-primary/5 rounded-2xl border border-primary/10 px-5 py-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {account.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{account.name}</p>
                    <p className="text-xs text-gray-400">{ar ? "مسؤول الحساب الرئيسي" : "Primary Account Owner"}</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary text-white">{ar ? "مالك" : "Owner"}</span>
              </div>

              {USERS.map((user, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <UserCheck size={16} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.role}</p>
                      <p className="text-xs text-primary/70 mt-0.5">{user.permissions}</p>
                    </div>
                  </div>
                  <button className="text-gray-300 hover:text-red-400 transition-colors"><X size={16} /></button>
                </div>
              ))}

              {/* Placeholder */}
              <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 px-5 py-5 flex items-center gap-3 cursor-pointer hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Users size={16} className="text-gray-300" />
                </div>
                <p className="text-xs text-gray-400 font-medium">{ar ? "دعوة مستخدم جديد..." : "Invite a new user..."}</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 text-sm text-blue-900">
              <p className="font-bold mb-1">{ar ? "صلاحيات المستخدمين:" : "User Permissions:"}</p>
              <ul className="text-xs space-y-1 text-blue-800">
                <li>• {ar ? "رفع الطلبات — يمكنه إرسال طلبات خدمة جديدة" : "Submit — Can send new service requests"}</li>
                <li>• {ar ? "اعتماد الإغلاق — يمكنه اعتماد إنهاء أوامر العمل" : "Approve Closure — Can approve work order completion"}</li>
                <li>• {ar ? "متابعة أوامر العمل — عرض أوامر العمل فقط" : "Track Work Orders — View-only access"}</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* REPORTS TAB */}
        {activeTab === "reports" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-gray-900 text-lg">{ar ? "التقارير التشغيلية" : "Operational Reports"}</h2>
              <div className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full">
                {ar ? "نموذج عرض" : "Display Preview"}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                { icon: "📊", label: ar ? "تقرير الأداء الشهري"     : "Monthly Performance Report",      desc: ar ? "ملخص أوامر العمل وكفاءة التنفيذ"  : "Work orders summary and execution efficiency" },
                { icon: "💰", label: ar ? "تقرير التكاليف التشغيلية" : "Operational Cost Report",        desc: ar ? "تحليل المصروفات والمقارنة الشهرية" : "Expense analysis and monthly comparison" },
                { icon: "⭐", label: ar ? "تقرير أداء الموردين"      : "Vendor Performance Report",      desc: ar ? "تقييمات الموردين المنفذين"          : "Ratings of executing vendors" },
                { icon: "📍", label: ar ? "تقرير الفروع"             : "Branch Operations Report",       desc: ar ? "نشاط كل فرع ومستوى الخدمة"         : "Branch activity and service levels" },
              ].map((r, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-3 items-start hover:shadow-sm transition-all cursor-pointer">
                  <span className="text-2xl">{r.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm">{r.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{r.desc}</p>
                    <button className="text-xs text-primary mt-2 flex items-center gap-1">
                      {ar ? "عرض التقرير" : "View Report"} <ChevronRight size={11} className={ar ? "rotate-180" : ""} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 text-center">
              <BarChart3 size={40} className="text-gray-200 mx-auto mb-3" />
              <p className="font-bold text-gray-700 mb-1">{ar ? "التقارير التشغيلية" : "Operational Reports"}</p>
              <p className="text-xs text-gray-400">
                {ar
                  ? "تُصدر GSS تقارير دورية شهرية وربعية ترفق بها الفواتير الموحدة لمساعدتكم على إدارة التكاليف وتحسين الكفاءة التشغيلية."
                  : "GSS issues periodic monthly and quarterly reports alongside unified invoices to help you manage costs and improve operational efficiency."}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
