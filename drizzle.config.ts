import { loadEnv } from "vite";
import { defineConfig } from "drizzle-kit";

const { POSTGRES_URL } = loadEnv(process.env?.NODE_ENV ?? "development", process.cwd(), "");

export default defineConfig({
  out: "./drizzle",
  schema: "./src/lib/database/schemas/**/*.table-schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: POSTGRES_URL
  }
});
