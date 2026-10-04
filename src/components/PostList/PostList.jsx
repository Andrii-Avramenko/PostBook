import { useEffect, useState } from "react";
import Post from "../Post/Post";
import {
  follow,
  getFeed,
  getUserPostsById,
  like,
  save,
} from "../../service/api";

const actions = {
  like: {
    scope: "post",
    api: like,
    toggle: (p) => ({
      ...p,
      liked: !p.liked,
      likes: p.likes + (p.liked ? -1 : 1),
    }),
  },
  save: {
    scope: "post",
    api: save,
    toggle: (p) => ({ ...p, saved: !p.saved }),
  },
  follow: {
    scope: "user",
    api: follow,
    toggle: (p) => ({ ...p, followed: !p.followed }),
  },
};

const PostList = ({ user, following }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!!user) {
      getUserPostsById(user)
        .then(setPosts)
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else if (following) {
      console.log("following");
      setLoading(false)
    } else {
      getFeed()
        .then((res) => {
          setPosts(res.posts);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user, following]);

  const handleInteract = (e) => {
    const button = e.target.closest("[data-action]");
    if (!button) return;

    const { action, post, user: authorId } = button.dataset
    const config = actions[action];
    if (!config) return;

    const isUserScope = config.scope === "user";
    const targetId = isUserScope ? authorId : post;

    const matches = (p) =>
      isUserScope
        ? String(p.author.id) === targetId
        : String(p.id) === targetId;

    const apply = () =>
      setPosts((prev) => prev.map((p) => (matches(p) ? config.toggle(p) : p)));

    apply();

    config.api(targetId).catch((err) => {
      console.error(err);
      apply();
    });
  };

  return (
    <>
      <ul onClick={handleInteract}>
        {posts.map((post) => (
          <Post key={post.id} content={post} />
        ))}
      </ul>
      {loading && <p>Loading...</p>}
    </>
  );
};

export default PostList;
