import { useState } from "react";
import Post from "../../components/Post/Post";
import { Posts } from "./Home.styled";

export const Following = () => {
  const [feed, setFeed] = useState([]);
  return (
    <Posts>
      {feed.map((post) => (
        <Post key={post.id} content={post} />
      ))}
    </Posts>
  );
};
