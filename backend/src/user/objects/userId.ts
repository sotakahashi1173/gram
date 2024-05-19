import { Result, err, ok } from "neverthrow";
import { createId } from "../../common/uuid";

export type UserId = newtype<"UserId", string>;

declare const __newtype: unique symbol;

export type newtype<Constructor, Type> = Type & {
  readonly [__newtype]: Constructor;
};

/**
 * ユーザーID 値オブジェクト
 */
export function UserId(value?: string): Result<UserId, Error> {
  const userId = value || createId();
  return ok(userId as UserId) || err(new Error("Failed"));
}
