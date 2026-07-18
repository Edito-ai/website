import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import EditorialTestimonial from "@/components/site/EditorialTestimonial";
import WhyTheySwitched from "@/components/site/WhyTheySwitched";
import MorphTransition from "@/components/site/MorphTransition";
import FeatureGrid from "@/components/site/FeatureGrid";
import HowItWorks from "@/components/site/HowItWorks";
import ScrollStory from "@/components/site/ScrollStory";
import SocialProof from "@/components/site/SocialProof";
import Comparison from "@/components/site/Comparison";
import WhyBroll from "@/components/site/WhyBroll";
import Testimonials from "@/components/site/Testimonials";
import CTA from "@/components/site/CTA";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <EditorialTestimonial />
        <WhyTheySwitched />
        <MorphTransition />
        <FeatureGrid />
        <HowItWorks />
        <ScrollStory />
        <SocialProof />
        <Comparison />
        <WhyBroll />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
