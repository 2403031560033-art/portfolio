"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/constants";
import { Quote } from "lucide-react";

export default function Testimonials() {
  // Duplicate testimonials to ensure infinite scroll loops smoothly
  const doubleTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="relative py-24 bg-[#0A0A0F] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03),transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading title="Collaborator Stories" subtitle="Testimonials" />
      </div>

      {/* Infinite Horizontal Marquee Container */}
      <div className="relative mt-8 flex w-full overflow-x-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 md:before:w-40 before:bg-gradient-to-r before:from-[#0A0A0F] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 md:after:w-40 after:bg-gradient-to-l after:from-[#0A0A0F] after:to-transparent">
        {/* Marquee Track */}
        <div className="flex gap-6 py-4 animate-marquee hover:[animation-play-state:paused] w-max">
          {doubleTestimonials.map((item, idx) => (
            <div
              key={idx}
              className="w-[300px] md:w-[400px] flex-shrink-0 p-6 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] backdrop-blur-md transition-all shadow-xl flex flex-col justify-between"
              style={{
                boxShadow: `inset 0 1px 1px rgba(255,255,255,0.02)`
              }}
            >
              {/* Card Quote Symbol & Text */}
              <div>
                <div className="inline-flex p-2 bg-white/5 rounded-xl text-violet-400 mb-4 border border-white/5">
                  <Quote className="h-4 w-4 rotate-180" />
                </div>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Details */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/5">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="h-9 w-9 md:h-10 md:w-10 rounded-full border border-white/10 object-cover"
                />
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-slate-100 font-sans leading-none mb-1">
                    {item.author}
                  </h4>
                  <p className="text-[10px] md:text-xs text-slate-400 leading-none">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
