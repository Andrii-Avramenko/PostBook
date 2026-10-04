import { Outlet } from "react-router-dom";
import { Content, RightSidebar, Wrapper } from "./Layout.styled";
import SideBar from "../SideBar/SideBar";
import { useEffect, useState } from "react";
import { useLogin } from "../LoginContext";

export const Layout = () => {
  const { checkLogin } = useLogin()
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(checkLogin())
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Wrapper>
      <SideBar />
      <Content>
        <Outlet />
      </Content>
      <RightSidebar>
        <form action="get">
          <input type="text" name="search" id="search" placeholder="Search" />
        </form>
        <div>
          <h2>Follow</h2>
        </div>
      </RightSidebar>
    </Wrapper>
  );
};
