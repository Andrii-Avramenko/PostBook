import { useLogin } from '../../components/LoginContext';
import PostList from '../../components/PostList/PostList';
import { Page, Selector, StyledHome } from "./Home.styled";

export const Home = () => {
  const { loggenIn } = useLogin()

  return (
    <StyledHome>
      <Selector>
        <Page to='/' reloadDocument>For You</Page>
        <Page to='/following'>Following</Page>
      </Selector>
      <PostList />
    </StyledHome>
  );
};
