import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import FleetDashboard from "@/components/FleetDashboard";
import Stats from "@/components/Stats";
import TakeHomeCalculator from "@/components/TakeHomeCalculator";
import HowItWorks from "@/components/HowItWorks";
import IoTStack from "@/components/IoTStack";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <TrustStrip />
      <TakeHomeCalculator />
      <FleetDashboard />
      <Stats />
      <HowItWorks />
      <Services />
      <IoTStack />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
