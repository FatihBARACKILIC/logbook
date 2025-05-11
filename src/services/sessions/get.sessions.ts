import { db } from "@/lib/database";
import type { SessionsTableSchema, UsersTableSchema } from "@/lib/database/schemas";

/**
 * This TypeScript function retrieves the first session with a given session key along with its
 * associated user from a database.
 * @param {string} sessionKey - Session key is a unique identifier that is used to retrieve a specific
 * session from the database.
 * @returns The `getFistSessionBySessionKeyWithUser` function is returning a session object that
 * includes information about the session and the associated user. The session object is retrieved from
 * the database by querying the sessions table schema based on the provided session key. The query
 * filters the results to find a session with a matching session token and an expiration time greater
 * than the current date. The returned session object includes details
 */
export async function getFistSessionBySessionKeyWithUser(
  sessionKey: string
): Promise<(SessionsTableSchema & { user: UsersTableSchema }) | undefined> {
  return db.query.sessionsTableSchema.findFirst({
    where: (table, { eq, gt, and }) =>
      and(eq(table.sessionToken, sessionKey), gt(table.expiresAt, new Date())),
    with: {
      user: true
    }
  });
}
