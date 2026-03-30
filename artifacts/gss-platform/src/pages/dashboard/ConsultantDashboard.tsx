import { useGetConsultantDashboard, getGetConsultantDashboardQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet, Briefcase, Activity, CheckCircle2 } from "lucide-react";

export default function ConsultantDashboard() {
  const { data, isLoading, error } = useGetConsultantDashboard({
    query: {
      queryKey: getGetConsultantDashboardQueryKey()
    }
  });

  if (isLoading) return <DashboardSkeleton />;
  if (error || !data) return <div className="p-8 text-center text-red-500">حدث خطأ أثناء تحميل البيانات</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة تحكم المستشار</h1>
        <p className="text-gray-500">متابعة الاستشارات وعوائد الإحالة</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="إجمالي الاستشارات" value={data.totalConsultations} icon={Briefcase} />
        <StatCard title="استشارات نشطة" value={data.activeConsultations} icon={Activity} color="text-blue-500" />
        <Card className="bg-primary text-white border-primary">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-white/80 mb-1">إجمالي العوائد</p>
            <h3 className="text-3xl font-bold">{data.totalEarnings} ر.س</h3>
          </CardContent>
        </Card>
        <Card className="bg-slate-50">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500 mb-1">عوائد معلقة</p>
            <h3 className="text-3xl font-bold text-gray-900">{data.pendingEarnings} ر.س</h3>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>سجل الاستشارات والإحالات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.consultations.map(cons => (
              <div key={cons.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-bold text-gray-900">{cons.title}</h4>
                  <p className="text-sm text-gray-500">ارتباط: {cons.linkedCompany} • {new Date(cons.createdAt).toLocaleDateString('ar-SA')}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <div className="font-bold text-primary">{cons.rewardAmount} ر.س</div>
                  </div>
                  <Badge variant={cons.status === 'completed' ? 'secondary' : 'outline'}>
                    {cons.status === 'active' ? 'قيد العمل' : cons.status === 'completed' ? 'مكتملة' : 'بانتظار الاعتماد'}
                  </Badge>
                </div>
              </div>
            ))}
            {data.consultations.length === 0 && (
              <p className="text-center text-gray-500 py-8">لا يوجد سجل استشارات حالياً</p>
            )}
          </div>
        </CardContent>
      </Card>
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
      <Skeleton className="h-96 w-full" />
    </div>
  );
}
