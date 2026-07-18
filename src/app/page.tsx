import AnnouncementBar from "@/components/site/AnnouncementBar";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import WhyTheySwitched from "@/components/site/WhyTheySwitched";
import StackedFeatures from "@/components/site/StackedFeatures";
import GetDemo from "@/components/site/GetDemo";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <WhyTheySwitched />
        <StackedFeatures />
        <GetDemo />
      </main>
      <Footer />
    </>
  );
}
