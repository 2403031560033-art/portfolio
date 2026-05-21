"use client";

import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  className?: string;
}

export default function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={`mb-16 flex flex-col items-center text-center ${className}`}>
      {/* Subtitle Badge */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp(0, 0.4)}
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/20 px-4 py-1.5 text-xs font-semibold tracking-wider text-violet-300 uppercase shadow-[0_0_15px_rgba(124,58,237,0.1)]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
        {subtitle}
      </motion.div>

      {/* Main Title */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp(0.1, 0.5)}
        className="text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>

      {/* Subtle Glow Underline */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "80px", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 shadow-[0_0_10px_rgba(124,58,237,0.5)]"
      />
    </div>
  );
}
