import { defineMiddleware } from "astro:middleware";

export const authMiddleware = defineMiddleware(async (c, next) => {
  const isSignedIn = await c.session?.get("user");

  if (c.url.pathname.startsWith("/app") && !isSignedIn?.email) {
    return Response.redirect(new URL("/auth/sign-in", c.url), 302);
  } else if (c.url.pathname.startsWith("/auth/verify") && !isSignedIn) {
    return Response.redirect(new URL("/auth/sign-in", c.url), 302);
  } else if (c.url.pathname.startsWith("/auth") && isSignedIn?.email) {
    return Response.redirect(new URL("/app", c.url), 302);
  }

  return await next();
});
