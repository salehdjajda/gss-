import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import {
  companyRegistrationsTable,
  vendorRegistrationsTable,
  consultantRegistrationsTable,
} from "@workspace/db";
import {
  RegisterCompanyBody,
  RegisterVendorBody,
  RegisterConsultantBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/registrations/company", async (req, res): Promise<void> => {
  const parsed = RegisterCompanyBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const [record] = await db
    .insert(companyRegistrationsTable)
    .values({
      companyName: data.companyName,
      commercialRegister: data.commercialRegister ?? null,
      city: data.city,
      address: data.address ?? null,
      branchCount: data.branchCount ?? null,
      activityType: data.activityType ?? null,
      contactName: data.contactName,
      jobTitle: data.jobTitle ?? null,
      department: data.department ?? null,
      phone: data.phone,
      email: data.email,
      authorizationConfirmed: data.authorizationConfirmed ?? false,
      agreementConfirmed: data.agreementConfirmed ?? false,
      requestedServices: data.requestedServices
        ? data.requestedServices.join(",")
        : null,
      currentVendors: data.currentVendors ?? null,
      operationVolume: data.operationVolume ?? null,
      collaborationModel: data.collaborationModel,
    })
    .returning();

  req.log.info({ id: record.id }, "Company registration created");
  res.status(201).json({
    success: true,
    message: "تم تسجيل المنشأة بنجاح. سيتواصل معكم فريق GSS قريباً.",
    id: record.id,
  });
});

router.post("/registrations/vendor", async (req, res): Promise<void> => {
  const parsed = RegisterVendorBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const [record] = await db
    .insert(vendorRegistrationsTable)
    .values({
      vendorType: data.vendorType,
      name: data.name,
      phone: data.phone,
      email: data.email,
      services: data.services ? data.services.join(",") : null,
      serviceScope: data.serviceScope,
      financialModelAccepted: data.financialModelAccepted ?? false,
    })
    .returning();

  req.log.info({ id: record.id }, "Vendor registration created");
  res.status(201).json({
    success: true,
    message: "تم تسجيلك في شبكة الموردين المعتمدين. سنتواصل معك قريباً.",
    id: record.id,
  });
});

router.post("/registrations/consultant", async (req, res): Promise<void> => {
  const parsed = RegisterConsultantBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const [record] = await db
    .insert(consultantRegistrationsTable)
    .values({
      name: data.name,
      city: data.city,
      phone: data.phone,
      email: data.email,
      expertiseArea: data.expertiseArea,
      contributionType: data.contributionType ?? null,
      yearsOfExperience: data.yearsOfExperience ?? null,
      revenueModelAccepted: data.revenueModelAccepted ?? false,
    })
    .returning();

  req.log.info({ id: record.id }, "Consultant registration created");
  res.status(201).json({
    success: true,
    message: "تم تسجيلك كشريك نجاح. سيتواصل معك فريق GSS قريباً.",
    id: record.id,
  });
});

export default router;
