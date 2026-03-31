import { useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
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
  Paperclip, X, Plus, Trash2, FileText, MapPin, Truck, BarChart2
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
  collaborationModel: z.string().min(1, "يرجى تحديد نموذج التعاون"),
  budgetDefined: z.string().optional(),
  authorizationConfirmed: z.boolean().refine(val => val === true, "يجب تأكيد التفويض"),
  agreementConfirmed: z.boolean().refine(val => val === true, "يجب الموافقة على الاتفاقية"),
  feesConfirmed: z.boolean().refine(val => val === true, "يجب الإقرار بآلية الرسوم"),
});

type FormData = z.infer<typeof schema>;

const TOTAL_STEPS = 8;

const STEP_LABELS = [
  { label: "بيانات المنشأة", labelEn: "Facility Info",    icon: Building2 },
  { label: "المستندات",       labelEn: "Documents",         icon: FileText },
  { label: "المفوضون",        labelEn: "Delegates",         icon: Users },
  { label: "الخدمات",         labelEn: "Services",          icon: Layers },
  { label: "الفروع",          labelEn: "Branches",          icon: MapPin },
  { label: "الموردون",        labelEn: "Vendors",           icon: Truck },
  { label: "التشغيل",         labelEn: "Operations",        icon: BarChart2 },
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
  const { toast } = useToast();
  const registerMutation = useRegisterCompany();
  const [phase, setPhase] = useState<"intro" | "form" | "success">("intro");
  const [step, setStep] = useState(1);
  const [accountNumber, setAccountNumber] = useState<string>("");
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
      collaborationModel: "", budgetDefined: "",
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
        onSuccess: (res) => { setAccountNumber(res?.accountNumber ?? ""); setPhase("success"); },
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

  if (phase === "intro") {
    const introCards = ar
      ? [
          { icon: Layers, title: "ندرس احتياجاتكم", desc: "تحليل دقيق لطبيعة عملياتكم التشغيلية" },
          { icon: Users, title: "نقترح النموذج الأنسب", desc: "حسب حجم التشغيل وعدد الفروع" },
          { icon: ShieldCheck, title: "نُرسل الاتفاقية", desc: "لتوقيعها وختمها وتفعيل حسابكم" },
        ]
      : [
          { icon: Layers, title: "We Study Your Needs", desc: "Precise analysis of your operational requirements" },
          { icon: Users, title: "We Suggest the Right Model", desc: "Based on your operational scale and branches" },
          { icon: ShieldCheck, title: "We Send the Agreement", desc: "For signing, stamping, and account activation" },
        ];
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white flex items-center justify-center py-12 px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl w-full text-center">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Building2 size={40} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {ar ? "ابدأ بتنظيم عمليات منشأتك التشغيلية" : "Start Organizing Your Facility's Operations"}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            {ar
              ? "يرجى تعبئة بيانات منشأتكم ليقوم فريق GSS بدراسة احتياجاتكم التشغيلية واقتراح نموذج الخدمة المناسب لكم."
              : "Please fill in your facility's information so the GSS team can study your operational needs and suggest the appropriate service model for you."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-right">
            {introCards.map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <item.icon size={24} className="text-primary mb-3" />
                <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <Button size="lg" className="h-14 px-12 text-lg font-bold" onClick={() => setPhase("form")} data-testid="btn-start-company-registration">
            {ar ? "ابدأ التسجيل" : "Start Registration"} <ArrowLeft className="mr-2" size={20} />
          </Button>
        </motion.div>
      </div>
    );
  }

  if (phase === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center py-12 px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {ar ? "تم استلام طلب تسجيل منشأتكم بنجاح" : "Your Facility Registration Request Was Received Successfully"}
          </h2>
          <p className="text-gray-500 text-base leading-relaxed mb-6">
            {ar
              ? "سيقوم فريق GSS بمراجعة بياناتكم وإرسال الاتفاقية التشغيلية إلى بريدكم الإلكتروني."
              : "The GSS team will review your information and send the operational agreement to your email."}
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
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-amber-600" /> {ar ? "ستصلكم الاتفاقية التشغيلية عبر البريد الإلكتروني" : "The operational agreement will be sent to your email"}</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-amber-600" /> {ar ? "قوموا بتوقيعها وختمها وإعادة رفعها" : "Sign it, stamp it, and upload it back"}</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-amber-600" /> {ar ? `سيتم تفعيل حسابكم وبدء الخدمة برقم ${accountNumber || "حسابكم"}` : `Your account will be activated and service started under account ${accountNumber || "your account"}`}</li>
            </ul>
          </div>
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
              {/* STEP 8: الإقرارات والإرسال */}
              {/* ═══════════════════════════════════════════════ */}
              {step === 8 && (
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
