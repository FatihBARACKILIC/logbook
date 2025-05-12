import { COOKIE_KEYS } from "@/lib/constants/cookie.constants";
import { getFistSessionBySessionKeyWithUser, updateSessionBySessionKey } from "@/services/sessions";
import { defineMiddleware } from "astro:middleware";

/**
 * Middleware to refresh the user session based on the session key stored in cookies.
 *
 * This middleware checks if a user session exists in the current context. If no session is found
 * but a valid session key is present in the cookies, it attempts to retrieve the session data
 * associated with the session key and updates the session information. The session data is then
 * stored in the context for subsequent requests.
 *
 * @remarks
 * - If a session already exists or no session key is found in the cookies, the middleware simply
 *   proceeds to the next handler.
 * - The session key is used to fetch the session data and update it with the current user agent
 *   and IP address.
 * - The middleware ensures that the session data is refreshed periodically (e.g., weekly) as
 *   indicated by the TODO comment.
 *
 * @param c - The middleware context, which includes session, cookies, request, and client address.
 * @param next - The next middleware or handler in the chain to be executed.
 *
 * @returns A promise that resolves after the middleware logic is executed and the next handler is called.
 */
export const refreshSessionMiddleware = defineMiddleware(async (c, next) => {
  const session = await c.session?.get("user");
  const sessionKey = c.cookies.get(COOKIE_KEYS.SESSION_KEY)?.value;

  if (session || !sessionKey) {
    return await next();
  }

  // TODO: haftada bir sid değerini güncelle

  const [sessionData] = await Promise.all([
    getFistSessionBySessionKeyWithUser(sessionKey),
    updateSessionBySessionKey(sessionKey, {
      userAgent: c.request.headers.get("user-agent"),
      ipAddress: c.clientAddress
    })
  ]);

  if (sessionData) {
    c.session?.set("user", { userId: sessionData.user.id, email: sessionData.user.email });
  }

  return await next();
});
