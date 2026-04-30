import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },
  transform: { "^.+\\.(t|j)sx?$": ["@swc/jest", {}] },
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
};

export default config;
