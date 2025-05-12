import { defineMiddleware } from "astro:middleware";

export const getUserSessionDataMiddleware = defineMiddleware(async (c, next) => {
  const session = await c.session?.get("user");
  if (session?.email) {
    c.locals.user = { userId: session.userId, email: session.email };
  }
  return await next();
});
