"use client";

export default function AuroraEffect() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 3 }}
      aria-hidden="true"
    >
      {/* Aurora Band 1 — Violet to Cyan */}
      <div
        className="absolute w-[200%] h-[40%] top-[15%] -left-[50%] opacity-[0.08]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(124, 58, 237, 0.5) 20%, rgba(6, 182, 212, 0.4) 50%, rgba(16, 185, 129, 0.3) 80%, transparent 100%)",
          filter: "blur(100px)",
          animation: "auroraWave1 45s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />

      {/* Aurora Band 2 — Cyan to Emerald (phase shifted) */}
      <div
        className="absolute w-[180%] h-[35%] top-[25%] -left-[30%] opacity-[0.06]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.4) 30%, rgba(124, 58, 237, 0.3) 60%, transparent 100%)",
          filter: "blur(120px)",
          animation: "auroraWave2 55s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />

      {/* Aurora Band 3 — Emerald faint sweep */}
      <div
        className="absolute w-[160%] h-[30%] top-[35%] -left-[20%] opacity-[0.05]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.3) 40%, rgba(124, 58, 237, 0.2) 70%, transparent 100%)",
          filter: "blur(80px)",
          animation: "auroraWave3 60s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />

      {/* Vertical light streak — laser-like accent */}
      <div
        className="absolute w-[1px] h-[60%] top-[20%] left-1/2 opacity-[0.04]"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(124, 58, 237, 0.6), rgba(6, 182, 212, 0.4), transparent)",
          filter: "blur(2px)",
        }}
      />

      {/* Horizontal light streak */}
      <div
        className="absolute h-[1px] w-[60%] top-1/2 left-[20%] opacity-[0.03]"
        style={{
          background: "linear-gradient(to right, transparent, rgba(6, 182, 212, 0.5), rgba(124, 58, 237, 0.3), transparent)",
          filter: "blur(2px)",
        }}
      />
    </div>
  );
}
