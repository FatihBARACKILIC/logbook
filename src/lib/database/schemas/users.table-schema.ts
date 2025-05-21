import { databaseTimestampSchema } from "@/lib/utils/database-timestamp.schema";
import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { sessionsTableSchema } from "./sessions.table-schema";
import { contentListsTableSchema } from "./content-lists.table-schema";

export const authProvider = pgEnum("auth_provider", ["email", "google", "apple", "github"]);

export const usersTableSchema = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  authProvider: authProvider("auth_provider").notNull().default("email"),
  providerId: varchar("provider_id", { length: 255 }),
  ...databaseTimestampSchema
});

export type UsersTableSchema = typeof usersTableSchema.$inferSelect;
export type UsersTableInsertSchema = typeof usersTableSchema.$inferInsert;

export const usersTableRelations = relations(usersTableSchema, ({ many }) => ({
  sessions: many(sessionsTableSchema, {
    relationName: "sessionsToUser"
  }),
  contentLists: many(contentListsTableSchema, {
    relationName: "contentListsToUser"
  })
}));
