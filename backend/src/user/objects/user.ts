import { Result } from "neverthrow";
import { UserId } from "./userId";
import { ValidationError } from "../../err";
import { UserName } from "./name";
import { UserRole } from "./role";
import { tuple } from "../../common/tuple";
import { Email } from "./email";
import { Password } from "./password";

/**
 * 未バリデーションユーザー
 */
export interface UnvalidatedUser {
  kind: "Unvalidated";
  id?: number;
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
  id?: number;
  name: UserName;
  role: UserRole;
  email: Email;
  password: Password;
}

/**
 * 作成ユーザー
 */
export interface CreatedUser {
  kind: "Created";
  id: number;
  name: string;
  role: UserRole;
  email: Email;
  password: Password;
}

/**
 * 作成済みユーザー
 */
export interface SavedUser {
  kind: "Saved";
  id: number;
  name: string;
  role: string;
  email: string;
  password: Password;
}

export type User = UnvalidatedUser | ValidatedUser | CreatedUser | SavedUser;

export interface UserData {
  id: number;
  name: string;
  role: string;
  email: string;
  password: string;
}

export const User = (
  userData: UserData
): Result<User, ValidationError | Error> => {
  const userId = UserId(userData.id);
  const name = UserName(userData.name);
  const role = UserRole(userData.role);
  const email = Email(userData.email);
  const password = Password(userData.password);
  const values = Result.combine(tuple(userId, name, role, email, password));
  return values.map(([userId, name, role, email, password]) => ({
    id: userId,
    name,
    role,
    email,
    password,
    kind: "Saved",
  }));
};
