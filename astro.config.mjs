// @ts-check
import { envSchema } from "./src/lib/utils/env.schema";
import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const { REDIS_URL, REDIS_TTL = 3600 } = loadEnv(
  process.env?.NODE_ENV ?? "development",
  process.cwd(),
  ""
);

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "server",
  vite: {
    plugins: [tailwindcss()]
  },
  env: {
    schema: envSchema,
    validateSecrets: true
  },
  adapter: node({
    mode: "standalone"
  }),
  session: {
    driver: "redis",
    options: {
      url: REDIS_URL
    },
    ttl: +REDIS_TTL
  }
});
