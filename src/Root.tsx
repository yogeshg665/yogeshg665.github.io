import { useEffect, useState } from "react";
import ClassicApp from "./App";
import ImmersiveApp from "./immersive/ImmersiveApp";

type Variant = "classic" | "immersive";

function readVariant(): Variant {
  const params = new URLSearchParams(window.location.search);
  return params.get("v") === "immersive" ? "immersive" : "classic";
}

function LayoutToggle({
  variant,
  onChange,
}: {
  variant: Variant;
  onChange: (v: Variant) => void;
}) {
  return (
    <div className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-line/80 bg-base/80 p-1 backdrop-blur-md">
        {(["classic", "immersive"] as Variant[]).map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-colors ${
              variant === v
                ? "bg-influx text-base"
                : "text-muted hover:text-ink"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Root() {
  const [variant, setVariant] = useState<Variant>(readVariant);

  // Keep state in sync with browser navigation (back/forward).
  useEffect(() => {
    const onPop = () => setVariant(readVariant());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const change = (v: Variant) => {
    setVariant(v);
    const url = new URL(window.location.href);
    if (v === "immersive") url.searchParams.set("v", "immersive");
    else url.searchParams.delete("v");
    url.hash = "";
    window.history.pushState({}, "", url);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      {/* Remount on variant change so Lenis/Canvas init cleanly. */}
      {variant === "immersive" ? (
        <ImmersiveApp key="immersive" />
      ) : (
        <ClassicApp key="classic" />
      )}
      <LayoutToggle variant={variant} onChange={change} />
    </>
  );
}
