import { db } from "@/lib/database";
import { sessionsTableSchema, type SessionsTableSchema } from "@/lib/database/schemas";
import { secondToMilliseconds } from "@/lib/utils/time-to";
import { SESSION_COOKIE_MAX_AGE } from "astro:env/server";
import { and, eq, gt } from "drizzle-orm";

type UpdateSessionBySessionKeyProps = Partial<
  Omit<SessionsTableSchema, "createdAt" | "lastActivityAt" | "expiresAt" | "id" | "userId">
>;
/**
 * This TypeScript function updates a session in a database based on a session token and certain
 * conditions.
 * @param {string} sessionToken - A unique identifier for the session that needs to be updated.
 * @param {UpdateSessionBySessionKeyProps} data - The `data` parameter in the
 * `updateSessionBySessionKey` function represents the properties that you want to update in the
 * session with the given `sessionToken`. It should be an object containing the new values for the
 * session properties that you want to update.
 * @returns The `updateSessionBySessionKey` function is returning the updated session object that
 * matches the provided session token and has not expired.
 */
export async function updateSessionBySessionKey(
  sessionToken: string,
  data: UpdateSessionBySessionKeyProps
): Promise<SessionsTableSchema | undefined> {
  const lastActivityAt = new Date();
  const expiresAt = new Date(Date.now() + secondToMilliseconds(SESSION_COOKIE_MAX_AGE));
  const [session] = await db
    .update(sessionsTableSchema)
    .set({ ...data, lastActivityAt, expiresAt })
    .where(
      and(
        eq(sessionsTableSchema.sessionToken, sessionToken),
        gt(sessionsTableSchema.expiresAt, new Date())
      )
    )
    .returning();
  return session;
}
