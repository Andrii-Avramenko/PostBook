import { useEffect, useState } from "react";
import Post from "../Post/Post";
import {
  follow,
  getFeed,
  getFollowing,
  getUserPostsById,
  like,
  save,
} from "../../service/api";
import { useLogin } from "../LoginContext";

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
  const [hasMore, setHasMore] = useState(false);
  const [nextBefore, setNextBefore] = useState(null);

  const { promptLogin, loggedIn } = useLogin();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setHasMore(false);
    setNextBefore(null);

    const request = user
      ? getUserPostsById(user)
      : following
        ? getFollowing().then((res) => res.posts)
        : getFeed().then((res) => res.posts);

    request
      .then((posts) => {
        if (!cancelled) setPosts(posts);
      })
      .catch((err) => {
        if (!cancelled) {
          console.error(err);
          setPosts([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user, following]);

  const handleInteract = (e) => {
    const button = e.target.closest("[data-action]");
    if (!button) return;

    if (!loggedIn) {
      promptLogin();
      return;
    }

    const { action, post, user: authorId } = button.dataset;
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
