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
        "@aurora-ui-react/core",
        "@aurora-ui-react/button",
        "@aurora-ui-react/input",
        "@aurora-ui-react/select",
        "@aurora-ui-react/checkbox",
        "@aurora-ui-react/radio",
        "@aurora-ui-react/switch",
        "@aurora-ui-react/card",
        "@aurora-ui-react/modal",
        "@aurora-ui-react/toast",
        "@aurora-ui-react/tooltip",
        "@aurora-ui-react/badge",
        "@aurora-ui-react/avatar",
        "@aurora-ui-react/tabs",
        "@aurora-ui-react/accordion",
        "@aurora-ui-react/spinner",
      ],
    },
  },
});
