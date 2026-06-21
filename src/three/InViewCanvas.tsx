import { useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { useIsMobile, useReducedMotion } from "../hooks/useMedia";

type Props = {
  children: ReactNode;
  className?: string;
  /** Optional fallback shown on mobile / reduced-motion instead of the canvas. */
  fallback?: ReactNode;
  cameraZ?: number;
};

/**
 * Mounts a three.js Canvas only when scrolled into view, and falls back to a
 * static element on mobile or when the user prefers reduced motion.
 */
export default function InViewCanvas({
  children,
  className,
  fallback,
  cameraZ = 6,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const disable3D = isMobile || reduced;

  return (
    <div ref={ref} className={className}>
      {disable3D ? (
        fallback ?? null
      ) : visible ? (
        <Canvas
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, cameraZ], fov: 50 }}
        >
          {children}
        </Canvas>
      ) : null}
    </div>
  );
}
