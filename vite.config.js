import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { join, dirname } from "node:path";
const rootDir = dirname(dirname(import.meta.url)).replace("file:///", "");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ["!**/node_modules"],
    },
  },
  build: {
    outDir: join(rootDir, "fastify3/public/assets"),
    manifest: true,
  },
});
