import { db } from "@/lib/database";
import {
  usersTableSchema,
  type UsersTableInsertSchema,
  type UsersTableSchema
} from "@/lib/database/schemas";

type Props = Pick<UsersTableInsertSchema, "email" | "authProvider" | "providerId">;

export async function createUserIfNotExist({
  email,
  authProvider = "email",
  providerId
}: Props): Promise<UsersTableSchema | undefined> {
  const [user] = await db
    .insert(usersTableSchema)
    .values({ email, authProvider, providerId })
    .onConflictDoNothing({ target: usersTableSchema.email })
    .returning();
  if (user) return user;
  return await db.query.usersTableSchema.findFirst({
    where: (table, { eq }) => eq(table.email, email)
  });
}
