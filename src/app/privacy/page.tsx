import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { LegalSection } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Broll collects, uses, and protects your information.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy — Broll",
    description: "How Broll collects, uses, and protects your information.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title={
        <>
          Privacy <span className="font-serif italic">Policy</span>
        </>
      }
      updated="18 July 2026"
    >
      <LegalSection title="Overview">
        <p>
          Broll is an agentic video editing service for production houses and
          creators. This policy explains what information we collect through
          this website and the Broll service, how we use it, and the choices
          you have. We collect as little as we can, and we never sell your
          data.
        </p>
      </LegalSection>

      <LegalSection title="Information we collect">
        <p>
          <strong>Demo requests.</strong> When you request a demo through our{" "}
          <Link href="/demo" className="text-accent underline underline-offset-4">
            contact form
          </Link>
          , we collect the details you submit: your name, work email, the name
          of your studio or channel, links you share, what you publish, and how
          you heard about us.
        </p>
        <p>
          <strong>Your footage.</strong> If you use the Broll service, we
          process the video files and related material you upload solely to
          edit and deliver your videos. Your footage stays yours.
        </p>
        <p>
          <strong>Technical basics.</strong> Like most websites, our hosting
          infrastructure keeps standard server logs (such as IP address,
          browser type, and pages visited) for security and reliability.
        </p>
      </LegalSection>

      <LegalSection title="How we use your information">
        <ul>
          <li>To respond to your demo request and set up Broll for your team.</li>
          <li>To provide, operate, and improve the Broll service.</li>
          <li>To communicate with you about your account and our services.</li>
          <li>To keep the website and service secure and prevent abuse.</li>
        </ul>
        <p>
          We do not sell your personal information, and we do not use your
          footage to train models or for any purpose other than delivering the
          service to you.
        </p>
      </LegalSection>

      <LegalSection title="Third-party services">
        <p>
          Our demo form is processed by Formspree, which receives the details
          you submit so we can respond to you. Our website and service run on
          third-party hosting infrastructure. These providers process data on
          our behalf and are not permitted to use it for their own purposes.
        </p>
      </LegalSection>

      <LegalSection title="Data retention">
        <p>
          We keep demo-request details for as long as needed to follow up and
          maintain our business relationship with you. Footage and project
          material are retained only as long as needed to deliver your work,
          after which they can be deleted on request.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          You can ask us at any time to access, correct, or delete the personal
          information we hold about you, or to stop contacting you. Reach us
          through the{" "}
          <Link href="/demo" className="text-accent underline underline-offset-4">
            contact form
          </Link>{" "}
          and we will respond promptly.
        </p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>
          If we change this policy, we will update this page and revise the
          &ldquo;Last updated&rdquo; date above. Significant changes will be
          communicated to active customers directly.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
