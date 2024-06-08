import { getUsers } from "../../../user/repos/userRepository";
import { builder } from "../../builder";
import { SavedUser } from "../../../user/objects/user";

const User = builder.objectRef<Omit<SavedUser, "kind">>("User");

User.implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    name: t.exposeString("name"),
    role: t.exposeString("role"),
    email: t.exposeString("email"),
    password: t.exposeString("password"),
  }),
});

builder.queryType({
  fields: (t) => ({
    user: t.field({
      type: User,
      resolve: () => ({
        id: 1,
        name: "James",
        role: "admin",
        email: "test@example,com",
        password: "password",
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
            role: user.role,
            email: user.email,
            password: user.password,
          }));
        },
        (error) => {
          throw error;
        }
      );
    },
  })
);

type User = typeof User.$inferType;
