import { useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, useSearch } from "wouter";
import { useCompanyAuth } from "@/contexts/AccountAuthContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRegisterCompany } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  CheckCircle2, Building2, ArrowLeft, Layers, Users, ShieldCheck,
  Paperclip, X, Plus, Trash2, FileText, MapPin, Truck, BarChart2, Star
} from "lucide-react";
import { motion } from "framer-motion";

const ACTIVITY_TYPES = [
  "تجاري", "صناعي", "طبي", "تعليمي", "تقني", "لوجستي", "عقاري",
  "مقاولات", "ضيافة", "مطاعم", "إداري", "مالي", "مستودعات",
  "تشغيل وصيانة", "حكومي", "غير ربحي", "ترفيهي", "إعلامي", "زراعي", "أخرى"
];

const SERVICES = [
  "تكييف وتبريد", "سباكة وصرف صحي", "كهرباء وإنارة", "نجارة وتركيبات",
  "دهانات ولياسة", "أعمال جبسية", "أرضيات وتبليط", "باركيه",
  "غرف التبريد", "أعمال معدنية وحدادة", "عشب صناعي", "حوض سباحة",
  "مضلات ومواقف", "ستالايت وأنظمة بث", "كاميرات مراقبة وأمن",
  "أنظمة إنذار حريق", "طفايات حريق", "تنظيف يومي ودوري",
  "مكافحة حشرات", "مكافحة قوارض", "تعقيم وتطهير", "نقل وشحن",
  "إدارة الأسطول والمركبات", "إسكان الموظفين", "صيانة أجهزة وجوالات",
  "شبكات إنترنت وواي فاي", "طابعات وناسخات", "التراخيص والتجديدات",
  "الشؤون الحكومية", "استقدام عمالة وتأشيرات", "ترجمة وثائق",
  "طباعة ومواد دعائية", "فواتير الكهرباء والمياه", "توريد مياه شرب",
  "إدارة كانتين ومطعم", "مصاعد وسلالم كهربائية", "معدات مطابخ تجارية",
  "الفعاليات والمناسبات",
];

const MONTHLY_REQUESTS = ["1–5", "5–20", "20–50", "أكثر من 50"];
const BRANCH_RANGES = ["فرع واحد", "2–5 فروع", "6–15 فرع", "أكثر من 15 فرع"];
const EMPLOYEE_RANGES = ["1–10", "10–50", "50–200", "أكثر من 200"];
const DELEGATE_PERMISSIONS = ["تشغيلي", "مالي", "عقود", "تقني", "عام"];
const BRANCH_TYPES = ["مكتب", "مستودع", "معرض", "فرع تشغيل", "سكن موظفين", "أخرى"];

const delegateSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  jobTitle: z.string().min(2, "المسمى الوظيفي مطلوب"),
  phone: z.string().min(9, "رقم الجوال غير صالح"),
  email: z.string().email("بريد إلكتروني غير صالح"),
  department: z.string().optional(),
  permissions: z.array(z.string()).optional(),
});

const branchSchema = z.object({
  name: z.string().min(2, "اسم الفرع مطلوب"),
  city: z.string().min(2, "المدينة مطلوبة"),
  address: z.string().optional(),
  type: z.string().optional(),
  workHours: z.string().optional(),
  employeeCount: z.string().optional(),
});

const vendorSchema = z.object({
  name: z.string().min(2, "اسم المورد مطلوب"),
  serviceType: z.string().optional(),
  phone: z.string().optional(),
  notes: z.string().optional(),
  wantsGssToManage: z.string().optional(),
});

const schema = z.object({
  companyName: z.string().min(2, "اسم المنشأة مطلوب"),
  commercialRegister: z.string().optional(),
  crExpiryDate: z.string().optional(),
  city: z.string().min(2, "المدينة مطلوبة"),
  address: z.string().optional(),
  branchCountRange: z.string().optional(),
  employeeCountRange: z.string().optional(),
  activityType: z.array(z.string()).min(1, "يرجى تحديد نوع النشاط"),
  activityTypeOther: z.string().optional(),
  delegates: z.array(delegateSchema).min(1, "يجب إضافة مفوض واحد على الأقل"),
  requestedServices: z.array(z.string()).min(1, "يرجى تحديد خدمة واحدة على الأقل"),
  otherServicesText: z.string().optional(),
  branches: z.array(branchSchema).optional(),
  hasCurrentVendors: z.string().optional(),
  vendors: z.array(vendorSchema).optional(),
  monthlyRequestsVolume: z.string().optional(),
  hasEmergencies: z.string().optional(),
  hasInternalTeam: z.string().optional(),
  hasTicketSystem: z.string().optional(),
  paymentPolicy: z.string().optional(),
  collaborationModel: z.string().min(1, "يرجى تحديد نموذج التعاون"),
  budgetDefined: z.string().optional(),
  selectedPackage: z.string().optional(),
  authorizationConfirmed: z.boolean().refine(val => val === true, "يجب تأكيد التفويض"),
  agreementConfirmed: z.boolean().refine(val => val === true, "يجب الموافقة على الاتفاقية"),
  feesConfirmed: z.boolean().refine(val => val === true, "يجب الإقرار بآلية الرسوم"),
});

type FormData = z.infer<typeof schema>;

const TOTAL_STEPS = 9;

const STEP_LABELS = [
  { label: "بيانات المنشأة", labelEn: "Facility Info",    icon: Building2 },
  { label: "المستندات",       labelEn: "Documents",         icon: FileText },
  { label: "المفوضون",        labelEn: "Delegates",         icon: Users },
  { label: "الخدمات",         labelEn: "Services",          icon: Layers },
  { label: "الفروع",          labelEn: "Branches",          icon: MapPin },
  { label: "الموردون",        labelEn: "Vendors",           icon: Truck },
  { label: "التشغيل",         labelEn: "Operations",        icon: BarChart2 },
  { label: "الباقة",          labelEn: "Package",           icon: Star },
  { label: "الإرسال",         labelEn: "Submit",            icon: ShieldCheck },
];

interface FileState {
  cr: File | null;
  nationalAddress: File | null;
  logo: File | null;
  companyProfile: File | null;
  branchLocations: File | null;
}

