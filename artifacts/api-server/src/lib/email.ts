import nodemailer from "nodemailer";

export async function sendOTPEmail(otp: string): Promise<void> {
  const ownerEmail = process.env.OWNER_EMAIL;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");

  if (!ownerEmail || !smtpUser || !smtpPass) {
    console.log(`\n========================================`);
    console.log(`  [ACCESS GATE] رمز الدخول: ${otp}`);
    console.log(`========================================\n`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  await transporter.sendMail({
    from: `"GSS Platform" <${smtpUser}>`,
    to: ownerEmail,
    subject: `🔐 رمز دخول جديد: ${otp}`,
    html: `
      <div dir="rtl" style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:12px;">
        <h2 style="color:#0B1E3D;margin-bottom:4px;">طلب دخول جديد</h2>
        <p style="color:#444;margin-bottom:20px;">شخص يطلب الوصول إلى بوابة GSS. شارك معه الرمز التالي إذا أردت السماح له:</p>
        <div style="background:#0B1E3D;padding:28px;text-align:center;border-radius:10px;margin-bottom:20px;">
          <span style="letter-spacing:10px;color:#C9A84C;font-size:40px;font-weight:bold;font-family:monospace;">${otp}</span>
        </div>
        <p style="color:#888;font-size:12px;">الرمز صالح لمدة <strong>10 دقائق</strong> ويُستخدم <strong>مرة واحدة فقط</strong>.</p>
        <p style="color:#bbb;font-size:11px;margin-top:16px;">إذا لم تتوقع هذا الطلب، تجاهل هذا البريد.</p>
      </div>
    `,
  });
}
