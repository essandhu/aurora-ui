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
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@aurora-ui/core",
        "@aurora-ui/button",
        "@aurora-ui/input",
        "@aurora-ui/select",
        "@aurora-ui/checkbox",
        "@aurora-ui/radio",
        "@aurora-ui/switch",
        "@aurora-ui/card",
        "@aurora-ui/modal",
        "@aurora-ui/toast",
        "@aurora-ui/tooltip",
        "@aurora-ui/badge",
        "@aurora-ui/avatar",
        "@aurora-ui/tabs",
        "@aurora-ui/accordion",
        "@aurora-ui/spinner",
      ],
    },
  },
});
