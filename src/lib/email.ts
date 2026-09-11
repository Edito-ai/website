import nodemailer from "nodemailer";
import { SITE_URL } from "@/lib/site";

/** The addresses that get notified whenever someone submits the demo-request
 *  form — replaces what Formspree used to do (email a collaborator on every
 *  new submission). */
export const LEAD_NOTIFICATION_EMAIL = "solankishaab17@gmail.com, sagar1teotia@gmail.com";

export function getTransporter() {
  return nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL_USER,
      pass: process.env.ZOHO_EMAIL_APP_PASSWORD,
    },
  });
}

export type DemoRequestFields = {
  name: string;
  email: string;
  phone: string;
  production_house: string;
  channel_link?: string;
  details?: string;
  referral_source: string;
};

export function confirmationEmailHtml(firstName: string, productionHouse: string, scheduleLink: string) {
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Internal notification, sent to `LEAD_NOTIFICATION_EMAIL` for every real
 *  submission — the direct replacement for Formspree's own notification
 *  email. Every field is escaped since it's user-submitted text rendered as
 *  HTML. */
export function notificationEmailHtml(fields: DemoRequestFields) {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding: 6px 12px 6px 0; color: #666; font-size: 13px; white-space: nowrap; vertical-align: top;">${label}</td>
      <td style="padding: 6px 0; font-size: 14px;">${escapeHtml(value) || "&mdash;"}</td>
    </tr>`;

  return `
  <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
    <p style="font-size: 16px; font-weight: 600;">New demo request on trybroll.com</p>
    <table style="border-collapse: collapse; width: 100%; margin-top: 8px;">
      ${row("Name", fields.name)}
      ${row("Email", fields.email)}
      ${row("Phone", fields.phone)}
      ${row("Production house", fields.production_house)}
      ${row("Channel / page link", fields.channel_link ?? "")}
      ${row("What they publish", fields.details ?? "")}
      ${row("Heard about us via", fields.referral_source)}
    </table>
  </div>`;
}

export function firstNameOf(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

export function scheduleLink() {
  return `${SITE_URL}/schedule-demo`;
}
