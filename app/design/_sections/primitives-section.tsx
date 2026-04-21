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
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PrimitivesSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Component Primitives</h2>

      <div className="space-y-2">
        <h3 className="text-muted-foreground text-sm font-medium">Button</h3>
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

      <div className="max-w-sm space-y-2">
        <h3 className="text-muted-foreground text-sm font-medium">Input + Label</h3>
        <div className="space-y-1">
          <Label htmlFor="sample-input">Email</Label>
          <Input id="sample-input" type="email" placeholder="you@example.com" />
        </div>
      </div>

      <div className="max-w-sm space-y-2">
        <h3 className="text-muted-foreground text-sm font-medium">Card</h3>
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

      <div className="space-y-2">
        <h3 className="text-muted-foreground text-sm font-medium">Tabs</h3>
        <Tabs defaultValue="tab1" className="max-w-sm">
          <TabsList>
            <TabsTrigger value="tab1">Tab One</TabsTrigger>
            <TabsTrigger value="tab2">Tab Two</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="p-2 text-sm">
            Content for tab one.
          </TabsContent>
          <TabsContent value="tab2" className="p-2 text-sm">
            Content for tab two.
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-2">
        <h3 className="text-muted-foreground text-sm font-medium">Skeleton</h3>
        <div className="max-w-sm space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      </div>
    </section>
  );
}
