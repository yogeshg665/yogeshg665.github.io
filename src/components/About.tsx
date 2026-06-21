import { Reveal, SectionLabel } from "./Reveal";
import { metrics, profile, education } from "../data/profile";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <SectionLabel>About</SectionLabel>
      </Reveal>
      <div className="mt-6 grid gap-12 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Turning noisy signals into confident, explainable decisions.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {profile.summary}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {education.degree} · {education.school} · {education.detail}
          </p>
        </Reveal>

        <Reveal className="md:col-span-2" delay={0.1}>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="bg-base2 p-5"
              >
                <div className="font-display text-2xl font-bold text-influx">
                  {m.value}
                </div>
                <div className="mt-1 text-xs leading-snug text-muted">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
