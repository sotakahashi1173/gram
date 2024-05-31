import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { Context } from "./context";
import { prisma } from "./infra/documentDB";
import { createUserWorkflow } from "./user/workflow/createUser";
import { getUsers, saveUser } from "./user/repos/userRepository";
import { UnvalidatedUser } from "./user/objects/user";
import { writeFileSync } from "fs";
import { printSchema, lexicographicSortSchema } from "graphql";

export const builder = new SchemaBuilder<{
  Context: Context;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

export const schema = builder.toSchema();

const CreateUserInput = builder.inputType("InputUser", {
  fields: (t) => ({
    name: t.string({ required: true }),
  }),
});
const CreateUser = builder.objectRef<{ name: string }>("CreateUser");
const User = builder.objectRef<{ id: string; name: string }>("User");

CreateUser.implement({
  fields: (t) => ({
    name: t.exposeString("name"),
  }),
});

User.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    name: t.exposeString("name"),
  }),
});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: () => "hello, world!",
    }),
    createUser: t.field({
      type: [CreateUser],
      resolve: () => [
        {
          name: "James",
        },
      ],
    }),
    user: t.field({
      type: User,
      resolve: () => ({
        id: "1",
        name: "James",
      }),
    }),
  }),
});

builder.queryField("Users", (t) =>
  t.field({
    type: [User],
    resolve: (_root, _, context) => {
      const result = getUsers(context)();
      return result.match(
        (users) => {
          return users.map((user) => ({
            id: user.id!,
            name: user.name,
          }));
        },
        (error) => {
          throw error;
        }
      );
    },
  })
);

builder.mutationType({});
builder.mutationField("createUser", (t) =>
  t.field({
    type: CreateUser,
    args: {
      input: t.arg({ type: CreateUserInput, required: true }),
    },
    resolve: (_root, { input }, context) => {
      const unvalidatedUser = {
        name: input.name,
        kind: "Unvalidated",
      } as UnvalidatedUser;

      const result = createUserWorkflow(unvalidatedUser).asyncAndThen(
        saveUser(context)
      );
      return result.match(
        (user) => ({ name: user.name }),
        (error) => {
          throw error;
        }
      );
    },
  })
);

type CreateUserInput = typeof CreateUserInput.$inferInput;
type CreateUser = typeof CreateUser.$inferType;
type User = typeof User.$inferType;

const schemaAsString = printSchema(lexicographicSortSchema(schema));
writeFileSync("../schema.graphql", schemaAsString);
