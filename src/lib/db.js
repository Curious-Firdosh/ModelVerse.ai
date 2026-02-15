import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
});

const adapter = new PrismaPg(pool)

const globalForPrisma = globalThis

export const db = globalForPrisma.prisma ?? new PrismaClient({
    adapter, // 🔥 THIS IS REQUIRED
    // log:
    //     process.env.NODE_ENV === "development"
    //         ? ["query", "info", "warn", "error"]
    //         : ["warn", "error"],
});

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = db;
}




export default db;



