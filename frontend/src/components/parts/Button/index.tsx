import styled from "@emotion/styled";

interface ButtonProps {
  /**
   * ボタンがプライマリーかどうかを指定する
   */
  variant?: "primary" | "secondary" | "normal";
  /**
   * ボタンの色を指定する
   */
  size?: "small" | "medium" | "large";
  /**
   * ボタンのラベルを指定する
   */
  label: string;
  /**
   * ボタン丸みを指定する
   */
  radius?: string;
  /**
   * ボタンのラベルを指定する
   */
  onClick?: () => void;
}

/**
 * style指定する
 */

export const Button = ({
  variant = "normal",
  size = "medium",
  label = "Button",
  radius = "4px",
  ...props
}: ButtonProps) => {
  //styleを指定する
  const ButtonStyle = styled.button({
    padding: "8px 16px",
    fontWeight: 500,
    color: variant === "primary" ? "#fff" : "#000",
    backgroundColor: variant === "primary" ? "#88511D" : "#FFDCC2",
    borderRadius: radius,
    width: size === "small" ? "80px" : size === "medium" ? "120px" : "160px",
    height: size === "small" ? "32px" : size === "medium" ? "40px" : "48px",
    border: "none",
    fontSize: size === "small" ? "12px" : size === "medium" ? "14px" : "16px",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8,
    },
    "&:active": {
      opacity: 0.6,
    },
  });
  return (
    <ButtonStyle type="button" {...props}>
      {label}
    </ButtonStyle>
  );
};
