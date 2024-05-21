import { Result, ok } from "neverthrow";
import { UserId } from "./userId";
import { ValidationError } from "apollo-server-express";
import { UserName } from "./name";
import { tuple } from "../../common/tuple";
import { createId } from "../../common/uuid";

/**
 * 未バリデーションユーザー
 */
export interface UnvalidatedUser {
  kind: "Unvalidated";
  id?: string;
  name: string;
}

/**
 * バリデーション済みユーザー
 */
export interface ValidatedUser {
  kind: "Validated";
  id?: string;
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

export interface User {
  id: UserId;
  name: UserName;
}

export const User = (
  userInput: User
): Result<User, ValidationError | Error> => {
  const userId = userInput.id ? UserId(userInput.id) : UserId(createId());
  const name = UserName(userInput.name);
  const values = Result.combine(tuple(userId, name));
  return values.map(([id, name]) => ({
    ...userInput,
    id,
    name,
  }));
};
