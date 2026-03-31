import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Video, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  organizationName: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

const MEETING_PLATFORMS = [
  {
    id: "teams",
    label: "Microsoft Teams",
    labelAr: "Microsoft Teams",
    icon: "🟦",
    color: "border-blue-200 hover:border-blue-400 bg-blue-50",
    activeColor: "border-blue-500 bg-blue-100",
  },
  {
    id: "meet",
    label: "Google Meet",
    labelAr: "Google Meet",
    icon: "🟩",
    color: "border-green-200 hover:border-green-400 bg-green-50",
    activeColor: "border-green-500 bg-green-100",
  },
  {
    id: "zoom",
    label: "Zoom",
    labelAr: "Zoom",
    icon: "🟦",
    color: "border-sky-200 hover:border-sky-400 bg-sky-50",
    activeColor: "border-sky-500 bg-sky-100",
  },
  {
    id: "webex",
    label: "Cisco Webex",
    labelAr: "Cisco Webex",
    icon: "🟧",
    color: "border-orange-200 hover:border-orange-400 bg-orange-50",
    activeColor: "border-orange-500 bg-orange-100",
  },
];

export default function Contact() {
  const { lang } = useLanguage();
  const ar = lang === "ar";
  const { toast } = useToast();
  const contactMutation = useSubmitContact();
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", jobTitle: "", organizationName: "", subject: "", message: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    contactMutation.mutate(
      { data: { name: values.name, email: values.email, phone: values.phone, subject: values.subject, message: values.message } },
      {
        onSuccess: () => {
          toast({
            title: ar ? "تم إرسال رسالتك بنجاح" : "Message sent successfully",
            description: ar
              ? "سيقوم فريقنا بالتواصل معك في أقرب وقت ممكن."
              : "Our team will reach out to you as soon as possible.",
          });
          form.reset();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: ar ? "حدث خطأ" : "Error",
            description: ar
              ? "لم نتمكن من إرسال رسالتك. يرجى المحاولة مرة أخرى."
              : "We couldn't send your message. Please try again.",
          });
        },
      }
    );
  };

  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId);
  };

  const handleMeetingRequest = () => {
    if (!selectedPlatform) return;
    const platform = MEETING_PLATFORMS.find(p => p.id === selectedPlatform);
    toast({
      title: ar ? "تم استلام طلب الاجتماع" : "Meeting Request Received",
      description: ar
        ? `سيتواصل معكم فريق GSS لتحديد موعد الاجتماع عبر ${platform?.labelAr}.`
        : `The GSS team will contact you to schedule the meeting via ${platform?.label}.`,
    });
    setMeetingOpen(false);
    setSelectedPlatform(null);
  };

  return (
    <div className="pb-24">
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

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16">

          {/* Left: Contact Info + Meeting */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {ar ? "معلومات التواصل" : "Contact Information"}
            </h2>

            <div className="space-y-6 mb-12">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 ml-4">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{ar ? "رقم الجوال" : "Mobile"}</h4>
                  <p className="text-gray-600" dir="ltr">+966 59 598 0004</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 ml-4">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{ar ? "البريد الإلكتروني" : "Email"}</h4>
                  <p className="text-gray-600">info@gss-platform.sa</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 ml-4">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{ar ? "المكتب الرئيسي" : "Headquarters"}</h4>
                  <p className="text-gray-600">{ar ? "جدة، المملكة العربية السعودية" : "Jeddah, Saudi Arabia"}</p>
                </div>
              </div>
            </div>

            {/* Meeting Section */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <Video size={22} className="text-primary" />
                <h3 className="font-bold text-xl">
                  {ar ? "هل ترغب في تحديد اجتماع؟" : "Would you like to schedule a meeting?"}
                </h3>
              </div>
              <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                {ar
                  ? "يمكنك حجز موعد لاجتماع افتراضي مع أحد مستشارينا لمناقشة احتياجات منشأتك."
                  : "You can book a virtual meeting with one of our consultants to discuss your facility's needs."}
              </p>

              {!meetingOpen ? (
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => setMeetingOpen(true)}
                >
                  {ar ? "طلب اجتماع افتراضي" : "Request a Virtual Meeting"}
                </Button>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-gray-700">
                    {ar ? "اختر منصة الاجتماع المفضلة لديكم:" : "Choose your preferred meeting platform:"}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {MEETING_PLATFORMS.map((platform) => (
                      <button
                        key={platform.id}
                        type="button"
                        onClick={() => handlePlatformSelect(platform.id)}
                        className={`rounded-xl border-2 p-4 text-sm font-semibold transition-all flex items-center gap-2 ${
                          selectedPlatform === platform.id
                            ? platform.activeColor + " shadow-sm"
                            : platform.color
                        }`}
                      >
                        <span className="text-lg">{platform.icon}</span>
                        <span className="text-gray-800">{platform.label}</span>
                        {selectedPlatform === platform.id && (
                          <CheckCircle2 size={14} className="text-green-600 mr-auto flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>

                  {selectedPlatform && (
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {ar
                        ? `✓ تم اختيار ${MEETING_PLATFORMS.find(p => p.id === selectedPlatform)?.labelAr}. سيتواصل معكم فريقنا لتأكيد الموعد.`
                        : `✓ Selected ${MEETING_PLATFORMS.find(p => p.id === selectedPlatform)?.label}. Our team will contact you to confirm the time.`}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <Button
                      onClick={handleMeetingRequest}
                      disabled={!selectedPlatform}
                      className="flex-1 font-bold"
                      size="sm"
                    >
                      {ar ? "تأكيد الطلب" : "Confirm Request"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setMeetingOpen(false); setSelectedPlatform(null); }}
                      className="text-gray-500"
                    >
                      {ar ? "إلغاء" : "Cancel"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {ar ? "أرسل رسالة" : "Send a Message"}
            </h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{ar ? "الاسم الكامل" : "Full Name"} <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder={ar ? "أدخل اسمك" : "Enter your name"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{ar ? "المنصب الوظيفي" : "Job Title"}</FormLabel>
                        <FormControl>
                          <Input placeholder={ar ? "مثال: مدير العمليات" : "e.g. Operations Manager"} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organizationName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{ar ? "اسم المنشأة / فرد" : "Company / Individual"}</FormLabel>
                        <FormControl>
                          <Input placeholder={ar ? "اسم الشركة أو 'فرد'" : "Company name or 'Individual'"} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{ar ? "البريد الإلكتروني" : "Email"} <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="example@domain.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{ar ? "رقم الجوال" : "Mobile"}</FormLabel>
                        <FormControl>
                          <Input placeholder="05xxxxxxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{ar ? "الموضوع" : "Subject"} <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder={ar ? "سبب التواصل" : "Reason for contacting"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{ar ? "الرسالة" : "Message"} <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={ar ? "كيف يمكننا مساعدتك؟" : "How can we help you?"}
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-bold"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending
                    ? (ar ? "جاري الإرسال..." : "Sending...")
                    : (ar ? "إرسال الرسالة" : "Send Message")}
                </Button>
              </form>
            </Form>
          </div>

        </div>
      </section>
    </div>
  );
}
