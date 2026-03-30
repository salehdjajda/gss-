import { useGetVendorDashboard, getGetVendorDashboardQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, CheckCircle2, Clock, Package, Star } from "lucide-react";

export default function VendorDashboard() {
  const { data, isLoading, error } = useGetVendorDashboard({
    query: {
      queryKey: getGetVendorDashboardQueryKey()
    }
  });

  if (isLoading) return <DashboardSkeleton />;
  if (error || !data) return <div className="p-8 text-center text-red-500">حدث خطأ أثناء تحميل البيانات</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة تحكم المورد</h1>
        <p className="text-gray-500">متابعة الطلبات المسندة وتقييم الأداء</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="إجمالي المسند" value={data.totalAssigned} icon={Package} />
        <StatCard title="أعمال نشطة" value={data.activeJobs} icon={Activity} color="text-blue-500" />
        <StatCard title="أعمال مكتملة" value={data.completedJobs} icon={CheckCircle2} color="text-green-500" />
        <StatCard title="عروض أسعار معلقة" value={data.pendingQuotes} icon={Clock} color="text-orange-500" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>الطلبات المسندة إليك</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.assignedRequests.map(req => (
                  <div key={req.id} className="flex items-center justify-between p-4 border rounded-xl bg-gray-50/50">
                    <div>
                      <h4 className="font-bold text-gray-900">{req.title}</h4>
                      <p className="text-sm text-gray-500">{req.companyName} • {req.serviceType}</p>
                    </div>
                    <Badge variant={req.status === 'active' ? 'default' : 'outline'}>
                      {req.status === 'active' ? 'جاري العمل' : 'بانتظار عرض السعر'}
                    </Badge>
                  </div>
                ))}
                {data.assignedRequests.length === 0 && (
                  <p className="text-center text-gray-500 py-8">لا توجد طلبات مسندة حالياً</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>مؤشر الأداء والجودة</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-6">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-secondary mb-4">
                <span className="text-4xl font-bold">{data.performanceScore}%</span>
              </div>
              <p className="text-gray-500 text-sm">أداؤك ممتاز! استمر لزيادة فرص إسناد الطلبات.</p>
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
