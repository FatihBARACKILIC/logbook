import { databaseTimestampSchema } from "@/lib/utils/database-timestamp.schema";
import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { contentListsTableSchema } from "./content-lists.table-schema";

export const statusEnum = pgEnum("status", ["not-started", "in-progress", "completed", "was-left"]);

export const contentsTableSchema = pgTable("contents", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  listId: integer("list_id").notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  creationYear: integer("creation_year"),
  season: integer("season").notNull().default(1),
  episode: integer("episode").notNull().default(0),
  status: statusEnum("status").notNull().default("not-started"),
  description: varchar("description", { length: 1024 }),
  ...databaseTimestampSchema
});

export type ContentsTableSchema = typeof contentsTableSchema.$inferSelect;
export type ContentsInsertTableSchema = typeof contentsTableSchema.$inferInsert;

export const contentsTableRelations = relations(contentsTableSchema, ({ one }) => ({
  lists: one(contentListsTableSchema, {
    fields: [contentsTableSchema.listId],
    references: [contentListsTableSchema.id],
    relationName: "contentListsToContents"
  })
}));
