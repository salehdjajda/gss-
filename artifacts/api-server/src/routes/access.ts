import { Router } from "express";
import crypto from "crypto";
import rateLimit from "express-rate-limit";

const router = Router();

const verifyRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { valid: false, error: "محاولات كثيرة، انتظر 15 دقيقة وحاول مجدداً" },
  standardHeaders: true,
  legacyHeaders: false,
});

interface SessionEntry {
  createdAt: number;
}

const sessions = new Map<string, SessionEntry>();
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

setInterval(
  () => {
    const now = Date.now();
    for (const [k, v] of sessions) {
      if (now - v.createdAt > SESSION_TTL_MS) sessions.delete(k);
    }
  },
  60 * 60 * 1000,
);

router.post("/access/verify", verifyRateLimit, (req, res) => {
  const { password } = req.body as { password?: string };
  if (!password) {
    return res.status(400).json({ valid: false, error: "الرمز مطلوب" });
  }

  const expected = process.env.PREVIEW_PASSWORD;
  if (!expected) {
    return res.status(503).json({ valid: false, error: "لم يتم تهيئة الرمز السري" });
  }

  if (password.trim() !== expected) {
    return res.json({ valid: false, error: "الرمز غير صحيح" });
  }

  const token = crypto.randomUUID();
  sessions.set(token, { createdAt: Date.now() });
  return res.json({ valid: true, token });
});

router.get("/access/check", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.json({ valid: false });

  const token = auth.slice(7);
  const session = sessions.get(token);
  if (!session) return res.json({ valid: false });

  if (Date.now() - session.createdAt > SESSION_TTL_MS) {
    sessions.delete(token);
    return res.json({ valid: false });
  }

  return res.json({ valid: true });
});

export default router;
