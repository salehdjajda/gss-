import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRegisterVendor } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Wrench, ArrowLeft, Banknote, Network, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const schema = z.object({
  vendorType: z.string().min(1, "نوع المورد مطلوب"),
  name: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(9, "رقم الجوال غير صالح"),
  email: z.string().email("بريد إلكتروني غير صالح"),
  serviceScope: z.string().min(1, "نطاق العمل مطلوب"),
  dataConfirmed: z.boolean().refine(val => val === true, "يجب تأكيد صحة البيانات"),
});

export default function RegisterVendor() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const registerMutation = useRegisterVendor();
  const [phase, setPhase] = useState<"intro" | "form" | "success">("intro");

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      vendorType: "",
      name: "",
      phone: "",
      email: "",
      serviceScope: "",
      dataConfirmed: false,
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    registerMutation.mutate(
      { data: { ...data, services: [] } },
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
            <Wrench size={40} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            انضم إلى شبكة الموردين المعتمدين لدى منصة GSS
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            يمكنكم استقبال طلبات تشغيلية مباشرة من الشركات والمنشآت ضمن شبكة الموردين المعتمدين لدى المنصة دون فرض أي عمولات على الخدمات التشغيلية اليومية.
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

          <Button
            size="lg"
            className="h-14 px-12 text-lg font-bold"
            onClick={() => setPhase("form")}
            data-testid="btn-start-vendor-registration"
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
            تم استلام طلبكم بنجاح
          </h2>
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
          <Button
            size="lg"
            className="h-12 px-10 text-base font-bold"
            onClick={() => setLocation("/dashboard/vendor")}
            data-testid="btn-go-vendor-dashboard"
          >
            الانتقال إلى لوحة التحكم
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">الانضمام كـ مورد معتمد</h2>
          <p className="text-gray-500">أكمل البيانات التالية للبدء في استقبال طلبات العمل</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <FormField control={form.control} name="vendorType" render={({ field }) => (
              <FormItem>
                <FormLabel>نوع مقدم الخدمة <span className="text-red-500">*</span></FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="اختر النوع" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="company">شركة</SelectItem>
                    <SelectItem value="establishment">مؤسسة</SelectItem>
                    <SelectItem value="freelancer">فني مستقل</SelectItem>
                    <SelectItem value="professional">مختص مهني</SelectItem>
                    <SelectItem value="contractor">مقاول فرد</SelectItem>
                    <SelectItem value="other">أخرى</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>الاسم الكامل / اسم الشركة <span className="text-red-500">*</span></FormLabel>
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

            <FormField control={form.control} name="serviceScope" render={({ field }) => (
              <FormItem>
                <FormLabel>نطاق العمل الجغرافي <span className="text-red-500">*</span></FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="اختر النطاق" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="single-city">مدينة واحدة</SelectItem>
                    <SelectItem value="multiple-cities">عدة مدن</SelectItem>
                    <SelectItem value="all">جميع مناطق المملكة</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="dataConfirmed" render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 p-4 border rounded-xl bg-slate-50">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <div className="leading-relaxed">
                  <FormLabel className="font-medium text-gray-700">
                    أقر بصحة البيانات المدخلة وموافقتي على التسجيل ضمن شبكة الموردين المعتمدين لمنصة GSS.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )} />

            <div className="pt-2 flex justify-between gap-3">
              <Button type="button" variant="outline" onClick={() => setPhase("intro")}>السابق</Button>
              <Button type="submit" className="min-w-[160px]" disabled={registerMutation.isPending} data-testid="btn-submit-vendor">
                {registerMutation.isPending ? "جاري الإرسال..." : "إرسال طلب الاعتماد"}
              </Button>
            </div>

          </form>
        </Form>
      </div>
    </div>
  );
}
