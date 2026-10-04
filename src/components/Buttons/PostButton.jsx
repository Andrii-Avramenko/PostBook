import { Link } from "react-router-dom";
import { StyledButton } from "./Buttons.styled";

const PostButton = () => {
  return (
    <Link to="/newpost">
      <StyledButton type="button">Make post</StyledButton>
    </Link>
  );
};

export default PostButton;
