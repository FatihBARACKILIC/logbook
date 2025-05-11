import { db } from "@/lib/database";
import { sessionsTableSchema } from "@/lib/database/schemas";
import { and, eq } from "drizzle-orm";

export async function deleteSession(session: string, userId: number) {
  const [deletedSession] = await db
    .delete(sessionsTableSchema)
    .where(
      and(eq(sessionsTableSchema.sessionToken, session), eq(sessionsTableSchema.userId, userId))
    )
    .returning();
  return deletedSession;
}
