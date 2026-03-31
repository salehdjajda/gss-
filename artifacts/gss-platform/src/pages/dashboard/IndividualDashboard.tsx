import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  UserCircle2, Copy, CheckCheck, LogOut, PlusCircle,
  ClipboardList, MapPin, Clock, ChevronRight, ChevronLeft
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIndividualAuth, ServiceRequest } from "@/contexts/IndividualAuthContext";

const STATUS_AR: Record<ServiceRequest["status"], string> = {
  pending:     "قيد المراجعة",
  confirmed:   "تم تأكيد الطلب",
  in_progress: "جاري التنفيذ",
  completed:   "مكتمل",
};
const STATUS_EN: Record<ServiceRequest["status"], string> = {
  pending:     "Under Review",
  confirmed:   "Confirmed",
  in_progress: "In Progress",
  completed:   "Completed",
};
const STATUS_COLOR: Record<ServiceRequest["status"], string> = {
  pending:     "bg-amber-100 text-amber-700",
  confirmed:   "bg-blue-100 text-blue-700",
  in_progress: "bg-primary/10 text-primary",
  completed:   "bg-green-100 text-green-700",
};

export default function IndividualDashboard() {
  const { lang, isRTL }          = useLanguage();
  const { account, requests, logout, isLoggedIn } = useIndividualAuth();
  const [, navigate] = useLocation();
  const [copied, setCopied] = useState(false);
  const Arrow = isRTL ? ChevronLeft : ChevronRight;

  // Redirect if not logged in
  if (!isLoggedIn || !account) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <UserCircle2 size={48} className="text-gray-300" />
        <p className="text-gray-600 font-medium">
          {lang === "ar" ? "يرجى تسجيل الدخول أولاً" : "Please sign in first"}
        </p>
        <Link href="/register/individual">
          <Button>{lang === "ar" ? "سجّل الدخول" : "Sign In"}</Button>
        </Link>
      </div>
    );
  }

  function copyAccountNumber() {
    navigator.clipboard.writeText(account!.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleLogout() {
    logout();
    navigate("/individuals");
  }

  const statusLabel = lang === "ar" ? STATUS_AR : STATUS_EN;

  return (
    <div className="min-h-screen bg-gray-50 pb-16">

      {/* ── Profile Header ── */}
      <div className="bg-primary text-white px-4 pt-10 pb-16">
        <div className="max-w-3xl mx-auto flex items-start justify-between gap-4">
          <div>
            <p className="text-white/60 text-sm mb-1">
              {lang === "ar" ? "مرحباً،" : "Welcome,"}
            </p>
            <h1 className="text-2xl font-bold mb-3">{account.name}</h1>
            <div className="flex items-center gap-2">
              <span className="bg-white/15 text-white text-xs font-mono px-3 py-1.5 rounded-lg tracking-wider">
                {account.accountNumber}
              </span>
              <button onClick={copyAccountNumber} title={lang === "ar" ? "نسخ رقم الحساب" : "Copy account number"}
                className="bg-white/15 hover:bg-white/25 text-white p-1.5 rounded-lg transition-colors">
                {copied ? <CheckCheck size={14} /> : <Copy size={14} />}
              </button>
            </div>
            <p className="text-white/50 text-xs mt-2 flex items-center gap-1">
              <MapPin size={11} /> {account.city} &nbsp;·&nbsp;
              <Clock size={11} /> {lang === "ar" ? "انضم " : "Joined "}{account.joinedAt}
            </p>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-medium transition-colors mt-1">
            <LogOut size={14} />
            {lang === "ar" ? "خروج" : "Logout"}
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-3xl mx-auto px-4 -mt-8">

        {/* New Request Card */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-bold text-gray-900 mb-1">
              {lang === "ar" ? "رفع طلب خدمة جديد" : "Submit a New Service Request"}
            </h2>
            <p className="text-gray-500 text-sm">
              {lang === "ar"
                ? "اختر الخدمة وأرسل التفاصيل — سنتواصل معك خلال ساعات"
                : "Choose the service and send details — we'll reach out within hours"}
            </p>
          </div>
          <Link href="/request/service">
            <Button className="shrink-0 gap-2 font-bold">
              <PlusCircle size={16} />
              {lang === "ar" ? "طلب جديد" : "New Request"}
            </Button>
          </Link>
        </motion.div>

        {/* Requests list */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <ClipboardList size={18} className="text-primary" />
              {lang === "ar" ? "طلباتي" : "My Requests"}
              {requests.length > 0 && (
                <span className="bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {requests.length}
                </span>
              )}
            </h2>
          </div>

          {requests.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white rounded-3xl border border-gray-100 p-10 text-center">
              <ClipboardList size={40} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 font-medium text-sm">
                {lang === "ar" ? "لا توجد طلبات حتى الآن" : "No requests yet"}
              </p>
              <Link href="/request/service">
                <Button size="sm" variant="outline" className="mt-4 font-bold border-primary text-primary">
                  {lang === "ar" ? "أرفع أول طلب" : "Submit First Request"}
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {[...requests].reverse().map((req, i) => (
                <motion.div key={req.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-bold text-gray-900 text-sm">{req.service}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_COLOR[req.status]}`}>
                        {statusLabel[req.status]}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs truncate max-w-xs">{req.details}</p>
                    <p className="text-gray-300 text-xs mt-1">{req.submittedAt}</p>
                  </div>
                  <Arrow size={16} className="text-gray-300 shrink-0" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
