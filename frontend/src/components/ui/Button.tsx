"use client";

import React from "react";
import { motion } from "motion/react";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  href?: string;
  external?: boolean;
}

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  magnetic = false,
  href,
  external = false,
  ...props
}: ButtonProps) {
  const { ref, position } = useMagneticEffect();

  const baseStyles = 
    "relative inline-flex items-center justify-center font-medium rounded-full " +
    "transition-all duration-300 overflow-hidden cursor-pointer select-none z-10";

  const variantStyles = {
    primary: "bg-violet-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.25)] hover:bg-violet-500 hover:shadow-[0_0_30px_rgba(124,58,237,0.45)] border border-violet-500/20",
    secondary: "bg-cyan-500 text-slate-950 hover:bg-cyan-400 border border-cyan-400/20 shadow-[0_0_20px_rgba(6,182,212,0.15)]",
    outline: "border border-white/10 bg-white/5 backdrop-blur-md text-white hover:border-white/30 hover:bg-white/10",
    ghost: "text-slate-400 hover:text-white hover:bg-white/5",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const content = (
    <span className="relative z-10 flex items-center gap-2">
      {children}
    </span>
  );

  const buttonClass = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if (href) {
    const isAnchor = href.startsWith("#") || href.startsWith("/");
    const target = external || !isAnchor ? "_blank" : undefined;
    const rel = target === "_blank" ? "noopener noreferrer" : undefined;

    if (magnetic) {
      return (
        <motion.a
          ref={ref as any}
          href={href}
          target={target}
          rel={rel}
          className={buttonClass}
          animate={{ x: position.x, y: position.y }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <a href={href} target={target} rel={rel} className={buttonClass}>
        {content}
      </a>
    );
  }

  if (magnetic) {
    return (
      <motion.button
        ref={ref as any}
        className={buttonClass}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <button className={buttonClass} {...props}>
      {content}
    </button>
  );
}
