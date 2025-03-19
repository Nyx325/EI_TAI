import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

export const PORT = Number(process.env.PORT ?? 3000);
export const PAGE_SIZE = Number(process.env.PAGE_SIZE ?? 15);
export const prisma = new PrismaClient();
