import { notFound } from "next/navigation";
import { design } from "@/design.config";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

/**
 * Dev-only design token showcase.
 * Renders fonts, color swatches, radius sample, and shadcn primitives.
 * Delete this route (app/design/) before shipping to production.
 */

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

export default function DesignPage() {
  // Gate: this page must never be served in production.
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground p-8 space-y-12">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {design.brand.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            Design token showcase — dev only
          </p>
        </div>
        <ThemeToggle />
      </div>

      <Separator />

      {/* Typography */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Typography — {design.font.sans}</h2>
        <div className="space-y-2 font-sans">
          <p className="text-5xl font-bold">Heading XL</p>
          <p className="text-3xl font-semibold">Heading Large</p>
          <p className="text-2xl font-medium">Heading Medium</p>
          <p className="text-xl">Heading Small</p>
          <p className="text-base">Body — The quick brown fox jumps over the lazy dog.</p>
          <p className="text-sm text-muted-foreground">Small muted — caption text</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            Monospace — {design.font.mono}
          </h3>
          <pre className="font-mono text-sm p-4 bg-muted rounded-lg overflow-x-auto">
            {`const greeting = "Hello, world!";
console.log(greeting);`}
          </pre>
        </div>
      </section>

      <Separator />

      {/* Color Swatches */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Color Tokens</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {colorTokens.map(({ label, bg, text }) => (
            <div key={label} className="space-y-1">
              <div
                className={`${bg} ${text} rounded-lg h-16 flex items-center justify-center text-xs font-medium border border-border`}
              >
                {label}
              </div>
              <p className="text-xs text-muted-foreground text-center">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Radius Sample */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Border Radius — {design.radius}
        </h2>
        <div className="flex flex-wrap gap-4 items-end">
          {(
            [
              { label: "sm", cls: "rounded-sm" },
              { label: "md", cls: "rounded-md" },
              { label: "lg", cls: "rounded-lg" },
              { label: "xl", cls: "rounded-xl" },
              { label: "2xl", cls: "rounded-2xl" },
              { label: "full", cls: "rounded-full" },
            ] as const
          ).map(({ label, cls }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div
                className={`${cls} bg-primary w-16 h-16`}
              />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* shadcn Primitives */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Component Primitives</h2>

        {/* Buttons */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Button</h3>
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        {/* Input + Label */}
        <div className="space-y-2 max-w-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Input + Label</h3>
          <div className="space-y-1">
            <Label htmlFor="sample-input">Email</Label>
            <Input id="sample-input" type="email" placeholder="you@example.com" />
          </div>
        </div>

        {/* Card */}
        <div className="space-y-2 max-w-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Card</h3>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Card body content.</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Tabs</h3>
          <Tabs defaultValue="tab1" className="max-w-sm">
            <TabsList>
              <TabsTrigger value="tab1">Tab One</TabsTrigger>
              <TabsTrigger value="tab2">Tab Two</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="text-sm p-2">
              Content for tab one.
            </TabsContent>
            <TabsContent value="tab2" className="text-sm p-2">
              Content for tab two.
            </TabsContent>
          </Tabs>
        </div>

        {/* Skeleton */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Skeleton</h3>
          <div className="space-y-2 max-w-sm">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      </section>
    </main>
  );
}
