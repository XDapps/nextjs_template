import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { design } from "@/design.config";
import "./globals.css";

/**
 * Font definitions must use static string literals so Next.js can
 * statically analyze and optimize them at build time.
 * When an agent changes `design.font.sans` / `design.font.mono`,
 * they must also update these two imports — see AGENT-SETUP.md.
 */
const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: design.brand.name,
  description: design.brand.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/*
       * --radius is set inline so globals.css can reference it via var(--radius).
       * Agents: change design.radius in design.config.ts and this updates everywhere.
       */}
      <body className="flex min-h-full flex-col" style={{ "--radius": design.radius }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
