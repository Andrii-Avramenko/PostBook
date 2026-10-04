import { Navigate, Outlet } from "react-router-dom";
import { Content, RightSidebar, Wrapper } from "./Layout.styled";
import SideBar from "../SideBar/SideBar";
import { useEffect, useState } from "react";
import { useLogin } from "../LoginContext";
import { InfinitySpin } from "react-loader-spinner";
import { useTheme } from "styled-components";
import { NotFound } from "../../pages/NotFound/NotFound";

export const Layout = () => {
  const { online, checkLogin } = useLogin();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null)
  const theme = useTheme();

  useEffect(() => {
    setIsLoading(true);
    checkLogin()
      .catch((err) => {
        console.warn(err.response)
        if (!err.response) {
          setError("Can't reach the server. Is it running?");
        } else if (err.response.status !== 401) {
          setError("Something went wrong on the server.");
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return <InfinitySpin width="200" color={theme.colors.accent} margin="auto"/>;
  if (!online) return <Navigate to="/error" state={{code: 503}} />

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
