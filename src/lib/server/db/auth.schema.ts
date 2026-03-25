import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const devProfiles = pgTable("dev_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  title: text("title").notNull(),
  github: text("github").notNull(),
  cvUrl: text("cv_url"),
  imageUrl: text("image_url"), // nouveau
  createdAt: timestamp("created_at").defaultNow(),
});