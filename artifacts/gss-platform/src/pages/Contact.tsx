import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

export default function Contact() {
  const { lang } = useLanguage();
  const ar = lang === "ar";
  const { toast } = useToast();
  const contactMutation = useSubmitContact();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    contactMutation.mutate(
      { data: values },
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
                  <h4 className="font-bold text-gray-900 mb-1">{ar ? "رقم الهاتف" : "Phone"}</h4>
                  <p className="text-gray-600" dir="ltr">+966 50 000 0000</p>
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
                  <p className="text-gray-600">{ar ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia"}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-xl mb-4">
                {ar ? "هل ترغب في تحديد اجتماع؟" : "Would you like to schedule a meeting?"}
              </h3>
              <p className="text-gray-600 mb-6">
                {ar
                  ? "يمكنك حجز موعد لاجتماع افتراضي مع أحد مستشارينا لمناقشة احتياجات منشأتك."
                  : "You can book a virtual meeting with one of our consultants to discuss your facility's needs."}
              </p>
              <Button variant="outline" className="w-full">
                {ar ? "طلب اجتماع افتراضي" : "Request a Virtual Meeting"}
              </Button>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {ar ? "أرسل رسالة" : "Send a Message"}
            </h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{ar ? "الاسم الكامل" : "Full Name"}</FormLabel>
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{ar ? "البريد الإلكتروني" : "Email"}</FormLabel>
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
                        <FormLabel>{ar ? "رقم الجوال (اختياري)" : "Phone (optional)"}</FormLabel>
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
                      <FormLabel>{ar ? "الموضوع" : "Subject"}</FormLabel>
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
                      <FormLabel>{ar ? "الرسالة" : "Message"}</FormLabel>
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
