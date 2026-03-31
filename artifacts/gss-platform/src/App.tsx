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

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 bg-background text-foreground">
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

          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <IndividualAuthProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </IndividualAuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
