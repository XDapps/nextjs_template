import "react";

declare module "react" {
  interface CSSProperties {
    // Allow CSS custom properties (e.g. style={{ "--radius": "0.5rem" }})
    [key: `--${string}`]: string | number | undefined;
  }
}
