import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { usersTableSchema } from "./users.table-schema";

export const verificationCodeType = pgEnum("verification_code_type", ["sign-in"]);

export const verificationCodesTableSchema = pgTable("verification_codes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull(),
  code: varchar("verification_code", { length: 255 }).notNull(),
  type: verificationCodeType("verification_code_type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  isUsed: boolean("is_used").default(false).notNull()
});

export type VerificationCodesTableSchema = typeof verificationCodesTableSchema.$inferSelect;
export type VerificationCodesTableInsertSchema = typeof verificationCodesTableSchema.$inferInsert;

export const verificationCodesTableRelations = relations(
  verificationCodesTableSchema,
  ({ one }) => ({
    user: one(usersTableSchema, {
      fields: [verificationCodesTableSchema.userId],
      references: [usersTableSchema.id],
      relationName: "verificationCodesToUser"
    })
  })
);
