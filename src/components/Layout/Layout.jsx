import { Outlet } from "react-router-dom";
import { Wrapper } from "./Layout.styled";
import SideBar from '../SideBar/SideBar'
import { useEffect, useState } from "react";
import { checkAcc } from "../../service/api";

export const Layout = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      if (!localStorage.getItem("token")) {
        setLoggedIn(false);
        setIsLoading(false);
        return;
      }
      try {
        const account = await checkAcc();
        console.log(account);
        setLoggedIn(true);
      } catch (err) {
        console.error(err);
        setLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Wrapper>
      <SideBar loggedIn={loggedIn} />
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
