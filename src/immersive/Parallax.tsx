import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Wraps a block and applies a gentle scroll-linked vertical parallax + fade as
 * it passes through the viewport. Gives the immersive layout its fluid feel.
 */
export function Parallax({
  children,
  className,
  distance = 80,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [distance, 0, -distance]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.85, 1],
    [0, 1, 1, 0.2]
  );

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}
