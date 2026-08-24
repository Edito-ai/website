import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

function confirmationEmailHtml(firstName: string, productionHouse: string, scheduleLink: string) {
  return `
  <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #1a1a1a;">
    <p style="font-size: 15px; line-height: 1.6;">Hi ${firstName},</p>
    <p style="font-size: 15px; line-height: 1.6;">
      Thanks for showing interest in Broll${productionHouse ? ` for <strong>${productionHouse}</strong>` : ""}!
      We're excited to show you the AI editor that finishes videos before you do.
    </p>
    <p style="font-size: 15px; line-height: 1.6;">
      Our team usually reaches out within 24 hours &mdash; but you can skip the wait and grab a time
      that works for you right now:
    </p>
    <p style="text-align: center; margin: 28px 0;">
      <a href="${scheduleLink}"
         style="background: #111111; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; display: inline-block;">
        Schedule your demo
      </a>
    </p>
    <p style="font-size: 15px; line-height: 1.6;">
      Talk soon,<br />
      The Broll Team
    </p>
  </div>`;
}

export async function POST(request: NextRequest) {
  let body: { name?: string; email?: string; production_house?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, email, production_house } = body;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL_USER,
      pass: process.env.ZOHO_EMAIL_APP_PASSWORD,
    },
  });

  const firstName = name?.trim().split(/\s+/)[0] || "there";
  const scheduleLink = `${SITE_URL}/schedule-demo`;

  try {
    await transporter.sendMail({
      from: `"Broll" <${process.env.ZOHO_EMAIL_USER}>`,
      to: email,
      subject: "Thanks for your interest in Broll — schedule your demo",
      html: confirmationEmailHtml(firstName, production_house ?? "", scheduleLink),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send confirmation email:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
