import { Link } from "wouter";
import logoImg from "@assets/image_1774909317242.png";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand column */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="overflow-hidden" style={{ height: "46px", width: "210px" }}>
                <img
                  src={logoImg}
                  alt="GSS"
                  style={{
                    height: "140px",
                    width: "auto",
                    marginTop: "-48px",
                    mixBlendMode: "screen",
                    filter: "invert(1) hue-rotate(180deg) brightness(1.15) contrast(1.1)",
                  }}
                />
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
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

        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} منصة GSS. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">سياسة الخصوصية</span>
            <span className="hover:text-white cursor-pointer transition-colors">الشروط والأحكام</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
