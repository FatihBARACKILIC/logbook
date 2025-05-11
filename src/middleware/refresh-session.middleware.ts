import { COOKIE_KEYS } from "@/lib/constants/cookie.constants";
import { getFistSessionBySessionKeyWithUser, updateSessionBySessionKey } from "@/services/sessions";
import { defineMiddleware } from "astro:middleware";

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
