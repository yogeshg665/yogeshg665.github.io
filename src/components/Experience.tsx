import { Reveal, SectionLabel } from "./Reveal";
import { experience } from "../data/profile";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <SectionLabel>Experience</SectionLabel>
        <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Eight years owning risk &amp; ML at scale.
        </h2>
      </Reveal>

      <div className="mt-14 space-y-12 border-l border-line pl-6 md:pl-10">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.05}>
            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-influx bg-base md:-left-[47px]" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-semibold">
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
                    <span className="text-influx">—</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
