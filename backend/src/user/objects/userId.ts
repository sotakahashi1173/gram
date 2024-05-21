import { Result, err, ok } from "neverthrow";
import { createId } from "../../common/uuid";

/**
 * ユーザーID 値オブジェクト
 */
export type UserId = newtype<"UserId", string>;

declare const __newtype: unique symbol;

export type newtype<Constructor, Type> = Type & {
  readonly [__newtype]: Constructor;
};

/**
 * ユーザーIDオブジェクト生成関数
 */
export function UserId(value: string | null): Result<UserId, Error> {
  const id = value ?? createId();
  return id ? ok(id as UserId) : err(new Error("Invalid user ID"));
}