export default function RegisterCompany() {
  const { lang } = useLanguage();
  const ar = lang === "ar";
  const [, setLocation] = useLocation();
  const search = useSearch();
  const urlParams = new URLSearchParams(search);
  const urlModel = urlParams.get("model") as "on-demand" | "monthly" | "both" | null;
  const { toast } = useToast();
  const companyAuth = useCompanyAuth();
  const registerMutation = useRegisterCompany();
  const [phase, setPhase] = useState<"intro" | "form" | "success">(urlModel ? "form" : "intro");
  const [selectedModel, setSelectedModel] = useState<"on-demand" | "monthly" | "both" | null>(urlModel ?? null);
  const [step, setStep] = useState(1);
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [savedPhone, setSavedPhone] = useState("");
  const [files, setFiles] = useState<FileState>({
    cr: null, nationalAddress: null, logo: null, companyProfile: null, branchLocations: null
  });

  const fileCrRef = useRef<HTMLInputElement>(null);
  const fileNaRef = useRef<HTMLInputElement>(null);
  const fileLogoRef = useRef<HTMLInputElement>(null);
  const fileProfileRef = useRef<HTMLInputElement>(null);
  const fileBranchesRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: "", commercialRegister: "", crExpiryDate: "", city: "", address: "",
      branchCountRange: "", employeeCountRange: "", activityType: [], activityTypeOther: "",
      delegates: [{ name: "", jobTitle: "", phone: "", email: "", department: "", permissions: [] }],
      requestedServices: [], otherServicesText: "",
      branches: [],
      hasCurrentVendors: "no", vendors: [],
      monthlyRequestsVolume: "", hasEmergencies: "", hasInternalTeam: "", hasTicketSystem: "",
      paymentPolicy: "",
      collaborationModel: "", budgetDefined: "", selectedPackage: "",
      authorizationConfirmed: false, agreementConfirmed: false, feesConfirmed: false,
    },
  });

  const { fields: delegateFields, append: appendDelegate, remove: removeDelegate } = useFieldArray({ control: form.control, name: "delegates" });
  const { fields: branchFields, append: appendBranch, remove: removeBranch } = useFieldArray({ control: form.control, name: "branches" });
  const { fields: vendorFields, append: appendVendor, remove: removeVendor } = useFieldArray({ control: form.control, name: "vendors" });

  const watchHasVendors = form.watch("hasCurrentVendors");
  const watchCollab = form.watch("collaborationModel");
  const watchBranchCount = form.watch("branchCountRange");
  const watchActivity = form.watch("activityType");
  const watchPackage = form.watch("selectedPackage");

  const goNext = async (fields: (keyof FormData)[]) => {
    const valid = await form.trigger(fields as any);
    if (valid) setStep(s => s + 1);
  };

  const onSubmit = (data: FormData) => {
    const firstDelegate = data.delegates[0];
    registerMutation.mutate(
      {
        data: {
          companyName: data.companyName,
          commercialRegister: data.commercialRegister,
          city: data.city,
          contactName: firstDelegate.name,
          phone: firstDelegate.phone,
          email: firstDelegate.email,
          collaborationModel: data.collaborationModel,
          requestedServices: data.requestedServices,
          authorizationConfirmed: data.authorizationConfirmed,
        }
      },
      {
        onSuccess: (res) => {
          setAccountNumber(res?.accountNumber ?? "");
          const delegatePhone = data.delegates[0]?.phone ?? "";
          const defaultPassword = delegatePhone.slice(-4);
          companyAuth.register({ name: data.companyName, phone: delegatePhone, password: defaultPassword, city: data.city });
          setSavedPhone(delegatePhone);
          setPhase("success");
        },
        onError: () => toast({ variant: "destructive", title: "حدث خطأ", description: "لم نتمكن من إتمام التسجيل، يرجى المحاولة مرة أخرى." })
      }
    );
  };

  const ToggleButton = ({ value, label, current, onSelect }: { value: string; label: string; current?: string; onSelect: (v: string) => void }) => (
    <button type="button" onClick={() => onSelect(value)}
      className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${current === value ? "border-primary bg-primary text-white" : "border-gray-200 hover:border-primary/50 text-gray-700"}`}>
      {label}
    </button>
  );

  const FileUploadSlot = ({
    label, required, file, fileRef, accept, onClear
  }: {
    label: string; required?: boolean; file: File | null;
    fileRef: React.RefObject<HTMLInputElement>; accept?: string; onClear: () => void
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
        {!required && <span className="text-gray-400 text-xs"> (اختياري)</span>}
      </label>
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed rounded-xl px-4 py-3 cursor-pointer hover:border-primary/50 transition-colors flex items-center gap-3 min-h-[52px]"
      >
        <input ref={fileRef} type="file" className="hidden" accept={accept ?? ".pdf,.jpg,.jpeg,.png,.doc,.docx,.xlsx"}
          onChange={e => {
            const f = e.target.files?.[0] ?? null;
            if (f) onClear();
          }} />
        {file ? (
          <>
            <Paperclip size={16} className="text-primary flex-shrink-0" />
            <span className="text-sm text-primary font-medium flex-1 truncate">{file.name}</span>
            <button type="button" onClick={e => { e.stopPropagation(); onClear(); if (fileRef.current) fileRef.current.value = ""; }}>
              <X size={14} className="text-gray-400 hover:text-red-500" />
            </button>
          </>
        ) : (
          <>
            <Paperclip size={16} className="text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-400">اضغط لرفع الملف</span>
          </>
        )}
      </div>
    </div>
  );

  const SectionTitle = ({ title }: { title: string }) => (
    <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-5">{title}</h3>
  );

  function startRegistration(model: "on-demand" | "monthly" | "both") {
    setSelectedModel(model);
    const collab = model === "on-demand" ? "on-demand" : model === "monthly" ? "subscription" : "on-demand";
    form.setValue("collaborationModel", collab);
    form.setValue("selectedPackage", model === "on-demand" ? "on-demand" : model === "monthly" ? "undecided" : "on-demand");
    setPhase("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white py-12 px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Building2 size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {ar ? "اختر نموذج التعاون مع GSS" : "Choose Your GSS Service Model"}
            </h1>
            <p className="text-gray-500 text-base leading-relaxed max-w-xl mx-auto">
              {ar
                ? "نقدم نموذجين للخدمة — اقرأ تفاصيل كل نموذج واختر ما يناسب منشأتكم، ثم أكمل استمارة التسجيل."
                : "We offer two service models — read the details of each and choose what suits your facility, then complete the registration form."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-6">
            {/* Model A: On-Demand */}
            <div className={`bg-white border-2 rounded-3xl p-6 flex flex-col transition-all ${selectedModel === "on-demand" ? "border-primary shadow-md" : "border-gray-200 hover:border-primary/40"}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl">🔧</div>
                <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {ar ? "تفعيل فوري" : "Instant Activation"}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{ar ? "الخدمة حسب الطلب" : "Pay Per Request"}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {ar
                  ? "ادفع رسوم ثابتة عن كل طلب خدمة تشغيلية ترفعه. لا يوجد التزام شهري ولا رسوم اشتراك."
                  : "Pay a fixed fee for each operational service request you submit. No monthly commitment or subscription fees."}
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {(ar ? [
                  "رسوم معلومة على كل طلب خدمة",
                  "وصول كامل لشبكة الموردين المعتمدين",
                  "متابعة أوامر العمل وإغلاقها",
                  "لا يوجد التزام شهري",
                  "مناسب للمنشآت ذات الطلبات المتفرقة",
                ] : [
                  "Fixed known fee per service request",
                  "Full access to certified vendor network",
                  "Work order tracking and closure",
                  "No monthly commitment",
                  "Ideal for facilities with occasional needs",
                ]).map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />{f}
                  </li>
                ))}
              </ul>
              <Button className="w-full font-bold" onClick={() => startRegistration("on-demand")} data-testid="btn-start-company-registration">
                {ar ? "سجّل بهذا النموذج" : "Register with This Model"} <ArrowLeft className="ms-2" size={16} />
              </Button>
            </div>

            {/* Model B: Monthly Package */}
            <div className={`bg-white border-2 rounded-3xl p-6 flex flex-col transition-all relative ${selectedModel === "monthly" ? "border-secondary shadow-md" : "border-gray-200 hover:border-secondary/40"}`}>
              <span className="absolute top-4 left-4 text-xs font-bold bg-secondary text-primary px-3 py-1 rounded-full">
                ⭐ {ar ? "للمنشآت الكبيرة" : "For Large Facilities"}
              </span>
              <div className="flex items-start justify-between mb-4 mt-2">
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl">📋</div>
                <span className="text-xs font-bold bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                  {ar ? "سعر مخصص" : "Custom Pricing"}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{ar ? "الباقة الشهرية المدارة" : "Managed Monthly Package"}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {ar
                  ? "رسوم شهرية ثابتة تُحدَّد بعد دراسة احتياجات منشأتكم. مناسبة للمنشآت الكبيرة وذات الفروع المتعددة."
                  : "Fixed monthly fee determined after studying your facility's needs. Best for large or multi-branch facilities."}
              </p>
              <ul className="space-y-2 mb-4 flex-1">
                {(ar ? [
                  "متابعة تشغيلية مستمرة لجميع فروعكم",
                  "مدير حساب مخصص لمنشأتكم",
                  "تقارير تشغيلية شهرية وربعية",
                  "فاتورة شهرية موحدة لجميع الخدمات",
                  "أولوية في الاستجابة والتنفيذ",
                ] : [
                  "Continuous operations monitoring for all branches",
                  "Dedicated account manager",
                  "Monthly and quarterly operational reports",
                  "Unified monthly invoice for all services",
                  "Priority response and execution",
                ]).map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={14} className="text-secondary flex-shrink-0 mt-0.5" />{f}
                  </li>
                ))}
              </ul>
              <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5 mb-4 text-xs text-amber-800">
                <strong>{ar ? "آلية التسعير: " : "Pricing Flow: "}</strong>
                {ar
                  ? "تملأون استمارة التقييم ← يدرس فريق GSS احتياجاتكم ← نُرسل عرض السعر المناسب لمنشأتكم."
                  : "Fill assessment form → GSS team studies your needs → We send you a custom pricing proposal."}
              </div>
              <Button className="w-full font-bold bg-secondary hover:bg-secondary/90 text-primary" onClick={() => startRegistration("monthly")}>
                {ar ? "أريد الباقة الشهرية" : "I Want the Monthly Package"} <ArrowLeft className="ms-2" size={16} />
              </Button>
            </div>
          </div>

          {/* Model C: Both */}
          <div className={`bg-white border-2 rounded-2xl px-6 py-5 flex items-center justify-between gap-4 transition-all ${selectedModel === "both" ? "border-primary shadow-sm" : "border-dashed border-gray-300 hover:border-primary/40"}`}>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-sm mb-0.5">
                🔀 {ar ? "أبدأ بحسب الطلب وأريد عرض سعر للباقة الشهرية" : "Start with Pay-Per-Request + Get Package Pricing"}
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">
                {ar
                  ? "سجّل الآن وابدأ برفع طلباتك مباشرة، وفي نفس الوقت سيتواصل فريق GSS معك بعرض سعر الباقة الشهرية المناسبة لمنشأتكم."
                  : "Register now and start submitting requests immediately — the GSS team will also contact you with a monthly package pricing proposal."}
              </p>
            </div>
            <Button variant="outline" className="shrink-0 font-bold border-primary text-primary hover:bg-primary hover:text-white" onClick={() => startRegistration("both")}>
              {ar ? "اختر هذا الخيار" : "Choose This Option"}
            </Button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            {ar
              ? "يمكنكم تغيير نموذج الخدمة في أي وقت بعد التسجيل بالتواصل مع فريق GSS."
              : "You can change your service model at any time after registration by contacting the GSS team."}
          </p>
        </motion.div>
      </div>
    );
  }

  if (phase === "success") {
    const isMonthly = selectedModel === "monthly";
    const isBoth = selectedModel === "both";
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center py-12 px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>
          <div className="inline-block bg-primary/10 text-primary text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            {isMonthly
              ? (ar ? "الباقة الشهرية — تحت الدراسة" : "Monthly Package — Under Review")
              : isBoth
              ? (ar ? "حسب الطلب + عرض سعر الباقة" : "Pay Per Request + Package Quote")
              : (ar ? "حسب الطلب — تفعيل قريب" : "Pay Per Request — Activating Soon")}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {ar ? "تم استلام طلب التسجيل بنجاح" : "Registration Request Received Successfully"}
          </h2>
          <p className="text-gray-500 text-base leading-relaxed mb-6">
            {ar
              ? isMonthly
                ? "سيقوم فريق GSS بدراسة بيانات منشأتكم وتقديم عرض سعر الباقة الشهرية المناسبة لكم."
                : isBoth
                ? "سيتم تفعيل حسابكم للخدمة حسب الطلب، وسيتواصل معكم فريق GSS بعرض سعر الباقة الشهرية."
                : "سيتم مراجعة بياناتكم وإرسال الاتفاقية التشغيلية لتفعيل حسابكم في أسرع وقت."
              : isMonthly
                ? "The GSS team will study your facility's data and send you a suitable monthly package pricing proposal."
                : isBoth
                ? "Your account will be activated for pay-per-request service, and the GSS team will contact you with a monthly package pricing proposal."
                : "Your information will be reviewed and the operational agreement sent to activate your account as soon as possible."}
          </p>
          {accountNumber && (
            <div className="bg-primary text-white rounded-2xl p-6 mb-6">
              <p className="text-primary-foreground/70 text-sm mb-1">{ar ? "رقم حساب منشأتكم" : "Your Facility Account Number"}</p>
              <p className="text-3xl font-black tracking-widest mb-2 font-mono">{accountNumber}</p>
              <p className="text-primary-foreground/70 text-xs">{ar ? "احتفظوا بهذا الرقم — سيُستخدم في جميع تعاملاتكم مع GSS" : "Keep this number — it will be used in all your dealings with GSS"}</p>
            </div>
          )}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6 text-right">
            <p className="text-amber-800 font-semibold text-sm mb-2">{ar ? "الخطوات التالية:" : "Next Steps:"}</p>
            <ul className="space-y-2 text-amber-700 text-sm">
              {isMonthly ? (
                <>
                  <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-amber-600" /> {ar ? "سيدرس فريق GSS بيانات منشأتكم واحتياجاتكم التشغيلية" : "The GSS team will study your facility's data and operational needs"}</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-amber-600" /> {ar ? "ستصلكم عروض أسعار الباقة الشهرية المناسبة" : "You'll receive a suitable monthly package pricing proposal"}</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-amber-600" /> {ar ? "بعد الموافقة ترسل الاتفاقية ويُفعَّل الحساب" : "After approval, the agreement is sent and your account is activated"}</li>
                </>
              ) : isBoth ? (
                <>
                  <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-amber-600" /> {ar ? "ستصلكم الاتفاقية التشغيلية لتوقيعها وتفعيل حسابكم" : "The operational agreement will be sent for signing and account activation"}</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-amber-600" /> {ar ? "يمكنكم رفع الطلبات فور تفعيل الحساب" : "You can submit requests as soon as your account is activated"}</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-amber-600" /> {ar ? "سيتواصل معكم فريق GSS بعرض سعر الباقة الشهرية" : "The GSS team will contact you with a monthly package pricing proposal"}</li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-amber-600" /> {ar ? "ستصلكم الاتفاقية التشغيلية عبر البريد الإلكتروني" : "The operational agreement will be sent to your email"}</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-amber-600" /> {ar ? "قوموا بتوقيعها وختمها وإعادة رفعها" : "Sign it, stamp it, and upload it back"}</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-amber-600" /> {ar ? "سيتم تفعيل حسابكم والبدء برفع الطلبات" : "Your account will be activated and you can start submitting requests"}</li>
                </>
              )}
            </ul>
          </div>
          {savedPhone && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6 text-right">
              <p className="text-blue-800 font-bold text-sm mb-2">{ar ? "بيانات الدخول للمفوّض الرئيسي" : "Primary Delegate Login Credentials"}</p>
              <div className="space-y-1 text-sm text-blue-700">
                <p>{ar ? "رقم الجوال:" : "Phone:"} <span className="font-mono font-bold">{savedPhone}</span></p>
                <p>{ar ? "كلمة المرور الافتراضية:" : "Default Password:"} <span className="font-mono font-bold text-lg tracking-widest">{savedPhone.slice(-4)}</span></p>
                <p className="text-xs text-blue-600 mt-2">
                  {ar ? "يمكنك تسجيل الدخول من صفحة " : "Sign in from "} 
                  <a href="/portal/login?type=company" className="underline font-bold">{ar ? "دخول المنشآت" : "Facility Login"}</a>
                </p>
              </div>
            </div>
          )}
          <Button size="lg" className="h-12 px-10 font-bold" onClick={() => setLocation("/")} data-testid="btn-go-home">
            {ar ? "العودة للرئيسية" : "Back to Home"}
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">
              {ar ? "تسجيل منشأة" : "Facility Registration"} — {ar ? STEP_LABELS[step - 1]?.label : STEP_LABELS[step - 1]?.labelEn}
            </h2>
            <button onClick={() => step > 1 ? setStep(s => s - 1) : setPhase("intro")} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <ArrowLeft size={14} /> {ar ? "السابق" : "Back"}
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
          </div>
          <div className="flex justify-between mt-2">
            {STEP_LABELS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${i + 1 < step ? "bg-primary text-white" : i + 1 === step ? "bg-primary/20 text-primary ring-2 ring-primary" : "bg-gray-200 text-gray-400"}`}>
                    {i + 1 < step ? <CheckCircle2 size={14} /> : <Icon size={13} />}
                  </div>
                  <span className={`text-[10px] hidden sm:block ${i + 1 <= step ? "text-primary font-semibold" : "text-gray-400"}`}>{ar ? s.label : s.labelEn}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Model Badge */}
              {selectedModel && (
                <div className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium border ${selectedModel === "monthly" ? "bg-amber-50 border-amber-200 text-amber-800" : "bg-blue-50 border-blue-100 text-blue-800"}`}>
                  <span className="text-lg">{selectedModel === "monthly" ? "📋" : selectedModel === "both" ? "🔀" : "🔧"}</span>
                  <span>
                    {ar
                      ? selectedModel === "monthly"
                        ? "اخترتم: الباقة الشهرية المدارة — سيُرسل عرض السعر بعد دراسة بياناتكم"
                        : selectedModel === "both"
                        ? "اخترتم: حسب الطلب + عرض سعر الباقة الشهرية"
                        : "اخترتم: الخدمة حسب الطلب"
                      : selectedModel === "monthly"
                        ? "Selected: Managed Monthly Package — pricing proposal sent after reviewing your data"
                        : selectedModel === "both"
                        ? "Selected: Pay Per Request + Monthly Package Quote"
                        : "Selected: Pay Per Request Service"}
                  </span>
                  <button type="button" onClick={() => setPhase("intro")} className="ms-auto text-xs underline opacity-60 hover:opacity-100">
                    {ar ? "تغيير" : "Change"}
                  </button>
                </div>
              )}

              {/* ═══════════════════════════════════════════════ */}
              {/* STEP 1: بيانات المنشأة الأساسية */}
              {/* ═══════════════════════════════════════════════ */}
              {step === 1 && (
                <div className="space-y-5">
                  <SectionTitle title={ar ? "بيانات المنشأة الأساسية" : "Basic Facility Information"} />

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="companyName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{ar ? "اسم المنشأة" : "Facility Name"} <span className="text-red-500">*</span></FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="commercialRegister" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{ar ? "رقم السجل التجاري" : "Commercial Register Number"} <span className="text-gray-400 text-xs">{ar ? "(اختياري)" : "(optional)"}</span></FormLabel>
                        <FormControl><Input dir="ltr" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="crExpiryDate" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{ar ? "تاريخ انتهاء السجل التجاري" : "CR Expiry Date"} <span className="text-gray-400 text-xs">{ar ? "(اختياري)" : "(optional)"}</span></FormLabel>
                        <FormControl><Input type="date" dir="ltr" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{ar ? "المدينة" : "City"} <span className="text-red-500">*</span></FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{ar ? "العنوان الوطني" : "National Address"} <span className="text-gray-400 text-xs">{ar ? "(اختياري)" : "(optional)"}</span></FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="branchCountRange" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{ar ? "عدد الفروع التقريبي" : "Approximate Number of Branches"}</FormLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                        {BRANCH_RANGES.map(opt => (
                          <ToggleButton key={opt} value={opt} label={opt} current={field.value} onSelect={v => form.setValue("branchCountRange", v)} />
                        ))}
                      </div>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="employeeCountRange" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{ar ? "عدد الموظفين التقريبي" : "Approximate Number of Employees"}</FormLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                        {EMPLOYEE_RANGES.map(opt => (
                          <ToggleButton key={opt} value={opt} label={opt} current={field.value} onSelect={v => form.setValue("employeeCountRange", v)} />
                        ))}
                      </div>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="activityType" render={() => (
                    <FormItem>
                      <FormLabel>{ar ? "نوع النشاط" : "Activity Type"} <span className="text-red-500">*</span></FormLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                        {ACTIVITY_TYPES.map(option => (
                          <label key={option} className={`flex items-center gap-2 cursor-pointer rounded-xl border px-3 py-2.5 text-sm transition-colors ${watchActivity.includes(option) ? "border-primary bg-primary/5 text-primary font-semibold" : "border-gray-200 hover:border-gray-300"}`}>
                            <Checkbox
                              checked={watchActivity.includes(option)}
                              onCheckedChange={checked => {
                                const cur = form.getValues("activityType");
                                form.setValue("activityType", checked ? [...cur, option] : cur.filter(v => v !== option), { shouldValidate: true });
                              }}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {watchActivity.includes("أخرى") && (
                    <FormField control={form.control} name="activityTypeOther" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{ar ? "حدد نوع النشاط الآخر" : "Specify Other Activity Type"}</FormLabel>
                        <FormControl><Input {...field} placeholder={ar ? "اكتب نوع النشاط..." : "Enter activity type..."} /></FormControl>
                      </FormItem>
                    )} />
                  )}

                  <div className="pt-4 flex justify-end">
                    <Button type="button" onClick={() => goNext(["companyName", "city", "activityType"])}>{ar ? "التالي" : "Next"}</Button>
                  </div>
                </div>
              )}

              {/* ═══════════════════════════════════════════════ */}
              {/* STEP 2: المستندات الرسمية */}
              {/* ═══════════════════════════════════════════════ */}
              {step === 2 && (
                <div className="space-y-5">
                  <SectionTitle title={ar ? "المستندات الرسمية" : "Official Documents"} />
                  <p className="text-gray-500 text-sm">
                    {ar
                      ? "يرجى إرفاق الوثائق الرسمية لمنشأتكم. المستندات المؤشر عليها بـ (*) مطلوبة لإتمام التسجيل."
                      : "Please attach your facility's official documents. Items marked with (*) are required to complete registration."}
                  </p>

                  <div className="space-y-4">
                    <FileUploadSlot
                      label={ar ? "السجل التجاري" : "Commercial Register"} required
                      file={files.cr} fileRef={fileCrRef}
                      onClear={() => setFiles(p => ({ ...p, cr: null }))}
                    />
                    <FileUploadSlot
                      label={ar ? "العنوان الوطني" : "National Address"} required
                      file={files.nationalAddress} fileRef={fileNaRef}
                      onClear={() => setFiles(p => ({ ...p, nationalAddress: null }))}
                    />
                    <FileUploadSlot
                      label={ar ? "شعار المنشأة" : "Facility Logo"}
                      file={files.logo} fileRef={fileLogoRef}
                      accept=".png,.jpg,.jpeg,.svg"
                      onClear={() => setFiles(p => ({ ...p, logo: null }))}
                    />
                    <FileUploadSlot
                      label={ar ? "ملف تعريف الشركة" : "Company Profile"}
                      file={files.companyProfile} fileRef={fileProfileRef}
                      onClear={() => setFiles(p => ({ ...p, companyProfile: null }))}
                    />
                    <FileUploadSlot
                      label={ar ? "مواقع الفروع" : "Branch Locations"}
                      file={files.branchLocations} fileRef={fileBranchesRef}
                      accept=".xlsx,.xls,.pdf"
                      onClear={() => setFiles(p => ({ ...p, branchLocations: null }))}
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
                    <strong>{ar ? "ملاحظة:" : "Note:"}</strong> {ar ? "يمكنكم المتابعة بدون رفع المستندات الآن وإرسالها لاحقاً عبر البريد الإلكتروني بعد تواصل فريق GSS معكم." : "You may continue without uploading documents now and send them later via email after the GSS team contacts you."}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button type="button" onClick={() => setStep(3)}>{ar ? "التالي" : "Next"}</Button>
                  </div>
                </div>
              )}

              {/* ═══════════════════════════════════════════════ */}
              {/* STEP 3: المفوضون بالتواصل */}
              {/* ═══════════════════════════════════════════════ */}
              {step === 3 && (
                <div className="space-y-5">
                  <SectionTitle title={ar ? "المفوضون بالتواصل مع المنصة" : "Authorized Platform Contacts"} />
                  <p className="text-gray-500 text-sm">
                    {ar
                      ? "يرجى إضافة بيانات الموظف أو الموظفين المفوّضين بالتنسيق التشغيلي مع منصة GSS حسب العقد."
                      : "Please add the information of the employee(s) authorized to coordinate operationally with the GSS platform per the contract."}
                  </p>

                  <div className="space-y-6">
                    {delegateFields.map((field, index) => (
                      <div key={field.id} className="border border-gray-200 rounded-2xl p-5 space-y-4 relative bg-gray-50/50">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-gray-700 text-sm">{ar ? `المفوض ${index + 1}` : `Delegate ${index + 1}`}</h4>
                          {delegateFields.length > 1 && (
                            <button type="button" onClick={() => removeDelegate(index)} className="text-red-400 hover:text-red-600 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField control={form.control} name={`delegates.${index}.name`} render={({ field: f }) => (
                            <FormItem>
                              <FormLabel>{ar ? "الاسم الكامل" : "Full Name"} <span className="text-red-500">*</span></FormLabel>
                              <FormControl><Input {...f} placeholder={ar ? "الاسم حسب العقد" : "Name as per contract"} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name={`delegates.${index}.jobTitle`} render={({ field: f }) => (
                            <FormItem>
                              <FormLabel>{ar ? "المسمى الوظيفي" : "Job Title"} <span className="text-red-500">*</span></FormLabel>
                              <FormControl><Input {...f} placeholder={ar ? "مدير تشغيل، مسؤول مشتريات..." : "Operations Manager, Procurement..."} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField control={form.control} name={`delegates.${index}.phone`} render={({ field: f }) => (
                            <FormItem>
                              <FormLabel>{ar ? "رقم الجوال" : "Mobile Number"} <span className="text-red-500">*</span></FormLabel>
                              <FormControl><Input dir="ltr" placeholder="05xxxxxxxx" {...f} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name={`delegates.${index}.email`} render={({ field: f }) => (
                            <FormItem>
                              <FormLabel>{ar ? "البريد الإلكتروني" : "Email Address"} <span className="text-red-500">*</span></FormLabel>
                              <FormControl><Input dir="ltr" type="email" {...f} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>

                        <FormField control={form.control} name={`delegates.${index}.department`} render={({ field: f }) => (
                          <FormItem>
                            <FormLabel>{ar ? "القسم أو الإدارة" : "Department"}</FormLabel>
                            <FormControl><Input {...f} placeholder={ar ? "إدارة التشغيل، المشتريات..." : "Operations, Procurement..."} /></FormControl>
                          </FormItem>
                        )} />

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{ar ? "صلاحية التواصل" : "Communication Permissions"}</label>
                          <div className="flex flex-wrap gap-2">
                            {DELEGATE_PERMISSIONS.map(perm => {
                              const perms = form.watch(`delegates.${index}.permissions`) ?? [];
                              const checked = perms.includes(perm);
                              return (
                                <label key={perm} className={`flex items-center gap-1.5 cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${checked ? "border-primary bg-primary/5 text-primary" : "border-gray-200 hover:border-gray-300"}`}>
                                  <Checkbox
                                    checked={checked}
                                    onCheckedChange={c => {
                                      const cur = form.getValues(`delegates.${index}.permissions`) ?? [];
                                      form.setValue(`delegates.${index}.permissions`, c ? [...cur, perm] : cur.filter(v => v !== perm));
                                    }}
                                  />
                                  {perm}
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => appendDelegate({ name: "", jobTitle: "", phone: "", email: "", department: "", permissions: [] })}
                    className="w-full border-2 border-dashed border-gray-300 rounded-xl py-3 text-sm font-medium text-gray-500 hover:border-primary/50 hover:text-primary transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={16} /> {ar ? "إضافة مفوض آخر" : "Add Another Delegate"}
                  </button>

                  <div className="pt-2 flex justify-end">
                    <Button type="button" onClick={() => goNext(["delegates"])}>{ar ? "التالي" : "Next"}</Button>
                  </div>
                </div>
              )}

              {/* ═══════════════════════════════════════════════ */}
              {/* STEP 4: الخدمات التشغيلية */}
              {/* ═══════════════════════════════════════════════ */}
              {step === 4 && (
                <div className="space-y-6">
                  <SectionTitle title={ar ? "الخدمات التشغيلية المطلوبة" : "Required Operational Services"} />
                  <p className="text-gray-500 text-sm">
                    {ar ? "ما الخدمات التشغيلية التي ترغبون بإدارتها عبر منصة GSS؟ (يمكن اختيار أكثر من خيار)" : "Which operational services would you like to manage through GSS? (Multiple selections allowed)"}
                  </p>
                  <FormField control={form.control} name="requestedServices" render={() => (
                    <FormItem>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {SERVICES.map(option => {
                          const selected = form.watch("requestedServices");
                          return (
                            <label key={option} className={`flex items-center gap-2 cursor-pointer rounded-xl border px-4 py-3 text-sm transition-colors ${selected.includes(option) ? "border-primary bg-primary/5 text-primary font-semibold" : "border-gray-200 hover:border-gray-300"}`}>
                              <Checkbox
                                checked={selected.includes(option)}
                                onCheckedChange={checked => {
                                  const cur = form.getValues("requestedServices");
                                  form.setValue("requestedServices", checked ? [...cur, option] : cur.filter(v => v !== option), { shouldValidate: true });
                                }}
                              />
                              {option}
                            </label>
                          );
                        })}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
                    <FormField control={form.control} name="otherServicesText" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-gray-800 text-base">
                          {ar ? "خدمات أخرى لم تجدوها في القائمة؟" : "Other Services Not Found in the List?"}
                        </FormLabel>
                        <p className="text-gray-500 text-sm mb-2">
                          {ar ? "اكتب أي خدمة تشغيلية تحتاجها منشأتكم" : "Write any operational service your facility needs"}
                        </p>
                        <FormControl>
                          <Textarea {...field} placeholder={ar ? "مثال: إدارة مولدات الكهرباء الاحتياطية، صيانة أنظمة الري الآلي..." : "E.g. backup generator management, automated irrigation maintenance..."} className="min-h-[80px] resize-none text-sm" dir="rtl" />
                        </FormControl>
                      </FormItem>
                    )} />
                  </div>
                  <div className="pt-2 flex justify-end">
                    <Button type="button" onClick={() => goNext(["requestedServices"])}>{ar ? "التالي" : "Next"}</Button>
                  </div>
                </div>
              )}

              {/* ═══════════════════════════════════════════════ */}
              {/* STEP 5: معلومات الفروع */}
              {/* ═══════════════════════════════════════════════ */}
              {step === 5 && (
                <div className="space-y-5">
                  <SectionTitle title={ar ? "معلومات الفروع التشغيلية" : "Operational Branch Information"} />

                  {watchBranchCount === "فرع واحد" ? (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-center text-blue-800 text-sm">
                      <MapPin size={24} className="mx-auto mb-2 text-blue-500" />
                      <p className="font-semibold mb-1">{ar ? "منشأتكم تعمل من موقع واحد" : "Your facility operates from a single location"}</p>
                      <p>{ar ? "لا حاجة لإضافة فروع — تابع للخطوة التالية." : "No need to add branches — proceed to the next step."}</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-500 text-sm">
                        {ar ? "أضف بيانات كل فرع تشغيلي للمنشأة ليتمكن فريق GSS من تنسيق الخدمات حسب الموقع." : "Add details for each operational branch so the GSS team can coordinate services by location."}
                      </p>
                      <div className="space-y-5">
                        {branchFields.map((field, index) => (
                          <div key={field.id} className="border border-gray-200 rounded-2xl p-5 space-y-4 bg-gray-50/50">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-gray-700 text-sm">{ar ? `الفرع ${index + 1}` : `Branch ${index + 1}`}</h4>
                              <button type="button" onClick={() => removeBranch(index)} className="text-red-400 hover:text-red-600">
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <FormField control={form.control} name={`branches.${index}.name`} render={({ field: f }) => (
                                <FormItem>
                                  <FormLabel>{ar ? "اسم الفرع" : "Branch Name"} <span className="text-red-500">*</span></FormLabel>
                                  <FormControl><Input {...f} placeholder={ar ? "فرع الرياض، المستودع الرئيسي..." : "Riyadh Branch, Main Warehouse..."} /></FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                              <FormField control={form.control} name={`branches.${index}.city`} render={({ field: f }) => (
                                <FormItem>
                                  <FormLabel>{ar ? "المدينة" : "City"} <span className="text-red-500">*</span></FormLabel>
                                  <FormControl><Input {...f} /></FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <FormField control={form.control} name={`branches.${index}.address`} render={({ field: f }) => (
                                <FormItem>
                                  <FormLabel>{ar ? "العنوان" : "Address"}</FormLabel>
                                  <FormControl><Input {...f} /></FormControl>
                                </FormItem>
                              )} />
                              <FormField control={form.control} name={`branches.${index}.employeeCount`} render={({ field: f }) => (
                                <FormItem>
                                  <FormLabel>{ar ? "عدد الموظفين في الفرع" : "Number of Employees at Branch"}</FormLabel>
                                  <FormControl><Input {...f} placeholder={ar ? "مثال: 15" : "e.g. 15"} /></FormControl>
                                </FormItem>
                              )} />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">{ar ? "نوع الموقع" : "Site Type"}</label>
                              <div className="flex flex-wrap gap-2">
                                {BRANCH_TYPES.map(t => {
                                  const cur = form.watch(`branches.${index}.type`);
                                  return (
                                    <ToggleButton key={t} value={t} label={t} current={cur} onSelect={v => form.setValue(`branches.${index}.type`, v)} />
                                  );
                                })}
                              </div>
                            </div>
                            <FormField control={form.control} name={`branches.${index}.workHours`} render={({ field: f }) => (
                              <FormItem>
                                <FormLabel>{ar ? "ساعات العمل" : "Working Hours"}</FormLabel>
                                <FormControl><Input {...f} placeholder={ar ? "مثال: السبت–الخميس 8ص–5م" : "e.g. Sat–Thu 8am–5pm"} /></FormControl>
                              </FormItem>
                            )} />
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => appendBranch({ name: "", city: "", address: "", type: "", workHours: "", employeeCount: "" })}
                        className="w-full border-2 border-dashed border-gray-300 rounded-xl py-3 text-sm font-medium text-gray-500 hover:border-primary/50 hover:text-primary transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus size={16} /> {ar ? "إضافة فرع" : "Add Branch"}
                      </button>
                    </>
                  )}

                  <div className="pt-2 flex justify-end">
                    <Button type="button" onClick={() => setStep(6)}>{ar ? "التالي" : "Next"}</Button>
                  </div>
                </div>
              )}

              {/* ═══════════════════════════════════════════════ */}
              {/* STEP 6: الموردون الحاليون */}
              {/* ═══════════════════════════════════════════════ */}
              {step === 6 && (
                <div className="space-y-5">
                  <SectionTitle title={ar ? "الموردون الحاليون" : "Current Vendors"} />
                  <p className="text-gray-500 text-sm">
                    {ar ? "هل لديكم موردون حاليون ترغبون في الاستمرار معهم؟ يمكن لـ GSS متابعة تنفيذ أعمالهم وتنظيم العقود." : "Do you have current vendors you'd like to continue with? GSS can follow up on their work and organize contracts."}
                  </p>

                  <div className="flex gap-3">
                    {[{ val: "yes", label: ar ? "نعم" : "Yes" }, { val: "no", label: ar ? "لا" : "No" }].map(opt => (
                      <button key={opt.val} type="button"
                        onClick={() => form.setValue("hasCurrentVendors", opt.val)}
                        className={`flex-1 rounded-xl border-2 py-4 text-lg font-bold transition-colors ${watchHasVendors === opt.val ? "border-primary bg-primary text-white" : "border-gray-200 hover:border-primary/50"}`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {watchHasVendors === "yes" && (
                    <div className="space-y-4">
                      {vendorFields.map((field, index) => (
                        <div key={field.id} className="border border-gray-200 rounded-2xl p-5 space-y-4 bg-gray-50/50">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-gray-700 text-sm">{ar ? `مورد ${index + 1}` : `Vendor ${index + 1}`}</h4>
                            {vendorFields.length > 1 && (
                              <button type="button" onClick={() => removeVendor(index)} className="text-red-400 hover:text-red-600">
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField control={form.control} name={`vendors.${index}.name`} render={({ field: f }) => (
                              <FormItem>
                                <FormLabel>{ar ? "اسم المورد" : "Vendor Name"} <span className="text-red-500">*</span></FormLabel>
                                <FormControl><Input {...f} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name={`vendors.${index}.serviceType`} render={({ field: f }) => (
                              <FormItem>
                                <FormLabel>{ar ? "نوع الخدمة" : "Service Type"}</FormLabel>
                                <FormControl><Input {...f} placeholder={ar ? "صيانة، نقل، نظافة..." : "Maintenance, transport, cleaning..."} /></FormControl>
                              </FormItem>
                            )} />
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField control={form.control} name={`vendors.${index}.phone`} render={({ field: f }) => (
                              <FormItem>
                                <FormLabel>{ar ? "رقم التواصل" : "Contact Number"}</FormLabel>
                                <FormControl><Input dir="ltr" {...f} /></FormControl>
                              </FormItem>
                            )} />
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">{ar ? "هل تريدون GSS تتابع هذا المورد؟" : "Would you like GSS to follow up with this vendor?"}</label>
                              <div className="flex gap-2">
                                {[{ val: "yes", label: ar ? "نعم" : "Yes" }, { val: "no", label: ar ? "لا" : "No" }].map(opt => {
                                  const cur = form.watch(`vendors.${index}.wantsGssToManage`);
                                  return <ToggleButton key={opt.val} value={opt.val} label={opt.label} current={cur} onSelect={v => form.setValue(`vendors.${index}.wantsGssToManage`, v)} />;
                                })}
                              </div>
                            </div>
                          </div>
                          <FormField control={form.control} name={`vendors.${index}.notes`} render={({ field: f }) => (
                            <FormItem>
                              <FormLabel>{ar ? "ملاحظات" : "Notes"}</FormLabel>
                              <FormControl><Input {...f} placeholder={ar ? "أي معلومات إضافية عن المورد..." : "Any additional info about the vendor..."} /></FormControl>
                            </FormItem>
                          )} />
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => appendVendor({ name: "", serviceType: "", phone: "", notes: "", wantsGssToManage: "" })}
                        className="w-full border-2 border-dashed border-gray-300 rounded-xl py-3 text-sm font-medium text-gray-500 hover:border-primary/50 hover:text-primary transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus size={16} /> {ar ? "إضافة مورد" : "Add Vendor"}
                      </button>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <Button type="button" onClick={() => setStep(7)}>{ar ? "التالي" : "Next"}</Button>
                  </div>
                </div>
              )}

              {/* ═══════════════════════════════════════════════ */}
              {/* STEP 7: حجم التشغيل ونموذج التعاون */}
              {/* ═══════════════════════════════════════════════ */}
              {step === 7 && (
                <div className="space-y-6">
                  <SectionTitle title={ar ? "حجم التشغيل ونموذج التعاون" : "Operational Volume & Collaboration Model"} />

                  <FormField control={form.control} name="monthlyRequestsVolume" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{ar ? "عدد الطلبات التشغيلية المتوقعة شهرياً" : "Expected Monthly Operational Requests"}</FormLabel>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {MONTHLY_REQUESTS.map(opt => (
                          <ToggleButton key={opt} value={opt} label={opt} current={field.value} onSelect={v => form.setValue("monthlyRequestsVolume", v)} />
                        ))}
                      </div>
                    </FormItem>
                  )} />

                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="hasEmergencies" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">{ar ? "هل لديكم حالات طوارئ تشغيلية متكررة؟" : "Do you have recurring operational emergencies?"}</FormLabel>
                        <div className="flex gap-2 mt-1">
                          {[{ val: "yes", label: ar ? "نعم" : "Yes" }, { val: "no", label: ar ? "لا" : "No" }].map(opt => (
                            <ToggleButton key={opt.val} value={opt.val} label={opt.label} current={field.value} onSelect={v => form.setValue("hasEmergencies", v)} />
                          ))}
                        </div>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="hasInternalTeam" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">{ar ? "هل لديكم فريق تشغيل داخلي حالياً؟" : "Do you currently have an internal operations team?"}</FormLabel>
                        <div className="flex gap-2 mt-1">
                          {[{ val: "yes", label: ar ? "نعم" : "Yes" }, { val: "partial", label: ar ? "جزئياً" : "Partially" }, { val: "no", label: ar ? "لا" : "No" }].map(opt => (
                            <ToggleButton key={opt.val} value={opt.val} label={opt.label} current={field.value} onSelect={v => form.setValue("hasInternalTeam", v)} />
                          ))}
                        </div>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="hasTicketSystem" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">{ar ? "هل لديكم نظام تذاكر خدمات حالياً؟" : "Do you currently have a service ticketing system?"}</FormLabel>
                        <div className="flex gap-2 mt-1">
                          {[{ val: "yes", label: ar ? "نعم" : "Yes" }, { val: "no", label: ar ? "لا" : "No" }].map(opt => (
                            <ToggleButton key={opt.val} value={opt.val} label={opt.label} current={field.value} onSelect={v => form.setValue("hasTicketSystem", v)} />
                          ))}
                        </div>
                      </FormItem>
                    )} />
                  </div>

                  {/* Payment Policy */}
                  <FormField control={form.control} name="paymentPolicy" render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {ar ? "سياسة السداد المعتمدة لدى منشأتكم" : "Your Facility's Approved Payment Policy"}
                        <span className="block text-xs font-normal text-gray-500 mt-0.5">
                          {ar
                            ? "يرجى تحديد سياسة السداد المعتمدة لديكم ليتم ترشيح الموردين المناسبين وفق شروط الدفع الخاصة بمنشأتكم"
                            : "Please specify your payment policy so we can match vendors with compatible payment terms"}
                        </span>
                      </FormLabel>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(ar ? [
                          "الدفع الفوري",
                          "الدفع بعد التنفيذ",
                          "الدفع خلال 30 يوم",
                          "الدفع خلال 60 يوم",
                          "الدفع خلال 90 يوم",
                          "حسب نوع المشروع",
                        ] : [
                          "Immediate Payment",
                          "Payment After Execution",
                          "Net 30 Days",
                          "Net 60 Days",
                          "Net 90 Days",
                          "Per Project Type",
                        ]).map(opt => (
                          <ToggleButton key={opt} value={opt} label={opt} current={field.value} onSelect={v => form.setValue("paymentPolicy", v)} />
                        ))}
                      </div>
                      <div className="mt-2 text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                        {ar
                          ? "يتم ترشيح الموردين القادرين على العمل وفق نفس شروط الدفع المعتمدة لديكم — وذلك لضمان توافق الطرفين قبل إصدار أمر العمل."
                          : "Vendors capable of working under your approved payment terms are matched — ensuring alignment between both parties before work order issuance."}
                      </div>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="collaborationModel" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{ar ? "ما نموذج التعاون المناسب لمنشأتكم مبدئياً؟" : "What collaboration model is suitable for your facility initially?"} <span className="text-red-500">*</span></FormLabel>
                      <div className="space-y-3 mt-2">
                        {[
                          { val: "on-demand", title: ar ? "خدمات حسب الطلب" : "On-Demand Services", desc: ar ? "مناسب للطلبات التشغيلية عند الحاجة بدون التزام مستمر" : "Suitable for operational requests as needed without a continuous commitment" },
                          { val: "subscription", title: ar ? "اشتراك تشغيلي شهري" : "Monthly Operational Subscription", desc: ar ? "متابعة مستمرة وتقارير دورية ومدير حساب مخصص" : "Continuous follow-up, periodic reports, and a dedicated account manager" },
                          { val: "undecided", title: ar ? "غير متأكد — أحتاج توصية من فريق GSS" : "Unsure — I need a recommendation from the GSS team", desc: "" },
                        ].map(opt => (
                          <button key={opt.val} type="button" onClick={() => form.setValue("collaborationModel", opt.val, { shouldValidate: true })}
                            className={`w-full text-right rounded-xl border-2 px-5 py-4 transition-colors ${field.value === opt.val ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/40"}`}>
                            <p className="font-bold text-gray-900">{opt.title}</p>
                            {opt.desc && <p className="text-sm text-gray-500 mt-1">{opt.desc}</p>}
                          </button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="budgetDefined" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{ar ? "هل لديكم ميزانية تشغيلية محددة للخدمات؟" : "Do you have a defined operational budget for services?"}</FormLabel>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {[
                          { val: "yes", label: ar ? "نعم" : "Yes" },
                          { val: "no", label: ar ? "لا" : "No" },
                          { val: "discuss", label: ar ? "يفضل مناقشتها لاحقاً" : "Prefer to discuss later" },
                        ].map(opt => (
                          <ToggleButton key={opt.val} value={opt.val} label={opt.label} current={field.value} onSelect={v => form.setValue("budgetDefined", v)} />
                        ))}
                      </div>
                    </FormItem>
                  )} />

                  <div className="pt-2 flex justify-end">
                    <Button type="button" onClick={() => goNext(["collaborationModel"])}>{ar ? "التالي" : "Next"}</Button>
                  </div>
                </div>
              )}

              {/* ═══════════════════════════════════════════════ */}
              {/* STEP 8: اختيار الباقة */}
              {/* ═══════════════════════════════════════════════ */}
              {step === 8 && (
                <div className="space-y-6">
                  <SectionTitle title={ar ? "تأكيد نموذج الخدمة" : "Confirm Your Service Model"} />
                  {selectedModel === "monthly" ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 flex gap-3">
                      <span className="text-2xl">📋</span>
                      <div>
                        <p className="font-bold mb-1">{ar ? "اخترتم الباقة الشهرية المدارة" : "You selected the Managed Monthly Package"}</p>
                        <p>{ar ? "بعد إرسال هذه الاستمارة، سيدرس فريق GSS احتياجاتكم التشغيلية ويُرسل لكم عرض سعر مخصص. يمكنكم أيضاً تغيير اختياركم أدناه." : "After submitting this form, the GSS team will study your operational needs and send you a custom pricing proposal. You can also change your selection below."}</p>
                      </div>
                    </div>
                  ) : selectedModel === "both" ? (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800 flex gap-3">
                      <span className="text-2xl">🔀</span>
                      <div>
                        <p className="font-bold mb-1">{ar ? "حسب الطلب + عرض سعر الباقة الشهرية" : "Pay Per Request + Monthly Package Quote"}</p>
                        <p>{ar ? "سيتم تفعيل حسابكم على نموذج حسب الطلب، وسيتواصل معكم فريق GSS لتزويدكم بعرض سعر الباقة الشهرية." : "Your account will be activated on Pay Per Request, and GSS will contact you with a monthly package pricing proposal."}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm leading-relaxed -mt-2">
                      {ar
                        ? "يمكنكم البدء بالخدمة مباشرةً دون اشتراك، أو طلب الترقية لباقة شهرية مدارة. الرسوم تُحدَّد بعد دراسة الاحتياج الفعلي."
                        : "You can start the service directly without a subscription, or request an upgrade to a managed monthly package. Fees are defined after assessing your actual needs."}
                    </p>
                  )}

                  <FormField control={form.control} name="selectedPackage" render={({ field }) => (
                    <FormItem>
                      <div className="space-y-3">

                        {/* On-Demand */}
                        <button type="button" onClick={() => form.setValue("selectedPackage", "on-demand")}
                          className={`w-full text-right rounded-xl border-2 px-5 py-4 transition-colors ${watchPackage === "on-demand" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/40"}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-0.5 font-medium">{ar ? "بدون اشتراك" : "No Subscription"}</span>
                            <p className="font-bold text-gray-900">{ar ? "الخدمة حسب الطلب" : "On-Demand Service"}</p>
                          </div>
                          <p className="text-sm text-gray-500">{ar ? "استقبال الطلبات التشغيلية وتنسيق الموردين ومتابعة التنفيذ — بدون التزام شهري." : "Operational request handling, vendor coordination, and follow-up — no monthly commitment."}</p>
                        </button>

                        {/* Tier 1 */}
                        <button type="button" onClick={() => form.setValue("selectedPackage", "tier1")}
                          className={`w-full text-right rounded-xl border-2 px-5 py-4 transition-colors ${watchPackage === "tier1" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/40"}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs bg-primary/10 text-primary rounded-full px-3 py-0.5 font-medium">{ar ? "المستوى الأول" : "Tier 1"}</span>
                            <p className="font-bold text-gray-900">{ar ? "باقة المتابعة الأساسية" : "Basic Follow-Up Package"}</p>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{ar ? "مناسبة للمنشآت الصغيرة أو ذات الطلبات المحدودة." : "Suitable for small businesses or those with limited requests."}</p>
                          <ul className="space-y-1">
                            {(ar ? [
                              "تنظيم ومتابعة الطلبات التشغيلية",
                              "الوصول إلى شبكة الموردين المعتمدين",
                              "تجميع الطلبات عبر نقطة تشغيل واحدة",
                              "متابعة التنفيذ حتى إغلاق الطلب",
                            ] : [
                              "Operational request organization and follow-up",
                              "Access to the certified vendor network",
                              "Request aggregation through a single point",
                              "Follow-up until request closure",
                            ]).map((f, i) => (
                              <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                                <CheckCircle2 size={12} className="text-primary flex-shrink-0" />{f}
                              </li>
                            ))}
                          </ul>
                        </button>

                        {/* Tier 2 */}
                        <button type="button" onClick={() => form.setValue("selectedPackage", "tier2")}
                          className={`w-full text-right rounded-xl border-2 px-5 py-4 transition-colors relative ${watchPackage === "tier2" ? "border-secondary bg-secondary/5" : "border-gray-200 hover:border-secondary/40"}`}>
                          <span className="absolute top-3 left-3 text-xs bg-secondary text-primary font-bold rounded-full px-3 py-0.5">⭐ {ar ? "الأكثر اختيارًا" : "Most Popular"}</span>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs bg-secondary/15 text-secondary rounded-full px-3 py-0.5 font-medium">{ar ? "المستوى الثاني" : "Tier 2"}</span>
                            <p className="font-bold text-gray-900">{ar ? "باقة المتابعة المتقدمة" : "Advanced Follow-Up Package"}</p>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{ar ? "مناسبة للمنشآت المتوسطة أو متعددة المواقع." : "Suitable for medium businesses or multi-location companies."}</p>
                          <ul className="space-y-1">
                            {(ar ? [
                              "جميع مزايا المستوى الأول",
                              "👤 مدير حساب مخصص للمتابعة التشغيلية",
                              "📊 تقارير تشغيلية دورية مبسطة",
                              "⏰ تنبيهات انتهاء العقود والتراخيص",
                              "⚡ أولوية أعلى في الاستجابة للطلبات",
                            ] : [
                              "All Tier 1 features",
                              "👤 Dedicated account manager",
                              "📊 Periodic simplified operational reports",
                              "⏰ Contract and license expiry alerts",
                              "⚡ Higher response priority",
                            ]).map((f, i) => (
                              <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                                <CheckCircle2 size={12} className="text-secondary flex-shrink-0" />{f}
                              </li>
                            ))}
                          </ul>
                        </button>

                        {/* Tier 3 */}
                        <button type="button" onClick={() => form.setValue("selectedPackage", "tier3")}
                          className={`w-full text-right rounded-xl border-2 px-5 py-4 transition-colors ${watchPackage === "tier3" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/40"}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs bg-primary/10 text-primary rounded-full px-3 py-0.5 font-medium">{ar ? "المستوى الثالث" : "Tier 3"}</span>
                            <p className="font-bold text-gray-900">{ar ? "باقة الإدارة التشغيلية الشاملة" : "Full Operational Management Package"}</p>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{ar ? "مناسبة للمنشآت الكبيرة أو متعددة الفروع ذات التشغيل المستمر." : "Suitable for large or multi-branch businesses with continuous operations."}</p>
                          <ul className="space-y-1">
                            {(ar ? [
                              "جميع مزايا المستويات السابقة",
                              "🏢 إدارة تشغيل مركزية لجميع الفروع",
                              "📊 تقارير تحليلية تشغيلية مفصلة",
                              "💰 تحليل المصروفات التشغيلية",
                              "⚡ أولوية قصوى في الاستجابة والتنفيذ",
                            ] : [
                              "All previous tier features",
                              "🏢 Centralized operations management for all branches",
                              "📊 Detailed monthly operational analytics",
                              "💰 Operational expense analysis",
                              "⚡ Top-priority response and execution",
                            ]).map((f, i) => (
                              <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                                <CheckCircle2 size={12} className="text-primary flex-shrink-0" />{f}
                              </li>
                            ))}
                          </ul>
                        </button>

                        {/* Undecided */}
                        <button type="button" onClick={() => form.setValue("selectedPackage", "undecided")}
                          className={`w-full text-right rounded-xl border-2 px-5 py-3 transition-colors ${watchPackage === "undecided" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/40"}`}>
                          <p className="font-bold text-gray-900">{ar ? "غير متأكد — أحتاج توصية من فريق GSS" : "Unsure — I need a recommendation from the GSS team"}</p>
                          <p className="text-sm text-gray-500 mt-0.5">{ar ? "سيتواصل معكم فريقنا لاقتراح الباقة الأنسب بناءً على احتياجاتكم." : "Our team will reach out to recommend the most suitable package based on your needs."}</p>
                        </button>

                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <p className="text-xs text-gray-400 leading-relaxed">
                    {ar
                      ? "* الرسوم النهائية لجميع الباقات تُحدَّد بعد دراسة الاحتياج التشغيلي الفعلي لمنشأتكم. هذا الاختيار يساعدنا في فهم توقعاتكم فقط."
                      : "* Final fees for all packages are determined after assessing your facility's actual operational needs. This selection only helps us understand your expectations."}
                  </p>

                  <div className="pt-2 flex justify-end">
                    <Button type="button" onClick={() => setStep(9)}>{ar ? "التالي" : "Next"}</Button>
                  </div>
                </div>
              )}

              {/* ═══════════════════════════════════════════════ */}
              {/* STEP 9: الإقرارات والإرسال */}
              {/* ═══════════════════════════════════════════════ */}
              {step === 9 && (
                <div className="space-y-5">
                  <SectionTitle title={ar ? "الإقرارات وإرسال الطلب" : "Declarations & Submit"} />

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm">
                    <p className="font-bold text-amber-900 mb-3">{ar ? "آلية رسوم الخدمة في منصة GSS" : "GSS Platform Service Fee Structure"}</p>
                    <ul className="space-y-2 text-amber-800">
                      {ar ? (
                        <>
                          <li>• <strong>حسب الطلب:</strong> رسوم إدارة التشغيل فقط دون أي عمولات على أسعار الموردين.</li>
                          <li>• <strong>الاشتراك:</strong> متابعة مستمرة وتقارير ومدير حساب مخصص، يتم تحديد الرسوم بعد دراسة الاحتياجات.</li>
                          <li>• <strong>المشاريع الكبيرة:</strong> نسبة إدارة المشروع تُحدَّد مسبقاً بكل شفافية.</li>
                        </>
                      ) : (
                        <>
                          <li>• <strong>On-Demand:</strong> Operational management fees only — no commissions on vendor prices.</li>
                          <li>• <strong>Subscription:</strong> Continuous follow-up, reports, and a dedicated account manager. Fees are defined after assessing your needs.</li>
                          <li>• <strong>Large Projects:</strong> A project management percentage is defined upfront with full transparency.</li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <FormField control={form.control} name="authorizationConfirmed" render={({ field }) => (
                      <FormItem className="flex items-start gap-3 p-4 border rounded-xl bg-slate-50">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div>
                          <FormLabel className="text-gray-700 leading-relaxed font-medium">
                            {ar ? "أقر بأنني مفوض من قبل المنشأة بتسجيل بياناتها والتنسيق مع منصة GSS." : "I confirm that I am authorized by the facility to register its information and coordinate with the GSS platform."}
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="agreementConfirmed" render={({ field }) => (
                      <FormItem className="flex items-start gap-3 p-4 border rounded-xl bg-slate-50">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div>
                          <FormLabel className="text-gray-700 leading-relaxed font-medium">
                            {ar ? "أوافق على استلام الاتفاقية التشغيلية وتوقيعها وختمها وإعادة رفعها عبر المنصة." : "I agree to receive, sign, stamp, and re-upload the operational agreement through the platform."}
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="feesConfirmed" render={({ field }) => (
                      <FormItem className="flex items-start gap-3 p-4 border rounded-xl bg-slate-50">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div>
                          <FormLabel className="text-gray-700 leading-relaxed font-medium">
                            {ar ? "أقر باطلاعي على آلية رسوم الخدمة المعتمدة في منصة GSS." : "I acknowledge that I have reviewed the approved service fee structure of the GSS platform."}
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )} />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Button type="submit" className="min-w-[200px] h-12 text-base font-bold" disabled={registerMutation.isPending} data-testid="btn-submit-company">
                      {registerMutation.isPending
                        ? (ar ? "جاري الإرسال..." : "Submitting...")
                        : (ar ? "إرسال الطلب وفتح الحساب" : "Submit & Open Account")}
                    </Button>
                  </div>
                </div>
              )}

            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
