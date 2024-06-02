import styled from "@emotion/styled";
import { useState } from "react";

interface InputProps {
  /**
   * Input のラベルを指定する
   */
  label: string;
}

export const Input = ({ label = "Input" }: InputProps) => {
  // styleを指定する
  const InputStyle = styled.input({
    padding: "12px 20px 0px 12px",
    fontWeight: 500,
    color: "#000",
    backgroundColor: "#EFE0D6",
    borderRadius: "2px 2px 0px 0px",
    width: "210px",
    height: "40px",
    fontSize: "14px",
    border: "none",
    borderBottom: "1px solid #51443B",
    boxSizing: "border-box",
    outline: "none",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    "&:focus": {
      outline: "none",
      borderBottom: "2px solid #88511D",
      borderTop: "2px solid #EFE0D6",
    },
    "&:focus + label": {
      color: "#88511D",
      fontSize: "10px",
      transform: "translateY(-12px)",
      transition: "0.1s ease-in-out",
    },
    "&:not(:placeholder-shown) + label": {
      fontSize: "10px",
      transform: "translateY(-12px)",
    },
  });

  const LabelStyle = styled.label({
    position: "absolute",
    color: "#51443B",
    fontSize: "12px",
    fontWeight: 500,
    paddingLeft: "12px",
    paddingTop: "8%",
  });

  const InputContainer = styled.div({
    display: "flex",
    position: "relative",
    width: "80%",
    margin: "40px 3%",
  });

  const [value, setValue] = useState("");

  return (
    <InputContainer>
      <InputStyle
        value={value}
        placeholder=""
        type="text"
        onChange={(event) => setValue(event.target.value)}
      />
      <LabelStyle>{label}</LabelStyle>
    </InputContainer>
  );
};
