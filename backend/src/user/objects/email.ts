import { Result, ok, err } from "neverthrow";
import { ValidationError } from "../../err";

/**
 * email
 */
export type Email = string;

/**
 * emialオブジェクト生成関数
 */
export function Email(value: string): Result<Email, ValidationError> {
  return validate(value)
    ? ok(value as Email)
    : err(new ValidationError("Invalid Email"));
}

/**
 * emailのバリデーション
 * emialのフォーマットが正しければtrueを返す
 */
const validate = (value: string): boolean => {
  const atIndex = value.indexOf("@");
  const dotIndex = value.lastIndexOf(".");
  return atIndex > 0 && dotIndex > atIndex;
};
