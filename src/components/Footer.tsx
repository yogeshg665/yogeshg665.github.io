import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-line/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted sm:flex-row">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="font-mono text-xs">
          Built with React · three.js · Tailwind
        </span>
      </div>
    </footer>
  );
}
