"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CursorGlow() {
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Slower spring for the spotlight layer (creates layered depth feel)
  const spotlightSpring = { damping: 40, stiffness: 120, mass: 0.8 };
  const spotlightX = useSpring(cursorX, spotlightSpring);
  const spotlightY = useSpring(cursorY, spotlightSpring);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
        navigator.maxTouchPoints > 0 ||
        'ontouchstart' in window
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  if (!mounted || isMobile) return null;

  return (
    <>
      {/* Layer 1: Outer interactive ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-violet-500/30 pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      {/* Layer 2: Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-cyan-400 pointer-events-none z-50"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />

      {/* Layer 3: Ambient background glow */}
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 -ml-48 -mt-48 rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 70%)",
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      {/* Layer 4: Spotlight — illuminates content beneath cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          marginLeft: "-300px",
          marginTop: "-300px",
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 30%, transparent 70%)",
          mixBlendMode: "soft-light",
          zIndex: 5,
          x: spotlightX,
          y: spotlightY,
        }}
      />
    </>
  );
}
