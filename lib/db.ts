import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Use a global variable to prevent multiple instances in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
