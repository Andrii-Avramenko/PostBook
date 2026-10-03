import { useEffect, useState } from "react";
import Post from "../Post/Post";
import { getUserPostsById } from "../../service/api";

const PostList = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserPostsById(user)
      .then(setPosts)
      .catch((err) => console.error(err))
      .finally(setLoading(false));
  }, [user]);

  return (
    <>
      <ul>
        {posts.map((post) => (
          <Post key={post.id} content={post} />
        ))}
      </ul>
      {loading && <p>Loading...</p>}
    </>
  );
};

export default PostList;
