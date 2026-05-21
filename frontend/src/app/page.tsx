import GradientMesh from "@/components/effects/GradientMesh";
import NeuralGrid from "@/components/effects/NeuralGrid";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import GitHub from "@/components/sections/GitHub";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0F] text-white">
      {/* ═══ GLOBAL CINEMATIC BACKGROUND LAYERS ═══ */}
      {/* These are fixed-position and persist across all sections */}
      <GradientMesh />
      <NeuralGrid />

      {/* ═══ PAGE SECTIONS ═══ */}
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <GitHub />
      <Contact />
      <Footer />
    </main>
  );
}
