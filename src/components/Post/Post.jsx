import { useState } from "react";
import { like } from "../../service/api";
import { StyledPost } from "./Post.styled";
import { FaHeart } from "react-icons/fa";

const Post = ({ content }) => {
  const { id, body, created_at, replies, author, source } = content;
  const [likes, setLikes] = useState(content.likes);
  const [liked, setLiked] = useState(content.liked);

  const handleLike = () => {
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikes((prev) => prev + (wasLiked ? -1 : 1));

    like(id).catch((err) => {
      console.error(err);
      setLiked(wasLiked);
      setLikes((prev) => prev + (wasLiked ? 1 : -1));
    });
  };

  return (
    <StyledPost>
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
          <FaHeart />
          {likes}
        </button>
        <button type="button">Save</button>
      </div>
    </StyledPost>
  );
};

export default Post;
