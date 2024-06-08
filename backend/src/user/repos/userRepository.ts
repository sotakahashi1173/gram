import { ResultAsync, ok } from "neverthrow";
import { Context } from "../../context";
import { ValidationError } from "../../err";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CreatedUser, User } from "../objects/user";

export const getUsers =
  ({ prisma }: Context) =>
  (): ResultAsync<
    User[],
    ValidationError | PrismaClientKnownRequestError | Error
  > =>
    ResultAsync.fromPromise(
      prisma.user.findMany(),
      () =>
        new PrismaClientKnownRequestError("Error", {
          code: "",
          clientVersion: "",
        })
    ).andThen((users) => {
      const usersList: User[] = [];
      for (const user of users) {
        const exportUser = User(user);
        usersList.push(
          exportUser.match(
            (user) => user,
            (error) => {
              throw error;
            }
          )
        );
      }
      return ok(usersList);
    });

interface UserData {
  id: number;
  name: string;
  role: string;
  email: string;
  password: string;
}

export const saveUser =
  (context: Context) =>
  (model: CreatedUser): ResultAsync<UserData, Error> => {
    const { id, name, role, email, password } = model;
    return ResultAsync.fromPromise(
      context.prisma.user.create({
        data: { id, name, role, email, password },
      }),
      () => new Error("Failed to save user on MongoDB.")
    );
  };
