import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@assets/image_1774909317242.png";

const mainLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/companies", label: "للمنشآت" },
  { href: "/services", label: "الخدمات" },
  { href: "/how-it-works", label: "آلية العمل" },
  { href: "/pricing", label: "نموذج الرسوم" },
  { href: "/contact", label: "تواصل معنا" },
];

const joinLinks = [
  { href: "/register/vendor", label: "انضم كمورد / فني", icon: "🔧" },
  { href: "/register/consultant", label: "انضم كشريك نجاح", icon: "🤝" },
];

export function Navbar() {
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

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[68px] items-center gap-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" data-testid="link-logo">
            <div className="overflow-hidden" style={{ height: "42px", width: "210px" }}>
              <img
                src={logoImg}
                alt="GSS"
                style={{ height: "136px", width: "auto", marginTop: "-47px" }}
              />
            </div>
          </Link>

          {/* Desktop main links */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  location === link.href
                    ? "text-primary bg-primary/8 font-semibold"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                }`}
                data-testid={`link-nav-${link.href}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {/* Join dropdown */}
            <div className="relative" ref={joinRef}>
              <button
                onClick={() => setIsJoinOpen(!isJoinOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-primary hover:bg-gray-50 transition-colors"
              >
                انضم إلى المنصة
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

            {/* Primary CTA */}
            <Link href="/register/company">
              <Button
                className="bg-secondary hover:bg-secondary/90 text-primary font-bold px-5 h-10 text-sm rounded-xl shadow-sm"
                data-testid="button-register-nav"
              >
                سجّل منشأتك
              </Button>
            </Link>
          </div>

          {/* Mobile: CTA + Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <Link href="/register/company">
              <Button
                size="sm"
                className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-xs px-4 h-9 rounded-xl"
                data-testid="button-register-nav-mobile"
              >
                سجّل منشأتك
              </Button>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-primary p-2"
              data-testid="button-mobile-menu"
            >
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
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    location === link.href
                      ? "text-primary bg-primary/8 font-semibold"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                  data-testid={`link-mobile-nav-${link.href}`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Divider */}
              <div className="border-t border-gray-100 my-3" />
              <p className="text-xs text-gray-400 font-medium px-4 pb-1">انضم إلى المنصة</p>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
