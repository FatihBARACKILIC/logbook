import { db } from "@/lib/database";
import type { UsersTableSchema } from "@/lib/database/schemas";

/**
 * The function `getFirstUserById` retrieves the first user from the database based on the provided
 * user ID.
 * @param {number} userId - The `userId` parameter is a number that represents the unique identifier of
 * the user you want to retrieve from the database.
 * @returns The `getFirstUserById` function is returning a promise that resolves to the result of
 * querying the `usersTableSchema` to find the first user where the `id` matches the `userId` provided
 * as a parameter.
 */
export async function getFirstUserById(userId?: number): Promise<UsersTableSchema | undefined> {
  if (!userId) {
    return;
  }
  return db.query.usersTableSchema.findFirst({
    where: (table, { eq }) => eq(table.id, userId)
  });
}
