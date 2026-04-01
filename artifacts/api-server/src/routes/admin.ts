import { Router, type IRouter, type Request, type Response } from "express";
import { desc, eq, count, and, isNull, or } from "drizzle-orm";
import { db } from "@workspace/db";
import {
  companyRegistrationsTable,
  vendorRegistrationsTable,
  consultantRegistrationsTable,
  contactMessagesTable,
  serviceRequestsTable,
  ticketNotesTable,
  usersTable,
} from "@workspace/db";
import { authenticate, requireRole } from "../middlewares/authenticate.js";
import type { AuthPayload } from "../middlewares/authenticate.js";

const router: IRouter = Router();

const adminAuth   = [authenticate, requireRole("admin", "staff")];
const adminOnly   = [authenticate, requireRole("admin")];

// Helper: for staff, filter to assigned records only; for admin, show all
function assignedFilter(auth: AuthPayload, table: any) {
  return auth.role === "admin" ? undefined : eq(table.assignedTo, auth.userId);
}

// ── Stats ──────────────────────────────────────────────────────────────────
router.get("/admin/stats", ...adminAuth, async (req: Request, res: Response): Promise<void> => {
  const auth = req.auth!;
  if (auth.role === "admin") {
    const [companies]   = await db.select({ count: count() }).from(companyRegistrationsTable);
    const [vendors]     = await db.select({ count: count() }).from(vendorRegistrationsTable);
    const [consultants] = await db.select({ count: count() }).from(consultantRegistrationsTable);
    const [contacts]    = await db.select({ count: count() }).from(contactMessagesTable);
    const [requests]    = await db.select({ count: count() }).from(serviceRequestsTable);
    res.json({ companies: companies.count, vendors: vendors.count, consultants: consultants.count, contacts: contacts.count, serviceRequests: requests.count });
  } else {
    // Staff: only their assigned counts
    const uid = auth.userId;
    const [companies]   = await db.select({ count: count() }).from(companyRegistrationsTable).where(eq(companyRegistrationsTable.assignedTo, uid));
    const [vendors]     = await db.select({ count: count() }).from(vendorRegistrationsTable).where(eq(vendorRegistrationsTable.assignedTo, uid));
    const [consultants] = await db.select({ count: count() }).from(consultantRegistrationsTable).where(eq(consultantRegistrationsTable.assignedTo, uid));
    const [contacts]    = await db.select({ count: count() }).from(contactMessagesTable).where(eq(contactMessagesTable.assignedTo, uid));
    const [requests]    = await db.select({ count: count() }).from(serviceRequestsTable).where(eq(serviceRequestsTable.assignedTo, uid));
    res.json({ companies: companies.count, vendors: vendors.count, consultants: consultants.count, contacts: contacts.count, serviceRequests: requests.count });
  }
});

// ── Staff Users list (for assignment dropdowns) ────────────────────────────
router.get("/admin/staff-list", ...adminAuth, async (_req: Request, res: Response): Promise<void> => {
  const staff = await db
    .select({ id: usersTable.id, name: usersTable.name, email: usersTable.email, role: usersTable.role })
    .from(usersTable)
    .where(and(eq(usersTable.isActive, true), or(eq(usersTable.role, "staff"), eq(usersTable.role, "admin"))));
  res.json(staff);
});

// ── Generic assignment endpoint ────────────────────────────────────────────
router.patch("/admin/assign/:type/:id", ...adminOnly, async (req: Request, res: Response): Promise<void> => {
  const { type, id } = req.params;
  const { assignedTo } = req.body as { assignedTo: number | null };
  const numId = Number(id);
  const tableMap: Record<string, any> = {
    company: companyRegistrationsTable,
    vendor: vendorRegistrationsTable,
    consultant: consultantRegistrationsTable,
    contact: contactMessagesTable,
    service: serviceRequestsTable,
  };
  const table = tableMap[type];
  if (!table) { res.status(400).json({ error: "Invalid type" }); return; }
  await db.update(table).set({ assignedTo: assignedTo ?? null }).where(eq(table.id, numId));
  req.log.info({ type, id: numId, assignedTo }, "Request assigned");
  res.json({ success: true });
});

// ── Ticket Notes ───────────────────────────────────────────────────────────
router.get("/admin/notes/:type/:id", ...adminAuth, async (req: Request, res: Response): Promise<void> => {
  const { type, id } = req.params;
  const notes = await db
    .select({
      id: ticketNotesTable.id,
      note: ticketNotesTable.note,
      isInternal: ticketNotesTable.isInternal,
      createdAt: ticketNotesTable.createdAt,
      userName: usersTable.name,
      userRole: usersTable.role,
    })
    .from(ticketNotesTable)
    .leftJoin(usersTable, eq(ticketNotesTable.userId, usersTable.id))
    .where(and(eq(ticketNotesTable.entityType, type), eq(ticketNotesTable.entityId, Number(id))))
    .orderBy(ticketNotesTable.createdAt);
  res.json(notes);
});

router.post("/admin/notes/:type/:id", ...adminAuth, async (req: Request, res: Response): Promise<void> => {
  const { type, id } = req.params;
  const { note, isInternal = true } = req.body as { note: string; isInternal?: boolean };
  if (!note?.trim()) { res.status(400).json({ error: "الملاحظة لا يمكن أن تكون فارغة" }); return; }
  const [created] = await db.insert(ticketNotesTable).values({
    entityType: type,
    entityId: Number(id),
    userId: req.auth!.userId,
    note: note.trim(),
    isInternal,
  }).returning();
  res.status(201).json(created);
});

