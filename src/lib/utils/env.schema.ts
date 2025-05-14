import { envField } from "astro/config";

export const envSchema = {
  // Postgres
  POSTGRES_USER: envField.string({ access: "public", context: "server" }),
  POSTGRES_PASSWORD: envField.string({ access: "public", context: "server" }),
  POSTGRES_HOST: envField.string({ access: "public", context: "server", default: "localhost" }),
  POSTGRES_PORT: envField.number({
    access: "public",
    context: "server",
    default: 5432,
    int: true,
    gt: 0,
    lt: 65536
  }),
  POSTGRES_DB: envField.string({ access: "public", context: "server" }),
  POSTGRES_URL: envField.string({ access: "public", context: "server", url: true }),
  // Redis
  REDIS_ROOT_PASSWORD: envField.string({ access: "public", context: "server" }),
  REDIS_HOST: envField.string({ access: "public", context: "server", default: "localhost" }),
  REDIS_PORT: envField.number({
    access: "public",
    context: "server",
    default: 6379,
    int: true,
    gt: 0,
    lt: 65536
  }),
  REDIS_USER: envField.string({ access: "public", context: "server" }),
  REDIS_PASSWORD: envField.string({ access: "public", context: "server" }),
  REDIS_URL: envField.string({ access: "public", context: "server" }),
  SESSION_TTL: envField.number({
    access: "public",
    context: "server",
    default: 3600,
    int: true,
    gt: 900
  }),
  SESSION_COOKIE_MAX_AGE: envField.number({
    access: "public",
    context: "server",
    default: 604800,
    int: true,
    gt: 900,
    lt: 31536000
  }),
  MAIL_SERVICE: envField.string({ access: "public", context: "server" }),
  MAIL_HOST: envField.string({ access: "public", context: "server" }),
  MAIL_PORT: envField.number({ access: "public", context: "server", int: true }),
  MAIL_SECURE: envField.boolean({ access: "public", context: "server" }),
  MAIL_USER: envField.string({ access: "public", context: "server" }),
  MAIL_PASSWORD: envField.string({ access: "public", context: "server" })
};
