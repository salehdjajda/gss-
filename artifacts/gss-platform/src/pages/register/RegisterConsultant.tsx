import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegisterConsultant } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  city: z.string().min(2, "المدينة مطلوبة"),
  phone: z.string().min(9, "رقم الجوال غير صالح"),
  email: z.string().email("بريد إلكتروني غير صالح"),
  expertiseArea: z.string().min(2, "مجال الخبرة مطلوب"),
});

export default function RegisterConsultant() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const registerMutation = useRegisterConsultant();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      city: "",
      phone: "",
      email: "",
      expertiseArea: "",
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    registerMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast({ title: "تم الانضمام بنجاح", description: "جاري تحويلك للوحة تحكم المستشار..." });
          setTimeout(() => setLocation("/dashboard/consultant"), 1500);
        },
        onError: () => {
          toast({ variant: "destructive", title: "حدث خطأ", description: "لم نتمكن من إتمام التسجيل" });
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">الانضمام كـ شريك نجاح (مستشار)</h2>
          <p className="text-gray-500">شاركنا خبراتك وحقق عوائد من إحالة الفرص وتطوير العمليات</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>الاسم الكامل</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel>رقم الجوال</FormLabel><FormControl><Input dir="ltr" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>البريد الإلكتروني</FormLabel><FormControl><Input dir="ltr" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <FormField control={form.control} name="city" render={({ field }) => (
              <FormItem><FormLabel>مدينة الإقامة</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <FormField control={form.control} name="expertiseArea" render={({ field }) => (
              <FormItem><FormLabel>مجال الخبرة الأساسي</FormLabel><FormControl><Input placeholder="مثال: إدارة المرافق، استشارات سلاسل الإمداد..." {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <div className="pt-6">
              <Button type="submit" className="w-full h-12 text-lg" disabled={registerMutation.isPending}>
                {registerMutation.isPending ? "جاري الإرسال..." : "تأكيد الانضمام"}
              </Button>
            </div>

          </form>
        </Form>
      </div>
    </div>
  );
}
