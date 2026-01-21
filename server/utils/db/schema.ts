import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";

// Users Table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(), // We will hash this later!
  createdAt: timestamp("created_at").defaultNow(),
});

// Tasks Table
export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  completed: boolean("completed").default(false).notNull(),
  userId: uuid("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});
