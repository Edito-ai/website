import FaqSection from "@/components/site/FaqSection";
import { FAQS } from "@/lib/faqs";

export default function Faq() {
  return <FaqSection id="faq" heading="Questions, answered." faqs={FAQS} />;
}
