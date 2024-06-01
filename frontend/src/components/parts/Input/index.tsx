import styled from "@emotion/styled";

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
    borderRadius: "4px",
    width: "210px",
    height: "40px",
    fontSize: "14px",
    border: "0px solid #000",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    "&:focus": {
      borderBottom: "1px #51443B",
      outline: "none",
    },
  });

  const LabelStyle = styled.label({
    position: "absolute",
    color: "#51443B",
    fontSize: "12px",
    fontWeight: 500,
    marginBottom: "8px",
    paddingLeft: "12px",
    paddingTop: "3px",
  });

  const InputContainer = styled.div({
    display: "flex",
    position: "relative",
    width: "80%",
    margin: "40px 3%",
    "& input:text": {
      boxSize: "border-box",
      letterSpacing: "1px",
      paddingLeft: "4em",
    },
    "& input:text:focus": {
      outline: "none",
    },
  });

  return (
    <InputContainer>
      <InputStyle type="text" />
      <LabelStyle>{label}</LabelStyle>
    </InputContainer>
  );
};
