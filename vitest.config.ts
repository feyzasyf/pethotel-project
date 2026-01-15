import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    silent: false,
    environment: "node",
    globals: true,
    setupFiles: ["./tests/vitest.setup.ts"],
    env: loadEnv("test", process.cwd(), ""),
  },
});
