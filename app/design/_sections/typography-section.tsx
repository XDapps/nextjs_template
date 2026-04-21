import { design } from "@/design.config";

export function TypographySection() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Typography — {design.font.sans}</h2>
      <div className="space-y-2 font-sans">
        <p className="text-5xl font-bold">Heading XL</p>
        <p className="text-3xl font-semibold">Heading Large</p>
        <p className="text-2xl font-medium">Heading Medium</p>
        <p className="text-xl">Heading Small</p>
        <p className="text-base">Body — The quick brown fox jumps over the lazy dog.</p>
        <p className="text-muted-foreground text-sm">Small muted — caption text</p>
      </div>
      <div className="space-y-2">
        <h3 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
          Monospace — {design.font.mono}
        </h3>
        <pre className="bg-muted overflow-x-auto rounded-lg p-4 font-mono text-sm">
          {`const greeting = "Hello, world!";
console.log(greeting);`}
        </pre>
      </div>
    </section>
  );
}
