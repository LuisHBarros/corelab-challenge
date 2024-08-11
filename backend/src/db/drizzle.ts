import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schemas";
import { env } from "@/env";

const client = postgres(env.DB_URL);
export const db = drizzle(client, { schema });
