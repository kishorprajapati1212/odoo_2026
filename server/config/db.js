import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import pg from "pg";

dotenv.config();

export const prisma = new PrismaClient();

const { Pool } = pg;
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,
});

export async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected via Prisma");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}
