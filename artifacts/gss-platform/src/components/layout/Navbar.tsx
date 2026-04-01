import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Globe, ShieldCheck } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@assets/image_1774909317242.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIndividualAuth } from "@/contexts/IndividualAuthContext";

export function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const { isLoggedIn, account } = useIndividualAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const joinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (joinRef.current && !joinRef.current.contains(e.target as Node)) {
        setIsJoinOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mainLinks = [
    { href: "/",            label: t("nav_home") },
    { href: "/companies",   label: t("nav_companies") },
    { href: "/individuals", label: t("nav_individuals") },
    { href: "/vendors",     label: t("nav_vendors") },
    { href: "/services",    label: t("nav_services") },
    { href: "/how-it-works",label: t("nav_howItWorks") },
    { href: "/pricing",     label: t("nav_pricing") },
    { href: "/contact",     label: t("nav_contact") },
  ];

  const joinLinks = [
    { href: "/register/vendor",     label: t("nav_joinVendor"),  icon: "🔧" },
    { href: "/register/consultant", label: t("nav_joinPartner"), icon: "🤝" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[68px] items-center gap-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" data-testid="link-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="overflow-hidden" style={{ height: "42px", width: "210px" }}>
              <img src={logoImg} alt="GSS" style={{ height: "136px", width: "auto", marginTop: "-47px" }} />
            </div>
          </Link>

          {/* Desktop main links */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  location === link.href
                    ? "text-primary bg-primary/8 font-semibold"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                } ${link.href === "/individuals" ? "text-secondary font-semibold" : ""}`}
                data-testid={`link-nav-${link.href}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-primary hover:bg-gray-50 transition-colors"
              title={lang === "ar" ? "Switch to English" : "التبديل للعربية"}
            >
              <Globe size={15} />
              {lang === "ar" ? "EN" : "عر"}
            </button>

            {/* Individual Account Badge (when logged in) */}
            {isLoggedIn && account && (
              <Link href="/dashboard/individual"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/8 border border-primary/20 hover:bg-primary/12 transition-colors">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-black">
                  {account.name.charAt(0)}
                </div>
                <div className="leading-none">
                  <p className="text-xs font-bold text-primary">{account.name.split(" ")[0]}</p>
                  <p className="text-[10px] text-gray-400 font-mono">{account.accountNumber}</p>
                </div>
              </Link>
            )}

            {/* Join dropdown */}
            <div className="relative" ref={joinRef}>
              <button
                onClick={() => setIsJoinOpen(!isJoinOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-primary hover:bg-gray-50 transition-colors"
              >
                {t("nav_joinPlatform")}
                <ChevronDown size={15} className={`transition-transform duration-200 ${isJoinOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {isJoinOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50"
                  >
                    {joinLinks.map((jl) => (
                      <Link
                        key={jl.href}
                        href={jl.href}
                        onClick={() => setIsJoinOpen(false)}
                        className="flex items-center gap-3 px-5 py-4 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                      >
                        <span className="text-base">{jl.icon}</span>
                        {jl.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Primary CTA — Team Login */}
            <Link href="/login">
              <Button
                className="bg-secondary hover:bg-secondary/90 text-primary font-bold px-5 h-10 text-sm rounded-xl shadow-sm flex items-center gap-2"
                data-testid="button-team-login-nav"
              >
                <ShieldCheck size={16} />
                {lang === "ar" ? "دخول الفريق" : "Team Login"}
              </Button>
            </Link>
          </div>

          {/* Mobile: Lang + CTA + Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="text-gray-500 hover:text-primary p-2 text-xs font-bold"
            >
              {lang === "ar" ? "EN" : "عر"}
            </button>
            <Link href="/login">
              <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-xs px-4 h-9 rounded-xl flex items-center gap-1.5" data-testid="button-team-login-nav-mobile">
                <ShieldCheck size={13} />
                {lang === "ar" ? "دخول الفريق" : "Team Login"}
              </Button>
            </Link>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-primary p-2" data-testid="button-mobile-menu">
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    location === link.href ? "text-primary bg-primary/8 font-semibold" : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  } ${link.href === "/individuals" ? "text-secondary" : ""}`}
                  data-testid={`link-mobile-nav-${link.href}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 my-3" />
              <p className="text-xs text-gray-400 font-medium px-4 pb-1">{t("nav_joinPlatform")}</p>
              {joinLinks.map((jl) => (
                <Link
                  key={jl.href}
                  href={jl.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
                  data-testid={`link-mobile-join-${jl.href}`}
                >
                  <span>{jl.icon}</span>
                  {jl.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 my-3" />
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-primary hover:bg-gray-50 transition-colors"
              >
                <ShieldCheck size={16} />
                {lang === "ar" ? "دخول الفريق الداخلي" : "Team Login"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
