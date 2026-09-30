import { useEffect, useState } from "react";
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
          <li>
            <p>@{post.author.username}</p>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
