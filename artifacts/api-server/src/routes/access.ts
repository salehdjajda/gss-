import { Router } from "express";
import crypto from "crypto";
import rateLimit from "express-rate-limit";

const router = Router();

const adminLoginLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { valid: false, error: "محاولات كثيرة، انتظر 15 دقيقة" },
  standardHeaders: true,
  legacyHeaders: false,
});

const guestLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

interface SessionEntry {
  createdAt: number;
  isAdmin: boolean;
  permanent: boolean;
}

interface GuestToken {
  used: boolean;
  createdAt: number;
}

const sessions = new Map<string, SessionEntry>();
const guestTokens = new Map<string, GuestToken>();

const GUEST_SESSION_TTL_MS = 12 * 60 * 60 * 1000;
const GUEST_LINK_TTL_MS = 7 * 24 * 60 * 60 * 1000;

setInterval(
  () => {
    const now = Date.now();
    for (const [k, v] of sessions) {
      if (!v.permanent && now - v.createdAt > GUEST_SESSION_TTL_MS) {
        sessions.delete(k);
      }
    }
    for (const [k, v] of guestTokens) {
      if (now - v.createdAt > GUEST_LINK_TTL_MS) guestTokens.delete(k);
    }
  },
  60 * 60 * 1000,
);

function createSession(isAdmin: boolean, permanent: boolean): string {
  const token = crypto.randomUUID();
  sessions.set(token, { createdAt: Date.now(), isAdmin, permanent });
  return token;
}

// Owner login — returns a permanent session token
router.post("/access/admin-login", adminLoginLimit, (req, res) => {
  const { secret } = req.body as { secret?: string };
  const expected = process.env.PREVIEW_ADMIN_SECRET;

  if (!secret || !expected || secret.trim() !== expected) {
    return res.status(403).json({ valid: false, error: "غير مصرح" });
  }

  const token = createSession(true, true);
  return res.json({ valid: true, token, isAdmin: true });
});

// Generate one-time guest link (requires admin session token)
router.post("/access/admin/generate-link", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    return res.status(403).json({ error: "غير مصرح" });
  }

  const sessionToken = auth.slice(7);
  const session = sessions.get(sessionToken);
  if (!session?.isAdmin) {
    return res.status(403).json({ error: "غير مصرح" });
  }

  const guestToken = crypto.randomUUID();
  guestTokens.set(guestToken, { used: false, createdAt: Date.now() });
  return res.json({ token: guestToken });
});

// Guest uses their one-time link token
router.get("/access/use-guest", guestLimit, (req, res) => {
  const guestToken = req.query.token as string | undefined;
  if (!guestToken) return res.json({ valid: false, error: "رابط غير صالح" });

  const entry = guestTokens.get(guestToken);
  if (!entry) return res.json({ valid: false, error: "هذا الرابط غير موجود أو انتهت صلاحيته" });
  if (entry.used) return res.json({ valid: false, error: "هذا الرابط تم استخدامه مسبقاً" });
  if (Date.now() - entry.createdAt > GUEST_LINK_TTL_MS) {
    guestTokens.delete(guestToken);
    return res.json({ valid: false, error: "انتهت صلاحية هذا الرابط" });
  }

  entry.used = true;
  const sessionToken = createSession(false, false);
  return res.json({ valid: true, token: sessionToken, isAdmin: false });
});

// Check session validity
router.get("/access/check", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.json({ valid: false });

  const token = auth.slice(7);
  const session = sessions.get(token);
  if (!session) return res.json({ valid: false });

  if (!session.permanent && Date.now() - session.createdAt > GUEST_SESSION_TTL_MS) {
    sessions.delete(token);
    return res.json({ valid: false });
  }

  return res.json({ valid: true, isAdmin: session.isAdmin });
});

export default router;
