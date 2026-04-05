import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useConsultantAuth } from "@/contexts/AccountAuthContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRegisterConsultant } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Briefcase, ArrowLeft, Star, DollarSign, Users, Paperclip, X } from "lucide-react";
import { motion } from "framer-motion";

const EXPERTISE_AREAS = [
  "إدارة المرافق والتشغيل", "سلاسل الإمداد واللوجستيات", "الصيانة والبنية التحتية",
  "تقنية المعلومات والأنظمة", "الموارد البشرية", "المشتريات والعقود",
  "إدارة المشاريع", "الاستشارات المالية", "إدارة العقارات", "أخرى"
];

const CONTRIBUTION_TYPES = [
  { val: "referral", title: "إحالة منشآت جديدة", desc: "تعريف الشركات والمنشآت بمنصة GSS والحصول على نسبة عند تسجيلهم" },
  { val: "vendor-recommendation", title: "ترشيح موردين", desc: "ترشيح موردين موثوقين لشبكة GSS ومتابعة أدائهم" },
  { val: "operational-consulting", title: "استشارات تشغيلية", desc: "تقديم توصيات تشغيلية لعملاء GSS بناءً على خبرتك" },
  { val: "mixed", title: "متعدد الأدوار", desc: "مزيج من الأدوار أعلاه حسب الفرصة" },
];

const schema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(9, "رقم الجوال غير صالح"),
  email: z.string().email("بريد إلكتروني غير صالح"),
  city: z.string().min(2, "المدينة مطلوبة"),
  expertiseArea: z.string().min(2, "مجال الخبرة مطلوب"),
  yearsExperience: z.string().optional(),
  currentRole: z.string().optional(),
  contributionType: z.string().min(1, "يرجى تحديد نوع المساهمة"),
  notes: z.string().optional(),
  termsConfirmed: z.boolean().refine(val => val === true, "يجب الموافقة على الشروط"),
});

type FormData = z.infer<typeof schema>;
const TOTAL_STEPS = 3;

