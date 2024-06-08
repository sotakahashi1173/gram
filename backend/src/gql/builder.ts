import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import PothosRelayPlugin from "@pothos/plugin-relay";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import { Context } from "../context";
import PothosSimpleObjectsPlugin from "@pothos/plugin-simple-objects";
import { prisma } from "../infra/documentDB";

export const builder = new SchemaBuilder<{
  AuhScopes: {
    loggedIn: boolean;
    admin: boolean;
    member: boolean;
  };
  Context: Context;
}>({
  plugins: [
    PrismaPlugin,
    PothosSimpleObjectsPlugin,
    ScopeAuthPlugin,
    PothosRelayPlugin,
  ],
  prisma: {
    client: prisma,
  },
  authScopes: async (ctx: Context) => ({
    loggedIn: !!ctx.user,
    admin: ctx.user?.role === "ADMIN",
    member: ctx.user?.role === "MEMBER",
  }),
  relayOptions: {},
});
builder.queryType();
builder.mutationType();
