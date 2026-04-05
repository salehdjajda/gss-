import { Router } from "express";
import crypto from "crypto";

const router = Router();

interface CodeEntry {
  used: boolean;
  createdAt: number;
}

interface SessionEntry {
  createdAt: number;
}

const codes = new Map<string, CodeEntry>();
const sessions = new Map<string, SessionEntry>();

const SESSION_TTL_MS = 12 * 60 * 60 * 1000;
const CODE_TTL_MS = 24 * 60 * 60 * 1000;

const SAFE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateCode(): string {
  let raw = "";
  const bytes = crypto.randomBytes(8);
  for (let i = 0; i < 8; i++) {
    raw += SAFE_CHARS[bytes[i] % SAFE_CHARS.length];
  }
  return `${raw.slice(0, 4)}-${raw.slice(4)}`;
}

setInterval(
  () => {
    const now = Date.now();
    for (const [key, val] of codes) {
      if (now - val.createdAt > CODE_TTL_MS) codes.delete(key);
    }
    for (const [key, val] of sessions) {
      if (now - val.createdAt > SESSION_TTL_MS) sessions.delete(key);
    }
  },
  60 * 60 * 1000,
);

router.post("/access/generate", (req, res) => {
  const adminSecret = process.env.PREVIEW_ADMIN_SECRET;
  if (!adminSecret) {
    return res.status(503).json({ error: "Preview gate not configured" });
  }
  const { secret } = req.body as { secret?: string };
  if (!secret || secret !== adminSecret) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  const code = generateCode();
  codes.set(code, { used: false, createdAt: Date.now() });
  return res.json({ code });
});

router.post("/access/verify", (req, res) => {
  const { code } = req.body as { code?: string };
  if (!code) return res.status(400).json({ valid: false, error: "Code required" });

  const normalized = String(code)
    .toUpperCase()
    .replace(/\s/g, "")
    .replace(/[^A-Z0-9\-]/g, "");

  const entry = codes.get(normalized);
  if (!entry) return res.json({ valid: false, error: "الكود غير صحيح" });
  if (entry.used) return res.json({ valid: false, error: "تم استخدام هذا الكود مسبقاً" });

  entry.used = true;
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
