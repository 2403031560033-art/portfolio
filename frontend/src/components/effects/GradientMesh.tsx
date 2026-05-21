"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function GradientMesh() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  // Scroll-reactive subtle shifts for each orb
  const orbShift1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const orbShift2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const orbShift3 = useTransform(scrollYProgress, [0, 1], [0, -40]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Orb 1 — Violet: top-right quadrant */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "45vw",
          height: "45vw",
          maxWidth: "700px",
          maxHeight: "700px",
          top: "5%",
          right: "-5%",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
          filter: "blur(140px)",
          willChange: "transform",
          animation: "gradientOrbit1 25s ease-in-out infinite",
          y: orbShift1,
        }}
      />

      {/* Orb 2 — Cyan: bottom-left quadrant */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "50vw",
          height: "50vw",
          maxWidth: "800px",
          maxHeight: "800px",
          bottom: "0%",
          left: "-10%",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 70%)",
          filter: "blur(160px)",
          willChange: "transform",
          animation: "gradientOrbit2 30s ease-in-out infinite",
          y: orbShift2,
        }}
      />

      {/* Orb 3 — Emerald: center */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "35vw",
          height: "35vw",
          maxWidth: "550px",
          maxHeight: "550px",
          top: "40%",
          left: "30%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)",
          filter: "blur(180px)",
          willChange: "transform",
          animation: "gradientOrbit3 35s ease-in-out infinite",
          y: orbShift3,
        }}
      />
    </div>
  );
}
