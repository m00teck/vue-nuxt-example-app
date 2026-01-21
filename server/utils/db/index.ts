import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// This will use the DATABASE_URL from your .env file automatically
const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient, { schema });
