import { timestamp } from "drizzle-orm/pg-core";

/**
 * Defines a schema for database timestamp fields.
 *
 * This schema includes:
 * - `createdAt`: A timestamp field that defaults to the current date and time when a record is created.
 * - `updatedAt`: A timestamp field that defaults to the current date and time when a record is created, and updates to the current date and time whenever the record is updated.
 * - `deletedAt`: A timestamp field that can be used to mark when a record was deleted (soft delete).
 *
 * @example
 * ```ts
 * import { pgTable, integer } from "drizzle-orm/pg-core";
 * import { databaseTimestampSchema } from "@/lib/utils/database-timestamp.schema";
 *
 * const exampleSchema = pgTable("example", {
 *   id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
 *   ...databaseTimestampSchema
 * });
 * ```
 */
export const databaseTimestampSchema = {
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .defaultNow()
    .$onUpdateFn(() => new Date()),
  deletedAt: timestamp("deleted_at", { mode: "date" })
};
