import { useRef, useState, useEffect } from "react";

export function useMagneticEffect() {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const middleX = left + width / 2;
      const middleY = top + height / 2;

      const distanceX = clientX - middleX;
      const distanceY = clientY - middleY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // If mouse is within 80px, pull the button towards the mouse
      if (distance < 80) {
        setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    const element = ref.current;
    if (element) {
      window.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        window.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return { ref, position };
}
