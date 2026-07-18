import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { LegalSection } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the Broll website and service.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title={
        <>
          Terms of <span className="font-serif italic">Service</span>
        </>
      }
      updated="18 July 2026"
    >
      <LegalSection title="Agreement">
        <p>
          These terms govern your use of the Broll website and the Broll video
          editing service. By using the website, requesting a demo, or working
          with us on your footage, you agree to these terms. If you are
          accepting on behalf of a studio or company, you confirm you have the
          authority to do so.
        </p>
      </LegalSection>

      <LegalSection title="The service">
        <p>
          Broll turns your raw footage into finished videos. The specifics of
          what we deliver — formats, volume, turnaround, and pricing — are
          agreed with your team when we set you up after your demo request.
          Details described on this website are illustrative and may evolve as
          the product does.
        </p>
      </LegalSection>

      <LegalSection title="Your content">
        <p>
          You keep full ownership of the footage and material you provide, and
          of the finished videos we deliver to you. You grant us permission to
          store, process, and edit your material only as needed to provide the
          service.
        </p>
        <p>
          You are responsible for having the rights to the material you send us
          — including music, third-party clips, and appearances by other
          people — and for how you publish the finished videos.
        </p>
      </LegalSection>

      <LegalSection title="Acceptable use">
        <ul>
          <li>Do not submit material that is unlawful or infringes someone else&apos;s rights.</li>
          <li>Do not attempt to disrupt, probe, or gain unauthorized access to the service.</li>
          <li>Do not misrepresent who you are or who you work for when contacting us.</li>
        </ul>
        <p>
          We may decline or discontinue work that violates these rules.
        </p>
      </LegalSection>

      <LegalSection title="Our property">
        <p>
          The Broll name, logo, website, and the technology behind the service
          belong to us. These terms don&apos;t give you any rights to them
          beyond using the service as intended.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimers">
        <p>
          The website and service are provided &ldquo;as is.&rdquo; We work
          hard to deliver great edits fast, but we don&apos;t guarantee the
          website will always be available or error-free, and creative output
          is by nature subjective — which is why we agree on scope and
          revisions with each team directly.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, Broll is not liable for
          indirect, incidental, or consequential damages arising from your use
          of the website or service. Our total liability for any claim is
          limited to the amount you paid us for the work giving rise to that
          claim.
        </p>
      </LegalSection>

      <LegalSection title="Ending the relationship">
        <p>
          You can stop using the service at any time. Obligations that by
          their nature should survive — such as ownership of your content,
          payment for work already delivered, and these liability terms — will
          survive.
        </p>
      </LegalSection>

      <LegalSection title="Changes and contact">
        <p>
          We may update these terms as the service evolves; the &ldquo;Last
          updated&rdquo; date above reflects the current version, and material
          changes will be communicated to active customers. Questions about
          these terms? Reach us through the{" "}
          <Link href="/demo" className="text-accent underline underline-offset-4">
            contact form
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
