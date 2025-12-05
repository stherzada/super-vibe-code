// Mock DB implementation to replace Prisma
const globalForPrisma = global as unknown as { prisma: any };

class MockClient {
  project = {
    findMany: async () => [],
    create: async (args: any) => ({ id: "mock-id", ...args.data }),
    update: async (args: any) => ({ id: args.where.id, ...args.data }),
    delete: async (args: any) => ({ id: args.where.id }),
    findUnique: async () => null,
    count: async () => 0,
  };
  contactMessage = {
    findMany: async () => [],
    create: async (args: any) => ({ id: "mock-id", ...args.data }),
    update: async (args: any) => ({ id: args.where.id, ...args.data }),
    delete: async (args: any) => ({ id: args.where.id }),
    count: async () => 0,
  };
}

export const db = globalForPrisma.prisma || new MockClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
