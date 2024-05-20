import { Result, ok } from "neverthrow";
import { UserId } from "./userId";
import { ValidationError } from "apollo-server-express";
import { UserName } from "./name";
import { tuple } from "../../common/tuple";

/**
 * 未バリデーションユーザー
 */
export interface UnvalidatedUser {
  kind: "Unvalidated";
  name: string;
}

/**
 * バリデーション済みユーザー
 */
export interface ValidatedUser {
  kind: "Validated";
  name: UserName;
}

/**
 * 作成ユーザー
 */
export interface CreatedUser {
  kind: "Created";
  id: UserId;
  name: string;
}

export type User = UnvalidatedUser | ValidatedUser | CreatedUser;

export interface UserInput {
  id: string;
  name: string;
}

export const User = (
  userInput: UserInput
): Result<User, ValidationError | Error> => {
  const userId = UserId(userInput.id);
  const name = UserName(userInput.name);
  const values = Result.combine(tuple(userId, name));
  return values.map(([id, name]) => ({
    ...userInput,
    kind: "Created",
    id,
    name,
  }));
};
