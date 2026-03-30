import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
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
import { CheckCircle2, Building2, ArrowLeft, Layers, Users, ShieldCheck, Paperclip, X } from "lucide-react";
import { motion } from "framer-motion";

const ACTIVITY_TYPES = ["تجزئة", "مقاولات", "مكاتب إدارية", "صناعي", "طبي", "تعليمي", "لوجستي", "أخرى"];
const SERVICES = ["الصيانة", "النظافة", "النقل", "العمالة", "المرافق والاتصالات", "التراخيص الحكومية", "تقنية المعلومات", "إعداد الفروع", "إدارة الأسطول", "إسكان الموظفين", "الفعاليات", "أخرى"];
const MONTHLY_REQUESTS = ["1–5", "5–10", "10–30", "30–100", "أكثر من 100"];
const BRANCH_RANGES = ["فرع واحد", "2–5 فروع", "6–15 فرع", "أكثر من 15 فرع"];

const schema = z.object({
  companyName: z.string().min(2, "اسم المنشأة مطلوب"),
  commercialRegister: z.string().optional(),
  city: z.string().min(2, "المدينة مطلوبة"),
  address: z.string().optional(),
  branchCountRange: z.string().optional(),
  activityType: z.array(z.string()).min(1, "يرجى تحديد نوع النشاط"),
  contactName: z.string().min(2, "اسم المسؤول مطلوب"),
  contactJobTitle: z.string().optional(),
  contactDepartment: z.string().optional(),
  phone: z.string().min(9, "رقم الجوال غير صالح"),
  email: z.string().email("بريد إلكتروني غير صالح"),
  requestedServices: z.array(z.string()).min(1, "يرجى تحديد خدمة واحدة على الأقل"),
  hasCurrentVendors: z.string().optional(),
  currentVendorName: z.string().optional(),
  currentVendorService: z.string().optional(),
  monthlyRequestsVolume: z.string().optional(),
  operationalBranches: z.string().optional(),
  collaborationModel: z.string().min(1, "يرجى تحديد نموذج التعاون"),
  authorizationConfirmed: z.boolean().refine(val => val === true, "يجب تأكيد التفويض"),
  agreementConfirmed: z.boolean().refine(val => val === true, "يجب الموافقة على الاتفاقية"),
  feesConfirmed: z.boolean().refine(val => val === true, "يجب الإقرار بآلية الرسوم"),
});

type FormData = z.infer<typeof schema>;

const TOTAL_STEPS = 6;

