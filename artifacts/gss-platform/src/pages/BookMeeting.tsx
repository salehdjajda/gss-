import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, Building2, Phone, MapPin, Clock, FileText, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

const meetingSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(9, "رقم الجوال مطلوب"),
  organizationName: z.string().min(2, "اسم المنشأة مطلوب"),
  facilityAddress: z.string().min(5, "عنوان المنشأة مطلوب"),
  preferredDate: z.string().min(1, "التاريخ مطلوب"),
  preferredTime: z.string().min(1, "الوقت مطلوب"),
  meetingPurpose: z.string().min(10, "يرجى توضيح الغرض من الاجتماع"),
  additionalNotes: z.string().optional(),
});

export default function BookMeeting() {
  const { lang } = useLanguage();
  const ar = lang === "ar";
  const { toast } = useToast();
  const contactMutation = useSubmitContact();

  const meetingForm = useForm<z.infer<typeof meetingSchema>>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      name: "", phone: "", organizationName: "", facilityAddress: "",
      preferredDate: "", preferredTime: "", meetingPurpose: "", additionalNotes: "",
    },
  });

  const onSubmit = (values: z.infer<typeof meetingSchema>) => {
    contactMutation.mutate(
      {
        data: {
          name: values.name,
          email: "meeting@request.gss",
          phone: values.phone,
          subject: `طلب اجتماع — ${values.organizationName}`,
          message: `المنشأة: ${values.organizationName}\nالعنوان: ${values.facilityAddress}\nالتاريخ المفضل: ${values.preferredDate} — ${values.preferredTime}\nالغرض: ${values.meetingPurpose}\nملاحظات: ${values.additionalNotes || "—"}`,
        }
      },
      {
        onSuccess: () => {
          toast({
            title: ar ? "تم استلام طلب الاجتماع" : "Meeting Request Received",
            description: ar ? "سيتواصل فريق GSS لتأكيد موعد الزيارة." : "GSS team will contact you to confirm the visit.",
          });
          meetingForm.reset();
        },
        onError: () => toast({ variant: "destructive", title: ar ? "حدث خطأ" : "Error", description: ar ? "لم نتمكن من استلام الطلب." : "Couldn't receive the request." }),
      }
    );
  };

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="bg-primary py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl mb-5">
            <CalendarDays size={26} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {ar ? "احجز موعد اجتماع" : "Book a Meeting"}
          </h1>
          <p className="text-white/80 text-base max-w-xl mx-auto leading-relaxed">
            {ar
              ? "سيزورك فريق GSS في منشأتك ليفهم احتياجاتك، ثم نُرسل لك تصوراً مخصصاً بالباقة والتكلفة الأنسب."
              : "The GSS team will visit your facility to understand your needs, then send you a tailored proposal with the right package and cost."}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">

          {/* Registration notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 mb-8">
            <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-800 text-sm font-bold mb-1">
                {ar ? "شرط إلزامي قبل تعبئة الاستمارة" : "Required Before Filling the Form"}
              </p>
              <p className="text-amber-700 text-xs leading-relaxed">
                {ar
                  ? "يجب أن تكون منشأتك مسجّلة في منصة GSS أولاً حتى نتمكن من الاطلاع على بياناتها والتحضير الجيد للاجتماع معك."
                  : "Your facility must be registered on GSS platform first so we can review its data and prepare well for the meeting."}
              </p>
              <Link
                href="/register/company"
                className="inline-flex items-center gap-1 text-amber-800 font-bold text-xs underline underline-offset-2 mt-2 hover:text-amber-900"
              >
                {ar ? "سجّل منشأتك الآن ←" : "Register your facility now →"}
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-7 md:p-10">
            <Form {...meetingForm}>
              <form onSubmit={meetingForm.handleSubmit(onSubmit)} className="space-y-5">

                {/* Row 1: Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={meetingForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                          <span>{ar ? "الاسم الكامل" : "Full Name"}</span>
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder={ar ? "اسمك الكامل" : "Your full name"} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={meetingForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                          <Phone size={13} />
                          <span>{ar ? "رقم الجوال" : "Mobile"}</span>
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="05xxxxxxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Organization Name */}
                <FormField
                  control={meetingForm.control}
                  name="organizationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                        <Building2 size={13} />
                        <span>{ar ? "اسم المنشأة / الشركة" : "Facility / Company Name"}</span>
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={ar ? "اسم شركتك أو منشأتك" : "Your company or facility name"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address */}
                <FormField
                  control={meetingForm.control}
                  name="facilityAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                        <MapPin size={13} />
                        <span>{ar ? "عنوان المنشأة" : "Facility Address"}</span>
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={ar ? "الحي، الشارع، المدينة" : "Neighborhood, Street, City"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date + Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={meetingForm.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                          <CalendarDays size={13} />
                          <span>{ar ? "التاريخ المفضل" : "Preferred Date"}</span>
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="date" {...field} min={new Date().toISOString().split("T")[0]} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={meetingForm.control}
                    name="preferredTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                          <Clock size={13} />
                          <span>{ar ? "الوقت المفضل" : "Preferred Time"}</span>
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full h-10 border border-input rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="">{ar ? "اختر الوقت..." : "Select time..."}</option>
                            <option value="08:00-09:00">{ar ? "٨:٠٠ صباحاً — ٩:٠٠ صباحاً" : "8:00 AM – 9:00 AM"}</option>
                            <option value="09:00-10:00">{ar ? "٩:٠٠ صباحاً — ١٠:٠٠ صباحاً" : "9:00 AM – 10:00 AM"}</option>
                            <option value="10:00-11:00">{ar ? "١٠:٠٠ صباحاً — ١١:٠٠ صباحاً" : "10:00 AM – 11:00 AM"}</option>
                            <option value="11:00-12:00">{ar ? "١١:٠٠ صباحاً — ١٢:٠٠ ظهراً" : "11:00 AM – 12:00 PM"}</option>
                            <option value="13:00-14:00">{ar ? "١:٠٠ ظهراً — ٢:٠٠ عصراً" : "1:00 PM – 2:00 PM"}</option>
                            <option value="14:00-15:00">{ar ? "٢:٠٠ عصراً — ٣:٠٠ عصراً" : "2:00 PM – 3:00 PM"}</option>
                            <option value="15:00-16:00">{ar ? "٣:٠٠ عصراً — ٤:٠٠ عصراً" : "3:00 PM – 4:00 PM"}</option>
                            <option value="16:00-17:00">{ar ? "٤:٠٠ عصراً — ٥:٠٠ عصراً" : "4:00 PM – 5:00 PM"}</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Meeting Purpose */}
                <FormField
                  control={meetingForm.control}
                  name="meetingPurpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                        <FileText size={13} />
                        <span>{ar ? "الغرض من الاجتماع" : "Purpose of Meeting"}</span>
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={ar
                            ? "مثال: تقييم احتياجات التشغيل، مناقشة عقد الخدمات، الاستفسار عن الباقات..."
                            : "e.g. Assess operational needs, discuss service agreement, inquire about packages..."}
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Additional Notes */}
                <FormField
                  control={meetingForm.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold text-gray-700">
                        {ar ? "ملاحظات إضافية (اختياري)" : "Additional Notes (optional)"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={ar
                            ? "أي تفاصيل أخرى تودّ مشاركتها قبل الزيارة..."
                            : "Any other details you'd like to share before the visit..."}
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-bold gap-2 mt-2"
                  disabled={contactMutation.isPending}
                >
                  <CalendarDays size={17} />
                  {contactMutation.isPending
                    ? (ar ? "جاري الإرسال..." : "Sending...")
                    : (ar ? "إرسال طلب الاجتماع" : "Submit Meeting Request")}
                </Button>

                <p className="text-center text-xs text-gray-400 leading-relaxed pt-1">
                  {ar
                    ? "سيتواصل معك فريق GSS خلال 24 ساعة لتأكيد موعد الزيارة."
                    : "GSS team will contact you within 24 hours to confirm the visit."}
                </p>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}
