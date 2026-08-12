import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Benefits from "@/components/sections/Benefits";
import Process from "@/components/sections/Process";
import Technologies from "@/components/sections/Technologies";
import CTA from "@/components/sections/CTA";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import MouseFollower from "@/components/ui/MouseFollower";

export default function Home() {
  return (
    <div className="min-h-screen">
      <MouseFollower />
      <Header />
      <main>
        <Hero />
        <Services />
        <Benefits />
        <Process />
        <Technologies />
        <CTA />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
