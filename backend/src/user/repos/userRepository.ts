import { ResultAsync, ok } from "neverthrow";
import { Context } from "../../context";
import { ValidationError } from "apollo-server-express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { User } from "../objects/user";

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
  id: string;
  name: string;
}

export const saveUser =
  ({ prisma }: Context) =>
  (model: User): ResultAsync<UserData, Error> => {
    const { id, name } = model;
    return ResultAsync.fromPromise(
      prisma.user.create({
        data: { id, name },
      }),
      () => new Error("Failed to save user on MongoDB.")
    );
  };
