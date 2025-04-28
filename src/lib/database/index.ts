import { POSTGRES_URL } from "astro:env/server";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schemas";

export const db = drizzle(POSTGRES_URL, { schema });
