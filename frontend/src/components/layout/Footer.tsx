"use client";

import { PROFILE } from "@/lib/constants";
import { Cpu } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";

export default function Footer() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#0A0A0F] border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pb-8 border-b border-white/5">
          {/* Logo & Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-black tracking-wider text-white uppercase">
              {PROFILE.name.split(" ")[0]}
              <span className="text-cyan-400">.{PROFILE.name.split(" ")[1]}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              AI-Native Full Stack Developer
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-400">
            <a href="#about" onClick={(e) => handleScroll(e, "#about")} className="hover:text-white transition-colors">
              About
            </a>
            <a href="#experience" onClick={(e) => handleScroll(e, "#experience")} className="hover:text-white transition-colors">
              Experience
            </a>
            <a href="#projects" onClick={(e) => handleScroll(e, "#projects")} className="hover:text-white transition-colors">
              Projects
            </a>
            <a href="#skills" onClick={(e) => handleScroll(e, "#skills")} className="hover:text-white transition-colors">
              Skills
            </a>
            <a href="#contact" onClick={(e) => handleScroll(e, "#contact")} className="hover:text-white transition-colors">
              Contact
            </a>
          </div>

          {/* Social Links Row */}
          <div className="flex justify-center md:justify-end gap-4">
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white/5 rounded-full text-slate-400 hover:text-white hover:bg-violet-600 transition-all border border-white/5"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white/5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-white/5"
              aria-label="GitHub"
            >
              <Github className="h-4.5 w-4.5" />
            </a>
            <a
              href={PROFILE.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-white/5 rounded-2xl text-slate-400 hover:text-white hover:bg-orange-500/20 transition-all border border-white/5 font-mono text-[10px] font-bold flex items-center gap-1"
              aria-label="LeetCode"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              LeetCode
            </a>
          </div>
        </div>

        {/* Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] md:text-xs text-slate-600 font-mono">
          <p>© {new Date().getFullYear()} Satyam Patel. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <Cpu className="h-3 w-3 text-cyan-400 animate-pulse" />
            <span>Built with Next.js, Tailwind v4 & Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
