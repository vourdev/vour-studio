import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull(),
  whatsapp: text(),
  message: text().notNull(),
  /** Which page the form was submitted from, so traffic sources stay traceable. */
  sourcePage: text("source_page").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const newsletterSubscribers = sqliteTable("newsletter_subscribers", {
  id: integer().primaryKey({ autoIncrement: true }),
  email: text().notNull().unique(),
  subscribedAt: integer("subscribed_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