export default function RegisterCompany() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const registerMutation = useRegisterCompany();
  const [phase, setPhase] = useState<"intro" | "form" | "success">("intro");
  const [step, setStep] = useState(1);
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: "", commercialRegister: "", city: "", address: "",
      branchCountRange: "", activityType: [], contactName: "", contactJobTitle: "",
      contactDepartment: "", phone: "", email: "", requestedServices: [],
      hasCurrentVendors: "no", currentVendorName: "", currentVendorService: "",
      monthlyRequestsVolume: "", operationalBranches: "", collaborationModel: "",
      authorizationConfirmed: false, agreementConfirmed: false, feesConfirmed: false,
    },
  });

  const watchHasVendors = form.watch("hasCurrentVendors");
  const watchCollab = form.watch("collaborationModel");

  const goNext = async (fields: (keyof FormData)[]) => {
    const valid = await form.trigger(fields);
    if (valid) setStep(s => s + 1);
  };

  const onSubmit = (data: FormData) => {
    registerMutation.mutate(
      { data: { companyName: data.companyName, commercialRegister: data.commercialRegister, city: data.city, contactName: data.contactName, phone: data.phone, email: data.email, collaborationModel: data.collaborationModel, requestedServices: data.requestedServices, authorizationConfirmed: data.authorizationConfirmed } },
      { onSuccess: () => setPhase("success"), onError: () => toast({ variant: "destructive", title: "حدث خطأ", description: "لم نتمكن من إتمام التسجيل، يرجى المحاولة مرة أخرى." }) }
    );
  };

  const CheckboxGroup = ({ options, name }: { options: string[]; name: "activityType" | "requestedServices" }) => {
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
            <Building2 size={40} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">ابدأ بتنظيم عمليات منشأتك التشغيلية</h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            يرجى تعبئة بيانات منشأتكم ليقوم فريق GSS بدراسة احتياجاتكم التشغيلية واقتراح نموذج الخدمة المناسب لكم.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-right">
            {[
              { icon: Layers, title: "ندرس احتياجاتكم", desc: "تحليل دقيق لطبيعة عملياتكم التشغيلية" },
              { icon: Users, title: "نقترح النموذج الأنسب", desc: "حسب حجم التشغيل وعدد الفروع" },
              { icon: ShieldCheck, title: "نُرسل الاتفاقية", desc: "لتوقيعها وختمها وتفعيل حسابكم" },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <item.icon size={24} className="text-primary mb-3" />
                <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <Button size="lg" className="h-14 px-12 text-lg font-bold" onClick={() => setPhase("form")} data-testid="btn-start-company-registration">
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">تم استلام طلب تسجيل منشأتكم بنجاح</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            سيقوم فريق العمليات في GSS بمراجعة بياناتكم وتحديد نموذج التشغيل المناسب لكم، وسيتم إرسال الاتفاقية التشغيلية إلى البريد الإلكتروني للمسؤول المسجل لتوقيعها وختمها وإعادة رفعها عبر المنصة.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 text-right">
            <p className="text-amber-800 font-semibold text-sm mb-2">الخطوات التالية:</p>
            <ul className="space-y-1 text-amber-700 text-sm">
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" /> ستصلكم الاتفاقية التشغيلية عبر البريد الإلكتروني</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" /> قوموا بتوقيعها وختمها وإعادة رفعها</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" /> سيتم تفعيل حساب منشأتكم وبدء الخدمة</li>
            </ul>
          </div>
          <Button size="lg" className="h-12 px-10 font-bold" onClick={() => setLocation("/dashboard/company")} data-testid="btn-go-dashboard">
            الانتقال إلى لوحة الطلبات
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
            <h2 className="text-xl font-bold text-gray-900">تسجيل منشأة — الخطوة {step} من {TOTAL_STEPS}</h2>
            <button onClick={() => step > 1 ? setStep(s => s - 1) : setPhase("intro")} className="text-sm text-gray-500 hover:text-gray-700">السابق</button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
          </div>
          <div className="flex justify-between mt-1">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <span key={i} className={`text-xs ${i + 1 <= step ? "text-primary font-bold" : "text-gray-400"}`}>●</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* STEP 1: Company Info */}
              {step === 1 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-3">بيانات المنشأة</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="companyName" render={({ field }) => (
                      <FormItem><FormLabel>اسم المنشأة <span className="text-red-500">*</span></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="commercialRegister" render={({ field }) => (
                      <FormItem><FormLabel>رقم السجل التجاري <span className="text-gray-400 text-xs">(اختياري)</span></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem><FormLabel>المدينة <span className="text-red-500">*</span></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem><FormLabel>العنوان <span className="text-gray-400 text-xs">(اختياري)</span></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="branchCountRange" render={({ field }) => (
                    <FormItem>
                      <FormLabel>عدد الفروع التقريبي</FormLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                        {BRANCH_RANGES.map(opt => (
                          <button key={opt} type="button" onClick={() => form.setValue("branchCountRange", opt)}
                            className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${field.value === opt ? "border-primary bg-primary text-white" : "border-gray-200 hover:border-primary/50"}`}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="activityType" render={() => (
                    <FormItem>
                      <FormLabel>نوع النشاط <span className="text-red-500">*</span></FormLabel>
                      <CheckboxGroup options={ACTIVITY_TYPES} name="activityType" />
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="pt-4 flex justify-end">
                    <Button type="button" onClick={() => goNext(["companyName", "city", "activityType"])}>التالي</Button>
                  </div>
                </div>
              )}

              {/* STEP 2: Contact Person */}
              {step === 2 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-3">بيانات مسؤول التواصل</h3>
                  <p className="text-gray-500 text-sm">يرجى إدخال بيانات المسؤول المعني بالتنسيق التشغيلي مع منصة GSS، وسيتم استخدامها لإرسال الاتفاقية والتواصل بخصوص الطلبات.</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="contactName" render={({ field }) => (
                      <FormItem><FormLabel>الاسم الكامل <span className="text-red-500">*</span></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="contactJobTitle" render={({ field }) => (
                      <FormItem><FormLabel>المسمى الوظيفي</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="contactDepartment" render={({ field }) => (
                      <FormItem><FormLabel>القسم أو الإدارة</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel>رقم الجوال <span className="text-red-500">*</span></FormLabel><FormControl><Input dir="ltr" placeholder="05xxxxxxxx" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>البريد الإلكتروني <span className="text-red-500">*</span></FormLabel><FormControl><Input dir="ltr" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="space-y-3 pt-2">
                    <FormField control={form.control} name="authorizationConfirmed" render={({ field }) => (
                      <FormItem className="flex items-start gap-3 p-4 border rounded-xl bg-slate-50">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div><FormLabel className="text-gray-700 leading-relaxed font-medium">أقر بأنني مفوض من قبل المنشأة بتسجيل بياناتها والتنسيق مع منصة GSS.</FormLabel><FormMessage /></div>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="agreementConfirmed" render={({ field }) => (
                      <FormItem className="flex items-start gap-3 p-4 border rounded-xl bg-slate-50">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div><FormLabel className="text-gray-700 leading-relaxed font-medium">أوافق على استلام الاتفاقية التشغيلية وتوقيعها وختمها وإعادة رفعها عبر المنصة.</FormLabel><FormMessage /></div>
                      </FormItem>
                    )} />
                  </div>
                  <div className="pt-2 flex justify-end">
                    <Button type="button" onClick={() => goNext(["contactName", "phone", "email", "authorizationConfirmed", "agreementConfirmed"])}>التالي</Button>
                  </div>
                </div>
              )}

              {/* STEP 3: Services */}
              {step === 3 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-3">الخدمات التشغيلية المطلوبة</h3>
                  <p className="text-gray-500 text-sm">ما الخدمات التشغيلية التي ترغبون بإدارتها عبر منصة GSS؟ (يمكن اختيار أكثر من خيار)</p>
                  <FormField control={form.control} name="requestedServices" render={() => (
                    <FormItem>
                      <CheckboxGroup options={SERVICES} name="requestedServices" />
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="pt-2 flex justify-end">
                    <Button type="button" onClick={() => goNext(["requestedServices"])}>التالي</Button>
                  </div>
                </div>
              )}

              {/* STEP 4: Current Vendors */}
              {step === 4 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-3">الموردون الحاليون</h3>
                  <p className="text-gray-500 text-sm">هل لديكم موردون حاليون ترغبون بالاستمرار معهم؟</p>
                  <div className="flex gap-3">
                    {[{ val: "yes", label: "نعم" }, { val: "no", label: "لا" }].map(opt => (
                      <button key={opt.val} type="button"
                        onClick={() => form.setValue("hasCurrentVendors", opt.val)}
                        className={`flex-1 rounded-xl border-2 py-4 text-lg font-bold transition-colors ${watchHasVendors === opt.val ? "border-primary bg-primary text-white" : "border-gray-200 hover:border-primary/50"}`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {watchHasVendors === "yes" && (
                    <div className="space-y-4 bg-gray-50 rounded-xl p-4">
                      <p className="text-sm font-semibold text-gray-700">بيانات المورد الحالي:</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="currentVendorName" render={({ field }) => (
                          <FormItem><FormLabel>اسم المورد</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="currentVendorService" render={({ field }) => (
                          <FormItem><FormLabel>نوع الخدمة</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                        )} />
                      </div>
                      <p className="text-xs text-gray-500">يمكنكم الاستمرار مع موردييكم الحاليين بينما تتولى GSS تنظيم التنفيذ وتحسين المتابعة.</p>
                    </div>
                  )}
                  <div className="pt-2 flex justify-end">
                    <Button type="button" onClick={() => setStep(5)}>التالي</Button>
                  </div>
                </div>
              )}

              {/* STEP 5: Volume */}
              {step === 5 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-3">حجم التشغيل المتوقع</h3>
                  <FormField control={form.control} name="monthlyRequestsVolume" render={({ field }) => (
                    <FormItem>
                      <FormLabel>عدد الطلبات التشغيلية المتوقعة شهرياً</FormLabel>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-1">
                        {MONTHLY_REQUESTS.map(opt => (
                          <button key={opt} type="button" onClick={() => form.setValue("monthlyRequestsVolume", opt)}
                            className={`rounded-xl border px-3 py-3 text-sm font-medium text-center transition-colors ${field.value === opt ? "border-primary bg-primary text-white" : "border-gray-200 hover:border-primary/50"}`}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="operationalBranches" render={({ field }) => (
                    <FormItem>
                      <FormLabel>عدد الفروع التشغيلية</FormLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                        {BRANCH_RANGES.map(opt => (
                          <button key={opt} type="button" onClick={() => form.setValue("operationalBranches", opt)}
                            className={`rounded-xl border px-3 py-3 text-sm font-medium text-center transition-colors ${field.value === opt ? "border-primary bg-primary text-white" : "border-gray-200 hover:border-primary/50"}`}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </FormItem>
                  )} />
                  <div className="pt-2 flex justify-end">
                    <Button type="button" onClick={() => setStep(6)}>التالي</Button>
                  </div>
                </div>
              )}

              {/* STEP 6: Collaboration + Fees + File */}
              {step === 6 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-3">نموذج التعاون والإرسال</h3>
                  <FormField control={form.control} name="collaborationModel" render={({ field }) => (
                    <FormItem>
                      <FormLabel>ما نموذج التعاون المناسب لمنشأتكم مبدئياً؟ <span className="text-red-500">*</span></FormLabel>
                      <div className="space-y-3 mt-2">
                        {[
                          { val: "on-demand", title: "خدمة حسب الطلب", desc: "مناسب للطلبات التشغيلية عند الحاجة بدون التزام تشغيلي مستمر" },
                          { val: "subscription", title: "اشتراك تشغيلي", desc: "يشمل متابعة تشغيلية مستمرة وتقارير دورية وإدارة حساب مخصصة" },
                          { val: "undecided", title: "غير متأكد — أحتاج توصية من فريق GSS", desc: "" },
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
                  {watchCollab === "on-demand" && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
                      يمكنكم البدء بنظام حسب الطلب، مع إمكانية التحول لاحقاً إلى الاشتراك التشغيلي للاستفادة من خدمات الإدارة المتقدمة والتقارير التشغيلية الدورية.
                    </div>
                  )}
                  {watchCollab === "subscription" && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
                      سيقوم فريق GSS بدراسة احتياجات منشأتكم والتواصل معكم لتقديم عرض الخدمة المناسب حسب حجم التشغيل المتوقع.
                    </div>
                  )}

                  {/* Fees Notice */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm">
                    <p className="font-bold text-amber-900 mb-3">آلية رسوم الخدمة في منصة GSS</p>
                    <ul className="space-y-2 text-amber-800">
                      <li>• <strong>حسب الطلب:</strong> تتحمل المنشأة رسوم إدارة التشغيل فقط دون أي عمولات على أسعار الموردين.</li>
                      <li>• <strong>الاشتراك:</strong> يشمل متابعة مستمرة وتقارير ومدير حساب مخصص، ويتم تحديد الرسوم بعد دراسة الاحتياجات.</li>
                      <li>• <strong>المشاريع الكبيرة:</strong> تُحدَّد نسبة إدارة المشروع مسبقاً قبل التنفيذ بكل شفافية.</li>
                    </ul>
                  </div>
                  <FormField control={form.control} name="feesConfirmed" render={({ field }) => (
                    <FormItem className="flex items-start gap-3 p-4 border rounded-xl bg-slate-50">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <div><FormLabel className="text-gray-700 leading-relaxed font-medium">أقر باطلاعي على آلية رسوم الخدمة المعتمدة في منصة GSS.</FormLabel><FormMessage /></div>
                    </FormItem>
                  )} />

                  {/* File Upload */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">إرفاق مستند <span className="text-gray-400 font-normal">(اختياري — السجل التجاري، أو أي وثيقة ذات صلة)</span></p>
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

                  <div className="pt-2 flex justify-end">
                    <Button type="submit" className="min-w-[180px] h-12 text-base font-bold" disabled={registerMutation.isPending} data-testid="btn-submit-company">
                      {registerMutation.isPending ? "جاري الإرسال..." : "إرسال الطلب"}
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
