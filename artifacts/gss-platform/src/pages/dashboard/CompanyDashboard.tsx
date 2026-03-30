import { useGetCompanyDashboard, getGetCompanyDashboardQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, CheckCircle2, Clock, Package } from "lucide-react";

export default function CompanyDashboard() {
  const { data, isLoading, error } = useGetCompanyDashboard({
    query: {
      queryKey: getGetCompanyDashboardQueryKey()
    }
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error || !data) {
    return <div className="p-8 text-center text-red-500">حدث خطأ أثناء تحميل البيانات</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة تحكم المنشأة</h1>
          <p className="text-gray-500">نظرة عامة على حالة الطلبات والعمليات</p>
        </div>
      </div>

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
