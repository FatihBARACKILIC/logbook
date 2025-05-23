import { databaseTimestampSchema } from "@/lib/utils/database-timestamp.schema";
import { relations } from "drizzle-orm";
import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { usersTableSchema } from "./users.table-schema";
import { contentsTableSchema } from "./contents.table-schema";

export const contentListsTableSchema = pgTable("content_lists", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull(),
  uuid: uuid("uuid").notNull().defaultRandom(),
  title: varchar("title", { length: 256 }).notNull(),
  description: varchar("description", { length: 512 }),
  ...databaseTimestampSchema
});

export type ContentListsTableSchema = typeof contentListsTableSchema.$inferSelect;
export type ContentListsInsertTableSchema = typeof contentListsTableSchema.$inferInsert;

export const contentListsTableRelations = relations(contentListsTableSchema, ({ one, many }) => ({
  user: one(usersTableSchema, {
    fields: [contentListsTableSchema.userId],
    references: [usersTableSchema.id],
    relationName: "contentListsToUser"
  }),
  contents: many(contentsTableSchema, {
    relationName: "contentListsToContents"
  })
}));
