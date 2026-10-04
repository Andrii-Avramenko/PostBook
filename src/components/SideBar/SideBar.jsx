import { NavLink, useNavigate } from "react-router-dom";
import { Wrapper } from "./SideBar.styled";
import { useLogin } from "../LoginContext";
import LoginButton from "../Buttons/LoginButton";
import PostButton from "../Buttons/PostButton";

const SideBar = ( ) => {
  const navigate = useNavigate();
  const { loggedIn } = useLogin()

  return (
    <Wrapper>
      <h2>PostBook</h2>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/">Following</NavLink>
        </li>
        <li>
          <NavLink>Search</NavLink>
        </li>
        <li>
          <NavLink>Profile</NavLink>
        </li>
        <li>
          <NavLink>Settings</NavLink>
        </li>
      </ul>
      {loggedIn ? (
        <PostButton />
      ) : (
        <LoginButton />
      )}
    </Wrapper>
  );
};

export default SideBar