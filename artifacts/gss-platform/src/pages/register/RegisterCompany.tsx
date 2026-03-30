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

const schema = z.object({
  companyName: z.string().min(2, "الاسم مطلوب"),
  commercialRegister: z.string().optional(),
  city: z.string().min(2, "المدينة مطلوبة"),
  contactName: z.string().min(2, "اسم المسؤول مطلوب"),
  phone: z.string().min(9, "رقم الجوال غير صالح"),
  email: z.string().email("بريد إلكتروني غير صالح"),
  collaborationModel: z.string().min(1, "يرجى تحديد نموذج التعاون"),
  authorizationConfirmed: z.boolean().refine(val => val === true, "يجب تأكيد التفويض"),
});

export default function RegisterCompany() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const registerMutation = useRegisterCompany();
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
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    registerMutation.mutate(
      { data: { ...data, requestedServices: [] } },
      {
        onSuccess: () => {
          toast({ title: "تم التسجيل بنجاح", description: "جاري تحويلك للوحة التحكم..." });
          setTimeout(() => setLocation("/dashboard/company"), 1500);
        },
        onError: () => {
          toast({ variant: "destructive", title: "حدث خطأ", description: "لم نتمكن من إتمام التسجيل" });
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">تسجيل منشأة جديدة</h2>
          <p className="text-gray-500">الخطوة {step} من 2</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-4">
                <h3 className="text-xl font-bold border-b pb-2">بيانات المنشأة</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="companyName" render={({ field }) => (
                    <FormItem><FormLabel>اسم المنشأة</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="commercialRegister" render={({ field }) => (
                    <FormItem><FormLabel>رقم السجل التجاري (اختياري)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem><FormLabel>المدينة</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <div className="pt-4 flex justify-end">
                  <Button type="button" onClick={() => setStep(2)}>التالي</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-4">
                <h3 className="text-xl font-bold border-b pb-2">بيانات المسؤول ونموذج العمل</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="contactName" render={({ field }) => (
                    <FormItem><FormLabel>اسم المسؤول</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>رقم الجوال</FormLabel><FormControl><Input dir="ltr" placeholder="05xxxxxxxx" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>البريد الإلكتروني</FormLabel><FormControl><Input dir="ltr" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                
                <FormField control={form.control} name="authorizationConfirmed" render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 p-4 border rounded-lg mt-6 bg-slate-50">
                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>أقر بأنني مفوض بتسجيل هذه المنشأة</FormLabel>
                    </div>
                  </FormItem>
                )} />

                <div className="pt-4 flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>السابق</Button>
                  <Button type="submit" disabled={registerMutation.isPending}>
                    {registerMutation.isPending ? "جاري التسجيل..." : "إتمام التسجيل"}
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
