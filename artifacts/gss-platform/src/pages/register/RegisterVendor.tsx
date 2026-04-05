import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useVendorAuth } from "@/contexts/AccountAuthContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRegisterVendor } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Wrench, ArrowLeft, Banknote, Network, TrendingUp, Paperclip, X } from "lucide-react";
import { motion } from "framer-motion";

const VENDOR_TYPES = [
  { val: "company", label: "شركة" },
  { val: "establishment", label: "مؤسسة" },
  { val: "freelancer", label: "فني مستقل" },
  { val: "professional", label: "مختص مهني" },
  { val: "contractor", label: "مقاول فرد" },
  { val: "other", label: "أخرى" },
];

const SERVICE_TYPES = ["صيانة", "نظافة", "نقل", "توريد", "تقنية معلومات", "عمالة", "تجهيز مواقع", "إدارة مرافق", "استشارات فنية", "لوجستي", "إعداد فروع", "أخرى"];

const CITIES = ["الرياض", "جدة", "الدمام / الخبر", "مكة المكرمة", "المدينة المنورة", "أبها", "تبوك", "القصيم", "حائل", "نجران", "أخرى"];

const TEAM_SIZES = ["أعمل بشكل فردي", "فريق صغير (2–5)", "فريق متوسط (6–15)", "شركة كاملة (+15)"];

const SCOPE_OPTIONS = [
  { val: "single", label: "مدينة واحدة" },
  { val: "multiple", label: "عدة مدن" },
  { val: "all", label: "جميع مناطق المملكة" },
];

const PAYMENT_TERMS_OPTIONS = [
  "دفع فوري",
  "دفع بعد التنفيذ",
  "30 يوم",
  "60 يوم",
  "90 يوم",
  "حسب نوع المشروع",
];

const schema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  vendorType: z.string().min(1, "نوع مقدم الخدمة مطلوب"),
  specialty: z.string().optional(),
  city: z.string().min(2, "المدينة مطلوبة"),
  phone: z.string().min(9, "رقم الجوال غير صالح"),
  email: z.string().email("بريد إلكتروني غير صالح"),
  services: z.array(z.string()).min(1, "يرجى تحديد نوع الخدمة"),
  serviceScope: z.string().min(1, "نطاق العمل مطلوب"),
  teamSize: z.string().optional(),
  acceptedPaymentTerms: z.array(z.string()).optional(),
  dataConfirmed: z.boolean().refine(val => val === true, "يجب تأكيد صحة البيانات"),
  termsConfirmed: z.boolean().refine(val => val === true, "يجب الموافقة على سياسة التنسيق التشغيلي"),
});

type FormData = z.infer<typeof schema>;
const TOTAL_STEPS = 4;

