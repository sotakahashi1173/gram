import { ResultAsync, ok } from "neverthrow";
import { Context } from "../../schema";
import { UserId } from "../objects/userId";
import { ValidationError } from "apollo-server-express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { User } from "../objects/user";

export const getByUserId =
  ({ prisma }: Context) =>
  (
    userId: UserId
  ): ResultAsync<
    User | null,
    ValidationError | PrismaClientKnownRequestError | Error
  > =>
    ResultAsync.fromPromise(
      prisma.user.findUnique({
        where: { id: userId },
      }),
      // TODO: 共通化し関数化する
      () =>
        new PrismaClientKnownRequestError("Error", {
          code: "",
          clientVersion: "",
        })
    ).andThen((user) => (user ? User(user) : ok(null)));
