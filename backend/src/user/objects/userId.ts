import { Result, err, ok } from "neverthrow";

/**
 * ユーザーID 値オブジェクト
 */
export type UserId = newtype<"UserId", number>;

declare const __newtype: unique symbol;

export type newtype<Constructor, Type> = Type & {
  readonly [__newtype]: Constructor;
};

/**
 * ユーザーIDオブジェクト生成関数
 */
export function UserId(value: number | null): Result<UserId, Error> {
  // TODO: RelayのIDを作成するように修正
  const id = value ?? 100;
  return id ? ok(id as UserId) : err(new Error("Invalid user ID"));
}
