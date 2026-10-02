import { NavLink, useNavigate } from "react-router-dom";
import { Wrapper } from "./SideBar.styled";

const SideBar = ({ loggedIn }) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <h2>PostBook</h2>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
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
        <button type="button" onClick={() => navigate("/newpost")}>
          Make a post
        </button>
      ) : (
        <button type="button" onClick={() => navigate("/login")}>
          Login
        </button>
      )}
    </Wrapper>
  );
};

export default SideBar