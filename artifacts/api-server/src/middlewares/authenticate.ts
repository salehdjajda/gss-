import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthPayload {
  userId: number;
  email: string;
  role: "admin" | "staff" | "user";
  name: string;
}

declare global {
  namespace Express {
    interface Request {
      auth?: AuthPayload;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "gss-platform-secret-key-change-in-production";

export function signToken(payload: AuthPayload, expiresIn = "8h"): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
}

export function verifyToken(token: string): AuthPayload {
  return jwt.verify(token, JWT_SECRET) as AuthPayload;
}

/** Middleware: verify JWT and attach req.auth */
export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    res.status(401).json({ error: "غير مصرح — يرجى تسجيل الدخول" });
    return;
  }
  try {
    req.auth = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ error: "الجلسة منتهية أو غير صالحة — يرجى إعادة تسجيل الدخول" });
  }
}

/** Middleware factory: require specific role(s) */
export function requireRole(...roles: AuthPayload["role"][]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.auth) {
      res.status(401).json({ error: "غير مصرح" });
      return;
    }
    if (!roles.includes(req.auth.role)) {
      res.status(403).json({ error: "ليس لديك صلاحية للوصول لهذه الصفحة" });
      return;
    }
    next();
  };
}
