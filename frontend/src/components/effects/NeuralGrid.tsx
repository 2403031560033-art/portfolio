"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Dot {
  x: number;
  y: number;
  /** Index into the flat dots array — used for pulse neighbor lookups */
  index: number;
}

interface Pulse {
  /** Ordered list of dot indices the pulse visits */
  path: number[];
  /** Current progress through the path (0 → path.length - 1) */
  progress: number;
  /** Timestamp (ms) when the pulse was spawned */
  startTime: number;
  /** Total duration of this pulse in ms */
  duration: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const GRID_SPACING = 40;
const DOT_RADIUS = 1;
const CONNECTION_DISTANCE = 80;
const CURSOR_RANGE = 150;

// Base (idle) appearance
const DOT_ALPHA_BASE = 0.08;
const LINE_ALPHA_BASE = 0.03;

// Cursor-brightened appearance
const DOT_ALPHA_HOVER = 0.3;
const LINE_ALPHA_HOVER = 0.08;

// Pulse settings
const PULSE_INTERVAL_MS = 3_000;
const PULSE_DURATION_MS = 1_500;
const PULSE_CHAIN_MIN = 6;
const PULSE_CHAIN_MAX = 8;
const MAX_ACTIVE_PULSES = 3;
const PULSE_COLOR = "124, 58, 237"; // #7c3aed in rgb
const PULSE_DOT_ALPHA = 0.6;
const PULSE_LINE_ALPHA = 0.35;
const PULSE_DOT_RADIUS = 2.5;

// Slate colour channel for dots & lines
const SLATE_RGB = "148, 163, 184";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Checks whether the device should be treated as mobile / touch-only. */
function isMobileOrTouch(): boolean {
  if (typeof window === "undefined") return true;
  if (window.innerWidth < 768) return true;
  if (navigator.maxTouchPoints > 0) return true;
  if ("ontouchstart" in window) return true;
  return false;
}

/** Squared distance — avoids the sqrt in hot loops. */
function distSq(ax: number, ay: number, bx: number, by: number): number {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function NeuralGrid() {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Mutable refs so the animation loop always reads the latest values
  // without requiring dependency changes on the useEffect.
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const dotsRef = useRef<Dot[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const lastPulseTimeRef = useRef<number>(0);
  const neighborsMapRef = useRef<Map<number, number[]>>(new Map());

  // ── Build the dot grid & neighbor map for the current viewport ──────────

  const buildGrid = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const cols = Math.floor(w / GRID_SPACING) + 1;
    const rows = Math.floor(h / GRID_SPACING) + 1;

    const dots: Dot[] = [];
    let idx = 0;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push({ x: col * GRID_SPACING, y: row * GRID_SPACING, index: idx });
        idx++;
      }
    }

    // Pre-compute neighbors within CONNECTION_DISTANCE for pulse traversal
    const connDistSq = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
    const neighbors = new Map<number, number[]>();

    for (let i = 0; i < dots.length; i++) {
      const arr: number[] = [];
      for (let j = 0; j < dots.length; j++) {
        if (i === j) continue;
        if (distSq(dots[i].x, dots[i].y, dots[j].x, dots[j].y) <= connDistSq) {
          arr.push(j);
        }
      }
      neighbors.set(i, arr);
    }

    dotsRef.current = dots;
    neighborsMapRef.current = neighbors;
    pulsesRef.current = [];
  }, []);

  // ── Spawn a new pulse from a random dot ─────────────────────────────────

  const spawnPulse = useCallback((now: number) => {
    const dots = dotsRef.current;
    const neighborsMap = neighborsMapRef.current;
    if (dots.length === 0) return;

    const chainLen =
      PULSE_CHAIN_MIN + Math.floor(Math.random() * (PULSE_CHAIN_MAX - PULSE_CHAIN_MIN + 1));

    // Pick a random starting dot
    const startIdx = Math.floor(Math.random() * dots.length);
    const path: number[] = [startIdx];
    const visited = new Set<number>([startIdx]);

    // Walk through connected neighbors to build the chain
    let current = startIdx;
    for (let step = 1; step < chainLen; step++) {
      const candidates = (neighborsMap.get(current) ?? []).filter((n) => !visited.has(n));
      if (candidates.length === 0) break; // dead end
      const next = candidates[Math.floor(Math.random() * candidates.length)];
      path.push(next);
      visited.add(next);
      current = next;
    }

    // Only create pulse if we managed at least 2 nodes
    if (path.length >= 2) {
      pulsesRef.current.push({
        path,
        progress: 0,
        startTime: now,
        duration: PULSE_DURATION_MS,
      });
    }
  }, []);

  // ── Main animation loop ─────────────────────────────────────────────────

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, dpr: number) => {
      const now = performance.now();
      const dots = dotsRef.current;
      const mouse = mouseRef.current;
      const pulses = pulsesRef.current;
      const neighborsMap = neighborsMapRef.current;
      const w = ctx.canvas.width / dpr;
      const h = ctx.canvas.height / dpr;

      // ── Spawn pulses on interval ────────────────────────────────────
      if (now - lastPulseTimeRef.current >= PULSE_INTERVAL_MS) {
        if (pulses.length < MAX_ACTIVE_PULSES) {
          spawnPulse(now);
        }
        lastPulseTimeRef.current = now;
      }

      // ── Advance & prune pulses ──────────────────────────────────────
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const elapsed = now - p.startTime;
        p.progress = (elapsed / p.duration) * (p.path.length - 1);
        if (elapsed >= p.duration) {
          pulses.splice(i, 1);
        }
      }

      // Build a set of dot indices currently "lit" by a pulse, with
      // their brightness (0–1) so we can blend the colour in draw.
      const pulseLit = new Map<number, number>();
      // Also track pulse-active *edges* (as "i-j" keys, i < j)
      const pulseEdges = new Map<string, number>();

      for (const p of pulses) {
        const floor = Math.floor(p.progress);
        const ceil = Math.min(floor + 1, p.path.length - 1);
        const frac = p.progress - floor;

        // The "head" dot brightens in, the "tail" fades out
        const headIdx = p.path[ceil];
        const tailIdx = p.path[floor];

        const headBrightness = frac;
        const tailBrightness = 1 - frac;

        pulseLit.set(headIdx, Math.max(pulseLit.get(headIdx) ?? 0, headBrightness));
        pulseLit.set(tailIdx, Math.max(pulseLit.get(tailIdx) ?? 0, tailBrightness));

        // Also light up the edge between head & tail
        if (headIdx !== tailIdx) {
          const edgeKey =
            Math.min(headIdx, tailIdx) + "-" + Math.max(headIdx, tailIdx);
          const edgeBrightness = Math.min(headBrightness, tailBrightness) + 0.3;
          pulseEdges.set(edgeKey, Math.max(pulseEdges.get(edgeKey) ?? 0, edgeBrightness));
        }

        // Lightly illuminate recently-visited nodes
        for (let vi = 0; vi < floor && vi < p.path.length; vi++) {
          const fadeT = (floor - vi) / p.path.length;
          const residual = Math.max(0, 0.4 * (1 - fadeT));
          const idx = p.path[vi];
          pulseLit.set(idx, Math.max(pulseLit.get(idx) ?? 0, residual));
        }
      }

      // ── Clear ───────────────────────────────────────────────────────
      ctx.clearRect(0, 0, w * dpr, h * dpr);
      ctx.save();
      ctx.scale(dpr, dpr);

      // ── Pre-compute cursor squared range ────────────────────────────
      const cursorRangeSq = CURSOR_RANGE * CURSOR_RANGE;
      const connDistSq = CONNECTION_DISTANCE * CONNECTION_DISTANCE;

      // ── Draw connections ────────────────────────────────────────────
      // We iterate each dot and draw lines to its neighbors with index > i
      // to avoid duplicate edges.
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        const nbrs = neighborsMap.get(i);
        if (!nbrs) continue;

        for (const j of nbrs) {
          if (j <= i) continue; // avoid drawing edge twice
          const b = dots[j];

          // Check if edge is pulse-lit
          const edgeKey = i + "-" + j;
          const pulseBrightness = pulseEdges.get(edgeKey);

          if (pulseBrightness !== undefined && pulseBrightness > 0) {
            // Draw pulse-coloured edge
            const alpha = PULSE_LINE_ALPHA * Math.min(pulseBrightness, 1);
            ctx.strokeStyle = `rgba(${PULSE_COLOR}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            continue;
          }

          // Determine base alpha: cursor proximity brightens
          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;
          const nearCursor = distSq(midX, midY, mouse.x, mouse.y) <= cursorRangeSq;
          const alpha = nearCursor ? LINE_ALPHA_HOVER : LINE_ALPHA_BASE;

          ctx.strokeStyle = `rgba(${SLATE_RGB}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // ── Draw dots ───────────────────────────────────────────────────
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const pulseBrightness = pulseLit.get(i);

        if (pulseBrightness !== undefined && pulseBrightness > 0.01) {
          // Pulse-lit dot — violet colour
          const alpha = PULSE_DOT_ALPHA * Math.min(pulseBrightness, 1);
          const radius = DOT_RADIUS + (PULSE_DOT_RADIUS - DOT_RADIUS) * Math.min(pulseBrightness, 1);
          ctx.fillStyle = `rgba(${PULSE_COLOR}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Normal dot — cursor proximity brightens
          const nearCursor = distSq(d.x, d.y, mouse.x, mouse.y) <= cursorRangeSq;
          const alpha = nearCursor ? DOT_ALPHA_HOVER : DOT_ALPHA_BASE;

          ctx.fillStyle = `rgba(${SLATE_RGB}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(d.x, d.y, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();

      // Schedule next frame
      animFrameRef.current = requestAnimationFrame(() => draw(ctx, dpr));
    },
    [spawnPulse],
  );

  // ── Lifecycle: mount guard ──────────────────────────────────────────────

  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Lifecycle: desktop check + resize listener ──────────────────────────

  useEffect(() => {
    if (!mounted) return;

    const check = () => setIsDesktop(!isMobileOrTouch());
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [mounted]);

  // ── Lifecycle: canvas setup, mouse tracking, animation ─────────────────

  useEffect(() => {
    if (!mounted || !isDesktop) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // ── Size canvas to viewport ─────────────────────────────────────
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      buildGrid();
    };

    resize();

    // ── Mouse tracking (passive for perf) ───────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    // ── Kick off animation ──────────────────────────────────────────
    lastPulseTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(() => draw(ctx, dpr));

    // ── Cleanup ─────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, [mounted, isDesktop, buildGrid, draw]);

  // ── Render nothing on server, on mobile, or before mount ────────────────

  if (!mounted || !isDesktop) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
