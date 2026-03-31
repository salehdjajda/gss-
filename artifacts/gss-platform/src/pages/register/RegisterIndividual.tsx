import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SERVICES_AR = [
  "تكييف", "سباكة", "كهرباء", "نجارة وتركيبات", "غرف التبريد",
  "صيانة الأجهزة", "دهانات", "لياسة", "أعمال جبسية", "باركيه",
  "أرضيات وتبليط", "عشب صناعي", "حوض سباحة", "مضلات مواقف",
  "ستالايت", "كاميرات مراقبة", "تنظيف", "مكافحة الحشرات",
  "نقل وشحن", "التراخيص", "الشؤون الحكومية", "السكن والإيجارات",
  "الأسطول والمركبات", "فواتير الخدمات", "ترجمة وثائق",
];

const SERVICES_EN = [
  "AC & Cooling", "Plumbing", "Electrical", "Carpentry", "Cold Storage",
  "Device Repair", "Painting", "Plastering", "Gypsum Works", "Parquet",
  "Tiling & Flooring", "Artificial Grass", "Swimming Pool", "Parking Shades",
  "Satellite", "CCTV", "Cleaning", "Pest Control",
  "Moving & Delivery", "Licensing", "Government Affairs", "Rentals",
  "Vehicles", "Utility Bills", "Document Translation",
];

const CITIES_AR = ["الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام", "الخبر", "الطائف", "تبوك", "أبها", "القصيم", "حائل", "جيزان", "نجران", "الجوف", "أخرى"];
const CITIES_EN = ["Riyadh", "Jeddah", "Makkah", "Madinah", "Dammam", "Khobar", "Taif", "Tabuk", "Abha", "Qassim", "Hail", "Jazan", "Najran", "Al-Jouf", "Other"];

export default function RegisterIndividual() {
  const { t, lang, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const [form, setForm] = useState({
    name: "", phone: "", city: "", service: "", details: "", preferredTime: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const SERVICES = lang === "ar" ? SERVICES_AR : SERVICES_EN;
  const CITIES   = lang === "ar" ? CITIES_AR   : CITIES_EN;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t("reg_ind_success_title")}</h2>
          <p className="text-gray-500 leading-relaxed mb-8">{t("reg_ind_success_desc")}</p>
          <Link href="/individuals">
            <Button variant="outline" className="w-full font-bold border-primary text-primary">
              {lang === "ar" ? "عودة لصفحة الأفراد" : "Back to Individuals"}
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="inline-block bg-primary/10 text-primary font-bold text-sm px-4 py-1.5 rounded-full mb-4">
            {t("ind_badge")}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{t("reg_ind_title")}</h1>
          <p className="text-gray-500">{t("reg_ind_desc")}</p>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">{t("reg_ind_name")} *</label>
                <input
                  type="text" required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                  placeholder={lang === "ar" ? "محمد أحمد" : "John Smith"}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">{t("reg_ind_phone")} *</label>
                <input
                  type="tel" required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                  placeholder="05XXXXXXXX"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* City */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">{t("reg_ind_city")} *</label>
                <select
                  required
                  value={form.city}
                  onChange={e => setForm({ ...form, city: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition bg-white"
                >
                  <option value="">{t("reg_ind_select_city")}</option>
                  {CITIES.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">{t("reg_ind_service")} *</label>
                <select
                  required
                  value={form.service}
                  onChange={e => setForm({ ...form, service: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition bg-white"
                >
                  <option value="">{t("reg_ind_select_service")}</option>
                  {SERVICES.map((s, i) => <option key={i} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Details */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">{t("reg_ind_details")} *</label>
              <textarea
                required rows={4}
                value={form.details}
                onChange={e => setForm({ ...form, details: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
                placeholder={t("reg_ind_details_ph")}
              />
            </div>

            {/* Preferred Time */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t("reg_ind_time")}</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { val: "morning",   label: t("reg_ind_morning") },
                  { val: "afternoon", label: t("reg_ind_afternoon") },
                  { val: "evening",   label: t("reg_ind_evening") },
                  { val: "anytime",   label: t("reg_ind_anytime") },
                ].map(opt => (
                  <button
                    key={opt.val} type="button"
                    onClick={() => setForm({ ...form, preferredTime: opt.val })}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      form.preferredTime === opt.val
                        ? "bg-primary text-white border-primary"
                        : "border-gray-200 text-gray-600 hover:border-primary/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-green-50 rounded-2xl px-5 py-4 flex flex-wrap gap-4 justify-center text-xs text-green-700 font-medium">
              {[
                lang === "ar" ? "✓ سعر المورد المباشر" : "✓ Direct Vendor Price",
                lang === "ar" ? "✓ فنيون مرخصون" : "✓ Licensed Technicians",
                lang === "ar" ? "✓ ضمان الجودة" : "✓ Quality Guarantee",
              ].map((b, i) => <span key={i}>{b}</span>)}
            </div>

            <Button type="submit" size="lg" className="w-full h-13 text-base font-bold" disabled={loading} data-testid="submit-ind-form">
              {loading ? (lang === "ar" ? "جاري الإرسال..." : "Sending...") : t("reg_ind_submit")}
              {!loading && <Arrow className="mr-2" size={18} />}
            </Button>
          </form>
        </motion.div>

        <p className="text-center text-gray-400 text-xs mt-6">
          {lang === "ar"
            ? "سيتواصل معك فريق GSS خلال ساعات لتأكيد العرض والموعد"
            : "GSS team will contact you within hours to confirm the offer and schedule"}
        </p>
      </div>
    </div>
  );
}
