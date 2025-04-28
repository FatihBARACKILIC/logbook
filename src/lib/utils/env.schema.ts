import { envField } from "astro/config";

export const envSchema = {
  // Postgres
  POSTGRES_USER: envField.string({ access: "secret", context: "server" }),
  POSTGRES_PASSWORD: envField.string({ access: "secret", context: "server" }),
  POSTGRES_HOST: envField.string({ access: "secret", context: "server", default: "localhost" }),
  POSTGRES_PORT: envField.number({
    access: "secret",
    context: "server",
    default: 5432,
    int: true,
    gt: 0,
    lt: 65536
  }),
  POSTGRES_DB: envField.string({ access: "secret", context: "server" }),
  POSTGRES_URL: envField.string({ access: "secret", context: "server", url: true }),
  // Redis
  REDIS_ROOT_PASSWORD: envField.string({ access: "secret", context: "server" }),
  REDIS_HOST: envField.string({ access: "secret", context: "server", default: "localhost" }),
  REDIS_PORT: envField.number({
    access: "secret",
    context: "server",
    default: 6379,
    int: true,
    gt: 0,
    lt: 65536
  }),
  REDIS_USER: envField.string({ access: "secret", context: "server" }),
  REDIS_PASSWORD: envField.string({ access: "secret", context: "server" }),
  REDIS_URL: envField.string({ access: "secret", context: "server" }),
  REDIS_TTL: envField.number({
    access: "secret",
    context: "server",
    default: 3600,
    int: true,
    gt: 3599
  })
};
