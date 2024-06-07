import { validatePassword } from "../../user/objects/password";

describe("validatePassword", () => {
  it("should return true if password is valid", () => {
    const password = "Password123!";
    expect(validatePassword(password)).toBe(true);
  });

  it("should return false if password without a special character", () => {
    const password = "Password123";
    expect(validatePassword(password)).toBe(false);
  });

  it("should return false if password without number", () => {
    const password = "Password!";
    expect(validatePassword(password)).toBe(false);
  });

  it("should return false if password less than 8 character", () => {
    const password = "!Pas23";
    expect(validatePassword(password)).toBe(false);
  });

  it("should return false if password without upper case", () => {
    const password = "password123!";
    expect(validatePassword(password)).toBe(false);
  });

  it("should return false if password without lower case", () => {
    const password = "PASSWORD123!";
    expect(validatePassword(password)).toBe(false);
  });
});
