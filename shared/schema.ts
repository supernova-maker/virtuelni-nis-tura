import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const businesses = pgTable("businesses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  hours: text("hours").notNull(),
  rating: real("rating").notNull().default(0),
  imageUrl: text("image_url").notNull(),
  panoramaUrl: text("panorama_url"),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  websiteUrl: text("website_url"),
  emailAddress: text("email_address"),
  socialMedia: text("social_media"), // JSON string za Instagram, Facebook linkove
  menuUrl: text("menu_url"), // Link ka meniju ili PDF
  onlineOrderingUrl: text("online_ordering_url"), // Link za online naručivanje
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const panoramas = pgTable("panoramas", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  hotspots: text("hotspots").array(),
  viewCount: integer("view_count").default(0),
  isPublic: text("is_public").default("true"), // boolean kao string
  tags: text("tags").array(), // tagovi za lakše pretraživanje
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const insertBusinessSchema = createInsertSchema(businesses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPanoramaSchema = createInsertSchema(panoramas).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertBusiness = z.infer<typeof insertBusinessSchema>;
export type Business = typeof businesses.$inferSelect;
export type InsertPanorama = z.infer<typeof insertPanoramaSchema>;
export type Panorama = typeof panoramas.$inferSelect;
