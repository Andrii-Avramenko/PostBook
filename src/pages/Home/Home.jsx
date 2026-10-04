import PostList from '../../components/PostList/PostList';
import { Page, Posts, Selector, StyledHome } from "./Home.styled";

export const Home = () => {
  return (
    <StyledHome>
      <Selector>
        <Page to='/'>For You</Page>
        <Page to='/following'>Following</Page>
      </Selector>
      <PostList />
    </StyledHome>
  );
};
