import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BackgroundScene from "./BackgroundScene";
import { Parallax } from "./Parallax";
import { useSmoothScroll } from "./useSmoothScroll";
import InViewCanvas from "../three/InViewCanvas";
import ProjectScene from "../three/ProjectScene";
import {
  profile,
  metrics,
  projects,
  experience,
  skillGroups,
  education,
  type Project,
} from "../data/profile";

const SECTION_COUNT = 7;

function Eyebrow({ children, color = "#2dd4bf" }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="font-mono text-xs uppercase tracking-[0.3em]"
      style={{ color }}
    >
      {children}
    </span>
  );
}

/* ---------------------------------- Hero ---------------------------------- */
function ImmersiveHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-screen items-center justify-center px-6 text-center"
    >
      <motion.div style={{ y, opacity, scale }} className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Eyebrow>{profile.positioning}</Eyebrow>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mt-6 font-display text-6xl font-bold leading-[1.02] tracking-tight sm:text-7xl md:text-8xl"
        >
          {profile.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
        >
          {profile.heroLine}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-full bg-influx px-7 py-3 text-sm font-semibold text-base transition-transform hover:-translate-y-0.5"
          >
            Explore the work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-line/80 bg-base/40 px-7 py-3 text-sm font-semibold text-ink backdrop-blur-sm transition-colors hover:border-influx hover:text-influx"
          >
            Get in touch
          </a>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
        >
          Scroll
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------- About ---------------------------------- */
function ImmersiveAbout() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-32">
      <Parallax>
        <Eyebrow color="#38bdf8">About</Eyebrow>
        <h2 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Turning noisy signals into confident, explainable decisions.
        </h2>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted">
          {profile.summary}
        </p>
        <p className="mt-4 text-sm text-muted">
          {education.degree} · {education.school} · {education.detail}
        </p>
      </Parallax>

      <Parallax className="mt-16" distance={120}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-line/70 bg-base2/50 p-6 backdrop-blur-md"
            >
              <div className="font-display text-3xl font-bold text-influx">
                {m.value}
              </div>
              <div className="mt-1 text-xs leading-snug text-muted">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </Parallax>
    </section>
  );
}

/* -------------------------------- Projects -------------------------------- */
function ImmersiveProjectCard({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <Parallax distance={100}>
      <article
        className="grid items-center gap-10 rounded-[28px] border border-line/70 bg-base2/40 p-7 backdrop-blur-md md:grid-cols-2 md:p-10"
        style={{ boxShadow: `0 30px 80px -40px ${project.accent}55` }}
      >
        <div className={reversed ? "md:order-2" : ""}>
          <InViewCanvas
            cameraZ={7}
            className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line/70"
            fallback={
              <div
                className="aspect-[4/3] w-full rounded-2xl border border-line/70"
                style={{
                  background: `radial-gradient(ellipse at 50% 50%, ${project.accent}40, transparent 65%)`,
                }}
              />
            }
          >
            <ProjectScene id={project.id} accent={project.accent} />
          </InViewCanvas>
        </div>

        <div className={reversed ? "md:order-1" : ""}>
          <div className="flex items-center gap-3">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: project.accent }}
            />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {project.title}
            </span>
          </div>
          <h3
            className="mt-3 font-display text-4xl font-bold tracking-tight"
            style={{ color: project.accent }}
          >
            {project.name}
          </h3>
          <p className="mt-3 text-lg leading-relaxed text-ink/90">
            {project.tagline}
          </p>
          <ul className="mt-5 space-y-2.5">
            {project.features.map((f) => (
              <li key={f} className="flex gap-3 text-sm text-muted">
                <span style={{ color: project.accent }}>·</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line/70 px-3 py-1 text-xs text-muted"
              >
                {t}
              </span>
            ))}
          </div>
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: project.accent }}
          >
            View on GitHub
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
        </div>
      </article>
    </Parallax>
  );
}

function ImmersiveProjects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-32">
      <Parallax>
        <Eyebrow color="#16c784">Selected work</Eyebrow>
        <h2 className="mt-6 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Three deterministic, agentic systems, each with an independent safety
          gate.
        </h2>
      </Parallax>
      <div className="mt-16 space-y-12">
        {projects.map((p, i) => (
          <ImmersiveProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- Experience ------------------------------- */
function ImmersiveExperience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-32">
      <Parallax>
        <Eyebrow color="#f5a524">Experience</Eyebrow>
        <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Eight years owning risk &amp; ML at scale.
        </h2>
      </Parallax>
      <div className="mt-16 space-y-12 border-l border-line/70 pl-6 md:pl-10">
        {experience.map((job) => (
          <Parallax key={job.company} distance={60}>
            <div className="relative rounded-2xl border border-line/60 bg-base2/40 p-6 backdrop-blur-md">
              <span className="absolute -left-[37px] top-7 h-3 w-3 rounded-full border-2 border-influx bg-base md:-left-[53px]" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl font-semibold">
                  {job.company}
                  {job.context && (
                    <span className="ml-2 text-sm font-normal text-muted">
                      {job.context}
                    </span>
                  )}
                </h3>
                <span className="font-mono text-xs text-muted">{job.period}</span>
              </div>
              <p className="mt-1 text-sm text-influx">{job.role}</p>
              <p className="text-xs text-muted">{job.location}</p>
              <ul className="mt-4 space-y-2.5">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="text-influx">·</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Parallax>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Skills --------------------------------- */
function ImmersiveSkills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-32">
      <Parallax>
        <Eyebrow color="#2dd4bf">Toolkit</Eyebrow>
        <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          From feature engineering to multi-agent systems.
        </h2>
      </Parallax>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <Parallax key={group.label} distance={40 + i * 12}>
            <div className="h-full rounded-2xl border border-line/70 bg-base2/40 p-6 backdrop-blur-md transition-colors hover:border-influx/60">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-influx">
                {group.label}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line/70 bg-surface/30 px-3 py-1.5 text-sm text-ink/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Parallax>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- Contact --------------------------------- */
function ImmersiveContact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-32">
      <Parallax>
        <div className="overflow-hidden rounded-[28px] border border-line/70 bg-base2/40 p-12 text-center backdrop-blur-md md:p-20">
          <Eyebrow color="#9fd8ff">Contact</Eyebrow>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Let&apos;s build trustworthy AI that ships.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Open to senior data science and applied ML roles. Based in{" "}
            {profile.location}.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-influx px-6 py-3 text-sm font-semibold text-base transition-transform hover:-translate-y-0.5"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line/80 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-influx hover:text-influx"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line/80 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-influx hover:text-influx"
            >
              GitHub
            </a>
          </div>
        </div>
      </Parallax>
    </section>
  );
}

/* --------------------------------- Shell ---------------------------------- */
export default function ImmersiveApp() {
  useSmoothScroll(SECTION_COUNT);

  return (
    <>
      <BackgroundScene />
      <main className="relative z-10">
        <ImmersiveHero />
        <ImmersiveAbout />
        <ImmersiveProjects />
        <ImmersiveExperience />
        <ImmersiveSkills />
        <ImmersiveContact />
        <footer className="border-t border-line/40">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted sm:flex-row">
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>
            <span className="font-mono text-xs">
              Immersive build · React · three.js · Lenis
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
