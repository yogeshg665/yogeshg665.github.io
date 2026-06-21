import { useEffect } from "react";
import Lenis from "lenis";
import { scrollState } from "./scrollState";
import { useReducedMotion } from "../hooks/useMedia";

/**
 * Initializes Lenis inertial smooth scrolling and continuously publishes the
 * page scroll progress/velocity to the shared scrollState. No-op (native
 * scroll) when the user prefers reduced motion.
 */
export function useSmoothScroll(sectionCount: number) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      // Still keep progress updated for any scroll-driven UI, using native scroll.
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrollState.progress = max > 0 ? window.scrollY / max : 0;
        scrollState.section = Math.round(scrollState.progress * (sectionCount - 1));
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenis.on(
      "scroll",
      (e: { progress: number; velocity: number }) => {
        scrollState.progress = e.progress;
        scrollState.velocity = e.velocity;
        scrollState.section = Math.round(e.progress * (sectionCount - 1));
      }
    );

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Make in-page anchor links use Lenis so navigation stays smooth.
    const onClick = (ev: MouseEvent) => {
      const target = (ev.target as HTMLElement)?.closest("a[href^='#']");
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        ev.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: 0 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [reduced, sectionCount]);
}
