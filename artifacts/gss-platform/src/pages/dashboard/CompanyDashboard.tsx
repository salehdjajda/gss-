import { useGetCompanyDashboard, getGetCompanyDashboardQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, CheckCircle2, Clock, Package, PlusCircle, ClipboardList, LogOut } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useCompanyAuth } from "@/contexts/AccountAuthContext";
import { getCompanyRequests, CompanyServiceRequest } from "@/pages/company/RequestServiceCompany";

const STATUS_COLOR: Record<CompanyServiceRequest["status"], string> = {
  pending:     "bg-amber-100 text-amber-700",
  confirmed:   "bg-blue-100 text-blue-700",
  in_progress: "bg-primary/10 text-primary",
  completed:   "bg-green-100 text-green-700",
};
const STATUS_AR: Record<CompanyServiceRequest["status"], string> = {
  pending:     "قيد المراجعة",
  confirmed:   "تم التأكيد",
  in_progress: "جاري التنفيذ",
  completed:   "مكتمل",
};

export default function CompanyDashboard() {
  const { account, isLoggedIn, logout } = useCompanyAuth();
  const { data, isLoading, error } = useGetCompanyDashboard({
    query: {
      queryKey: getGetCompanyDashboardQueryKey()
    }
  });

  const localRequests = account ? getCompanyRequests(account.accountNumber) : [];

  if (!isLoggedIn || !account) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <ClipboardList size={48} className="text-gray-300" />
        <p className="text-gray-600 font-medium">يرجى تسجيل الدخول أولاً</p>
        <Link href="/portal/login?type=company">
          <Button>تسجيل الدخول</Button>
        </Link>
      </div>
    );
  }

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">لوحة تحكم المنشأة</h1>
          <p className="text-gray-500 text-sm">
            <span className="font-mono font-bold text-primary">{account.accountNumber}</span>
            {" · "}{account.name}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/request/company-service">
            <Button className="gap-2 font-bold">
              <PlusCircle size={16} />
              طلب خدمة جديدة
            </Button>
          </Link>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-sm transition-colors"
          >
            <LogOut size={15} />
            خروج
          </button>
        </div>
      </div>

      {/* Local service requests */}
      {localRequests.length > 0 && (
        <div className="mb-8">
          <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
            <ClipboardList size={18} className="text-primary" />
            طلباتي
            <span className="bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {localRequests.length}
            </span>
          </h2>
          <div className="space-y-3">
            {[...localRequests].reverse().map((req) => (
              <div key={req.id} className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold text-gray-900 text-sm">{req.service}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_COLOR[req.status]}`}>
                      {STATUS_AR[req.status]}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs truncate max-w-sm">{req.details}</p>
                  <p className="text-gray-300 text-xs mt-1">{req.submittedAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats from API */}
      {data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="إجمالي الطلبات" value={data.totalRequests} icon={Package} />
            <StatCard title="طلبات نشطة" value={data.activeRequests} icon={Activity} color="text-blue-500" />
            <StatCard title="مكتملة" value={data.completedRequests} icon={CheckCircle2} color="text-green-500" />
            <StatCard title="قيد الانتظار" value={data.pendingRequests} icon={Clock} color="text-orange-500" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>أحدث الطلبات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.recentRequests.map(req => (
                      <div key={req.id} className="flex items-center justify-between p-4 border rounded-xl bg-gray-50/50">
                        <div>
                          <h4 className="font-bold text-gray-900">{req.title}</h4>
                          <p className="text-sm text-gray-500">{req.serviceType} • {new Date(req.createdAt).toLocaleDateString('ar-SA')}</p>
                        </div>
                        <Badge variant={req.status === 'completed' ? 'secondary' : 'outline'}>
                          {req.status === 'active' ? 'نشط' : req.status === 'completed' ? 'مكتمل' : 'قيد الانتظار'}
                        </Badge>
                      </div>
                    ))}
                    {data.recentRequests.length === 0 && (
                      <p className="text-center text-gray-500 py-8">لا توجد طلبات حديثة</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="mb-6 bg-primary text-white border-primary">
                <CardHeader>
                  <CardTitle className="text-white">التوفير الشهري المقدر</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{data.monthlyCostSavings} <span>ريال</span></div>
                  <p className="text-primary-foreground/80 mt-2 text-sm">مقارنة بمتوسط السوق المباشر</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>متوسط تقييم الموردين</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-secondary">{data.vendorRatingsAvg}</div>
                    <div className="text-gray-500 text-sm">من 5.0<br/>بناءً على طلباتك السابقة</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}

      {/* No requests CTA */}
      {localRequests.length === 0 && !data && (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
          <ClipboardList size={48} className="text-gray-200 mx-auto mb-4" />
          <h3 className="font-bold text-gray-800 text-lg mb-2">لا توجد طلبات حتى الآن</h3>
          <p className="text-gray-400 text-sm mb-6">ابدأ بطلب خدمة تشغيلية أو فنية لمنشأتك</p>
          <Link href="/request/company-service">
            <Button className="font-bold gap-2">
              <PlusCircle size={16} />
              أرفع أول طلب
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color = "text-primary" }: any) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl bg-gray-50 ${color}`}>
          <Icon size={24} />
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardSkeleton() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <Skeleton className="h-10 w-48" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => <Skeleton key={i} className="h-28 w-full" />)}
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <Skeleton className="h-96 w-full lg:col-span-2" />
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  );
}
