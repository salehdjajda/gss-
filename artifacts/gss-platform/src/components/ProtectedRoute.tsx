import { useLocation, Redirect } from "wouter";
import { useAuth, type UserRole } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
  redirectTo?: string;
}

/** Wraps a route so only authenticated (and role-matched) users can access it. */
export default function ProtectedRoute({ children, requiredRole, redirectTo = "/login" }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [location] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1E3D]">
        <div className="flex items-center gap-3 text-white">
          <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm text-white/80">جاري التحقق من الهوية...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to={`${redirectTo}?from=${encodeURIComponent(location)}`} />;
  }

  if (requiredRole) {
    const allowed = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!user || !allowed.includes(user.role)) {
      return <Redirect to="/unauthorized" />;
    }
  }

  return <>{children}</>;
}
