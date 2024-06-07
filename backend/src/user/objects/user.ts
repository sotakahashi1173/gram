import { Result } from "neverthrow";
import { UserId } from "./userId";
import { ValidationError } from "../../err";
import { UserName } from "./name";
import { UserRole } from "./role";
import { tuple } from "../../common/tuple";
import { createId } from "../../common/uuid";

/**
 * 未バリデーションユーザー
 */
export interface UnvalidatedUser {
  kind: "Unvalidated";
  id?: string;
  name: string;
  role: string;
  email: string;
  password: string;
}

/**
 * バリデーション済みユーザー
 */
export interface ValidatedUser {
  kind: "Validated";
  id?: string;
  name: UserName;
  role: UserRole;
  password: string;
}

/**
 * 作成ユーザー
 */
export interface CreatedUser {
  kind: "Created";
  id: UserId;
  name: string;
  role: UserRole;
  password: string;
}

/**
 * 作成済みユーザー
 */
export interface SavedUser {
  kind: "Saved";
  id: string;
  name: string;
  role: UserRole;
  password: string;
}

export type User = UnvalidatedUser | ValidatedUser | CreatedUser | SavedUser;

export interface UserData {
  id: string;
  name: string;
  role: string;
}

export const User = (
  userData: UserData
): Result<User, ValidationError | Error> => {
  const userId = userData.id ? UserId(userData.id) : UserId(createId());
  const name = UserName(userData.name);
  const role = UserRole(userData.role);
  const values = Result.combine(tuple(userId, name, role));
  return values.map(([userId, name, role]) => ({
    id: userId,
    name,
    role,
    kind: "Saved",
  }));
};
