import { databaseTimestampSchema } from "@/lib/utils/database-timestamp.schema";
import { integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["not-started", "in-progress", "completed", "was-left"]);

export const contentsTableSchema = pgTable("contents", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  listId: integer("list_id").notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  creationYear: integer("creation_year"),
  season: integer("season"),
  episode: integer("episode"),
  status: statusEnum("status").notNull().default("not-started"),
  description: varchar("description", { length: 1024 }),
  ...databaseTimestampSchema
});
