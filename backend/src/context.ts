import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export type Context = {
  req: Request;
  prisma: PrismaClient;
};
