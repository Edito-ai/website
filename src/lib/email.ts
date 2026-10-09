import nodemailer from "nodemailer";
import { EARLY_ACCESS_LABEL, LAUNCH_LABEL } from "@/lib/launch";

/** The addresses that get notified whenever someone submits the early-access
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

export function confirmationEmailHtml(firstName: string, productionHouse: string) {
  return `
  <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #1a1a1a;">
    <p style="font-size: 15px; line-height: 1.6;">Hi ${escapeHtml(firstName)},</p>
    <p style="font-size: 15px; line-height: 1.6;">
      You're on the early-access list for Broll${productionHouse ? ` &mdash; <strong>${escapeHtml(productionHouse)}</strong>` : ""}!
      We're excited to put the AI editor that finishes videos before you do in your hands.
    </p>
    <p style="font-size: 15px; line-height: 1.6;">
      <strong>Your early-access link will be sent to this email starting ${EARLY_ACCESS_LABEL}.</strong>
      Broll launches publicly on ${LAUNCH_LABEL}, and you'll be in before everyone else.
      Nothing more to do for now &mdash; just keep an eye on your inbox.
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
    <p style="font-size: 16px; font-weight: 600;">New early-access request on trybroll.com</p>
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
