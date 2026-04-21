// NOTE: ESLint is pinned to v9 in package.json. v10 breaks the
// `eslint-plugin-react` bundled inside `eslint-config-next`
// (`contextOrFilename.getFilename is not a function`). Unpin once
// Vercel ships an `eslint-config-next` release compatible with ESLint 10.
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Disable rules that conflict with Prettier formatting
  prettier,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
