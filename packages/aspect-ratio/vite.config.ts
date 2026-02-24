import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `${format === "es" ? "esm" : "cjs"}/index.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "@aurora-ui-react/core", "@radix-ui/react-aspect-ratio"],
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    css: { modules: { classNameStrategy: "non-scoped" } },
  },
});
