/**
 * Database stub — replace with your ORM / client implementation.
 *
 * Common choices: Prisma, Drizzle, Kysely
 * Install the package of your choice, then replace this file.
 */

// TODO: install your database package (e.g. `npm i prisma @prisma/client`)
//       initialize your schema, then export the client here.

/** Returns the database client. Replace this stub with your actual client. */
export function getDb(): never {
  throw new Error(
    "getDb() is not implemented — see lib/db.ts. TODO: install your DB package (e.g. npm i prisma @prisma/client) and replace this stub.",
  );
}
// Example with Prisma:
// import { PrismaClient } from "@prisma/client";
// const globalForPrisma = globalThis as { prisma?: PrismaClient };
// const db = globalForPrisma.prisma ?? new PrismaClient();
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
// export function getDb() { return db; }