// ── Companies ──────────────────────────────────────────────────────────────
router.get("/admin/companies", ...adminAuth, async (req: Request, res: Response): Promise<void> => {
  const auth = req.auth!;
  const query = db
    .select({
      ...companyRegistrationsTable,
      assignedToName: usersTable.name,
    })
    .from(companyRegistrationsTable)
    .leftJoin(usersTable, eq(companyRegistrationsTable.assignedTo, usersTable.id))
    .orderBy(desc(companyRegistrationsTable.createdAt));
  const filter = auth.role === "admin" ? undefined : eq(companyRegistrationsTable.assignedTo, auth.userId);
  const results = filter ? await query.where(filter) : await query;
  res.json(results);
});

router.patch("/admin/companies/:id/status", ...adminAuth, async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const { status, adminNotes } = req.body as { status: string; adminNotes?: string };
  if (!id || !status) { res.status(400).json({ error: "id and status required" }); return; }
  await db.update(companyRegistrationsTable).set({ status, ...(adminNotes !== undefined ? { adminNotes } : {}) }).where(eq(companyRegistrationsTable.id, id));
  res.json({ success: true });
});

// ── Vendors ────────────────────────────────────────────────────────────────
router.get("/admin/vendors", ...adminAuth, async (req: Request, res: Response): Promise<void> => {
  const auth = req.auth!;
  const query = db
    .select({ ...vendorRegistrationsTable, assignedToName: usersTable.name })
    .from(vendorRegistrationsTable)
    .leftJoin(usersTable, eq(vendorRegistrationsTable.assignedTo, usersTable.id))
    .orderBy(desc(vendorRegistrationsTable.createdAt));
  const filter = auth.role === "admin" ? undefined : eq(vendorRegistrationsTable.assignedTo, auth.userId);
  const results = filter ? await query.where(filter) : await query;
  res.json(results);
});

router.patch("/admin/vendors/:id/status", ...adminAuth, async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const { status, adminNotes } = req.body as { status: string; adminNotes?: string };
  if (!id || !status) { res.status(400).json({ error: "id and status required" }); return; }
  await db.update(vendorRegistrationsTable).set({ status, ...(adminNotes !== undefined ? { adminNotes } : {}) }).where(eq(vendorRegistrationsTable.id, id));
  res.json({ success: true });
});

// ── Consultants ────────────────────────────────────────────────────────────
router.get("/admin/consultants", ...adminAuth, async (req: Request, res: Response): Promise<void> => {
  const auth = req.auth!;
  const query = db
    .select({ ...consultantRegistrationsTable, assignedToName: usersTable.name })
    .from(consultantRegistrationsTable)
    .leftJoin(usersTable, eq(consultantRegistrationsTable.assignedTo, usersTable.id))
    .orderBy(desc(consultantRegistrationsTable.createdAt));
  const filter = auth.role === "admin" ? undefined : eq(consultantRegistrationsTable.assignedTo, auth.userId);
  const results = filter ? await query.where(filter) : await query;
  res.json(results);
});

router.patch("/admin/consultants/:id/status", ...adminAuth, async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const { status, adminNotes } = req.body as { status: string; adminNotes?: string };
  if (!id || !status) { res.status(400).json({ error: "id and status required" }); return; }
  await db.update(consultantRegistrationsTable).set({ status, ...(adminNotes !== undefined ? { adminNotes } : {}) }).where(eq(consultantRegistrationsTable.id, id));
  res.json({ success: true });
});

// ── Contact Messages ───────────────────────────────────────────────────────
router.get("/admin/contacts", ...adminAuth, async (req: Request, res: Response): Promise<void> => {
  const auth = req.auth!;
  const query = db
    .select({ ...contactMessagesTable, assignedToName: usersTable.name })
    .from(contactMessagesTable)
    .leftJoin(usersTable, eq(contactMessagesTable.assignedTo, usersTable.id))
    .orderBy(desc(contactMessagesTable.createdAt));
  const filter = auth.role === "admin" ? undefined : eq(contactMessagesTable.assignedTo, auth.userId);
  const results = filter ? await query.where(filter) : await query;
  res.json(results);
});

router.patch("/admin/contacts/:id/status", ...adminAuth, async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const { status, adminNotes } = req.body as { status: string; adminNotes?: string };
  if (!id || !status) { res.status(400).json({ error: "id and status required" }); return; }
  await db.update(contactMessagesTable).set({ status, ...(adminNotes !== undefined ? { adminNotes } : {}) }).where(eq(contactMessagesTable.id, id));
  res.json({ success: true });
});

// ── Service Requests ───────────────────────────────────────────────────────
router.get("/admin/service-requests", ...adminAuth, async (req: Request, res: Response): Promise<void> => {
  const auth = req.auth!;
  const query = db
    .select({ ...serviceRequestsTable, assignedToName: usersTable.name })
    .from(serviceRequestsTable)
    .leftJoin(usersTable, eq(serviceRequestsTable.assignedTo, usersTable.id))
    .orderBy(desc(serviceRequestsTable.createdAt));
  const filter = auth.role === "admin" ? undefined : eq(serviceRequestsTable.assignedTo, auth.userId);
  const results = filter ? await query.where(filter) : await query;
  res.json(results);
});

router.patch("/admin/service-requests/:id/status", ...adminAuth, async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const { status } = req.body as { status: string };
  if (!id || !status) { res.status(400).json({ error: "id and status required" }); return; }
  await db.update(serviceRequestsTable).set({ status }).where(eq(serviceRequestsTable.id, id));
  res.json({ success: true });
});

export default router;
