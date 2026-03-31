import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useEffect } from "react";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

// Context
import { LanguageProvider } from "@/contexts/LanguageContext";
import { IndividualAuthProvider } from "@/contexts/IndividualAuthContext";
import { AdminAuthProvider, useAdminAuth } from "@/contexts/AdminAuthContext";

// Page Imports
import Home from "@/pages/Home";
import Companies from "@/pages/Companies";
import Individuals from "@/pages/Individuals";
import HowItWorks from "@/pages/HowItWorks";
import Reports from "@/pages/Reports";
import Pricing from "@/pages/Pricing";
import Vendors from "@/pages/Vendors";
import Partners from "@/pages/Partners";
import Contact from "@/pages/Contact";
import Register from "@/pages/Register";
import Services from "@/pages/Services";

// Register Forms
import RegisterCompany from "@/pages/register/RegisterCompany";
import RegisterVendor from "@/pages/register/RegisterVendor";
import RegisterConsultant from "@/pages/register/RegisterConsultant";
import RegisterIndividual from "@/pages/register/RegisterIndividual";

// Dashboards
import CompanyDashboard from "@/pages/dashboard/CompanyDashboard";
import VendorDashboard from "@/pages/dashboard/VendorDashboard";
import ConsultantDashboard from "@/pages/dashboard/ConsultantDashboard";
import IndividualDashboard from "@/pages/dashboard/IndividualDashboard";

// Individual Service Request
import RequestService from "@/pages/individuals/RequestService";

// Admin
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";

const queryClient = new QueryClient();

function AdminGuard() {
  const { isAdminAuthenticated } = useAdminAuth();
  const [, setLocation] = useLocation();
  useEffect(() => {
    if (!isAdminAuthenticated) setLocation("/admin");
  }, [isAdminAuthenticated]);
  if (!isAdminAuthenticated) return null;
  return <AdminDashboard />;
}

function Router() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  return (
    <div className={isAdminRoute ? "" : "flex flex-col min-h-[100dvh]"}>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <main className={isAdminRoute ? "" : "flex-1 bg-background text-foreground"}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/companies" component={Companies} />
          <Route path="/individuals" component={Individuals} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/reports" component={Reports} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/vendors" component={Vendors} />
          <Route path="/partners" component={Partners} />
          <Route path="/services" component={Services} />
          <Route path="/contact" component={Contact} />
          <Route path="/register" component={Register} />

          <Route path="/register/company" component={RegisterCompany} />
          <Route path="/register/vendor" component={RegisterVendor} />
          <Route path="/register/consultant" component={RegisterConsultant} />
          <Route path="/register/individual" component={RegisterIndividual} />

          <Route path="/dashboard/company" component={CompanyDashboard} />
          <Route path="/dashboard/vendor" component={VendorDashboard} />
          <Route path="/dashboard/consultant" component={ConsultantDashboard} />
          <Route path="/dashboard/individual" component={IndividualDashboard} />
          <Route path="/request/service" component={RequestService} />

          {/* Admin Routes */}
          <Route path="/admin" component={AdminLogin} />
          <Route path="/admin/dashboard" component={AdminGuard} />

          <Route component={NotFound} />
        </Switch>
      </main>
      {!isAdminRoute && <Footer />}

      {/* Floating WhatsApp Button */}
      {!isAdminRoute && (
        <a
          href="https://wa.me/966595980004"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          title="تواصل عبر واتساب"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <IndividualAuthProvider>
          <AdminAuthProvider>
            <TooltipProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
              </WouterRouter>
              <Toaster />
            </TooltipProvider>
          </AdminAuthProvider>
        </IndividualAuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
