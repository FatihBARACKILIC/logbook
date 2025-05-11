// @ts-check
import { COOKIE_KEYS } from "./src/lib/constants/cookie.constants";
import { envSchema } from "./src/lib/utils/env.schema";
import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const {
  REDIS_URL,
  SESSION_TTL = 3600,
  SESSION_COOKIE_MAX_AGE = 604800
} = loadEnv(process.env?.NODE_ENV ?? "development", process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:4321",
  integrations: [react()],
  output: "server",
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: true
    }
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
    ttl: +SESSION_TTL,
    cookie: {
      name: COOKIE_KEYS.SESSION_KEY,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: +SESSION_COOKIE_MAX_AGE
    }
  }
});
