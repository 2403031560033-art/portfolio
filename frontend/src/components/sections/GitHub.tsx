"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, GitFork, BookOpen, ExternalLink, Users, FolderGit, Sparkles } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { PROFILE } from "@/lib/constants";

const REPOS = [
  {
    name: "vendorvue",
    description: "Hyperlocal Vendor Operating System with live Socket.IO synchronizations, Redis caching, and real-time transaction workflows.",
    stars: 12,
    forks: 4,
    language: "TypeScript",
    langColor: "bg-blue-500",
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
    langColor: "bg-yellow-500",
    url: `${PROFILE.github}/aalok-solar-dashboard`
  }
];

const getLangColor = (lang: string) => {
  switch (lang?.toLowerCase()) {
    case "typescript": return "bg-blue-500";
    case "javascript": return "bg-yellow-500";
    case "python": return "bg-green-500";
    case "css": return "bg-purple-500";
    case "html": return "bg-orange-500";
    case "go": return "bg-cyan-500";
    case "rust": return "bg-orange-600";
    default: return "bg-slate-500";
  }
};

export default function GitHub() {
  const username = PROFILE.github.split("/").pop() || "2403031560033-art";
  const [profileData, setProfileData] = useState<any>({
    name: "Satyam Patel",
    bio: "AI-native Full Stack Engineer specializing in React.js, Next.js, Node.js, Flask, FastAPI, MongoDB, PostgreSQL, Socket.IO, and AI integrations.",
    publicRepos: 18,
    followers: 24,
    following: 10,
    avatarUrl: "https://github.com/identicons/satyam-patel.png",
    githubUrl: PROFILE.github
  });
  const [reposList, setReposList] = useState<any[]>(REPOS);
  const [heatmapError, setHeatmapError] = useState(false);

  useEffect(() => {
    const fetchGithubData = async () => {
      // Fetch combined profile and repos data from our new Next.js internal API route
      try {
        const response = await fetch("/api/github");
        if (response.ok) {
          const data = await response.json();
          if (data.profile) setProfileData(data.profile);
          if (data.repos && Array.isArray(data.repos)) {
            const mapped = data.repos.map((repo: any) => ({
              ...repo,
              langColor: getLangColor(repo.language),
              description: repo.description || "No description provided."
            }));
            setReposList(mapped);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch dynamic GitHub profile from internal API.");
      }
    };
    fetchGithubData();
  }, []);

  const totalStars = reposList.reduce((acc, repo) => acc + repo.stars, 0);
  const totalForks = reposList.reduce((acc, repo) => acc + repo.forks, 0);

  const getLanguageStats = () => {
    const langCounts: Record<string, number> = {};
    let totalLangs = 0;

    reposList.forEach((repo) => {
      const lang = repo.language;
      if (lang) {
        langCounts[lang] = (langCounts[lang] || 0) + 1;
        totalLangs++;
      }
    });

    if (totalLangs === 0) {
      return [
        { name: "TypeScript", percentage: 65, color: "bg-blue-500" },
        { name: "JavaScript", percentage: 20, color: "bg-yellow-500" },
        { name: "Python", percentage: 15, color: "bg-green-500" },
      ];
    }

    return Object.entries(langCounts)
      .map(([name, count]) => {
        const percentage = Math.round((count / totalLangs) * 100);
        return {
          name,
          percentage,
          color: getLangColor(name)
        };
      })
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5); // top 5
  };

  const contributionChartUrl = `https://ghchart.rshah.org/7C3AED/${username}`;

  // Renders a beautiful mock grid in case the external contribution chart fails
  const renderMockContributions = () => {
    const cols = 45;
    const rows = 7;
    const colors = [
      "bg-white/5",
      "bg-violet-950/40",
      "bg-violet-700/50",
      "bg-violet-500/70",
      "bg-cyan-500/90",
    ];

    return (
      <div className="flex flex-col gap-1.5 w-full items-center">
        <div className="flex gap-1 overflow-x-auto max-w-full pb-2 select-none justify-start w-full">
          {Array.from({ length: cols }).map((_, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-1 flex-shrink-0">
              {Array.from({ length: rows }).map((_, rowIdx) => {
                const val = (colIdx * 3 + rowIdx * 4) % 5;
                return (
                  <div
                    key={rowIdx}
                    className={`w-2.5 h-2.5 rounded-sm transition-all duration-300 hover:scale-125 ${colors[val]}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono mt-1 w-full max-w-xs">
          <span>Less</span>
          <div className="flex gap-1">
            {colors.map((c, i) => (
              <div key={i} className={`w-2 h-2 rounded-sm ${c}`} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    );
  };

  return (
    <section id="github" className="relative py-24 bg-[#0A0A0F]/90">
      {/* Glow effect */}
      <div className="absolute bottom-[10%] left-[5%] w-[35vw] h-[35vw] max-w-[400px] rounded-full bg-violet-600/3 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading title="Open Source & Activity" subtitle="GitHub Pulse" />

        {/* Dynamic native dashboard cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left - Native stats & languages dashboard */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Dashboard panels grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Native Stats Panel */}
              <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md flex flex-col justify-between h-full min-h-[300px]">
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider font-mono mb-6 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-violet-400" />
                    <span>Developer Metrics</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300">
                      <div className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                        <span className="text-violet-400"><FolderGit className="h-5 w-5" /></span>
                        <span>{profileData.publicRepos}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono mt-1.5 uppercase tracking-wider">Repositories</p>
                    </div>

                    <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300">
                      <div className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                        <span className="text-amber-400"><Star className="h-5 w-5 fill-amber-400/10" /></span>
                        <span>{totalStars}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono mt-1.5 uppercase tracking-wider">Stars Earned</p>
                    </div>

                    <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300">
                      <div className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                        <span className="text-cyan-400"><GitFork className="h-5 w-5" /></span>
                        <span>{totalForks}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono mt-1.5 uppercase tracking-wider">Repo Forks</p>
                    </div>

                    <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300">
                      <div className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                        <span className="text-pink-400"><Users className="h-5 w-5" /></span>
                        <span>{profileData.followers}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono mt-1.5 uppercase tracking-wider">Followers</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-3">
                  <img 
                    src={profileData.avatarUrl} 
                    alt={profileData.name} 
                    className="w-9 h-9 rounded-full border border-white/10"
                  />
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-slate-200 truncate">{profileData.name}</p>
                    <a 
                      href={profileData.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[10px] text-violet-400 hover:text-violet-300 flex items-center gap-1 mt-0.5"
                    >
                      <span>@{username}</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Native Languages Panel */}
              <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md flex flex-col h-full min-h-[300px]">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider font-mono mb-6 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  <span>Top Languages</span>
                </h3>
                <div className="flex-1 flex flex-col justify-center space-y-4">
                  {getLanguageStats().map((lang, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-mono text-slate-300">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${lang.color}`} />
                          <span>{lang.name}</span>
                        </div>
                        <span>{lang.percentage}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className={`h-full rounded-full ${lang.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Heatmap graph container */}
            <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md overflow-hidden">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider font-mono mb-5 flex items-center gap-2">
                <Github className="h-4 w-4 text-cyan-400" />
                <span>Contribution Heatmap</span>
              </h3>
              <div className="overflow-x-auto py-1 flex justify-center w-full">
                {!heatmapError ? (
                  <img
                    src={contributionChartUrl}
                    alt="GitHub Contribution Chart"
                    className="max-w-full h-auto min-w-[600px] object-contain invert brightness-125 select-none"
                    loading="lazy"
                    onError={() => setHeatmapError(true)}
                  />
                ) : (
                  renderMockContributions()
                )}
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
            {reposList.slice(0, 3).map((repo, idx) => (
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

