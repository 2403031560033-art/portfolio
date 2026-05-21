"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Trophy, Cpu, Zap, Rocket } from "lucide-react";

const ABOUT_HIGHLIGHTS = [
  {
    icon: Trophy,
    title: "Hackathon Champion",
    description: "Led development teams to Top 5 and Top 10 finishes in national-level hackathons like GDG Hacker Cup & SunHacks.",
    glow: "rgba(245, 158, 11, 0.15)", // amber glow
    iconColor: "text-amber-400",
  },
  {
    icon: Cpu,
    title: "AI Integration specialist",
    description: "Hands-on experience embedding language models, speech-to-text, NER classifiers, and LLMs into real-world pipelines.",
    glow: "rgba(124, 58, 237, 0.15)", // violet glow
    iconColor: "text-violet-400",
  },
  {
    icon: Zap,
    title: "Real-Time & Performance",
    description: "Highly focused on reducing backend latency (~40% in order tracking) with Socket.IO, Redis caching, and pub/sub.",
    glow: "rgba(6, 182, 212, 0.15)", // cyan glow
    iconColor: "text-cyan-400",
  },
  {
    icon: Rocket,
    title: "Startup-Style Execution",
    description: "Passionate about full-stack product building, rapid MVP shipping, clean architecture, and business-focused tech.",
    glow: "rgba(236, 72, 153, 0.15)", // pink glow
    iconColor: "text-pink-400",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 bg-[#0A0A0F]/80">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading title="Story & Mindset" subtitle="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Story Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp(0.1, 0.6)}
            className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-base md:text-lg"
          >
            <p>
              I am a startup-oriented <strong className="text-violet-400 font-semibold">Full-Stack & AI Engineer</strong> currently pursuing my B.Tech in CSE at Parul University. I specialize in crafting high-performance real-time applications and embedding intelligence into workflows using modern APIs and machine learning.
            </p>
            <p>
              My engineering philosophy revolves around <strong className="text-cyan-400 font-semibold">rapid MVP execution and performance tuning</strong>. Whether it is reducing communication latency in vendor systems by 40% using Redis and Socket.IO, or fine-tuning speech recognition models for healthcare triage, I build systems that are clean, performant, and user-centric.
            </p>
            <p>
              Having led cross-functional engineering teams in national-level hackathons (achieving Top 5 and Top 10 placements), I thrive in high-speed, collaborative startup environments. I am deeply interested in LLM fine-tuning, agentic AI, and building scalable full-stack products from scratch.
            </p>
          </motion.div>

          {/* Right Column - Highlight Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer(0.1, 0.2)}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {ABOUT_HIGHLIGHTS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp(0.1 * index, 0.5)}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md overflow-hidden group transition-all"
                  style={{
                    boxShadow: `inset 0 1px 1px rgba(255,255,255,0.05), 0 10px 30px rgba(0,0,0,0.1)`,
                  }}
                >
                  {/* Subtle hover glow ring */}
                  <div
                    className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none"
                    style={{ backgroundColor: item.glow }}
                  />

                  {/* Icon */}
                  <div className={`mb-4 inline-flex p-3 rounded-full border border-white/5 bg-white/5 ${item.iconColor}`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <h3 className="text-sm font-bold text-slate-100 mb-2 uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
