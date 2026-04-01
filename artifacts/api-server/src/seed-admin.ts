/**
 * Run once to create the first admin account:
 *   pnpm --filter @workspace/api-server exec tsx src/seed-admin.ts
 */
import bcrypt from "bcryptjs";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const ADMIN_EMAIL = "admin@gss.sa";
const ADMIN_PASSWORD = "GSS@Admin2025";
const ADMIN_NAME = "GSS Admin";

async function seed() {
  const existing = await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.email, ADMIN_EMAIL)).limit(1);
  if (existing.length > 0) {
    console.log("✅ Admin user already exists:", ADMIN_EMAIL);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await db.insert(usersTable).values({
    name: ADMIN_NAME,
    email: ADMIN_EMAIL,
    passwordHash,
    role: "admin",
    isActive: true,
  });
  console.log("✅ Admin user created:", ADMIN_EMAIL);
  console.log("   Password:", ADMIN_PASSWORD);
  process.exit(0);
}

seed().catch((e) => { console.error("❌ Seed failed:", e); process.exit(1); });
