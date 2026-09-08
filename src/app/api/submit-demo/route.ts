import { NextRequest, NextResponse } from "next/server";
import {
  confirmationEmailHtml,
  firstNameOf,
  getTransporter,
  LEAD_NOTIFICATION_EMAIL,
  notificationEmailHtml,
  scheduleLink,
  type DemoRequestFields,
} from "@/lib/email";
import { saveDemoRequest } from "@/lib/db";

export const runtime = "nodejs";

type Body = Partial<Record<keyof DemoRequestFields, unknown>>;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Replaces the Formspree submission this form used to POST to directly.
 *  This endpoint IS the form backend now: it is the source of truth for
 *  "did this submission happen." Order matters and is deliberate:
 *    1. Save to Postgres (`demo_requests`) — the durable record. Failure
 *       here fails the whole request; a submission that isn't saved
 *       shouldn't silently report success.
 *    2. Send the lead-notification email to `LEAD_NOTIFICATION_EMAIL` —
 *       also required to succeed, same reasoning as the DB write.
 *    3. Send the confirmation email to the person who submitted the form,
 *       best-effort, exactly like this route's predecessor
 *       (`/api/send-confirmation`) already treated it: nice to have, must
 *       never block or fail the submission itself. */
export async function POST(request: NextRequest) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const fields: DemoRequestFields = {
    name: str(body.name),
    email: str(body.email),
    phone: str(body.phone),
    production_house: str(body.production_house),
    channel_link: str(body.channel_link),
    details: str(body.details),
    referral_source: str(body.referral_source),
  };

  const required: (keyof DemoRequestFields)[] = [
    "name",
    "email",
    "phone",
    "production_house",
    "referral_source",
  ];
  const missing = required.filter((key) => !fields[key]);
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  try {
    await saveDemoRequest(fields);
  } catch (err) {
    console.error("Failed to save demo request to the database:", err);
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
  }

  const transporter = getTransporter();

  try {
    await transporter.sendMail({
      from: `"Broll" <${process.env.ZOHO_EMAIL_USER}>`,
      to: LEAD_NOTIFICATION_EMAIL,
      replyTo: fields.email,
      subject: `New demo request — ${fields.production_house}`,
      html: notificationEmailHtml(fields),
    });
  } catch (err) {
    console.error("Failed to send lead notification email:", err);
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
  }

  try {
    await transporter.sendMail({
      from: `"Broll" <${process.env.ZOHO_EMAIL_USER}>`,
      to: fields.email,
      subject: "Thanks for your interest in Broll — schedule your demo",
      html: confirmationEmailHtml(firstNameOf(fields.name), fields.production_house, scheduleLink()),
    });
  } catch (err) {
    // Best-effort — the lead is already captured via the notification email above.
    console.error("Failed to send confirmation email:", err);
  }

  return NextResponse.json({ ok: true });
}
