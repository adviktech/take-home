import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Stats from "@/components/Stats";
import TakeHomeCalculator from "@/components/TakeHomeCalculator";
import HowItWorks from "@/components/HowItWorks";
import IoTStack from "@/components/IoTStack";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-fleet-bg">
      <Navbar />
      <Hero />
      <TrustStrip />
      <Stats />
      <TakeHomeCalculator />
      <HowItWorks />
      <IoTStack />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
