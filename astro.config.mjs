import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { fileURLToPath } from "url";

export default defineConfig({
  integrations: [tailwind({ applyBaseStyles: false })],
  build: {
    inlineStylesheets: "always"
  },
  site: "https://asssie.com",
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    }
  }
});
