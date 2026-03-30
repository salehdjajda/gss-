import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegisterVendor } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const schema = z.object({
  vendorType: z.string().min(1, "نوع المورد مطلوب"),
  name: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(9, "رقم الجوال غير صالح"),
  email: z.string().email("بريد إلكتروني غير صالح"),
  serviceScope: z.string().min(1, "نطاق العمل مطلوب"),
});

export default function RegisterVendor() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const registerMutation = useRegisterVendor();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      vendorType: "",
      name: "",
      phone: "",
      email: "",
      serviceScope: "",
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    registerMutation.mutate(
      { data: { ...data, services: [] } },
      {
        onSuccess: () => {
          toast({ title: "تم تقديم الطلب بنجاح", description: "سنقوم بمراجعة طلبك وتحويلك للوحة التحكم..." });
          setTimeout(() => setLocation("/dashboard/vendor"), 1500);
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">الانضمام كـ مورد معتمد</h2>
          <p className="text-gray-500">أكمل البيانات التالية للبدء في استقبال طلبات العمل</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <FormField control={form.control} name="vendorType" render={({ field }) => (
              <FormItem>
                <FormLabel>نوع مقدم الخدمة</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="اختر النوع" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="company">شركة صيانة/تشغيل</SelectItem>
                    <SelectItem value="establishment">مؤسسة مقاولات</SelectItem>
                    <SelectItem value="freelancer">فني مستقل</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>الاسم (أو اسم الشركة)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel>رقم الجوال</FormLabel><FormControl><Input dir="ltr" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>البريد الإلكتروني</FormLabel><FormControl><Input dir="ltr" {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <FormField control={form.control} name="serviceScope" render={({ field }) => (
              <FormItem>
                <FormLabel>نطاق العمل الجغرافي</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="اختر النطاق" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="riyadh">الرياض فقط</SelectItem>
                    <SelectItem value="central">المنطقة الوسطى</SelectItem>
                    <SelectItem value="all">كافة مناطق المملكة</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <div className="pt-6">
              <Button type="submit" className="w-full h-12 text-lg" disabled={registerMutation.isPending}>
                {registerMutation.isPending ? "جاري الإرسال..." : "إرسال طلب الاعتماد"}
              </Button>
            </div>

          </form>
        </Form>
      </div>
    </div>
  );
}
