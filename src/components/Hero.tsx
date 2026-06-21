import { motion } from "framer-motion";
import InViewCanvas from "../three/InViewCanvas";
import HeroScene from "../three/HeroScene";
import { profile } from "../data/profile";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      {/* 3D backdrop */}
      <InViewCanvas
        cameraZ={9}
        className="absolute inset-0 -z-0"
        fallback={
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(45,212,191,0.18),transparent_60%)]" />
        }
      >
        <HeroScene />
      </InViewCanvas>

      {/* gradient + vignette overlays */}
      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(45,212,191,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-40 bg-gradient-to-t from-base to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-influx"
        >
          {profile.positioning}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
        >
          {profile.heroLine}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-full bg-influx px-6 py-3 text-sm font-semibold text-base transition-transform hover:-translate-y-0.5"
          >
            View projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-influx hover:text-influx"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      {/* scroll hint */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted">
        <div className="mx-auto h-10 w-6 rounded-full border border-line">
          <motion.div
            className="mx-auto mt-2 h-2 w-1 rounded-full bg-influx"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </div>
      </div>
    </section>
  );
}
