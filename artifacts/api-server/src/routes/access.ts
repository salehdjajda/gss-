import { Router } from "express";
import crypto from "crypto";
import { sendOTPEmail } from "../lib/email.js";

const router = Router();

interface OTPEntry {
  otp: string;
  used: boolean;
  createdAt: number;
}

interface SessionEntry {
  createdAt: number;
}

const otpStore = new Map<string, OTPEntry>();
const sessions = new Map<string, SessionEntry>();

const OTP_TTL_MS = 10 * 60 * 1000;
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

setInterval(
  () => {
    const now = Date.now();
    for (const [k, v] of otpStore) {
      if (now - v.createdAt > OTP_TTL_MS) otpStore.delete(k);
    }
    for (const [k, v] of sessions) {
      if (now - v.createdAt > SESSION_TTL_MS) sessions.delete(k);
    }
  },
  60 * 60 * 1000,
);

router.post("/access/request-otp", async (req, res) => {
  const otp = String(crypto.randomInt(100000, 999999));
  const requestId = crypto.randomUUID();

  otpStore.set(requestId, { otp, used: false, createdAt: Date.now() });

  try {
    await sendOTPEmail(otp);
  } catch (err) {
    console.error("[ACCESS GATE] Email send failed:", err);
  }

  return res.json({ requestId });
});

router.post("/access/verify-otp", (req, res) => {
  const { requestId, otp } = req.body as { requestId?: string; otp?: string };

  if (!requestId || !otp) {
    return res.status(400).json({ valid: false, error: "بيانات ناقصة" });
  }

  const adminSecret = process.env.PREVIEW_ADMIN_SECRET;
  if (adminSecret && otp.trim() === adminSecret) {
    const token = crypto.randomUUID();
    sessions.set(token, { createdAt: Date.now() });
    return res.json({ valid: true, token });
  }

  const entry = otpStore.get(requestId);
  if (!entry) {
    return res.json({ valid: false, error: "انتهت صلاحية الطلب، اضغط طلب رمز جديد" });
  }
  if (entry.used) {
    return res.json({ valid: false, error: "تم استخدام هذا الرمز مسبقاً" });
  }
  if (Date.now() - entry.createdAt > OTP_TTL_MS) {
    otpStore.delete(requestId);
    return res.json({ valid: false, error: "انتهت صلاحية الرمز (10 دقائق)، اطلب رمزاً جديداً" });
  }
  if (otp.trim() !== entry.otp) {
    return res.json({ valid: false, error: "الرمز غير صحيح" });
  }

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
