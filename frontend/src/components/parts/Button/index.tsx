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
   * ボタンをクリックした際の処理を指定する
   */
  onClick?: () => void;
}

/**
 * ボタンコンポーネント
 */
const Button = ({
  variant = "normal",
  size = "medium",
  label = "Button",
  radius = "4px",
  ...props
}: ButtonProps) => {
  const ButtonStyle = getButtonStyle(variant, size, radius);
  return (
    <ButtonStyle type="button" {...props}>
      {label}
    </ButtonStyle>
  );
};

//styleを指定する
const getButtonStyle = (variant: string, size: string, radius: string) =>
  styled.button({
    padding: "8px 16px",
    fontWeight: 500,
    color: variant === "primary" ? "#fff" : "#000",
    backgroundColor: variant === "primary" ? "#88511D" : "#FFDCC2",
    borderRadius: radius,
    width: size === "small" ? "80px" : size === "medium" ? "120px" : "160px",
    height: size === "small" ? "32px" : size === "medium" ? "40px" : "48px",
    border: "none",
    fontSize: size === "small" ? "12px" : size === "medium" ? "14px" : "16px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8,
    },
    "&:active": {
      opacity: 0.6,
    },
  });

export default Button;
