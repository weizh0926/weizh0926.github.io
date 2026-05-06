import { defineConfig } from "vite";
import { copyFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    port: 5173
  },
  plugins: [
    {
      name: "spa-github-pages-404",
      closeBundle() {
        const indexHtml = resolve(__dirname, "dist/index.html");
        const notFound = resolve(__dirname, "dist/404.html");
        try {
          copyFileSync(indexHtml, notFound);
        } catch {
          /* dist missing or build failed */
        }
      }
    }
  ]
});
