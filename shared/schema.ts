import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: text("date").notNull(),
  month: text("month").notNull(),
  time: text("time").notNull(),
  preacher: text("preacher").notNull(),
  location: text("location"),
  special: text("special"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const news = pgTable("news", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  date: timestamp("date").notNull().defaultNow(),
  imageUrl: text("image_url"),
  featured: integer("featured").notNull().default(0),
});

export const councilMembers = pgTable("council_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  category: text("category").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export const insertNewsSchema = createInsertSchema(news).omit({
  id: true,
  date: true,
});

export const insertCouncilMemberSchema = createInsertSchema(councilMembers).omit({
  id: true,
});

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type News = typeof news.$inferSelect;
export type InsertNews = z.infer<typeof insertNewsSchema>;

export type CouncilMember = typeof councilMembers.$inferSelect;
export type InsertCouncilMember = z.infer<typeof insertCouncilMemberSchema>;

export interface ChurchInfo {
  name: string;
  fullName: string;
  founded: string;
  members: number;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  youtubeChannel: string;
  facebookUrl: string;
}

export interface AboutContent {
  identity: string;
  history: string;
  vision: string;
  safetyStatement: string;
}
