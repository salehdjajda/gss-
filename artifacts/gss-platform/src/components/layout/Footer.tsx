import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-secondary text-white font-bold flex items-center justify-center rounded-lg">
                GSS
              </div>
              <span className="font-bold text-xl text-white">General Support</span>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              المنصة الموثوقة لإدارة العمليات التشغيلية للمنشآت في المملكة العربية السعودية. نوفر لك الوقت والجهد في إدارة موردينك.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-secondary transition-colors">الرئيسية</Link></li>
              <li><Link href="/companies" className="hover:text-secondary transition-colors">للمنشآت</Link></li>
              <li><Link href="/vendors" className="hover:text-secondary transition-colors">شبكة الموردين</Link></li>
              <li><Link href="/partners" className="hover:text-secondary transition-colors">شركاء النجاح</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">المساعدة</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/how-it-works" className="hover:text-secondary transition-colors">آلية العمل</Link></li>
              <li><Link href="/pricing" className="hover:text-secondary transition-colors">نموذج الرسوم</Link></li>
              <li><Link href="/reports" className="hover:text-secondary transition-colors">التقارير التشغيلية</Link></li>
              <li><Link href="/contact" className="hover:text-secondary transition-colors">تواصل معنا</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">التسجيل والدخول</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/register/company" className="hover:text-secondary transition-colors">تسجيل منشأة جديدة</Link></li>
              <li><Link href="/register/vendor" className="hover:text-secondary transition-colors">انضم كمورد</Link></li>
              <li><Link href="/register/consultant" className="hover:text-secondary transition-colors">انضم كمستشار</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
          <p>© {new Date().getFullYear()} منصة GSS. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">سياسة الخصوصية</span>
            <span className="hover:text-white cursor-pointer">الشروط والأحكام</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
