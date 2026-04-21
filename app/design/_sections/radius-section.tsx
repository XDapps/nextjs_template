import { design } from "@/design.config";

const radiusSamples = [
  { label: "sm", cls: "rounded-sm" },
  { label: "md", cls: "rounded-md" },
  { label: "lg", cls: "rounded-lg" },
  { label: "xl", cls: "rounded-xl" },
  { label: "2xl", cls: "rounded-2xl" },
  { label: "full", cls: "rounded-full" },
] as const;

export function RadiusSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Border Radius — {design.radius}</h2>
      <div className="flex flex-wrap items-end gap-4">
        {radiusSamples.map(({ label, cls }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div className={`${cls} bg-primary h-16 w-16`} />
            <span className="text-muted-foreground text-xs">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
