import { pgTable, text, integer, real, uuid, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Businesses table
export const businesses = pgTable('businesses', {
  id: uuid('id').primaryKey().defaultRandom(),
  naziv: text('naziv').notNull(),
  opis: text('opis').notNull(),
  adresa: text('adresa').notNull(),
  telefon: text('telefon'),
  website: text('website'),
  email: text('email'),
  kategorija: text('kategorija').notNull(),
  ocena: real('ocena').default(0).notNull(),
  latituda: real('latituda'),
  longituda: real('longituda'),
  panoramaUrl: text('panorama_url'),
  slike: text('slike').array(),
  radnoVreme: jsonb('radno_vreme'),
  socialMediaLinks: jsonb('social_media_links'),
  onlineNarudzbina: text('online_narudzbina'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Panoramas table
export const panoramas = pgTable('panoramas', {
  id: uuid('id').primaryKey().defaultRandom(),
  naziv: text('naziv').notNull(),
  opis: text('opis'),
  url: text('url').notNull(),
  tip: text('tip').notNull(), // 'business', 'landmark', 'street'
  lokacija: text('lokacija'),
  latituda: real('latituda'),
  longituda: real('longituda'),
  hotspots: jsonb('hotspots'), // JSON array of hotspot data
  javno: integer('javno').default(1).notNull(), // 0 = private, 1 = public
  brojPogleda: integer('broj_pogleda').default(0).notNull(),
  tagovi: text('tagovi').array(),
  businessId: uuid('business_id').references(() => businesses.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Insert schemas
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

// Types
export type Business = typeof businesses.$inferSelect;
export type InsertBusiness = z.infer<typeof insertBusinessSchema>;

export type Panorama = typeof panoramas.$inferSelect;
export type InsertPanorama = z.infer<typeof insertPanoramaSchema>;