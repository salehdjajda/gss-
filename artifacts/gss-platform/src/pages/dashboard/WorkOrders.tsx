import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Lock, ClipboardList, ChevronDown, ChevronUp, CheckCircle2,
  Clock, Wrench, Truck, FileCheck, FileText, Package, PlusCircle, X,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyAuth } from "@/contexts/AccountAuthContext";
import { getWorkOrders, updateWorkOrderStatus, WorkOrder, WorkOrderStatus } from "@/pages/company/RequestServiceCompany";

const STAGES_AR: { key: WorkOrderStatus; label: string; icon: any; color: string }[] = [
  { key: "received",         label: "طلب مُستلم",          icon: ClipboardList,  color: "bg-gray-400" },
  { key: "work_order",       label: "أمر عمل صادر",        icon: FileText,       color: "bg-blue-500" },
  { key: "vendor",           label: "تحويل للمورد",         icon: Truck,          color: "bg-purple-500" },
  { key: "in_progress",      label: "جاري التنفيذ",         icon: Wrench,         color: "bg-yellow-500" },
  { key: "pending_approval", label: "بانتظار اعتماد العميل",icon: FileCheck,      color: "bg-orange-500" },
  { key: "closed",           label: "مُغلق",                icon: CheckCircle2,   color: "bg-green-500" },
  { key: "invoiced",         label: "مُدرج في الفاتورة",    icon: FileText,       color: "bg-primary" },
];

const STAGES_EN: { key: WorkOrderStatus; label: string; icon: any; color: string }[] = [
  { key: "received",         label: "Request Received",    icon: ClipboardList,  color: "bg-gray-400" },
  { key: "work_order",       label: "Work Order Issued",   icon: FileText,       color: "bg-blue-500" },
  { key: "vendor",           label: "Routed to Vendor",    icon: Truck,          color: "bg-purple-500" },
  { key: "in_progress",      label: "In Execution",        icon: Wrench,         color: "bg-yellow-500" },
  { key: "pending_approval", label: "Awaiting Approval",   icon: FileCheck,      color: "bg-orange-500" },
  { key: "closed",           label: "Closed",              icon: CheckCircle2,   color: "bg-green-500" },
  { key: "invoiced",         label: "Added to Invoice",    icon: FileText,       color: "bg-primary" },
];

const PRIORITY_LABEL_AR: Record<WorkOrder["priority"], { label: string; color: string }> = {
  urgent:    { label: "طارئ",     color: "bg-red-100 text-red-700" },
  high:      { label: "عاجل",     color: "bg-orange-100 text-orange-700" },
  normal:    { label: "عادي",     color: "bg-blue-100 text-blue-700" },
  scheduled: { label: "مجدول",    color: "bg-gray-100 text-gray-600" },
};

const PRIORITY_LABEL_EN: Record<WorkOrder["priority"], { label: string; color: string }> = {
  urgent:    { label: "Emergency", color: "bg-red-100 text-red-700" },
  high:      { label: "Urgent",    color: "bg-orange-100 text-orange-700" },
  normal:    { label: "Normal",    color: "bg-blue-100 text-blue-700" },
  scheduled: { label: "Scheduled", color: "bg-gray-100 text-gray-600" },
};

