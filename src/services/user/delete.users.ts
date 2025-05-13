import { db } from "@/lib/database";
import {
  sessionsTableSchema,
  usersTableSchema,
  type UsersTableSchema
} from "@/lib/database/schemas";
import { eq } from "drizzle-orm";

/**
 * The function `deleteUserById` deletes a user by their ID along with related data in a database
 * transaction.
 * @param {number} userId - The `deleteUserById` function is an asynchronous function that deletes a
 * user from the database based on the provided `userId`. It uses a database transaction to ensure data
 * consistency.
 * @returns The `deleteUserById` function is returning the user object that was updated with a
 * `deletedAt` timestamp.
 */
export async function deleteUserById(userId: number): Promise<UsersTableSchema | undefined> {
  return db.transaction(async (tx) => {
    const [user] = await tx
      .update(usersTableSchema)
      .set({ deletedAt: new Date() })
      .where(eq(usersTableSchema.id, userId))
      .returning();
    await tx.delete(sessionsTableSchema).where(eq(sessionsTableSchema.userId, userId));
    return user;
  });
}
