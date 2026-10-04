import { Link } from "react-router-dom";
import { useLogin } from "../LoginContext";
import { StyledButton } from "./Buttons.styled";

const LoginButton = () => {
  const { loginHighlight, clearLoginHighlight } = useLogin();

  return (
    <Link to="/login">
      <StyledButton
        type="button"
        className={`${loginHighlight ? "highlight" : ""}`}
        onAnimationEnd={clearLoginHighlight}
      >
        Login
      </StyledButton>
    </Link>
  );
};

export default LoginButton;
