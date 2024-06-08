import { builder } from "../../builder";
import { UnvalidatedUser } from "../../../user/objects/user";
import { createUserWorkflow } from "../../../user/workflow/createUser";
import { saveUser } from "../../../user/repos/userRepository";

const CreateUserInput = builder.inputType("InputUser", {
  fields: (t) => ({
    name: t.string({ required: true }),
    role: t.string({ required: true }),
    email: t.string({ required: true }),
    password: t.string({ required: true }),
  }),
});

const CreateUser = builder.objectRef<{ name: string }>("CreateUser");

CreateUser.implement({
  fields: (t) => ({
    name: t.exposeString("name"),
  }),
});

builder.queryType({
  fields: (t) => ({
    createUser: t.field({
      type: [CreateUser],
      resolve: () => [
        {
          name: "James",
          role: "admin",
          email: "test@example.com",
          password: "password",
        },
      ],
    }),
  }),
});

builder.mutationField("createUser", (t) =>
  t.field({
    type: CreateUser,
    args: {
      input: t.arg({ type: CreateUserInput, required: true }),
    },
    resolve: (_root, { input }, context) => {
      const unvalidatedUser = {
        name: input.name,
        role: input.role,
        email: input.email,
        password: input.password,
        kind: "Unvalidated",
      } as UnvalidatedUser;

      const result = createUserWorkflow(unvalidatedUser).asyncAndThen(
        saveUser(context)
      );
      return result.match(
        (user) => ({
          name: user.name,
        }),
        (error) => {
          throw error;
        }
      );
    },
  })
);

type CreateUserInput = typeof CreateUserInput.$inferInput;
type CreateUser = typeof CreateUser.$inferType;
