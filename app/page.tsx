import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import CaseStudy from "@/components/sections/CaseStudy";
import ImplementationModel from "@/components/sections/ImplementationModel";
import Sectors from "@/components/sections/Sectors";
import Differentiators from "@/components/sections/Differentiators";
import Technologies from "@/components/sections/Technologies";
import Partnership from "@/components/sections/Partnership";
import CTA from "@/components/sections/CTA";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import MouseFollower from "@/components/ui/MouseFollower";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";

export default function Home() {
  return (
    <div className="min-h-screen">
      <MouseFollower />
      <Header />
      <main>
        <Hero />
        <Products />
        <CaseStudy />
        <ImplementationModel />
        <Sectors />
        <Differentiators />
        <Technologies />
        <Partnership />
        <CTA />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
