"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, GitFork, BookOpen, ExternalLink } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { PROFILE } from "@/lib/constants";
import { fadeInUp } from "@/lib/animations";

const REPOS = [
  {
    name: "vendorvue",
    description: "Hyperlocal Vendor Operating System with live Socket.IO synchronizations, Redis caching, and real-time transaction workflows.",
    stars: 12,
    forks: 4,
    language: "TypeScript",
    langColor: "bg-blue-400",
    url: `${PROFILE.github}/vendorvue`
  },
  {
    name: "dpdp-compliance",
    description: "AI-assisted privacy compliance system utilizing BERT NER for PII scrubbing and isolation forest algorithms for threat mapping.",
    stars: 8,
    forks: 2,
    language: "Python",
    langColor: "bg-green-500",
    url: `${PROFILE.github}/dpdp-compliance`
  },
  {
    name: "aalok-solar-dashboard",
    description: "Responsive solar analytics dashboard integrated with Supabase auth and Flask sensor stream processors.",
    stars: 10,
    forks: 3,
    language: "JavaScript",
    langColor: "bg-yellow-400",
    url: `${PROFILE.github}/aalok-solar-dashboard`
  }
];

const getLangColor = (lang: string) => {
  switch (lang?.toLowerCase()) {
    case "typescript": return "bg-blue-400";
    case "javascript": return "bg-yellow-400";
    case "python": return "bg-green-500";
    case "css": return "bg-purple-400";
    case "html": return "bg-orange-400";
    default: return "bg-slate-500";
  }
};

export default function GitHub() {
  const username = PROFILE.github.split("/").pop() || "2403031560033-art";
  const [reposList, setReposList] = useState<any[]>(REPOS);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
        const response = await fetch(`${apiUrl}/api/github/repos`);
        if (response.ok) {
          const data = await response.json();
          // Filter to match our highlights, or show top fetched repositories
          if (Array.isArray(data) && data.length > 0) {
            const mapped = data.slice(0, 3).map((repo: any) => ({
              name: repo.name,
              description: repo.description || "No description provided.",
              stars: repo.stars,
              forks: repo.forks,
              language: repo.language || "TypeScript",
              langColor: getLangColor(repo.language),
              url: repo.url
            }));
            setReposList(mapped);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch dynamic GitHub repos. Falling back to static data.");
      }
    };
    fetchRepos();
  }, []);

  // High-end svg themes matching our design system color variables
  const statsCardUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&bg_color=0A0A0F&title_color=7C3AED&icon_color=06B6D4&text_color=94A3B8&border_color=ffffff0d&hide_border=false`;
  const topLangsCardUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark&bg_color=0A0A0F&title_color=7C3AED&text_color=94A3B8&border_color=ffffff0d&hide_border=false`;
  const contributionChartUrl = `https://ghchart.rshah.org/7C3AED/${username}`;

  return (
    <section id="github" className="relative py-24 bg-[#0A0A0F]/90">
      {/* Glow effect */}
      <div className="absolute bottom-[10%] left-[5%] w-[35vw] h-[35vw] max-w-[400px] rounded-full bg-violet-600/3 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading title="Open Source & Activity" subtitle="GitHub Pulse" />

        {/* Dynamic Readme stats embedded cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left - Readme stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 space-y-6"
          >
            <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-violet-400" />
                <span>GitHub Stats & Languages</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img
                  src={statsCardUrl}
                  alt="Satyam Patel's GitHub Stats"
                  className="w-full h-auto rounded-2xl border border-white/5"
                  loading="lazy"
                />
                <img
                  src={topLangsCardUrl}
                  alt="Satyam Patel's Top Languages"
                  className="w-full h-auto rounded-2xl border border-white/5"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Heatmap graph container */}
            <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md overflow-hidden">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
                <Github className="h-4 w-4 text-cyan-400" />
                <span>Contribution Heatmap</span>
              </h3>
              <div className="overflow-x-auto py-2 flex justify-center">
                <img
                  src={contributionChartUrl}
                  alt="Satyam Patel's Contribution Chart"
                  className="max-w-full h-auto min-w-[600px] object-contain invert brightness-125"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          {/* Right - Repository highlights */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4 space-y-4"
          >
            {reposList.map((repo, idx) => (
              <a
                key={idx}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] backdrop-blur-md transition-all duration-300 hover:border-white/10 group shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4.5 w-4.5 text-violet-400" />
                    <h4 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                      {repo.name}
                    </h4>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed line-clamp-2">
                  {repo.description}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <GitFork className="h-3.5 w-3.5 text-slate-500" />
                      {repo.forks}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2.5 w-2.5 rounded-full ${repo.langColor}`} />
                    <span>{repo.language}</span>
                  </div>
                </div>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Global profile link button */}
        <div className="flex justify-center mt-12">
          <Button
            href={PROFILE.github}
            variant="outline"
            size="lg"
            magnetic
            external
          >
            <Github className="h-5 w-5" />
            <span>Visit Full GitHub Profile</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
