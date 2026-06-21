/**
 * Module-level scroll state shared between the Lenis smooth-scroll driver and
 * the three.js background scene. Kept outside React so useFrame can read it
 * every frame without re-rendering.
 */
export const scrollState = {
  /** Normalized scroll progress through the whole page, 0..1. */
  progress: 0,
  /** Instantaneous scroll velocity (px/frame-ish), smoothed by Lenis. */
  velocity: 0,
  /** Section index currently closest to the viewport center. */
  section: 0,
};
