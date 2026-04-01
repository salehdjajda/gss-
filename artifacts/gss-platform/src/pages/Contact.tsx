import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, CalendarDays, Building2, Clock, FileText, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

const messageSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  organizationName: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

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

export default function Contact() {
  const { lang } = useLanguage();
  const ar = lang === "ar";
  const { toast } = useToast();
  const contactMutation = useSubmitContact();
  const meetingFormRef = useRef<HTMLDivElement>(null);

  const messageForm = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: { name: "", email: "", phone: "", jobTitle: "", organizationName: "", subject: "", message: "" },
  });

  const meetingForm = useForm<z.infer<typeof meetingSchema>>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      name: "", phone: "", organizationName: "", facilityAddress: "",
      preferredDate: "", preferredTime: "", meetingPurpose: "", additionalNotes: "",
    },
  });

  const onMessageSubmit = (values: z.infer<typeof messageSchema>) => {
    contactMutation.mutate(
      { data: { name: values.name, email: values.email, phone: values.phone, subject: values.subject, message: values.message } },
      {
        onSuccess: () => {
          toast({ title: ar ? "تم إرسال رسالتك بنجاح" : "Message sent", description: ar ? "سيتواصل فريقنا معك قريباً." : "Our team will reach out soon." });
          messageForm.reset();
        },
        onError: () => toast({ variant: "destructive", title: ar ? "حدث خطأ" : "Error", description: ar ? "لم نتمكن من إرسال رسالتك." : "Couldn't send message." }),
      }
    );
  };

  const onMeetingSubmit = (values: z.infer<typeof meetingSchema>) => {
    contactMutation.mutate(
      {
        data: {
          name: values.name,
          email: "meeting@request.gss",
          phone: values.phone,
          subject: `طلب اجتماع ميداني — ${values.organizationName}`,
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

  const scrollToMeeting = () => {
    meetingFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="bg-primary py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {ar ? "تواصل معنا" : "Contact Us"}
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            {ar
              ? "نحن هنا للإجابة على استفساراتك ومساعدتك في إدارة عملياتك."
              : "We're here to answer your questions and help you manage your operations."}
          </p>
        </div>
      </section>

      {/* Contact Info + Message Form */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">

          {/* Left: Contact Info + Visit Card */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {ar ? "معلومات التواصل" : "Contact Information"}
            </h2>

            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-0.5">{ar ? "رقم الجوال" : "Mobile"}</h4>
                  <p className="text-gray-600" dir="ltr">+966 59 598 0004</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-0.5">{ar ? "البريد الإلكتروني" : "Email"}</h4>
                  <p className="text-gray-600">info@gss-platform.sa</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-0.5">{ar ? "المكتب الرئيسي" : "Headquarters"}</h4>
                  <p className="text-gray-600">{ar ? "جدة، المملكة العربية السعودية" : "Jeddah, Saudi Arabia"}</p>
                </div>
              </div>
            </div>

            {/* Field Visit Card */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-900">
                  {ar ? "اطلب اجتماعاً في منشأتك" : "Request a Visit to Your Facility"}
                </h3>
              </div>

              {/* Purpose steps */}
              <div className="space-y-2.5 mb-5">
                {[
                  ar ? "يزورك فريق GSS في منشأتك ويفهم طبيعة شغلك وحجم عملياتك" : "GSS team visits your facility to understand your operations",
                  ar ? "نُحدّد معاً احتياجاتك التشغيلية الفعلية" : "We identify your actual operational needs together",
                  ar ? "نُرسل لك لاحقاً تصوراً مخصصاً مع الباقة الأنسب لك وتكلفتها" : "We send you a tailored proposal with the right package and cost",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm leading-snug">{step}</p>
                  </div>
                ))}
              </div>

              {/* Mandatory registration notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-5 flex gap-2.5">
                <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-800 text-xs font-bold mb-1">
                    {ar ? "شرط إلزامي قبل الحجز" : "Required Before Booking"}
                  </p>
                  <p className="text-amber-700 text-xs leading-relaxed">
                    {ar
                      ? "يجب تسجيل منشأتك في المنصة أولاً. التسجيل يُمكّننا من الاطلاع على بيانات منشأتك مسبقاً لنستعد للاجتماع بشكل أفضل."
                      : "Your facility must be registered on the platform first. Registration lets us review your data in advance for a more productive meeting."}
                  </p>
                  <Link
                    href="/register/company"
                    className="inline-flex items-center gap-1 text-amber-800 font-bold text-xs underline underline-offset-2 mt-1.5 hover:text-amber-900"
                  >
                    {ar ? "سجّل منشأتك الآن ←" : "Register your facility →"}
                  </Link>
                </div>
              </div>

              <button
                type="button"
                onClick={scrollToMeeting}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl px-5 py-3 text-sm transition-colors"
              >
                <CalendarDays size={16} />
                {ar ? "احجز موعد الاجتماع الميداني" : "Book a Field Meeting"}
                <ArrowLeft size={15} className="opacity-70" />
              </button>
            </div>
          </div>

          {/* Right: Send Message Form */}
          <div className="bg-white p-7 md:p-9 rounded-3xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {ar ? "أرسل رسالة" : "Send a Message"}
            </h3>

            <Form {...messageForm}>
              <form onSubmit={messageForm.handleSubmit(onMessageSubmit)} className="space-y-4">
                <FormField
                  control={messageForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{ar ? "الاسم الكامل" : "Full Name"} <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input placeholder={ar ? "أدخل اسمك" : "Enter your name"} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={messageForm.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{ar ? "المنصب الوظيفي" : "Job Title"}</FormLabel>
                        <FormControl><Input placeholder={ar ? "مدير العمليات" : "Operations Manager"} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={messageForm.control}
                    name="organizationName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{ar ? "المنشأة" : "Organization"}</FormLabel>
                        <FormControl><Input placeholder={ar ? "اسم الشركة" : "Company name"} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={messageForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{ar ? "البريد الإلكتروني" : "Email"} <span className="text-red-500">*</span></FormLabel>
                        <FormControl><Input placeholder="example@domain.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={messageForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{ar ? "رقم الجوال" : "Mobile"}</FormLabel>
                        <FormControl><Input placeholder="05xxxxxxxx" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={messageForm.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{ar ? "الموضوع" : "Subject"} <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input placeholder={ar ? "سبب التواصل" : "Reason for contacting"} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={messageForm.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{ar ? "الرسالة" : "Message"} <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Textarea placeholder={ar ? "كيف يمكننا مساعدتك؟" : "How can we help you?"} className="min-h-[110px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-12 text-base font-bold" disabled={contactMutation.isPending}>
                  {contactMutation.isPending ? (ar ? "جاري الإرسال..." : "Sending...") : (ar ? "إرسال الرسالة" : "Send Message")}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* Meeting Form Section */}
      <section ref={meetingFormRef} className="bg-slate-50 border-t border-gray-200 py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-2xl mb-5">
              <CalendarDays size={26} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {ar ? "احجز موعد اجتماع في منشأتك" : "Book a Meeting at Your Facility"}
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
              {ar
                ? "سيزورك فريق GSS ليفهم طبيعة عملك واحتياجاتك التشغيلية، ثم نُرسل لك تصوراً مخصصاً بالباقة والتكلفة الأنسب لك."
                : "The GSS team will visit you to understand your work and operational needs, then send you a tailored proposal with the right package and cost."}
            </p>

            {/* Registration prerequisite banner */}
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-right max-w-lg mx-auto">
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
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-7 md:p-10">
            <Form {...meetingForm}>
              <form onSubmit={meetingForm.handleSubmit(onMeetingSubmit)} className="space-y-5">

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

                {/* Row 2: Organization Name */}
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

                {/* Row 3: Address */}
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

                {/* Row 4: Date + Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={meetingForm.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                          <CalendarDays size={13} />
                          <span>{ar ? "التاريخ المفضل للزيارة" : "Preferred Visit Date"}</span>
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

                {/* Row 5: Meeting Purpose */}
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

                {/* Row 6: Additional Notes */}
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
                  className="w-full h-13 text-base font-bold gap-2 mt-2"
                  disabled={contactMutation.isPending}
                >
                  <CalendarDays size={17} />
                  {contactMutation.isPending
                    ? (ar ? "جاري الإرسال..." : "Sending...")
                    : (ar ? "إرسال طلب الزيارة الميدانية" : "Submit Field Visit Request")}
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
