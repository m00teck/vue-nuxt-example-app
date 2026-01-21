import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./server/utils/db/schema.ts",
  out: "./server/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
