import { db } from "@/lib/database";
import {
  usersTableSchema,
  type UsersTableInsertSchema,
  type UsersTableSchema
} from "@/lib/database/schemas";
import { eq } from "drizzle-orm";

type UpdateUserProps = Partial<
  Omit<UsersTableInsertSchema, "createdAt" | "deletedAt" | "updatedAt">
>;

/**
 * This TypeScript function updates a user in a database table by their ID and returns the updated user
 * data.
 * @param {number} userId - The `userId` parameter is the unique identifier of the user whose
 * information you want to update in the database.
 * @param {UpdateUserProps} data - The `data` parameter in the `updateUserById` function represents the
 * properties that you want to update for a user in the database. It should be an object of type
 * `UpdateUserProps` containing the new values for the user properties you want to update.
 * @returns The `updateUserById` function is returning a Promise that resolves to either a
 * `UsersTableSchema` object or `undefined`.
 */
export async function updateUserById(
  userId: number,
  data: UpdateUserProps
): Promise<UsersTableSchema | undefined> {
  const [newUser] = await db
    .update(usersTableSchema)
    .set(data)
    .where(eq(usersTableSchema.id, userId))
    .returning();
  return newUser;
}
