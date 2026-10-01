import { useState } from "react";
import { like } from "../../service/api";

const Post = ({ content }) => {
  const { id, body, created_at, replies, author, source } = content;
  const [likes, setLikes] = useState(content.likes);
  const [liked, setLiked] = useState(content.liked);

  const handleLike = (e) => {
    like(id)
      .then((res) => {
        setLiked(res.liked);
        setLikes(likes + 1);
      })
      .catch((err) => console.error(err));
  };

  return (
    <li>
      <div></div>
      <div>
        <p>@{author.username}</p>
        <p>{Date.parse(created_at)}</p>
        <button type="button">Follow</button>
      </div>
      <div>{body}</div>
      <div>
        <button
          type="button"
          className={liked ? "liked" : ""}
          onClick={handleLike}
        >
          Likes: {likes}
        </button>
        <button type="button">Save</button>
      </div>
    </li>
  );
};

export default Post;
