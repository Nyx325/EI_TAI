import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();
export const PORT = Number(process.env.PORT ?? 3000);
export const PAGE_SIZE = Number(process.env.PAGE_SIZE ?? 15);
export const MIN_AGE = Number(process.env.MIN_AGE ?? 18);
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS ?? 10);
export const prisma = new PrismaClient();
await prisma.$connect();
