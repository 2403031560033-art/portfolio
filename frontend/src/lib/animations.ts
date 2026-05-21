import { Variants } from "motion/react";

export const fadeInUp = (delay: number = 0, duration: number = 0.5): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1] // Custom ease-out
    }
  }
});

export const fadeInDown = (delay: number = 0, duration: number = 0.5): Variants => ({
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1]
    }
  }
});

export const fadeInLeft = (delay: number = 0, duration: number = 0.5): Variants => ({
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1]
    }
  }
});

export const fadeInRight = (delay: number = 0, duration: number = 0.5): Variants => ({
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1]
    }
  }
});

export const scaleIn = (delay: number = 0, duration: number = 0.5): Variants => ({
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1]
    }
  }
});

export const staggerContainer = (staggerChildren: number = 0.08, delayChildren: number = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

export const hoverCard = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -5,
    scale: 1.01,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};
