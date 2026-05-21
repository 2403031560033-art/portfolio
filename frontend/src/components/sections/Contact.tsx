"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { Mail, MapPin, Copy, Check, ExternalLink } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { PROFILE } from "@/lib/constants";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  
  const emailMagnetic = useMagneticEffect();
  const githubMagnetic = useMagneticEffect();
  const linkedinMagnetic = useMagneticEffect();
  const leetcodeMagnetic = useMagneticEffect();

  const handleCopy = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    toast.success("Email copied to clipboard!", {
      description: PROFILE.email,
      icon: <Check className="h-4 w-4 text-emerald-400" />
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#0A0A0F]">
      {/* Background glowing ambient orbs */}
      <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] max-w-[500px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] max-w-[400px] rounded-full bg-cyan-600/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading title="Let&apos;s Connect" subtitle="Get In Touch" />

        <div className="max-w-4xl mx-auto mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* CARD 1: DIRECT EMAIL */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="group relative p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md hover:border-violet-500/20 transition-all flex flex-col justify-between"
              style={{
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)"
              }}
            >
              {/* Radial glow background on hover */}
              <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.03),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 bg-violet-500/10 rounded-2xl text-violet-400 border border-violet-500/10">
                    <Mail className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-violet-400/80 uppercase font-semibold">
                    Primary Contact
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-100 mb-2 font-mono">
                  Direct Email
                </h3>
                <p className="text-sm text-slate-400 mb-6">
                  For internship positions, placement details, or code collaboration.
                </p>
                
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 font-mono text-xs md:text-sm text-slate-300 mb-8 break-all flex items-center justify-between gap-2">
                  <span>{PROFILE.email}</span>
                  <button 
                    onClick={handleCopy}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
                    aria-label="Copy email address"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.span
                          key="copied"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Check className="h-4 w-4 text-emerald-400" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Copy className="h-4 w-4" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div ref={emailMagnetic.ref as any}>
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    className="text-xs gap-1.5"
                    style={{ transform: `translate(${emailMagnetic.position.x}px, ${emailMagnetic.position.y}px)` }}
                  >
                    {copied ? "Copied address" : "Copy to Clipboard"}
                  </Button>
                </div>
                <a href={`mailto:${PROFILE.email}`}>
                  <Button variant="ghost" className="text-xs text-slate-400 hover:text-white hover:bg-white/5">
                    <span>Send Mail</span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* CARD 2: GITHUB */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="group relative p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md hover:border-slate-500/20 transition-all flex flex-col justify-between"
              style={{
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)"
              }}
            >
              <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 bg-white/5 rounded-2xl text-slate-300 border border-white/5">
                    <Github className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-slate-400/80 uppercase font-semibold">
                    Code Base
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-100 mb-2 font-mono">
                  GitHub Profile
                </h3>
                <p className="text-sm text-slate-400 mb-8">
                  Review open-source code repositories, web integrations, full stack architectures, and live project demos.
                </p>
                
                <div className="flex items-center gap-1.5 font-mono text-xs text-slate-500 mb-8">
                  <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
                  <span>github.com/2403031560033-art</span>
                </div>
              </div>
              
              <div ref={githubMagnetic.ref as any}>
                <Button
                  href={PROFILE.github}
                  external
                  variant="primary"
                  className="bg-slate-800 hover:bg-slate-700 text-white shadow-none border border-white/10 w-full justify-center gap-1.5"
                  style={{ transform: `translate(${githubMagnetic.position.x}px, ${githubMagnetic.position.y}px)` }}
                >
                  <span>Explore Repositories</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>

            {/* CARD 3: LINKEDIN */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="group relative p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md hover:border-cyan-500/20 transition-all flex flex-col justify-between"
              style={{
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)"
              }}
            >
              <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 bg-cyan-500/10 rounded-2xl text-cyan-400 border border-cyan-500/10">
                    <Linkedin className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase font-semibold">
                    Career Profile
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-100 mb-2 font-mono">
                  LinkedIn Connection
                </h3>
                <p className="text-sm text-slate-400 mb-8">
                  Connect for professional updates, internship offers, career insights, and general networking.
                </p>
                
                <div className="flex items-center gap-1.5 font-mono text-xs text-slate-500 mb-8">
                  <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                  <span>linkedin.com/in/satyam-patel</span>
                </div>
              </div>
              
              <div ref={linkedinMagnetic.ref as any}>
                <Button
                  href={PROFILE.linkedin}
                  external
                  variant="primary"
                  className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.15)] w-full justify-center gap-1.5 border-none font-bold"
                  style={{ transform: `translate(${linkedinMagnetic.position.x}px, ${linkedinMagnetic.position.y}px)` }}
                >
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>

            {/* CARD 4: LEETCODE */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="group relative p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md hover:border-orange-500/20 transition-all flex flex-col justify-between"
              style={{
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)"
              }}
            >
              <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.03),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-white/5 rounded-2xl text-amber-500 border border-white/5 flex items-center justify-center shrink-0">
                    <span className="h-7 w-7 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-black text-slate-950 text-base">L</span>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-amber-500/80 uppercase font-semibold">
                    Data Structures
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-100 mb-2 font-mono">
                  LeetCode Arena
                </h3>
                <p className="text-sm text-slate-400 mb-8">
                  Inspect competitive programming ranks, solved challenges, algorithmic efficiencies, and operational metrics.
                </p>
                
                <div className="flex items-center gap-1.5 font-mono text-xs text-slate-500 mb-8">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>leetcode.com/u/a6EpPqwsbw/</span>
                </div>
              </div>
              
              <div ref={leetcodeMagnetic.ref as any}>
                <Button
                  href={PROFILE.leetcode}
                  external
                  variant="outline"
                  className="hover:bg-orange-500/10 hover:border-orange-500/30 text-slate-300 hover:text-orange-400 w-full justify-center gap-1.5"
                  style={{ transform: `translate(${leetcodeMagnetic.position.x}px, ${leetcodeMagnetic.position.y}px)` }}
                >
                  <span>Verify Leetcode Stats</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>

          </div>

          {/* Minimalist Location Overlay */}
          <div className="mt-12 flex items-center justify-center gap-2 text-slate-500 font-mono text-xs">
            <MapPin className="h-4 w-4 text-violet-400" />
            <span>Currently based in {PROFILE.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
