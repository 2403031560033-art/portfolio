"use client";

import { motion } from "motion/react";
import { TypeAnimation } from "react-type-animation";
import { ArrowRight, FileDown, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import FloatingParticles from "@/components/effects/FloatingParticles";
import AuroraEffect from "@/components/effects/AuroraEffect";
import GlowingRings from "@/components/effects/GlowingRings";
import { PROFILE } from "@/lib/constants";
import { fadeInUp } from "@/lib/animations";

export default function Hero() {
  const handleScroll = (href: string) => {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0F] pt-20"
    >
      {/* ═══ CINEMATIC BACKGROUND LAYER STACK ═══ */}

      {/* Layer 0: Static radial base tints */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.1),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.06),transparent_40%)]" />
      
      {/* Layer 1: Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Layer 2: Glowing computation rings */}
      <GlowingRings />

      {/* Layer 3: Aurora effect bands */}
      <AuroraEffect />

      {/* Layer 4: Particle field */}
      <FloatingParticles />

      {/* ═══ HERO CONTENT ═══ */}
      <div className="relative mx-auto max-w-5xl px-6 md:px-8 text-center z-10 flex flex-col items-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-medium text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.06)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Available for Internships & Placements
        </motion.div>

        {/* Big Name with animated text glow */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl font-black tracking-tight text-slate-100 sm:text-7xl md:text-8xl select-none"
        >
          I&apos;m{" "}
          <span
            className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
            style={{
              filter: "drop-shadow(0 0 40px rgba(124, 58, 237, 0.2)) drop-shadow(0 0 80px rgba(6, 182, 212, 0.1))",
            }}
          >
            {PROFILE.name}
          </span>
        </motion.h1>

        {/* Animated Subtitle Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 min-h-[40px] text-lg font-normal text-slate-400 sm:text-2xl md:text-3xl max-w-2xl font-mono"
        >
          <TypeAnimation
            sequence={[
              PROFILE.taglines[0], 2500,
              PROFILE.taglines[1], 2500,
              PROFILE.taglines[2], 2500,
              PROFILE.taglines[3], 2500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="after:content-['|'] after:animate-pulse after:ml-0.5 after:text-violet-400"
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Button
            onClick={() => handleScroll("#projects")}
            variant="primary"
            size="lg"
            magnetic
          >
            <span>View Projects</span>
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Button
            href={PROFILE.resumeUrl}
            variant="outline"
            size="lg"
            magnetic
            external
          >
            <FileDown className="h-4 w-4" />
            <span>Resume</span>
          </Button>

          <Button
            onClick={() => handleScroll("#contact")}
            variant="ghost"
            size="lg"
            magnetic
          >
            <Mail className="h-4 w-4" />
            <span>Contact Me</span>
          </Button>
        </motion.div>
      </div>

      {/* Bounce scroll down arrow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-widest text-slate-500 uppercase font-mono">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="cursor-pointer"
          onClick={() => handleScroll("#about")}
        >
          <svg
            className="w-5 h-5 text-slate-400 hover:text-white transition-colors"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
