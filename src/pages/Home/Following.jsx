import PostList from "../../components/PostList/PostList";
import { Page, Selector, StyledHome } from "./Home.styled";

export const Following = () => {
  return (
    <StyledHome>
      <Selector>
        <Page to="/">For You</Page>
        <Page to="/following">Following</Page>
      </Selector>
      <PostList following />
    </StyledHome>
  );
};
