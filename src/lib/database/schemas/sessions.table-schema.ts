import { relations } from "drizzle-orm";
import { inet, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { usersTableSchema } from "./users.table-schema";

export const sessionsTableSchema = pgTable("sessions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
  tokenUpdatedAt: timestamp("token_updated_at", { mode: "date" }),
  lastActivityAt: timestamp("last_activity_at", { mode: "date" })
    .defaultNow()
    .$onUpdateFn(() => new Date()),
  ipAddress: inet("ip_address"),
  userAgent: varchar("user_agent", { length: 255 })
});

export type SessionsTableSchema = typeof sessionsTableSchema.$inferSelect;
export type SessionsTableInsertSchema = typeof sessionsTableSchema.$inferInsert;

export const sessionsTableRelations = relations(sessionsTableSchema, ({ one }) => ({
  user: one(usersTableSchema, {
    fields: [sessionsTableSchema.userId],
    references: [usersTableSchema.id],
    relationName: "sessionsToUser"
  })
}));
