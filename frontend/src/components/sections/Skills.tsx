"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { SKILL_CATEGORIES } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 bg-[#0A0A0F]/80">
      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.05),transparent_50%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading title="My Core Capabilities" subtitle="Skills Stack" />

        {/* Bento-style Skills Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer(0.08, 0.1)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SKILL_CATEGORIES.map((category, catIdx) => {
            return (
              <motion.div
                key={category.name}
                variants={fadeInUp(catIdx * 0.05, 0.5)}
                className="p-6 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] backdrop-blur-md transition-all duration-300 shadow-xl group"
                style={{
                  boxShadow: `inset 0 1px 1px rgba(255,255,255,0.02)`
                }}
              >
                {/* Category Header */}
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/5">
                  <h3 className="text-base md:text-lg font-bold text-slate-100 uppercase tracking-wider font-mono">
                    {category.name}
                  </h3>
                  <span className="h-2 w-2 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(124,58,237,0.8)] group-hover:bg-cyan-400 group-hover:shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-300" />
                </div>

                {/* Skills Container */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skill}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="px-3.5 py-2 text-xs md:text-sm font-semibold rounded-full border border-white/5 bg-white/[0.02] hover:bg-violet-950/20 hover:border-violet-500/30 hover:text-violet-300 transition-colors text-slate-300 cursor-default select-none shadow-sm"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
