import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldCheck, AlertCircle, FileText, Info, CheckCircle2, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Section = ({
  icon,
  iconColor,
  bg,
  border,
  title,
  children,
  delay = 0,
}: {
  icon: React.ReactNode;
  iconColor: string;
  bg: string;
  border: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className={`${bg} ${border} border rounded-2xl p-7`}
  >
    <div className="flex items-start gap-4 mb-4">
      <div className={`w-10 h-10 ${iconColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <h2 className="text-lg font-bold text-gray-900 leading-snug pt-1">{title}</h2>
    </div>
    {children}
  </motion.div>
);

export default function TermsAndConditions() {
  const { lang } = useLanguage();
  const ar = lang === "ar";

  return (
    <div className="pb-24 bg-gray-50">
      {/* Hero */}
      <section className="bg-primary py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-secondary/20 text-secondary font-bold text-sm px-4 py-1.5 rounded-full mb-6">
            {ar ? "الشروط والأحكام" : "Terms & Conditions"}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {ar ? "السياسات التشغيلية والمالية لمنصة GSS" : "GSS Platform Operational & Financial Policies"}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {ar
              ? "إطار قانوني وتشغيلي واضح يحدد حقوق والتزامات جميع الأطراف — المنشآت والموردين ومنصة GSS."
              : "A clear legal and operational framework defining the rights and obligations of all parties — facilities, vendors, and GSS Platform."}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          {/* 1. Binding Order */}
          <Section
            icon={<ShieldCheck size={20} className="text-amber-600" />}
            iconColor="bg-amber-100"
            bg="bg-amber-50"
            border="border-amber-200"
            title={ar ? "اعتماد التكلفة شرط لإلزامية التنفيذ" : "Cost Approval as a Condition for Binding Execution"}
            delay={0}
          >
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              {ar
                ? "لا يُعتبر طلب الخدمة أمر تنفيذ ملزمًا إلا بعد اعتماد التكلفة من الشخص المفوض لدى المنشأة. تُعد الطلبات الصادرة من المستخدمين المفوضين طلبات رسمية ملزمة بعد اعتماد التكلفة، وتتحمل المنشأة مسؤولية الطلبات الصادرة ضمن صلاحيات المستخدمين المسجلين لديها."
                : "A service request is not considered a binding execution order until the cost is approved by the authorized person at the facility. Requests issued by authorized users are considered official binding requests after cost approval, and the facility bears responsibility for all requests issued within the permissions of its registered users."}
            </p>
            <div className="bg-white border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800">
              {ar
                ? "أي طلب تنفيذ لم يُعتمد فيه السعر من الجهة المخولة داخل المنشأة لا يُلزم منصة GSS بالتنفيذ."
                : "Any execution request for which the price has not been approved by the authorized party within the facility does not obligate GSS Platform to proceed with execution."}
            </div>
          </Section>

          {/* 2. Two-Phase Quote */}
          <Section
            icon={<FileText size={20} className="text-primary" />}
            iconColor="bg-primary/10"
            bg="bg-white"
            border="border-slate-200"
            title={ar ? "آلية تقديم عروض الأسعار على مرحلتين" : "Two-Phase Quote Submission Process"}
            delay={0.05}
          >
            <p className="text-gray-600 text-sm leading-relaxed">
              {ar
                ? "تقوم منصة GSS بتقديم عرض تكلفة مبدئي يشمل نطاق العمل والتكلفة التقديرية ومدة التنفيذ — دون تحديد اسم المورد المنفذ في هذه المرحلة. ويتم تزويد المنشأة ببيانات المورد والتفاصيل التنفيذية الكاملة بعد اعتماد التكلفة وإصدار أمر العمل، وذلك لضمان كفاءة التنسيق التشغيلي وحماية جودة التنفيذ."
                : "GSS Platform provides an initial cost proposal covering the scope of work, estimated cost, and execution timeline — without specifying the executing vendor's name at this stage. The facility is provided with complete vendor details and execution specifics only after cost approval and work order issuance, to ensure operational coordination efficiency and execution quality protection."}
            </p>
          </Section>

          {/* 3. Quote Prep Fees */}
          <Section
            icon={<AlertCircle size={20} className="text-amber-600" />}
            iconColor="bg-amber-100"
            bg="bg-amber-50"
            border="border-amber-200"
            title={ar ? "سياسة رسوم إعداد عروض الأسعار" : "Quote Preparation Fee Policy"}
            delay={0.1}
          >
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              {ar
                ? "في الطلبات التشغيلية ضمن نظام الخدمة حسب الطلب، قد يتطلب إعداد عرض التكلفة زيارة ميدانية أو دراسة نطاق العمل أو التنسيق مع الموردين أو إعداد تحليل فني أو مالي. في هذه الحالات، يُعدّ إعداد العرض جزءًا من الخدمة التشغيلية المقدمة، وقد تترتب عليه رسوم خدمة في حال عدم اعتماد التنفيذ."
                : "For operational requests under the Pay Per Request model, quote preparation may require a site visit, scope study, vendor coordination, or technical/financial analysis. In these cases, quote preparation is considered part of the operational service provided, and a service fee may apply if execution is not approved."}
            </p>
            <p className="text-amber-800 text-sm font-medium mb-3">
              {ar
                ? "يتم إشعار المنشأة مسبقًا قبل البدء في إعداد أي عرض يترتب عليه رسوم."
                : "The facility is notified in advance before beginning preparation of any quote that may incur fees."}
            </p>
            <div className="bg-white border border-green-200 rounded-xl px-4 py-3 text-xs text-green-700 flex items-center gap-2">
              <CheckCircle2 size={13} className="text-green-500 flex-shrink-0" />
              {ar
                ? "المنشآت المشتركة في الباقات التشغيلية الشهرية معفاة من رسوم إعداد عروض الأسعار."
                : "Facilities subscribed to monthly operational packages are exempt from quote preparation fees."}
            </div>
          </Section>

          {/* 4. GSS not a financial intermediary */}
          <Section
            icon={<AlertCircle size={20} className="text-red-500" />}
            iconColor="bg-red-50"
            bg="bg-white"
            border="border-red-100"
            title={ar ? "GSS ليست طرفًا ماليًا في عمليات السداد" : "GSS is Not a Financial Party in Payment Transactions"}
            delay={0.15}
          >
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              {ar
                ? "لا تكون منصة GSS طرفًا ماليًا في عمليات السداد بين المنشأة والمورد. يقتصر دور المنصة على إدارة الطلبات التشغيلية والتنسيق والمتابعة حتى إغلاق الخدمة وفق المعايير المعتمدة."
                : "GSS Platform is not a financial party in payment transactions between the facility and the vendor. The platform's role is limited to operational request management, coordination, and follow-up until service closure per approved standards."}
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="font-bold text-gray-800 text-sm mb-1">{ar ? "فاتورة GSS — رسوم الإدارة" : "GSS Invoice — Management Fees"}</p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {ar
                    ? "تُصدر GSS فاتورة منفصلة لرسوم إدارة الخدمة وتنسيقها على دورية شهرية أو حسب العقد."
                    : "GSS issues a separate invoice for service management and coordination fees on a monthly or contract basis."}
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="font-bold text-gray-800 text-sm mb-1">{ar ? "فاتورة المورد — مستقلة" : "Vendor Invoice — Independent"}</p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {ar
                    ? "يتولى المورد مطالبة المنشأة بفاتورته مباشرة وفق الشروط المتفق عليها بينهما."
                    : "The vendor invoices the facility directly according to the agreed terms between them."}
                </p>
              </div>
            </div>
          </Section>

          {/* 5. Vendor payment terms matching */}
          <Section
            icon={<CheckCircle2 size={20} className="text-green-600" />}
            iconColor="bg-green-100"
            bg="bg-green-50"
            border="border-green-200"
            title={ar ? "اختيار المورد وفق سياسة السداد المعتمدة" : "Vendor Selection Based on Approved Payment Policy"}
            delay={0.2}
          >
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {ar
                ? "تقوم منصة GSS باختيار المورد المناسب لكل طلب خدمة بناءً على: طبيعة الخدمة، سرعة التنفيذ، الموقع الجغرافي، مستوى الجودة، وشروط السداد المعتمدة لدى المنشأة."
                : "GSS Platform selects the appropriate vendor for each service request based on: nature of service, execution speed, geographic location, quality level, and the facility's approved payment terms."}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              {ar
                ? "عند اعتماد المنشأة لسياسة سداد محددة (30 أو 60 أو 90 يوم)، يتم ترشيح الموردين القادرين على العمل وفق نفس شروط الدفع. ولا يتم إصدار أمر العمل إلا بعد التأكد من توافق شروط الدفع بين الطرفين."
                : "When a facility adopts a specific payment policy (Net 30, 60, or 90 days), only vendors capable of working under the same payment terms are nominated. A work order is only issued after confirming payment term compatibility between both parties."}
            </p>
          </Section>

          {/* 6. Existing vendors management */}
          <Section
            icon={<Info size={20} className="text-blue-600" />}
            iconColor="bg-blue-100"
            bg="bg-blue-50"
            border="border-blue-100"
            title={ar ? "إدارة الموردين الحاليين لدى المنشأة" : "Management of the Facility's Existing Vendors"}
            delay={0.25}
          >
            <p className="text-gray-600 text-sm leading-relaxed">
              {ar
                ? "في حال رغبت المنشأة بالاستمرار مع مورديها الحاليين، تقوم منصة GSS بإدارة ومتابعة تنفيذ الطلبات التشغيلية معهم وفق نطاق الخدمة المتفق عليه، دون أن تكون طرفًا ماليًا في العلاقة التعاقدية بينهم. تبقى مسؤولية السداد مباشرة بين المنشأة والمورد، بينما يقتصر دور المنصة على التنسيق والمتابعة التشغيلية وإصدار تقارير الإنجاز."
                : "If a facility wishes to continue with its existing vendors, GSS Platform manages and follows up on operational request execution with them according to the agreed service scope — without being a financial party in the contractual relationship between them. Payment responsibility remains directly between the facility and the vendor. The platform's role is limited to operational coordination, follow-up, and completion report issuance."}
            </p>
          </Section>

          {/* 7. Authorized users liability */}
          <Section
            icon={<ShieldCheck size={20} className="text-primary" />}
            iconColor="bg-primary/10"
            bg="bg-white"
            border="border-slate-200"
            title={ar ? "مسؤولية الطلبات الصادرة من المستخدمين المفوضين" : "Liability for Requests Issued by Authorized Users"}
            delay={0.3}
          >
            <p className="text-gray-600 text-sm leading-relaxed">
              {ar
                ? "تُعد الطلبات الصادرة من المستخدمين المفوضين لدى المنشأة طلبات رسمية ملزمة بعد اعتماد التكلفة. تتحمل المنشأة المسؤولية الكاملة عن الطلبات الصادرة ضمن صلاحيات المستخدمين المسجلين لديها، ولا تتحمل منصة GSS مسؤولية أي طلب غير مخوّل صادر من مستخدم لم يتم إبلاغ المنصة بإلغاء صلاحياته."
                : "Requests issued by the facility's authorized users are considered official binding requests after cost approval. The facility bears full responsibility for requests issued within the permissions of its registered users. GSS Platform bears no responsibility for any unauthorized request issued by a user whose permissions were not formally revoked through the platform."}
            </p>
          </Section>

          {/* 8. Payment terms vendor network */}
          <Section
            icon={<FileText size={20} className="text-slate-600" />}
            iconColor="bg-slate-200"
            bg="bg-slate-50"
            border="border-slate-200"
            title={ar ? "سياسة آجال السداد مع شبكة الموردين المعتمدين" : "Payment Schedule Policy with the Certified Vendor Network"}
            delay={0.35}
          >
            <p className="text-gray-600 text-sm leading-relaxed">
              {ar
                ? "تعتمد منصة GSS شبكة موردين معتمدين يتم الاتفاق معهم مسبقًا على شروط السداد وفق سياسات تشغيلية واضحة تشمل مدد سداد مختلفة حسب طبيعة الخدمة ونوع المشروع. وعند استلام طلب خدمة من منشأة مشتركة، تقوم GSS باختيار المورد المناسب بناءً على توافق شروط التنفيذ وآجال السداد المعتمدة. ولا يتم إصدار أمر العمل إلا بعد التأكد من توافق شروط الدفع بين الطرفين."
                : "GSS Platform operates a certified vendor network with pre-agreed payment terms according to clear operational policies covering varying payment schedules based on the nature of the service and project type. When a request is received, GSS selects the appropriate vendor based on alignment between execution terms and approved payment schedules. A work order is only issued after confirming payment term compatibility between both parties."}
            </p>
          </Section>

          {/* 9. Anti-interference policy */}
          <Section
            icon={<ShieldCheck size={20} className="text-primary" />}
            iconColor="bg-primary/10"
            bg="bg-primary/5"
            border="border-primary/20"
            title={ar ? "سياسة منع التداخل الإداري بين الأطراف" : "Anti-Administrative Interference Policy Between Parties"}
            delay={0.4}
          >
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              {ar
                ? "تعتمد منصة GSS نموذج إدارة تشغيل مركزي يهدف إلى تنظيم العلاقة بين الأطراف عبر قناة تنسيق واحدة لضمان وضوح الإجراءات وسلامة التنفيذ وجودة الخدمة."
                : "GSS Platform adopts a centralized operations management model aimed at organizing the relationship between all parties through a single coordination channel to ensure procedural clarity, execution integrity, and service quality."}
            </p>
            <div className="bg-white border border-primary/20 rounded-xl px-4 py-3 text-sm text-gray-700 leading-relaxed">
              {ar
                ? "في حال إجراء أي تنسيق مباشر خارج إطار المنصة بخصوص خدمة محالة عبرها دون إشعارها، فإن المنصة لا تتحمل أي مسؤولية تشغيلية أو فنية أو مالية عن نتائج ذلك الإجراء."
                : "If any direct coordination is made outside the platform's framework regarding a service routed through it without notifying the platform, the platform bears no operational, technical, or financial responsibility for the outcomes of such action."}
            </div>
          </Section>

        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white border-t border-gray-100 text-center">
        <p className="text-gray-500 mb-6 text-base max-w-xl mx-auto">
          {ar
            ? "للاطلاع على الدورة التشغيلية الكاملة أو البدء في تسجيل منشأتكم:"
            : "To review the full operational cycle or start registering your facility:"}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/how-it-works">
            <Button size="lg" variant="outline" className="h-12 px-8 font-bold border-primary text-primary hover:bg-primary hover:text-white">
              {ar ? "آلية العمل" : "How It Works"}
            </Button>
          </Link>
          <Link href="/register/company">
            <Button size="lg" className="h-12 px-8 font-bold">
              {ar ? "سجّل منشأتكم" : "Register Your Facility"} <ArrowLeft className="mr-2" size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
