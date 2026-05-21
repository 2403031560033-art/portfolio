"use client";

import { useEffect, useState } from "react";

export default function GlowingRings() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    >
      {/* Ring 1 — Smallest, violet, fastest rotation */}
      <div
        className="absolute rounded-full border border-dashed border-violet-500/[0.06]"
        style={{
          width: isMobile ? "250px" : "400px",
          height: isMobile ? "250px" : "400px",
          top: "50%",
          left: "50%",
          animation: "ringRotate 60s linear infinite",
          willChange: "transform",
        }}
      >
        {/* Pulse node 1 */}
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-violet-400 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ animation: "ringPulse 3s ease-in-out infinite", boxShadow: "0 0 8px rgba(124, 58, 237, 0.6)" }}
        />
        {/* Pulse node 2 — opposite side */}
        <div
          className="absolute w-1 h-1 rounded-full bg-violet-400/60 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
          style={{ animation: "ringPulse 3s ease-in-out infinite 1.5s" }}
        />
      </div>

      {/* Ring 2 — Medium, cyan, reverse rotation */}
      <div
        className="absolute rounded-full border border-dashed border-cyan-400/[0.04]"
        style={{
          width: isMobile ? "400px" : "650px",
          height: isMobile ? "400px" : "650px",
          top: "50%",
          left: "50%",
          animation: "ringRotateReverse 90s linear infinite",
          willChange: "transform",
        }}
      >
        {/* Pulse node */}
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 right-0 top-1/2 translate-x-1/2 -translate-y-1/2"
          style={{ animation: "ringPulse 4s ease-in-out infinite 0.5s", boxShadow: "0 0 8px rgba(6, 182, 212, 0.5)" }}
        />
        {/* Pulse node 2 */}
        <div
          className="absolute w-1 h-1 rounded-full bg-cyan-400/50 left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ animation: "ringPulse 4s ease-in-out infinite 2s" }}
        />
      </div>

      {/* Ring 3 — Largest, white/faint, slowest */}
      {!isMobile && (
        <div
          className="absolute rounded-full border border-dashed border-white/[0.025]"
          style={{
            width: "900px",
            height: "900px",
            top: "50%",
            left: "50%",
            animation: "ringRotate 120s linear infinite",
            willChange: "transform",
          }}
        >
          {/* Pulse node */}
          <div
            className="absolute w-1 h-1 rounded-full bg-white/30 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ animation: "ringPulse 5s ease-in-out infinite 1s" }}
          />
        </div>
      )}
    </div>
  );
}
