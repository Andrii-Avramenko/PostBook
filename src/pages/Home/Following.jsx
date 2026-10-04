import { useState } from "react";
import Post from "../../components/Post/Post";
import { Posts } from "./Home.styled";
import PostList from "../../components/PostList/PostList";

export const Following = () => {
  const [feed, setFeed] = useState([]);
  return (
    <PostList following />
  );
};
