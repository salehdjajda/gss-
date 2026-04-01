import { Router, type IRouter, type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db";
import { authenticate, signToken, requireRole } from "../middlewares/authenticate.js";
import { z } from "zod";

const router: IRouter = Router();

// Rate limit: max 10 login attempts per 15 min per IP
const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "عدد محاولات الدخول تجاوز الحد المسموح. حاول مرة أخرى بعد 15 دقيقة." },
  standardHeaders: true,
  legacyHeaders: false,
});

const LoginSchema = z.object({
  email: z.string().email("بريد إلكتروني غير صالح"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

// ── POST /auth/login ───────────────────────────────────────────────────────
router.post("/auth/login", loginRateLimit, async (req: Request, res: Response): Promise<void> => {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message || "بيانات غير صالحة" });
    return;
  }

  const { email, password } = parsed.data;

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email.toLowerCase().trim()))
    .limit(1);

  // Constant-time comparison to prevent timing attacks
  const validPassword = user
    ? await bcrypt.compare(password, user.passwordHash)
    : await bcrypt.compare(password, "$2b$12$invalidhashfortimingprotection00000000000000000");

  if (!user || !validPassword || !user.isActive) {
    res.status(401).json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
    return;
  }

  // Update last login
  await db.update(usersTable).set({ lastLoginAt: new Date() }).where(eq(usersTable.id, user.id));

  const token = signToken({
    userId: user.id,
    email: user.email,
    role: user.role as "admin" | "staff" | "user",
    name: user.name,
  });

  req.log.info({ userId: user.id, role: user.role }, "User logged in");

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

// ── GET /auth/me ───────────────────────────────────────────────────────────
router.get("/auth/me", authenticate, async (req: Request, res: Response): Promise<void> => {
  const [user] = await db
    .select({ id: usersTable.id, name: usersTable.name, email: usersTable.email, role: usersTable.role, isActive: usersTable.isActive })
    .from(usersTable)
    .where(eq(usersTable.id, req.auth!.userId))
    .limit(1);

  if (!user || !user.isActive) {
    res.status(401).json({ error: "الحساب غير فعال" });
    return;
  }

  res.json({ user });
});

// ── GET /admin/users  (admin only) ─────────────────────────────────────────
router.get("/admin/users", authenticate, requireRole("admin"), async (_req: Request, res: Response): Promise<void> => {
  const users = await db
    .select({ id: usersTable.id, name: usersTable.name, email: usersTable.email, role: usersTable.role, isActive: usersTable.isActive, lastLoginAt: usersTable.lastLoginAt, createdAt: usersTable.createdAt })
    .from(usersTable)
    .orderBy(usersTable.createdAt);
  res.json(users);
});

// ── POST /admin/users (admin only: create staff/user accounts) ─────────────
router.post("/admin/users", authenticate, requireRole("admin"), async (req: Request, res: Response): Promise<void> => {
  const Schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
    role: z.enum(["admin", "staff", "user"]),
  });
  const parsed = Schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message });
    return;
  }
  const { name, email, password, role } = parsed.data;

  const existing = await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.email, email.toLowerCase())).limit(1);
  if (existing.length > 0) {
    res.status(409).json({ error: "هذا البريد الإلكتروني مستخدم بالفعل" });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const [created] = await db.insert(usersTable).values({ name, email: email.toLowerCase(), passwordHash, role }).returning({ id: usersTable.id, name: usersTable.name, email: usersTable.email, role: usersTable.role });

  res.status(201).json({ success: true, user: created });
});

// ── PATCH /admin/users/:id (admin only: update role / deactivate) ──────────
router.patch("/admin/users/:id", authenticate, requireRole("admin"), async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const Schema = z.object({
    role: z.enum(["admin", "staff", "user"]).optional(),
    isActive: z.boolean().optional(),
    password: z.string().min(8).optional(),
  });
  const parsed = Schema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0]?.message }); return; }

  const updates: Partial<typeof usersTable.$inferInsert> = {};
  if (parsed.data.role !== undefined) updates.role = parsed.data.role;
  if (parsed.data.isActive !== undefined) updates.isActive = parsed.data.isActive;
  if (parsed.data.password) updates.passwordHash = await bcrypt.hash(parsed.data.password, 12);

  await db.update(usersTable).set(updates).where(eq(usersTable.id, id));
  res.json({ success: true });
});

export default router;
