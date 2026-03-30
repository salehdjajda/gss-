import { Router, type IRouter } from "express";
import {
  GetCompanyDashboardResponse,
  GetVendorDashboardResponse,
  GetConsultantDashboardResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/dashboard/company", async (_req, res): Promise<void> => {
  const data = GetCompanyDashboardResponse.parse({
    totalRequests: 24,
    activeRequests: 5,
    completedRequests: 17,
    pendingRequests: 2,
    monthlyCostSavings: 18500,
    vendorRatingsAvg: 4.6,
    recentRequests: [
      {
        id: 1,
        title: "صيانة مكيفات مبنى الإدارة",
        status: "active",
        serviceType: "الصيانة",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 2,
        title: "خدمة تنظيف أسبوعية للمستودعات",
        status: "completed",
        serviceType: "النظافة",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 3,
        title: "نقل معدات لفرع الرياض",
        status: "pending",
        serviceType: "النقل",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 4,
        title: "تجديد ترخيص النشاط التجاري",
        status: "completed",
        serviceType: "التراخيص الحكومية",
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 5,
        title: "توفير عمالة مؤقتة لفعالية الشركة",
        status: "active",
        serviceType: "العمالة",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  });
  res.json(data);
});

router.get("/dashboard/vendor", async (_req, res): Promise<void> => {
  const data = GetVendorDashboardResponse.parse({
    totalAssigned: 31,
    activeJobs: 4,
    completedJobs: 27,
    pendingQuotes: 2,
    performanceScore: 4.7,
    assignedRequests: [
      {
        id: 10,
        title: "صيانة مكيفات مبنى الإدارة",
        companyName: "مجموعة الخليج للتطوير",
        status: "active",
        serviceType: "الصيانة",
        assignedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 11,
        title: "توريد وتركيب إضاءة LED",
        companyName: "شركة النور للتجارة",
        status: "pending_quote",
        serviceType: "الكهرباء",
        assignedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 12,
        title: "صيانة دورية لمولدات الكهرباء",
        companyName: "مجمع سحاب التجاري",
        status: "active",
        serviceType: "الصيانة",
        assignedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  });
  res.json(data);
});

router.get("/dashboard/consultant", async (_req, res): Promise<void> => {
  const data = GetConsultantDashboardResponse.parse({
    totalConsultations: 12,
    activeConsultations: 3,
    completedConsultations: 9,
    totalEarnings: 8750,
    pendingEarnings: 2200,
    consultations: [
      {
        id: 20,
        title: "ترشيح مورد صيانة معتمد لمجمع تجاري",
        status: "active",
        linkedCompany: "مجمع الشروق التجاري",
        rewardAmount: 850,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 21,
        title: "توصية بحل تشغيلي لإدارة النقل",
        status: "completed",
        linkedCompany: "مصنع البراعم",
        rewardAmount: 1200,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 22,
        title: "مراجعة عقود الموردين وتحسين التكاليف",
        status: "active",
        linkedCompany: "مجموعة الأصيل",
        rewardAmount: 1350,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  });
  res.json(data);
});

export default router;
