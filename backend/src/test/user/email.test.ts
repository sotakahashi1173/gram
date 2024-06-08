import { validateEmail } from "../../user/objects/email";

describe("Email Validation", () => {
  test("valid email should pass", () => {
    const result = validateEmail("test@example.com");
    expect(result.isValid).toBe(true);
  });

  test("empty email should fail", () => {
    const result = validateEmail("");
    expect(result.isValid).toBe(false);
    expect(result.error).toContain("メールアドレスを入力してください。");
  });

  test("invalid email format should fail", () => {
    const result = validateEmail("invalid-email");
    expect(result.isValid).toBe(false);
    expect(result.error).toContain("無効なメールアドレス形式です。");
  });

  test('email missing "@" symbol should fail', () => {
    const result = validateEmail("example.com");
    expect(result.isValid).toBe(false);
    expect(result.error).toContain("無効なメールアドレス形式です。");
  });

  test("email missing domain part should fail", () => {
    const result = validateEmail("test@.com");
    expect(result.isValid).toBe(false);
    expect(result.error).toContain("無効なメールアドレス形式です。");
  });
});
