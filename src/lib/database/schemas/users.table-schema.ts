import { databaseTimestampSchema } from "@/lib/utils/database-timestamp.schema";
import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { verificationCodesTableSchema } from "./verification-codes.table-schema";

export const usersTableSchema = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  ...databaseTimestampSchema
});

export type UsersTableSchema = typeof usersTableSchema.$inferSelect;
export type UsersTableInsertSchema = typeof usersTableSchema.$inferInsert;

export const usersTableRelations = relations(usersTableSchema, ({ many }) => ({
  verificationCodes: many(verificationCodesTableSchema, {
    relationName: "verificationCodesToUser"
  })
}));
