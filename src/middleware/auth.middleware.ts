import { defineMiddleware } from "astro:middleware";

/**
 * Middleware to handle authentication and route access control.
 *
 * This middleware checks the user's authentication status and redirects
 * them to the appropriate route based on their signed-in state and the
 * requested URL path.
 *
 * - If the user is not signed in and tries to access a route under `/app`,
 *   they are redirected to the `/auth/sign-in` page.
 * - If the user is not signed in and tries to access `/auth/verify`,
 *   they are redirected to the `/auth/sign-in` page.
 * - If the user is signed in and tries to access a route under `/auth`,
 *   they are redirected to the `/app` page.
 *
 * @param c - The context object containing the request and session information.
 * @param next - The next middleware function in the chain.
 * @returns A `Response` object, either redirecting the user or allowing
 *          the request to proceed to the next middleware.
 */
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
