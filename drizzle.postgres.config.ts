import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required for Postgres migrations.");

export default defineConfig({
  out: "./drizzle-pg",
  schema: "./db/pg-schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: databaseUrl },
});
