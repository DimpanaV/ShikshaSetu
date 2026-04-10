import { pgTable, text, serial, integer, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const progressTable = pgTable("progress", {
  id: serial("id").primaryKey(),
  topic: text("topic").notNull(),
  subject: text("subject").notNull(),
  score: integer("score").notNull(),
  total: integer("total").notNull(),
  percent: real("percent").notNull(),
  language: text("language").notNull().default("English"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProgressSchema = createInsertSchema(progressTable).omit({ id: true, createdAt: true });
export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type Progress = typeof progressTable.$inferSelect;
