import { useEffect, useState } from "react";
import Post from '../components/Post/Post'
import { getFeed } from "../service/api";

export const Home = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    getFeed()
      .then((res) => {
        setFeed(res.posts);
      })
      .catch((err) => console.error(err))
      .finally(console.log("Finished request"));
  }, []);

  return (
    <>
      <ul>
        {feed.map((post) => (
          <Post key={post.id} content={post}/>
        ))}
      </ul>
    </>
  );
};
