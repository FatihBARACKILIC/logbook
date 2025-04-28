import { timestamp } from "drizzle-orm/pg-core";

export const databaseTimestampSchema = {
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .defaultNow()
    .$onUpdateFn(() => new Date()),
  deletedAt: timestamp("deleted_at", { mode: "date" })
};