function StatusPipeline({ order, stages }: { order: WorkOrder; stages: typeof STAGES_AR }) {
  const currentIdx = stages.findIndex(s => s.key === order.status);
  return (
    <div className="flex items-center gap-0 mt-3 overflow-x-auto pb-1">
      {stages.map((stage, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        const pending = i > currentIdx;
        const Icon = stage.icon;
        return (
          <div key={stage.key} className="flex items-center shrink-0">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all border-2 ${
                done ? "bg-green-500 border-green-500 text-white" :
                active ? `${stage.color} border-transparent text-white shadow-md scale-110` :
                "bg-gray-100 border-gray-200 text-gray-400"
              }`}>
                {done ? <CheckCircle2 size={14} /> : <Icon size={14} />}
              </div>
              <p className={`text-center mt-1 leading-tight text-[9px] w-14 ${
                done ? "text-green-600 font-medium" :
                active ? "text-gray-900 font-bold" :
                "text-gray-300"
              }`}>{stage.label}</p>
            </div>
            {i < stages.length - 1 && (
              <div className={`h-0.5 w-4 mx-0.5 mb-4 ${done ? "bg-green-400" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function WorkOrderCard({ order, stages, priorityLabels, ar, onApprove, approvingId }: {
  order: WorkOrder;
  stages: typeof STAGES_AR;
  priorityLabels: typeof PRIORITY_LABEL_AR;
  ar: boolean;
  onApprove: (id: string) => void;
  approvingId: string | null;
}) {
  const [expanded, setExpanded] = useState(false);
  const stageInfo = stages.find(s => s.key === order.status);
  const prio = priorityLabels[order.priority];
  const isApproving = approvingId === order.id;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
    >
      <div className="px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-mono text-xs text-gray-400">{order.id}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${prio.color}`}>{prio.label}</span>
              {order.isProcurement && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">
                  {ar ? "مشتريات" : "Procurement"}
                </span>
              )}
            </div>
            <p className="font-bold text-gray-900 text-sm leading-tight">{order.subService}</p>
            <p className="text-xs text-gray-400 mt-0.5">{order.category} — {order.branch}</p>
          </div>
          <div className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full text-white ${stageInfo?.color}`}>
            {stageInfo?.label}
          </div>
        </div>

        <StatusPipeline order={order} stages={stages} />

        {order.status === "pending_approval" && (
          <div className="mt-3 bg-orange-50 border border-orange-200 rounded-xl p-3 flex items-center justify-between gap-3">
            <p className="text-xs text-orange-800 font-medium">
              {ar ? "يتطلب اعتمادكم لإغلاق أمر العمل" : "Requires your approval to close the work order"}
            </p>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold shrink-0"
              disabled={isApproving}
              onClick={() => !isApproving && onApprove(order.id)}>
              {isApproving ? (ar ? "جاري الاعتماد..." : "Approving...") : (ar ? "اعتماد الاستلام" : "Approve & Close")}
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-300">{order.submittedAt}</span>
          <button type="button" onClick={() => setExpanded(v => !v)}
            className="text-xs text-primary/70 flex items-center gap-1 hover:text-primary">
            {expanded ? (ar ? "إخفاء" : "Hide") : (ar ? "عرض التفاصيل" : "View Details")}
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            className="border-t border-gray-50 px-5 py-4 bg-gray-50/50">
            <p className="text-xs text-gray-500 mb-3 font-bold">{ar ? "تفاصيل الطلب:" : "Request Details:"}</p>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">{order.details}</p>
            {order.statusHistory.length > 1 && (
              <>
                <p className="text-xs text-gray-500 mb-2 font-bold">{ar ? "سجل الحالات:" : "Status History:"}</p>
                <div className="space-y-1">
                  {order.statusHistory.map((h, i) => {
                    const s = stages.find(st => st.key === h.status);
                    return (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                        <div className={`w-2 h-2 rounded-full ${s?.color || "bg-gray-300"}`} />
                        <span className="font-medium">{s?.label}</span>
                        <span className="text-gray-300">—</span>
                        <span>{h.date}</span>
                        {h.note && <span className="text-gray-400">({h.note})</span>}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function WorkOrders() {
  const { lang } = useLanguage();
  const ar = lang === "ar";
  const { account, isLoggedIn } = useCompanyAuth();
  const stages = ar ? STAGES_AR : STAGES_EN;
  const priorityLabels = ar ? PRIORITY_LABEL_AR : PRIORITY_LABEL_EN;

  const [filter, setFilter] = useState<WorkOrderStatus | "all">("all");
  const [refreshKey, setRefreshKey] = useState(0);
  const [approving, setApproving] = useState<string | null>(null);
  const [approvedId, setApprovedId] = useState<string | null>(null);

  const workOrders = account ? getWorkOrders(account.accountNumber) : [];
  const filtered = filter === "all" ? workOrders : workOrders.filter(o => o.status === filter);
  const sortedOrders = [...filtered].sort((a, b) => b.id.localeCompare(a.id));

  const handleApprove = useCallback(async (id: string) => {
    setApproving(id);
    await new Promise(r => setTimeout(r, 600));
    updateWorkOrderStatus(id, "closed", ar ? "اعتمد العميل الاستلام" : "Client approved closure");
    setApprovedId(id);
    setApproving(null);
    setRefreshKey(k => k + 1);
    setTimeout(() => setApprovedId(null), 3000);
  }, [ar]);

  if (!isLoggedIn || !account) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <Lock size={48} className="text-gray-200" />
        <p className="text-gray-600 font-medium">{ar ? "يرجى تسجيل الدخول أولاً" : "Please sign in first"}</p>
        <Link href="/portal/login?type=company"><Button>{ar ? "تسجيل الدخول" : "Sign In"}</Button></Link>
      </div>
    );
  }

  const counts: Record<string, number> = {};
  workOrders.forEach(o => { counts[o.status] = (counts[o.status] || 0) + 1; });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-10 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-white/60 text-sm mb-1">{account.name} · {account.accountNumber}</p>
            <h1 className="text-2xl font-bold">{ar ? "أوامر العمل" : "Work Orders"}</h1>
            <p className="text-white/70 text-sm mt-1">
              {ar ? `${workOrders.length} أوامر عمل إجمالاً` : `${workOrders.length} work orders total`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/company">
              <Button variant="ghost" className="text-white border border-white/20 hover:bg-white/10 font-bold text-sm">
                {ar ? "لوحة التحكم" : "Dashboard"}
              </Button>
            </Link>
            <Link href="/request/company-service">
              <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold gap-2">
                <PlusCircle size={16} />
                {ar ? "طلب جديد" : "New Request"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {approvedId && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-green-600 text-white text-center py-3 text-sm font-bold">
          ✓ {ar ? "تم اعتماد استلام أمر العمل وإغلاقه" : "Work order approved and closed successfully"}
        </motion.div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        {workOrders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center">
            <ClipboardList size={48} className="text-gray-200 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 text-lg mb-2">{ar ? "لا توجد أوامر عمل حتى الآن" : "No work orders yet"}</h3>
            <p className="text-gray-400 text-sm mb-6">{ar ? "ابدأ بطلب خدمة تشغيلية جديدة" : "Start by submitting an operational service request"}</p>
            <Link href="/request/company-service">
              <Button className="font-bold gap-2"><PlusCircle size={16} />{ar ? "أرفع أول طلب" : "Submit First Request"}</Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Lifecycle info box */}
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 mb-6">
              <p className="text-xs font-bold text-primary mb-2">{ar ? "دورة حياة أمر العمل:" : "Work Order Lifecycle:"}</p>
              <div className="flex items-center gap-1 flex-wrap">
                {stages.map((s, i) => (
                  <span key={s.key} className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${s.color}`} />
                    <span className="text-xs text-gray-600">{s.label}</span>
                    {i < stages.length - 1 && <span className="text-gray-300 text-xs mx-0.5">→</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-5">
              <button onClick={() => setFilter("all")}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filter === "all" ? "bg-primary text-white" : "bg-white text-gray-500 border border-gray-200 hover:border-primary/30"}`}>
                {ar ? `الكل (${workOrders.length})` : `All (${workOrders.length})`}
              </button>
              {stages.map(s => counts[s.key] > 0 && (
                <button key={s.key} onClick={() => setFilter(s.key)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filter === s.key ? `${s.color} text-white` : "bg-white text-gray-500 border border-gray-200 hover:border-primary/30"}`}>
                  {s.label} ({counts[s.key]})
                </button>
              ))}
            </div>

            <div className="space-y-4" key={refreshKey}>
              {sortedOrders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                  <p className="text-gray-400 text-sm">{ar ? "لا توجد أوامر بهذه الحالة" : "No orders with this status"}</p>
                </div>
              ) : (
                sortedOrders.map(order => (
                  <WorkOrderCard
                    key={order.id + refreshKey}
                    order={order}
                    stages={stages}
                    priorityLabels={priorityLabels}
                    ar={ar}
                    onApprove={handleApprove}
                    approvingId={approving}
                  />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
