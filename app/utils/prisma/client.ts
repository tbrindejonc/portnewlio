import {PrismaClient} from '@prisma/client';

// register global prisma client
const globalForPrisma = global as unknown as {prisma: PrismaClient};

// create singleton prisma client
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