export default function RegisterVendor() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const vendorAuth = useVendorAuth();
  const registerMutation = useRegisterVendor();
  const [phase, setPhase] = useState<"intro" | "form" | "success">("intro");
  const [step, setStep] = useState(1);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [savedPhone, setSavedPhone] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "", vendorType: "", specialty: "", city: "",
      phone: "", email: "", services: [], serviceScope: "",
      teamSize: "", acceptedPaymentTerms: [], dataConfirmed: false, termsConfirmed: false,
    },
  });

  const watchVendorType = form.watch("vendorType");

  const goNext = async (fields: (keyof FormData)[]) => {
    const valid = await form.trigger(fields);
    if (valid) setStep(s => s + 1);
  };

  const onSubmit = (data: FormData) => {
    registerMutation.mutate(
      { data: { name: data.name, vendorType: data.vendorType, phone: data.phone, email: data.email, serviceScope: data.serviceScope, services: data.services } },
      {
        onSuccess: () => {
          const defaultPassword = data.phone.slice(-4);
          vendorAuth.register({ name: data.name, phone: data.phone, password: defaultPassword, city: data.city });
          setSavedPhone(data.phone);
          setPhase("success");
        },
        onError: () => toast({ variant: "destructive", title: "حدث خطأ", description: "لم نتمكن من إتمام التسجيل، يرجى المحاولة مرة أخرى." })
      }
    );
  };

  const CheckboxGroup = ({ options, name }: { options: string[]; name: "services" }) => {
    const value = form.watch(name) as string[];
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {options.map(option => (
          <label key={option} className={`flex items-center gap-2 cursor-pointer rounded-xl border px-4 py-3 text-sm transition-colors ${value.includes(option) ? "border-primary bg-primary/5 text-primary font-semibold" : "border-gray-200 hover:border-gray-300"}`}>
            <Checkbox
              checked={value.includes(option)}
              onCheckedChange={checked => {
                const current = form.getValues(name) as string[];
                form.setValue(name, checked ? [...current, option] : current.filter(v => v !== option), { shouldValidate: true });
              }}
            />
            {option}
          </label>
        ))}
      </div>
    );
  };

  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white flex items-center justify-center py-12 px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl w-full text-center">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Wrench size={40} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">انضم إلى شبكة الموردين المعتمدين لدى منصة GSS</h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            استقبل طلبات تشغيلية مباشرة من الشركات والمنشآت دون فرض أي عمولات على الخدمات التشغيلية اليومية.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-right">
            {[
              { icon: Network, title: "عملاء جاهزون", desc: "شركات ومنشآت تبحث عن موردين موثوقين الآن" },
              { icon: Banknote, title: "لا عمولات يومية", desc: "تقدّم سعرك بشفافية كاملة دون أي إضافات" },
              { icon: TrendingUp, title: "فرص نمو مستمرة", desc: "انضمامك يفتح أبواب مشاريع وعملاء جدد" },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <item.icon size={24} className="text-primary mb-3" />
                <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <Button size="lg" className="h-14 px-12 text-lg font-bold" onClick={() => setPhase("form")} data-testid="btn-start-vendor-registration">
            ابدأ التسجيل <ArrowLeft className="mr-2" size={20} />
          </Button>
        </motion.div>
      </div>
    );
  }

  if (phase === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center py-12 px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">تم استلام طلبكم بنجاح</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            سيقوم فريق GSS بمراجعة بياناتكم والتواصل معكم لاستكمال إجراءات الاعتماد وإضافتكم إلى شبكة الموردين المعتمدين.
          </p>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8 text-right">
            <p className="text-blue-800 font-semibold text-sm mb-2">ماذا يحدث بعد ذلك؟</p>
            <ul className="space-y-1 text-blue-700 text-sm">
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" /> سيتواصل معك أحد أعضاء فريق GSS للتحقق من البيانات</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" /> سيتم تفعيل حسابك في الشبكة بعد إتمام الاعتماد</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" /> ستبدأ في استقبال الطلبات التشغيلية المباشرة</li>
            </ul>
          </div>
          {savedPhone && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6 text-right">
              <p className="text-green-800 font-bold text-sm mb-2">بيانات الدخول لحسابك</p>
              <div className="space-y-1 text-sm text-green-700">
                <p>رقم الجوال: <span className="font-mono font-bold">{savedPhone}</span></p>
                <p>كلمة المرور الافتراضية: <span className="font-mono font-bold text-lg tracking-widest">{savedPhone.slice(-4)}</span></p>
                <p className="text-xs text-green-600 mt-2">يمكنك تسجيل الدخول من صفحة <a href="/portal/login?type=vendor" className="underline font-bold">دخول الموردين</a></p>
              </div>
            </div>
          )}
          <Button size="lg" className="h-12 px-10 font-bold" onClick={() => setLocation("/dashboard/vendor")} data-testid="btn-go-vendor-dashboard">
            الانتقال إلى لوحة التحكم
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900">تسجيل مورد — الخطوة {step} من {TOTAL_STEPS}</h2>
            <button onClick={() => step > 1 ? setStep(s => s - 1) : setPhase("intro")} className="text-sm text-gray-500 hover:text-gray-700">السابق</button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* STEP 1: Provider Info */}
              {step === 1 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-3">بيانات مقدم الخدمة</h3>
                  <FormField control={form.control} name="vendorType" render={({ field }) => (
                    <FormItem>
                      <FormLabel>نوع مقدم الخدمة <span className="text-red-500">*</span></FormLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                        {VENDOR_TYPES.map(opt => (
                          <button key={opt.val} type="button" onClick={() => form.setValue("vendorType", opt.val, { shouldValidate: true })}
                            className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition-colors ${field.value === opt.val ? "border-primary bg-primary text-white" : "border-gray-200 hover:border-primary/50"}`}>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                  {watchVendorType === "professional" && (
                    <FormField control={form.control} name="specialty" render={({ field }) => (
                      <FormItem><FormLabel>التخصص <span className="text-red-500">*</span></FormLabel><FormControl><Input placeholder="مثال: مهندس كهرباء، مختص HVAC..." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  )}
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>اسم الشركة / الاسم الكامل <span className="text-red-500">*</span></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                      <FormLabel>المدينة الرئيسية <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="اختر المدينة" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="pt-2 flex justify-end">
                    <Button type="button" onClick={() => goNext(["name", "vendorType", "city"])}>التالي</Button>
                  </div>
                </div>
              )}

              {/* STEP 2: Contact Info */}
              {step === 2 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-3">بيانات التواصل</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel>رقم الجوال <span className="text-red-500">*</span></FormLabel><FormControl><Input dir="ltr" placeholder="05xxxxxxxx" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel>البريد الإلكتروني <span className="text-red-500">*</span></FormLabel><FormControl><Input dir="ltr" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="dataConfirmed" render={({ field }) => (
                    <FormItem className="flex items-start gap-3 p-4 border rounded-xl bg-slate-50">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <div><FormLabel className="text-gray-700 leading-relaxed font-medium">أقر بصحة البيانات المدخلة وموافقتي على التسجيل ضمن شبكة الموردين المعتمدين لمنصة GSS.</FormLabel><FormMessage /></div>
                    </FormItem>
                  )} />
                  <div className="pt-2 flex justify-end">
                    <Button type="button" onClick={() => goNext(["phone", "email", "dataConfirmed"])}>التالي</Button>
                  </div>
                </div>
              )}

              {/* STEP 3: Service Types */}
              {step === 3 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-3">نوع الخدمات المقدمة</h3>
                  <p className="text-gray-500 text-sm">اختر جميع أنواع الخدمات التي تقدمها (يمكن اختيار أكثر من واحدة)</p>
                  <FormField control={form.control} name="services" render={() => (
                    <FormItem>
                      <CheckboxGroup options={SERVICE_TYPES} name="services" />
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="pt-2 flex justify-end">
                    <Button type="button" onClick={() => goNext(["services"])}>التالي</Button>
                  </div>
                </div>
              )}

              {/* STEP 4: Scope + Team Size + File */}
              {step === 4 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-3">نطاق العمل والتفاصيل</h3>
                  <FormField control={form.control} name="serviceScope" render={({ field }) => (
                    <FormItem>
                      <FormLabel>النطاق الجغرافي للعمل <span className="text-red-500">*</span></FormLabel>
                      <div className="flex gap-3 mt-1">
                        {SCOPE_OPTIONS.map(opt => (
                          <button key={opt.val} type="button" onClick={() => form.setValue("serviceScope", opt.val, { shouldValidate: true })}
                            className={`flex-1 rounded-xl border-2 py-3 text-sm font-bold transition-colors ${field.value === opt.val ? "border-primary bg-primary text-white" : "border-gray-200 hover:border-primary/50"}`}>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="teamSize" render={({ field }) => (
                    <FormItem>
                      <FormLabel>حجم الفريق / طريقة التنفيذ</FormLabel>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        {TEAM_SIZES.map(opt => (
                          <button key={opt} type="button" onClick={() => form.setValue("teamSize", opt)}
                            className={`rounded-xl border px-4 py-3 text-sm font-medium text-right transition-colors ${field.value === opt ? "border-primary bg-primary/5 text-primary" : "border-gray-200 hover:border-gray-300"}`}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </FormItem>
                  )} />

                  {/* Payment Terms */}
                  <FormField control={form.control} name="acceptedPaymentTerms" render={() => (
                    <FormItem>
                      <FormLabel>
                        شروط السداد المقبولة لدى مورّدكم
                        <span className="block text-xs font-normal text-gray-500 mt-0.5">
                          يرجى تحديد شروط السداد التي يمكنكم العمل وفقها عند استقبال طلبات من المنشآت عبر منصة GSS
                        </span>
                      </FormLabel>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {PAYMENT_TERMS_OPTIONS.map(opt => {
                          const current = form.watch("acceptedPaymentTerms") as string[] ?? [];
                          const isSelected = current.includes(opt);
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                const vals = form.getValues("acceptedPaymentTerms") as string[] ?? [];
                                form.setValue("acceptedPaymentTerms", isSelected ? vals.filter(v => v !== opt) : [...vals, opt]);
                              }}
                              className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${isSelected ? "border-primary bg-primary text-white" : "border-gray-200 hover:border-primary/50 text-gray-700"}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      <div className="mt-2 text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                        يتم مطابقة شروط السداد الخاصة بكم مع سياسة سداد المنشأة قبل إصدار أمر العمل — مما يضمن توافق الطرفين مسبقاً.
                      </div>
                    </FormItem>
                  )} />

                  {/* File Upload */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">إرفاق ملف <span className="text-gray-400 font-normal">(اختياري — السجل التجاري، شهادات اعتماد، أعمال سابقة)</span></p>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => fileRef.current?.click()}
                    >
                      <input ref={fileRef} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={e => setAttachment(e.target.files?.[0] ?? null)} />
                      {attachment ? (
                        <div className="flex items-center justify-center gap-3">
                          <Paperclip size={20} className="text-primary" />
                          <span className="text-sm font-medium text-primary">{attachment.name}</span>
                          <button type="button" onClick={e => { e.stopPropagation(); setAttachment(null); if (fileRef.current) fileRef.current.value = ""; }}>
                            <X size={16} className="text-gray-400 hover:text-red-500" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Paperclip size={24} className="text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">اضغط لرفع ملف (PDF، صورة، Word)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Vendor Policy Section */}
                  <details className="border border-slate-200 rounded-xl overflow-hidden">
                    <summary className="px-5 py-3 cursor-pointer text-sm font-semibold text-primary bg-primary/5 hover:bg-primary/10 select-none list-none flex items-center justify-between">
                      <span>سياسة تنفيذ الطلبات التشغيلية للموردين المعتمدين</span>
                      <span className="text-xs text-gray-400 font-normal">اضغط للقراءة</span>
                    </summary>
                    <div className="px-5 py-4 bg-slate-50 space-y-3 text-sm text-gray-700 leading-relaxed">
                      <p>يتم تنفيذ الطلبات التشغيلية المحالة إلى المورد عبر منصة GSS باعتبارها جهة التنسيق التشغيلية المعتمدة للخدمة، وتشمل مهام المنصة: تنظيم أوامر العمل، تحديد نطاق التنفيذ، متابعة الإنجاز، توثيق الاستلام، ومعالجة الملاحظات التشغيلية.</p>
                      <p className="font-semibold text-gray-800">الالتزام بقناة تنفيذ الطلبات</p>
                      <p>يلتزم المورد بتنفيذ الطلبات المحالة إليه عبر منصة GSS وفق آلية التنسيق المعتمدة، وعدم إجراء أي ترتيبات تشغيلية مباشرة مع المنشآت بخصوص الطلبات المحالة عبر المنصة دون إشعارها. وفي حال حدوث ذلك، يحق للمنصة اتخاذ الإجراءات التنظيمية المناسبة وفق الاتفاقية المعتمدة.</p>
                      <p className="font-semibold text-gray-800">مسؤولية جودة التنفيذ</p>
                      <p>يلتزم المورد بتنفيذ الأعمال وفق نطاق العمل المعتمد في أمر الخدمة، ومعالجة أي ملاحظات تشغيلية يتم تسجيلها من خلال منصة GSS لضمان إغلاق الطلب بالشكل المطلوب.</p>
                    </div>
                  </details>

                  <FormField control={form.control} name="termsConfirmed" render={({ field }) => (
                    <FormItem className="flex items-start gap-3 p-4 border rounded-xl bg-slate-50">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <div><FormLabel className="text-gray-700 leading-relaxed font-medium">أوافق على تنفيذ الطلبات التشغيلية المحالة عبر منصة GSS وفق آلية التنسيق المعتمدة لديها.</FormLabel><FormMessage /></div>
                    </FormItem>
                  )} />

                  <div className="pt-2 flex justify-end">
                    <Button type="submit" className="min-w-[180px] h-12 text-base font-bold" disabled={registerMutation.isPending} data-testid="btn-submit-vendor">
                      {registerMutation.isPending ? "جاري الإرسال..." : "إرسال طلب الاعتماد"}
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
