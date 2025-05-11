import { db } from "@/lib/database";
import {
  sessionsTableSchema,
  type SessionsTableInsertSchema,
  type SessionsTableSchema
} from "@/lib/database/schemas";
import { secondToMilliseconds } from "@/lib/utils/time-to";
import { SESSION_COOKIE_MAX_AGE } from "astro:env/server";

type CreateSessionProps = Omit<
  SessionsTableInsertSchema,
  "createdAt" | "lastActivityAt" | "expiresAt"
>;

/**
 * The function `createSession` creates a new session in a database table, updating the session if it
 * already exists.
 * @param {CreateSessionProps} data - The `data` parameter in the `createSession` function likely
 * contains the properties needed to create a new session. This could include information such as the
 * user ID, session token, and any other relevant data required for the session. The
 * `CreateSessionProps` type likely defines the structure of this data
 * @returns The `createSession` function is returning a Promise that resolves to a
 * `SessionsTableSchema` object or `undefined`.
 */
export async function createSession(
  data: CreateSessionProps
): Promise<SessionsTableSchema | undefined> {
  const expiresAt = new Date(Date.now() + secondToMilliseconds(SESSION_COOKIE_MAX_AGE));
  const [session] = await db
    .insert(sessionsTableSchema)
    .values({ ...data, expiresAt })
    .onConflictDoUpdate({
      target: [sessionsTableSchema.sessionToken],
      set: { expiresAt, lastActivityAt: new Date() }
    })
    .returning();
  return session;
}
