import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // ponytail: no modulepreload hints — motion chunk is lazy with static
    // fallbacks, eager preloading only burns ~47KB on first paint.
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react")) return "vendor";
          if (id.includes("node_modules/framer-motion")) return "motion";
        },
      },
    },
  },
});