export default function RegisterConsultant() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const consultantAuth = useConsultantAuth();
  const registerMutation = useRegisterConsultant();
  const [phase, setPhase] = useState<"intro" | "form" | "success">("intro");
  const [step, setStep] = useState(1);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [savedPhone, setSavedPhone] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "", phone: "", email: "", city: "", expertiseArea: "",
      yearsExperience: "", currentRole: "", contributionType: "", notes: "", termsConfirmed: false,
    },
  });

  const watchContrib = form.watch("contributionType");

  const goNext = async (fields: (keyof FormData)[]) => {
    const valid = await form.trigger(fields);
    if (valid) setStep(s => s + 1);
  };

  const onSubmit = (data: FormData) => {
    registerMutation.mutate(
      { data: { name: data.name, phone: data.phone, email: data.email, city: data.city, expertiseArea: data.expertiseArea } },
      {
        onSuccess: () => {
          const defaultPassword = data.phone.slice(-4);
          consultantAuth.register({ name: data.name, phone: data.phone, password: defaultPassword, city: data.city });
          setSavedPhone(data.phone);
          setPhase("success");
        },
        onError: () => toast({ variant: "destructive", title: "حدث خطأ", description: "لم نتمكن من إتمام التسجيل، يرجى المحاولة مرة أخرى." })
      }
    );
  };

  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary/5 to-white flex items-center justify-center py-12 px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl w-full text-center">
          <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Briefcase size={40} className="text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">انضم كـ شريك نجاح (مستشار تشغيلي)</h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            حقّق دخلاً إضافياً من خبرتك المهنية. قدّم توصيات تشغيلية، رشّح منشآت وموردين، واحصل على نسبة عند تنفيذ التوصيات.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-right">
            {[
              { icon: Star, title: "وظّف خبرتك", desc: "حوّل خبرتك التشغيلية والمهنية إلى فرصة شراكة حقيقية" },
              { icon: DollarSign, title: "دخل إضافي", desc: "احصل على نسبة عند تسجيل منشأة أو تنفيذ توصية" },
              { icon: Users, title: "شبكة علاقات", desc: "كن جزءاً من شبكة تشغيلية متنامية في المملكة" },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <item.icon size={24} className="text-secondary mb-3" />
                <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <Button size="lg" className="h-14 px-12 text-lg font-bold bg-secondary hover:bg-secondary/90 text-primary" onClick={() => setPhase("form")} data-testid="btn-start-consultant-registration">
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">مرحباً بك في برنامج شركاء النجاح</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            تم استلام طلبك بنجاح. سيتواصل معك فريق GSS قريباً لشرح آلية الشراكة وتحديد نطاق التعاون المناسب لخبرتك.
          </p>
          <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-5 mb-8 text-right">
            <p className="text-primary font-semibold text-sm mb-2">ماذا يحدث بعد ذلك؟</p>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 text-secondary flex-shrink-0" /> سيتواصل فريق GSS لمناقشة فرص التعاون</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 text-secondary flex-shrink-0" /> سيتم تفعيل حسابك كشريك نجاح</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 text-secondary flex-shrink-0" /> ستبدأ في تلقي فرص التعاون والإحالات</li>
            </ul>
          </div>
          {savedPhone && (
            <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-5 mb-6 text-right">
              <p className="text-primary font-bold text-sm mb-2">بيانات الدخول لحسابك</p>
              <div className="space-y-1 text-sm text-gray-700">
                <p>رقم الجوال: <span className="font-mono font-bold">{savedPhone}</span></p>
                <p>كلمة المرور الافتراضية: <span className="font-mono font-bold text-lg tracking-widest">{savedPhone.slice(-4)}</span></p>
                <p className="text-xs text-gray-500 mt-2">يمكنك تسجيل الدخول من صفحة <a href="/portal/login?type=consultant" className="underline font-bold text-primary">دخول المستشارين</a></p>
              </div>
            </div>
          )}
          <Button size="lg" className="h-12 px-10 font-bold" onClick={() => setLocation("/dashboard/consultant")} data-testid="btn-go-consultant-dashboard">
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
            <h2 className="text-xl font-bold text-gray-900">تسجيل شريك نجاح — الخطوة {step} من {TOTAL_STEPS}</h2>
            <button onClick={() => step > 1 ? setStep(s => s - 1) : setPhase("intro")} className="text-sm text-gray-500 hover:text-gray-700">السابق</button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-secondary h-2 rounded-full transition-all" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* STEP 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-3">البيانات الشخصية</h3>
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>الاسم الكامل <span className="text-red-500">*</span></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel>رقم الجوال <span className="text-red-500">*</span></FormLabel><FormControl><Input dir="ltr" placeholder="05xxxxxxxx" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel>البريد الإلكتروني <span className="text-red-500">*</span></FormLabel><FormControl><Input dir="ltr" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem><FormLabel>مدينة الإقامة <span className="text-red-500">*</span></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="pt-2 flex justify-end">
                    <Button type="button" onClick={() => goNext(["name", "phone", "email", "city"])}>التالي</Button>
                  </div>
                </div>
              )}

              {/* STEP 2: Expertise */}
              {step === 2 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-3">الخبرة والتخصص</h3>
                  <FormField control={form.control} name="expertiseArea" render={({ field }) => (
                    <FormItem>
                      <FormLabel>مجال الخبرة الرئيسي <span className="text-red-500">*</span></FormLabel>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                        {EXPERTISE_AREAS.map(area => (
                          <button key={area} type="button" onClick={() => form.setValue("expertiseArea", area, { shouldValidate: true })}
                            className={`text-right rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${field.value === area ? "border-primary bg-primary/5 text-primary font-bold" : "border-gray-200 hover:border-primary/40"}`}>
                            {area}
                          </button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="yearsExperience" render={({ field }) => (
                      <FormItem>
                        <FormLabel>سنوات الخبرة</FormLabel>
                        <select {...field} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white">
                          <option value="">اختر</option>
                          {["أقل من 3 سنوات", "3–5 سنوات", "5–10 سنوات", "أكثر من 10 سنوات"].map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="currentRole" render={({ field }) => (
                      <FormItem><FormLabel>المسمى الوظيفي الحالي <span className="text-gray-400 text-xs">(اختياري)</span></FormLabel><FormControl><Input placeholder="مثال: مدير تشغيل، رئيس قسم..." {...field} /></FormControl></FormItem>
                    )} />
                  </div>
                  <div className="pt-2 flex justify-end">
                    <Button type="button" onClick={() => goNext(["expertiseArea"])}>التالي</Button>
                  </div>
                </div>
              )}

              {/* STEP 3: Contribution + File */}
              {step === 3 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-3">نوع المساهمة والإرسال</h3>
                  <FormField control={form.control} name="contributionType" render={({ field }) => (
                    <FormItem>
                      <FormLabel>كيف ترغب في المساهمة مع GSS؟ <span className="text-red-500">*</span></FormLabel>
                      <div className="space-y-3 mt-2">
                        {CONTRIBUTION_TYPES.map(opt => (
                          <button key={opt.val} type="button" onClick={() => form.setValue("contributionType", opt.val, { shouldValidate: true })}
                            className={`w-full text-right rounded-xl border-2 px-5 py-4 transition-colors ${field.value === opt.val ? "border-secondary bg-secondary/5" : "border-gray-200 hover:border-secondary/40"}`}>
                            <p className="font-bold text-gray-900">{opt.title}</p>
                            <p className="text-sm text-gray-500 mt-1">{opt.desc}</p>
                          </button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="notes" render={({ field }) => (
                    <FormItem>
                      <FormLabel>ملاحظات إضافية <span className="text-gray-400 text-xs">(اختياري)</span></FormLabel>
                      <FormControl><Textarea placeholder="أي معلومات إضافية تود مشاركتها مع فريق GSS..." rows={3} {...field} /></FormControl>
                    </FormItem>
                  )} />

                  {/* File Upload */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">إرفاق السيرة الذاتية أو ملف تعريفي <span className="text-gray-400 font-normal">(اختياري)</span></p>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-secondary/50 transition-colors"
                      onClick={() => fileRef.current?.click()}
                    >
                      <input ref={fileRef} type="file" className="hidden" accept=".pdf,.doc,.docx"
                        onChange={e => setAttachment(e.target.files?.[0] ?? null)} />
                      {attachment ? (
                        <div className="flex items-center justify-center gap-3">
                          <Paperclip size={20} className="text-secondary" />
                          <span className="text-sm font-medium text-secondary">{attachment.name}</span>
                          <button type="button" onClick={e => { e.stopPropagation(); setAttachment(null); if (fileRef.current) fileRef.current.value = ""; }}>
                            <X size={16} className="text-gray-400 hover:text-red-500" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Paperclip size={24} className="text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">اضغط لرفع السيرة الذاتية (PDF أو Word)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Consultant Policy Section */}
                  <details className="border border-slate-200 rounded-xl overflow-hidden">
                    <summary className="px-5 py-3 cursor-pointer text-sm font-semibold text-secondary bg-secondary/5 hover:bg-secondary/10 select-none list-none flex items-center justify-between">
                      <span>سياسة تقديم الاستشارات التشغيلية عبر منصة GSS</span>
                      <span className="text-xs text-gray-400 font-normal">اضغط للقراءة</span>
                    </summary>
                    <div className="px-5 py-4 bg-slate-50 space-y-3 text-sm text-gray-700 leading-relaxed">
                      <p>تعمل منصة GSS على تنظيم الاستشارات التشغيلية المقدمة للمنشآت من خلال شبكة مستشارين متخصصين، وفق آلية تنسيق واضحة تضمن جودة التوصيات واستفادة المنشآت منها. ويتم تقديم الاستشارات من خلال المنصة باعتبارها قناة التنسيق المعتمدة لإدارة الطلبات الاستشارية المرتبطة بالخدمات التشغيلية.</p>
                      <p className="font-semibold text-gray-800">آلية تنفيذ التوصيات الاستشارية</p>
                      <p>في حال اعتماد توصية تشغيلية مقدمة من المستشار وتم تنفيذها من خلال منصة GSS، يتم توثيق ذلك ضمن إجراءات التشغيل المعتمدة للمنصة وفق نموذج العمل الخاص بها، بما يضمن استمرارية جودة التنفيذ وتحقيق أفضل استفادة تشغيلية للمنشآت.</p>
                      <p className="font-semibold text-gray-800">الالتزام بالإطار التشغيلي للمنصة</p>
                      <p>يلتزم المستشار بتقديم الاستشارات المرتبطة بطلبات محالة عبر منصة GSS ضمن الإطار التنسيقي المعتمد للمنصة، بما يضمن وضوح الإجراءات التشغيلية واستمرارية جودة الخدمات المقدمة.</p>
                    </div>
                  </details>

                  <FormField control={form.control} name="termsConfirmed" render={({ field }) => (
                    <FormItem className="flex items-start gap-3 p-4 border rounded-xl bg-slate-50">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <div><FormLabel className="text-gray-700 leading-relaxed font-medium">أوافق على تقديم الاستشارات التشغيلية المرتبطة بطلبات منصة GSS ضمن الإطار التشغيلي المعتمد للمنصة.</FormLabel><FormMessage /></div>
                    </FormItem>
                  )} />

                  <div className="pt-2 flex justify-end">
                    <Button type="submit" className="min-w-[180px] h-12 text-base font-bold bg-secondary hover:bg-secondary/90 text-primary" disabled={registerMutation.isPending} data-testid="btn-submit-consultant">
                      {registerMutation.isPending ? "جاري الإرسال..." : "تأكيد الانضمام"}
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
