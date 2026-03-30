import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@assets/image_1774909317242.png";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/companies", label: "للمنشآت" },
  { href: "/services", label: "الخدمات" },
  { href: "/how-it-works", label: "آلية العمل" },
  { href: "/pricing", label: "نموذج الرسوم" },
  { href: "/vendors", label: "شبكة الموردين" },
  { href: "/partners", label: "شركاء النجاح" },
  { href: "/contact", label: "تواصل معنا" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
              {/* Logo — cropped to remove whitespace */}
              <div
                className="overflow-hidden flex-shrink-0"
                style={{ width: "130px", height: "52px" }}
              >
                <img
                  src={logoImg}
                  alt="GSS"
                  style={{
                    width: "300px",
                    height: "auto",
                    marginTop: "-38px",
                    marginLeft: "-10px",
                  }}
                />
              </div>
              {/* Services label */}
              <div className="hidden sm:flex flex-col leading-tight border-r border-gray-200 pr-3">
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">General Support</span>
                <span className="text-base font-black text-primary leading-none">Services</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1 space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location === link.href
                    ? "text-primary bg-primary/5"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                }`}
                data-testid={`link-nav-${link.href}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/register">
              <Button className="font-bold" data-testid="button-register-nav">التسجيل في المنصة</Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-primary p-2"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 bg-white"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${
                    location === link.href
                      ? "text-primary bg-primary/5"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                  data-testid={`link-mobile-nav-${link.href}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full font-bold" data-testid="button-register-mobile">
                    التسجيل في المنصة
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
