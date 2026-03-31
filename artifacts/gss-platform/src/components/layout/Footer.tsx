import { Link } from "wouter";
import logoImg from "@assets/image_1774909317242.png";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="overflow-hidden" style={{ height: "46px", width: "210px" }}>
                <img src={logoImg} alt="GSS" style={{ height: "140px", width: "auto", marginTop: "-48px", mixBlendMode: "screen", filter: "invert(1) hue-rotate(180deg) brightness(1.15) contrast(1.1)" }} />
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">{t("footer_tagline")}</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer_quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/"           className="hover:text-secondary transition-colors">{t("nav_home")}</Link></li>
              <li><Link href="/companies"  className="hover:text-secondary transition-colors">{t("footer_forCompanies")}</Link></li>
              <li><Link href="/individuals"className="hover:text-secondary transition-colors">{t("nav_individuals")}</Link></li>
              <li><Link href="/vendors"    className="hover:text-secondary transition-colors">{t("footer_vendorNetwork")}</Link></li>
              <li><Link href="/partners"   className="hover:text-secondary transition-colors">{t("footer_partners")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer_help")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/how-it-works" className="hover:text-secondary transition-colors">{t("footer_howItWorks")}</Link></li>
              <li><Link href="/pricing"      className="hover:text-secondary transition-colors">{t("footer_pricing")}</Link></li>
              <li><Link href="/reports"      className="hover:text-secondary transition-colors">{t("footer_reports")}</Link></li>
              <li><Link href="/contact"      className="hover:text-secondary transition-colors">{t("footer_contactUs")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer_register")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/register/company"    className="hover:text-secondary transition-colors">{t("footer_registerCompany")}</Link></li>
              <li><Link href="/register/individual" className="hover:text-secondary transition-colors">{t("footer_registerIndividual")}</Link></li>
              <li><Link href="/register/vendor"     className="hover:text-secondary transition-colors">{t("footer_joinVendor")}</Link></li>
              <li><Link href="/register/consultant" className="hover:text-secondary transition-colors">{t("footer_joinConsultant")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} {t("footer_rights")}</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">{t("footer_privacy")}</span>
            <span className="hover:text-white cursor-pointer transition-colors">{t("footer_terms")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
