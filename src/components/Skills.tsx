import { Reveal, SectionLabel } from "./Reveal";
import { skillGroups } from "../data/profile";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <SectionLabel>Toolkit</SectionLabel>
        <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          From feature engineering to multi-agent systems.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.05}>
            <div className="h-full rounded-2xl border border-line bg-base2/60 p-6 transition-colors hover:border-influx/60">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-influx">
                {group.label}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line bg-surface/40 px-3 py-1.5 text-sm text-ink/90"
                  >
                    {item}
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
