import { defineMiddleware } from "astro:middleware";

/**
 * Middleware to retrieve user session data and attach it to the context's local state.
 *
 * This middleware checks if a user session exists and extracts the user's email and userId
 * from the session. If the session contains valid user data, it assigns the data to `c.locals.user`.
 *
 * @param c - The middleware context, which includes the session and locals.
 * @param next - The next middleware function in the chain.
 * @returns A promise that resolves after the middleware chain is executed.
 */
export const getUserSessionDataMiddleware = defineMiddleware(async (c, next) => {
  const session = await c.session?.get("user");
  if (!session?.email) {
    return c.redirect("/auth/sign-in");
  }
  c.locals.user = { userId: session.userId, email: session.email };
  return await next();
});
