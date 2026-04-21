import { notFound } from "next/navigation";
import { design } from "@/design.config";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { TypographySection } from "./_sections/typography-section";
import { ColorSection } from "./_sections/color-section";
import { RadiusSection } from "./_sections/radius-section";
import { PrimitivesSection } from "./_sections/primitives-section";

/**
 * Dev-only design token showcase.
 * Delete this route (app/design/) before shipping to production.
 */
export default function DesignPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <main className="bg-background text-foreground min-h-screen space-y-12 p-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{design.brand.name}</h1>
          <p className="text-muted-foreground mt-1">Design token showcase — dev only</p>
        </div>
        <ThemeToggle />
      </div>
      <Separator />
      <TypographySection />
      <Separator />
      <ColorSection />
      <Separator />
      <RadiusSection />
      <Separator />
      <PrimitivesSection />
    </main>
  );
}
