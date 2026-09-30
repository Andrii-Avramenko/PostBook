import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { SideHeader, Wrapper } from "./Layout.styled";
import { useEffect, useState } from "react";
import { checkAcc } from "../../service/api";

export const Layout = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      if (!localStorage.getItem("token")) {
        setIsLoading(false);
        return;
      }
      try {
        const account = await checkAcc();
        console.log(account);
        setLoggedIn(true);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Wrapper>
      <SideHeader>
        <h2>PostBook</h2>
        <ul>
          <li>
            <NavLink>Home</NavLink>
          </li>
          <li>
            <NavLink>Search</NavLink>
          </li>
          <li>
            <NavLink>Profile</NavLink>
          </li>
        </ul>
        {loggedIn ? (
          <button type="button">Make a post</button>
        ) : (
          <button type="button" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </SideHeader>
      <Outlet />
      <aside>
        <form action="get">
          <input type="text" name="search" id="search" placeholder="Search" />
        </form>
        <div>
          <h2>Follow</h2>
        </div>
      </aside>
    </Wrapper>
  );
};
