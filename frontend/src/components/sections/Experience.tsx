"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { EXPERIENCE } from "@/lib/constants";
import { Briefcase, Calendar, Award, MapPin } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 bg-[#0A0A0F]">
      {/* Background radial gradient wrapper */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(124,58,237,0.06),transparent_60%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading title="Hackathons & Gigs" subtitle="My Experience" />

        <div className="relative mt-20">
          {/* Vertical timeline center line */}
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-[2px] -translate-x-[1px] bg-gradient-to-b from-violet-500 via-cyan-500 to-transparent opacity-20" />

          <div className="space-y-16">
            {EXPERIENCE.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={exp.id} 
                  className={`flex flex-col md:flex-row items-stretch ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Space filler (desktop) / Empty column */}
                  <div className="hidden md:block w-1/2 px-8" />

                  {/* Timeline Glowing Node */}
                  <div className="absolute left-4 md:left-1/2 z-10 flex h-8 w-8 -translate-x-4 items-center justify-center rounded-full bg-[#0A0A0F] border-2 border-violet-500 shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                    <motion.div 
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: idx * 0.4 }}
                      className="h-2 w-2 rounded-full bg-cyan-400" 
                    />
                  </div>

                  {/* Experience Card Content Column */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8"
                  >
                    <div 
                      className="p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] backdrop-blur-md transition-all hover:border-white/10 group shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
                      style={{
                        boxShadow: `inset 0 1px 1px rgba(255,255,255,0.02)`
                      }}
                    >
                      {/* Meta Tags */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-4">
                        <span className="inline-flex items-center gap-1 bg-violet-950/40 text-violet-300 px-3 py-1 rounded-full border border-violet-500/20 uppercase tracking-wider font-semibold">
                          <Briefcase className="h-3 w-3" />
                          {exp.type}
                        </span>
                        <span className="inline-flex items-center gap-1 text-slate-400">
                          <Calendar className="h-3 w-3" />
                          {exp.period}
                        </span>
                      </div>

                      {/* Title & Organization */}
                      <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-1 group-hover:text-violet-400 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-slate-400 font-medium mb-4">
                        <span>{exp.company}</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-0.5">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Achievement Highlight */}
                      <div className="mb-4 inline-flex items-start gap-2 bg-emerald-500/5 text-emerald-400 p-3 rounded-xl border border-emerald-500/10 w-full">
                        <Award className="h-4 w-4 mt-0.5 shrink-0" />
                        <p className="text-xs md:text-sm font-semibold">{exp.achievement}</p>
                      </div>

                      {/* Bullet Highlights */}
                      <ul className="space-y-2 text-xs md:text-sm text-slate-400">
                        {exp.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-violet-400/70 mt-2 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
