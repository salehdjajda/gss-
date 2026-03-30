import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, Lightbulb, TrendingUp, Handshake } from "lucide-react";

export default function Partners() {
  return (
    <div className="pb-24">
      <section className="bg-primary py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">شركاء النجاح (المستشارون)</h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            استثمر خبرتك وعلاقاتك وحقق عوائد مجزية من خلال الانضمام كشريك نجاح ومستشار تشغيلي.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">من هو شريك النجاح؟</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                شريك النجاح هو مستشار أو خبير لديه شبكة علاقات واسعة مع منشآت أو موردين، أو يمتلك خبرة عميقة في إدارة العمليات.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                في GSS، نؤمن بأن الخبرة لها ثمن. لذلك صممنا برنامج شركاء النجاح لمكافأة المستشارين الذين يساهمون في نمو شبكة المنصة سواء بإضافة منشآت جديدة أو موردين نوعيين.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="bg-slate-50 p-6 rounded-2xl">
                  <Users className="text-secondary mb-4" size={32} />
                  <h4 className="font-bold text-gray-900 mb-2">توسيع الشبكة</h4>
                  <p className="text-sm text-gray-500">ربط المنشآت والموردين بالمنصة.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl">
                  <Lightbulb className="text-secondary mb-4" size={32} />
                  <h4 className="font-bold text-gray-900 mb-2">استشارات متخصصة</h4>
                  <p className="text-sm text-gray-500">تقديم رؤى لتحسين العمليات.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-50 p-6 rounded-2xl">
                  <TrendingUp className="text-secondary mb-4" size={32} />
                  <h4 className="font-bold text-gray-900 mb-2">عوائد مستمرة</h4>
                  <p className="text-sm text-gray-500">نسبة من العقود التي تساهم بها.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl">
                  <Handshake className="text-secondary mb-4" size={32} />
                  <h4 className="font-bold text-gray-900 mb-2">شراكة استراتيجية</h4>
                  <p className="text-sm text-gray-500">النمو مع منصة رائدة.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 rounded-3xl p-10 lg:p-16 text-center border border-primary/10">
            <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-6">كيف تبدأ كشريك نجاح؟</h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-10">
              <div>
                <div className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 shadow-sm">1</div>
                <h4 className="font-bold text-gray-900 mb-2">سجل كمستشار</h4>
                <p className="text-sm text-gray-600">املأ نموذج التسجيل ووضح خبراتك ومجال مساهمتك.</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 shadow-sm">2</div>
                <h4 className="font-bold text-gray-900 mb-2">الاعتماد والاتفاقية</h4>
                <p className="text-sm text-gray-600">نوقع اتفاقية تحدد آلية العمل ونسبة العوائد بوضوح.</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 shadow-sm">3</div>
                <h4 className="font-bold text-gray-900 mb-2">ابدأ المساهمة</h4>
                <p className="text-sm text-gray-600">وجه عملائك للمنصة وتابع عوائدك عبر لوحة التحكم الخاصة بك.</p>
              </div>
            </div>
            <Link href="/register/consultant">
              <Button size="lg" className="h-14 px-10 text-lg font-bold">
                انضم كشريك نجاح
              </Button>
            </Link>
          </div>
          
        </div>
      </section>
    </div>
  );
}
