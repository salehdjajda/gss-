import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactMessagesTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const [record] = await db
    .insert(contactMessagesTable)
    .values({
      name: data.name,
      phone: data.phone ?? null,
      email: data.email,
      subject: data.subject ?? null,
      message: data.message,
    })
    .returning();

  req.log.info({ id: record.id }, "Contact message received");
  res.status(201).json({
    success: true,
    message: "تم استلام رسالتك. سنتواصل معك في أقرب وقت.",
    id: record.id,
  });
});

export default router;
