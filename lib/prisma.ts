// import { PrismaClient } from "@prisma/client";

// let prisma: PrismaClient;

// declare const globalThis: {
//   prisma: PrismaClient;
// };

// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient();
// } else {
//   if (!globalThis.prisma) {
//     globalThis.prisma = new PrismaClient();
//   }

//   prisma = globalThis.prisma;
// }

// export default prisma;

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
