"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Particle {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  /** Base color — violet or cyan (without alpha) */
  color: [number, number, number];
  alpha: number;
  alphaMin: number;
  alphaMax: number;
  alphaSpeed: number;
  alphaDir: 1 | -1;
  /** Frequency multiplier for the sinusoidal x-drift */
  driftFreq: number;
}

// ---------------------------------------------------------------------------
// Layer configuration
// ---------------------------------------------------------------------------

interface LayerConfig {
  count: number;
  sizeMin: number;
  sizeMax: number;
  speedMin: number;
  speedMax: number;
  alphaMin: number;
  alphaMax: number;
}

const DESKTOP_LAYERS: LayerConfig[] = [
  // Far
  { count: 15, sizeMin: 0.5, sizeMax: 1, speedMin: 0.05, speedMax: 0.1, alphaMin: 0.1, alphaMax: 0.2 },
  // Mid
  { count: 20, sizeMin: 1, sizeMax: 1.5, speedMin: 0.1, speedMax: 0.2, alphaMin: 0.15, alphaMax: 0.3 },
  // Near
  { count: 15, sizeMin: 1.5, sizeMax: 2.5, speedMin: 0.2, speedMax: 0.35, alphaMin: 0.2, alphaMax: 0.4 },
];

/** Mobile layers — 5 particles per layer = 15 total */
const MOBILE_LAYERS: LayerConfig[] = DESKTOP_LAYERS.map((l) => ({
  ...l,
  count: 5,
}));

// ---------------------------------------------------------------------------
// Color palette — violet & cyan
// ---------------------------------------------------------------------------

const COLORS: [number, number, number][] = [
  [124, 58, 237], // violet
  [6, 182, 212],  // cyan
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Random float in [min, max) */
function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/** Pick a random element from an array */
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---------------------------------------------------------------------------
// Particle factory
// ---------------------------------------------------------------------------

function createParticles(
  layers: LayerConfig[],
  canvasW: number,
  canvasH: number,
): Particle[] {
  const particles: Particle[] = [];

  for (const layer of layers) {
    for (let i = 0; i < layer.count; i++) {
      const alphaMin = rand(layer.alphaMin, (layer.alphaMin + layer.alphaMax) / 2);
      const alphaMax = rand((layer.alphaMin + layer.alphaMax) / 2, layer.alphaMax);

      particles.push({
        x: Math.random() * canvasW,
        y: Math.random() * canvasH,
        speedX: rand(layer.speedMin, layer.speedMax) * (Math.random() > 0.5 ? 1 : -1),
        speedY: rand(layer.speedMin, layer.speedMax) * (Math.random() > 0.5 ? 1 : -1),
        size: rand(layer.sizeMin, layer.sizeMax),
        color: pick(COLORS),
        alpha: rand(alphaMin, alphaMax),
        alphaMin,
        alphaMax,
        alphaSpeed: rand(0.002, 0.008),
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        driftFreq: rand(0.3, 1.2),
      });
    }
  }

  return particles;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FloatingParticles() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const isMobileRef = useRef(false);
  const timeRef = useRef(0);

  // -----------------------------------------------------------------------
  // Initialise particles for the current viewport size
  // -----------------------------------------------------------------------
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    isMobileRef.current = window.innerWidth < 768;
    const layers = isMobileRef.current ? MOBILE_LAYERS : DESKTOP_LAYERS;
    particlesRef.current = createParticles(layers, w, h);
  }, []);

  // -----------------------------------------------------------------------
  // Animation loop
  // -----------------------------------------------------------------------
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    const isMobile = isMobileRef.current;
    const time = timeRef.current;

    // Advance time counter (used for sinusoidal drift)
    timeRef.current += 0.016; // ~60 fps timestep

    // Clear
    ctx.clearRect(0, 0, w, h);

    const REPULSION_RADIUS = 150;
    const FORCE_MULTIPLIER = 0.3;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // --- Alpha breathing ---
      p.alpha += p.alphaSpeed * p.alphaDir;
      if (p.alpha >= p.alphaMax) {
        p.alpha = p.alphaMax;
        p.alphaDir = -1;
      } else if (p.alpha <= p.alphaMin) {
        p.alpha = p.alphaMin;
        p.alphaDir = 1;
      }

      // --- Cursor repulsion (desktop only) ---
      let repX = 0;
      let repY = 0;
      if (!isMobile && mouse) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPULSION_RADIUS && dist > 0) {
          const force = (1 - dist / REPULSION_RADIUS) * FORCE_MULTIPLIER;
          repX = (dx / dist) * force;
          repY = (dy / dist) * force;
        }
      }

      // --- Movement ---
      p.x += p.speedX + repX + Math.sin(time * p.driftFreq) * 0.2;
      p.y += p.speedY + repY;

      // --- Wrap-around boundaries ---
      if (p.x < -p.size) p.x = w + p.size;
      else if (p.x > w + p.size) p.x = -p.size;
      if (p.y < -p.size) p.y = h + p.size;
      else if (p.y > h + p.size) p.y = -p.size;

      // --- Draw ---
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${p.alpha})`;
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  // -----------------------------------------------------------------------
  // Setup & teardown
  // -----------------------------------------------------------------------
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Initialise
    initParticles();

    // Start animation
    rafRef.current = requestAnimationFrame(animate);

    // --- Mouse tracking (passive) ---
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobileRef.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    // --- Resize handling ---
    const handleResize = () => {
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted, initParticles, animate]);

  // -----------------------------------------------------------------------
  // SSR guard
  // -----------------------------------------------------------------------
  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    />
  );
}
