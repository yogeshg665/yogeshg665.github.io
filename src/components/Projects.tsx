import InViewCanvas from "../three/InViewCanvas";
import ProjectScene from "../three/ProjectScene";
import { Reveal, SectionLabel } from "./Reveal";
import { projects, type Project } from "../data/profile";

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <Reveal>
      <article
        className="group grid items-center gap-8 rounded-3xl border border-line bg-base2/60 p-6 md:grid-cols-2 md:p-8"
        style={{ boxShadow: `0 0 0 1px transparent` }}
      >
        {/* 3D motif */}
        <div className={reversed ? "md:order-2" : ""}>
          <InViewCanvas
            cameraZ={7}
            className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line"
            fallback={
              <div
                className="aspect-[4/3] w-full rounded-2xl border border-line"
                style={{
                  background: `radial-gradient(ellipse at 50% 50%, ${project.accent}33, transparent 65%)`,
                }}
              />
            }
          >
            <ProjectScene id={project.id} accent={project.accent} />
          </InViewCanvas>
        </div>

        {/* details */}
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
            className="mt-3 font-display text-3xl font-bold tracking-tight"
            style={{ color: project.accent }}
          >
            {project.name}
          </h3>

          <p className="mt-3 text-base leading-relaxed text-ink/90">
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
                className="rounded-full border border-line px-3 py-1 text-xs text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: project.accent }}
          >
            View on GitHub <ArrowIcon />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <SectionLabel>Selected work</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Three deterministic, agentic systems, each with an independent safety
          gate.
        </h2>
      </Reveal>

      <div className="mt-14 space-y-10">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
