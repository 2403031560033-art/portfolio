"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Tilt from "react-parallax-tilt";
import { ExternalLink, ChevronDown, ChevronUp, BarChart2, Layers, Star, GitFork } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { PROJECTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "AI/ML", "Full Stack", "Dashboard"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [projectsList, setProjectsList] = useState<any[]>(PROJECTS);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
        const response = await fetch(`${apiUrl}/api/projects`);
        if (response.ok) {
          const data = await response.json();
          // Merge dynamic stars/forks with static project properties
          const merged = PROJECTS.map(staticProj => {
            const dynamicProj = data.find((d: any) => d.id === staticProj.id);
            return {
              ...staticProj,
              githubStars: dynamicProj?.githubStars || 0,
              githubForks: dynamicProj?.githubForks || 0,
            };
          });
          setProjectsList(merged);
        }
      } catch (err) {
        console.warn("Failed to fetch dynamic projects from backend. Falling back to static data.");
      }
    };
    fetchProjects();
  }, []);

  // Filtered projects
  const filteredProjects = projectsList.filter((proj) => 
    activeCategory === "All" || proj.category === activeCategory
  );

  const toggleExpand = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section id="projects" className="relative py-24 bg-[#0A0A0F]/90">
      {/* Background orbs */}
      <div className="absolute top-[20%] right-[10%] w-[35vw] h-[35vw] max-w-[400px] rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading title="Flagship Creations" subtitle="My Projects" />

        {/* Filter Navigation Tabs */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex rounded-full border border-white/5 bg-white/[0.02] p-1.5 backdrop-blur-md">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setExpandedCard(null); // Close any open cards when filtering
                  }}
                  className={cn(
                    "relative px-6 py-2 text-xs md:text-sm font-semibold tracking-wide rounded-full transition-colors cursor-pointer select-none",
                    isActive ? "text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                  )}
                >
                  {/* Sliding pill indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isExpanded = expandedCard === project.id;
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <CardTiltWrapper isMobileDisable={true}>
                    <ProjectCardBody 
                      project={project} 
                      isExpanded={isExpanded} 
                      onToggle={() => toggleExpand(project.id)} 
                    />
                  </CardTiltWrapper>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// Separate component for Tilt so we can easily toggle it off for mobile if needed
function CardTiltWrapper({ children, isMobileDisable }: { children: React.ReactNode; isMobileDisable: boolean }) {
  return (
    <Tilt
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      perspective={1000}
      scale={1.01}
      transitionSpeed={1500}
      gyroscope={true}
      glareEnable={true}
      glareMaxOpacity={0.08}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="24px"
      className="w-full"
    >
      {children}
    </Tilt>
  );
}

// Inner card body that tracks hover cursor to show holographic radial background glow
function ProjectCardBody({ 
  project, 
  isExpanded, 
  onToggle 
}: { 
  project: typeof PROJECTS[0]; 
  isExpanded: boolean; 
  onToggle: () => void 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    setCoords({ x: e.clientX - left, y: e.clientY - top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] p-6 md:p-8 backdrop-blur-xl transition-all duration-300 overflow-hidden shadow-2xl",
        isExpanded ? "border-violet-500/20" : ""
      )}
    >
      {/* Interactive Cursor Radial Gradient Overlay */}
      {isHovered && (
        <div
          className="absolute -inset-px pointer-events-none transition-opacity duration-300 opacity-100 z-0"
          style={{
            background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(124, 58, 237, 0.08), transparent 80%)`,
          }}
        />
      )}

      {/* Main content relative layout wrapper */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Card Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-violet-400 font-bold font-mono">
              {project.category}
            </span>
            <h3 className="text-2xl font-black text-slate-100 mt-1">
              {project.title}
            </h3>
            <p className="text-sm text-slate-400 font-semibold font-mono mt-0.5">
              {project.subtitle}
            </p>
            {/* Dynamic GitHub stats if loaded */}
            {((project as any).githubStars > 0 || (project as any).githubForks > 0) && (
              <div className="flex items-center gap-3 mt-2 font-mono text-xs text-slate-400">
                {(project as any).githubStars > 0 && (
                  <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <span>{(project as any).githubStars} stars</span>
                  </span>
                )}
                {(project as any).githubForks > 0 && (
                  <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                    <GitFork className="h-3 w-3 text-slate-400" />
                    <span>{(project as any).githubForks} forks</span>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:border-white/20 transition-all"
              aria-label="GitHub Repository"
            >
              <Github className="h-4.5 w-4.5" />
            </a>
            {project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:border-white/20 transition-all"
                aria-label="Live Demo Website"
              >
                <ExternalLink className="h-4.5 w-4.5" />
              </a>
            )}
          </div>
        </div>

        {/* Short Description */}
        <p className="text-sm md:text-base text-slate-300 mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Metrics Grid */}
        <div className="mb-6 grid grid-cols-3 gap-2 border border-white/5 bg-white/[0.01] p-3 rounded-2xl">
          {project.metrics.map((metric, mIdx) => (
            <div key={mIdx} className="text-center py-1">
              <span className="block text-xs text-slate-500 font-mono tracking-wide uppercase">
                {metric.label}
              </span>
              <span className="block text-sm md:text-base font-extrabold text-cyan-400">
                {metric.value}
              </span>
            </div>
          ))}
        </div>

        {/* Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-semibold rounded-full border border-white/5 bg-white/5 text-slate-300 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-white/5 bg-white/5 text-xs text-slate-400 hover:text-white hover:border-white/10 hover:bg-white/[0.08] transition-all cursor-pointer font-semibold uppercase tracking-wider"
        >
          {isExpanded ? (
            <>
              <span>Hide Details</span>
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>View Architecture & Info</span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>

        {/* Expanded View */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6 border-t border-white/5 mt-6 space-y-4">
                {/* Role */}
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  <BarChart2 className="h-4 w-4 text-violet-400 shrink-0" />
                  <span className="text-slate-400">Role:</span>
                  <span className="font-bold text-slate-200">{project.role}</span>
                </div>

                {/* Architecture Highlights */}
                <div>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-slate-400 mb-2 font-semibold">
                    <Layers className="h-4 w-4 text-cyan-400" />
                    <span>Architecture Highlights:</span>
                  </div>
                  <ul className="space-y-2 text-xs md:text-sm text-slate-400 pl-6 list-disc">
                    {project.architecture.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
