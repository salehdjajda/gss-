import { Router, type IRouter } from "express";
import { desc, eq, count } from "drizzle-orm";
import { db } from "@workspace/db";
import {
  companyRegistrationsTable,
  vendorRegistrationsTable,
  consultantRegistrationsTable,
  contactMessagesTable,
  serviceRequestsTable,
} from "@workspace/db";

const router: IRouter = Router();

// ── Stats summary ──────────────────────────────────────────────────────────
router.get("/admin/stats", async (_req, res): Promise<void> => {
  const [companies] = await db.select({ count: count() }).from(companyRegistrationsTable);
  const [vendors] = await db.select({ count: count() }).from(vendorRegistrationsTable);
  const [consultants] = await db.select({ count: count() }).from(consultantRegistrationsTable);
  const [contacts] = await db.select({ count: count() }).from(contactMessagesTable);
  const [requests] = await db.select({ count: count() }).from(serviceRequestsTable);

  res.json({
    companies: companies.count,
    vendors: vendors.count,
    consultants: consultants.count,
    contacts: contacts.count,
    serviceRequests: requests.count,
  });
});

// ── Companies ──────────────────────────────────────────────────────────────
router.get("/admin/companies", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(companyRegistrationsTable)
    .orderBy(desc(companyRegistrationsTable.createdAt));
  res.json(rows);
});

router.patch("/admin/companies/:id/status", async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const { status, adminNotes } = req.body as { status: string; adminNotes?: string };
  if (!id || !status) { res.status(400).json({ error: "id and status required" }); return; }
  await db
    .update(companyRegistrationsTable)
    .set({ status, ...(adminNotes !== undefined ? { adminNotes } : {}) })
    .where(eq(companyRegistrationsTable.id, id));
  res.json({ success: true });
});

// ── Vendors ────────────────────────────────────────────────────────────────
router.get("/admin/vendors", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(vendorRegistrationsTable)
    .orderBy(desc(vendorRegistrationsTable.createdAt));
  res.json(rows);
});

router.patch("/admin/vendors/:id/status", async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const { status, adminNotes } = req.body as { status: string; adminNotes?: string };
  if (!id || !status) { res.status(400).json({ error: "id and status required" }); return; }
  await db
    .update(vendorRegistrationsTable)
    .set({ status, ...(adminNotes !== undefined ? { adminNotes } : {}) })
    .where(eq(vendorRegistrationsTable.id, id));
  res.json({ success: true });
});

// ── Consultants ────────────────────────────────────────────────────────────
router.get("/admin/consultants", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(consultantRegistrationsTable)
    .orderBy(desc(consultantRegistrationsTable.createdAt));
  res.json(rows);
});

router.patch("/admin/consultants/:id/status", async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const { status, adminNotes } = req.body as { status: string; adminNotes?: string };
  if (!id || !status) { res.status(400).json({ error: "id and status required" }); return; }
  await db
    .update(consultantRegistrationsTable)
    .set({ status, ...(adminNotes !== undefined ? { adminNotes } : {}) })
    .where(eq(consultantRegistrationsTable.id, id));
  res.json({ success: true });
});

// ── Contact Messages / Support ─────────────────────────────────────────────
router.get("/admin/contacts", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(contactMessagesTable)
    .orderBy(desc(contactMessagesTable.createdAt));
  res.json(rows);
});

router.patch("/admin/contacts/:id/status", async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const { status, adminNotes } = req.body as { status: string; adminNotes?: string };
  if (!id || !status) { res.status(400).json({ error: "id and status required" }); return; }
  await db
    .update(contactMessagesTable)
    .set({ status, ...(adminNotes !== undefined ? { adminNotes } : {}) })
    .where(eq(contactMessagesTable.id, id));
  res.json({ success: true });
});

// ── Service Requests ───────────────────────────────────────────────────────
router.get("/admin/service-requests", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(serviceRequestsTable)
    .orderBy(desc(serviceRequestsTable.createdAt));
  res.json(rows);
});

router.patch("/admin/service-requests/:id/status", async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const { status } = req.body as { status: string };
  if (!id || !status) { res.status(400).json({ error: "id and status required" }); return; }
  await db
    .update(serviceRequestsTable)
    .set({ status })
    .where(eq(serviceRequestsTable.id, id));
  res.json({ success: true });
});

export default router;
