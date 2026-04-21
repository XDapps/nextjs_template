const colorTokens = [
  { label: "background", bg: "bg-background", text: "text-foreground" },
  { label: "foreground", bg: "bg-foreground", text: "text-background" },
  { label: "card", bg: "bg-card", text: "text-card-foreground" },
  { label: "primary", bg: "bg-primary", text: "text-primary-foreground" },
  { label: "secondary", bg: "bg-secondary", text: "text-secondary-foreground" },
  { label: "muted", bg: "bg-muted", text: "text-muted-foreground" },
  { label: "accent", bg: "bg-accent", text: "text-accent-foreground" },
  { label: "destructive", bg: "bg-destructive", text: "text-white" },
  { label: "border", bg: "bg-border", text: "text-foreground" },
  { label: "input", bg: "bg-input", text: "text-foreground" },
  { label: "ring", bg: "bg-ring", text: "text-background" },
] as const;

export function ColorSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Color Tokens</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {colorTokens.map(({ label, bg, text }) => (
          <div key={label} className="space-y-1">
            <div
              className={`${bg} ${text} border-border flex h-16 items-center justify-center rounded-lg border text-xs font-medium`}
            >
              {label}
            </div>
            <p className="text-muted-foreground text-center text-xs">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
