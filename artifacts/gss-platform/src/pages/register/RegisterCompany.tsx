import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRegisterCompany } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Building2, ArrowLeft, Users, Layers, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const schema = z.object({
  companyName: z.string().min(2, "الاسم مطلوب"),
  commercialRegister: z.string().optional(),
  city: z.string().min(2, "المدينة مطلوبة"),
  contactName: z.string().min(2, "اسم المسؤول مطلوب"),
  phone: z.string().min(9, "رقم الجوال غير صالح"),
  email: z.string().email("بريد إلكتروني غير صالح"),
  collaborationModel: z.string().min(1, "يرجى تحديد نموذج التعاون"),
  authorizationConfirmed: z.boolean().refine(val => val === true, "يجب تأكيد التفويض"),
  agreementConfirmed: z.boolean().refine(val => val === true, "يجب الموافقة على الاتفاقية"),
});

const STEPS_TOTAL = 2;

export default function RegisterCompany() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const registerMutation = useRegisterCompany();
  const [phase, setPhase] = useState<"intro" | "form" | "success">("intro");
  const [step, setStep] = useState(1);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: "",
      commercialRegister: "",
      city: "",
      contactName: "",
      phone: "",
      email: "",
      collaborationModel: "on-demand",
      authorizationConfirmed: false,
      agreementConfirmed: false,
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    registerMutation.mutate(
      { data: { ...data, requestedServices: [] } },
      {
        onSuccess: () => {
          setPhase("success");
        },
        onError: () => {
          toast({ variant: "destructive", title: "حدث خطأ", description: "لم نتمكن من إتمام التسجيل، يرجى المحاولة مرة أخرى." });
        }
      }
    );
  };

  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full text-center"
        >
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Building2 size={40} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ابدأ بتنظيم عمليات منشأتك التشغيلية
          </h1>
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

          <Button
            size="lg"
            className="h-14 px-12 text-lg font-bold"
            onClick={() => setPhase("form")}
            data-testid="btn-start-company-registration"
          >
            ابدأ التسجيل
            <ArrowLeft className="mr-2" size={20} />
          </Button>
        </motion.div>
      </div>
    );
  }

  if (phase === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full text-center"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            تم استلام طلب تسجيل منشأتكم بنجاح
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            سيقوم فريق العمليات في GSS بمراجعة بياناتكم وتحديد نموذج التشغيل المناسب لكم، وسيتم إرسال الاتفاقية التشغيلية إلى البريد الإلكتروني للمسؤول المسجل لتوقيعها وختمها وإعادة رفعها عبر المنصة لاستكمال تفعيل الحساب.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 text-right">
            <p className="text-amber-800 font-semibold text-sm mb-1">الخطوة التالية:</p>
            <p className="text-amber-700 text-sm leading-relaxed">
              ستصلك الاتفاقية التشغيلية على بريدك الإلكتروني. قم بتوقيعها وختمها وإعادة رفعها لاستكمال تفعيل حساب منشأتكم.
            </p>
          </div>
          <Button
            size="lg"
            className="h-12 px-10 text-base font-bold"
            onClick={() => setLocation("/dashboard/company")}
            data-testid="btn-go-dashboard"
          >
            الانتقال إلى لوحة الطلبات
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">تسجيل منشأة جديدة</h2>
            <span className="text-sm text-gray-500">{step} / {STEPS_TOTAL}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${(step / STEPS_TOTAL) * 100}%` }}
            />
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-4">
                <h3 className="text-xl font-bold text-gray-800 border-b pb-3">بيانات المنشأة</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="companyName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم المنشأة <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="commercialRegister" render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم السجل التجاري <span className="text-gray-400 text-xs">(اختياري)</span></FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem>
                    <FormLabel>المدينة <span className="text-red-500">*</span></FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="pt-4 flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setPhase("intro")}>السابق</Button>
                  <Button
                    type="button"
                    onClick={async () => {
                      const valid = await form.trigger(["companyName", "city"]);
                      if (valid) setStep(2);
                    }}
                  >
                    التالي
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-4">
                <h3 className="text-xl font-bold text-gray-800 border-b pb-3">بيانات مسؤول التواصل</h3>
                <p className="text-gray-500 text-sm -mt-4">
                  يرجى إدخال بيانات المسؤول المعني بالتنسيق التشغيلي مع منصة GSS، وسيتم استخدامها لإرسال الاتفاقية والتواصل بخصوص الطلبات.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="contactName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم الكامل <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الجوال <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input dir="ltr" placeholder="05xxxxxxxx" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني <span className="text-red-500">*</span></FormLabel>
                    <FormControl><Input dir="ltr" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Authorization checkboxes */}
                <div className="space-y-3 pt-2">
                  <FormField control={form.control} name="authorizationConfirmed" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 p-4 border rounded-xl bg-slate-50">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <div className="leading-relaxed">
                        <FormLabel className="font-medium text-gray-700">
                          أقر بأنني مفوض من قبل المنشأة بتسجيل بياناتها والتنسيق مع منصة GSS بخصوص الخدمات التشغيلية.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="agreementConfirmed" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 p-4 border rounded-xl bg-slate-50">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <div className="leading-relaxed">
                        <FormLabel className="font-medium text-gray-700">
                          أوافق على استلام الاتفاقية التشغيلية الخاصة بمنصة GSS وتوقيعها وختمها من قبل المنشأة وإعادة رفعها عبر المنصة لاستكمال إجراءات التفعيل.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )} />
                </div>

                {/* Fees Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm">
                  <p className="font-bold text-blue-900 mb-2">آلية رسوم الخدمة في منصة GSS</p>
                  <ul className="space-y-1 text-blue-800">
                    <li>• في الخدمات حسب الطلب: تتحمل المنشأة رسوم إدارة التشغيل فقط دون أي عمولات على أسعار الموردين.</li>
                    <li>• في الاشتراك التشغيلي: يشمل متابعة مستمرة وتقارير دورية وإدارة حساب مخصصة، ويتم تحديد الرسوم بعد دراسة الاحتياجات.</li>
                    <li>• في المشاريع الكبيرة: تُحدَّد نسبة إدارة المشروع مسبقًا قبل التنفيذ.</li>
                  </ul>
                </div>

                <div className="pt-2 flex justify-between gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>السابق</Button>
                  <Button type="submit" disabled={registerMutation.isPending} data-testid="btn-submit-company">
                    {registerMutation.isPending ? "جاري الإرسال..." : "إرسال الطلب"}
                  </Button>
                </div>
              </div>
            )}

          </form>
        </Form>
      </div>
    </div>
  );
}
