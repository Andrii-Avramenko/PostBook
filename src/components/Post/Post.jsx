import { useState } from "react";
import { like } from "../../service/api";
import { Button, Interactions, StyledPost } from "./Post.styled";
import { FiHeart, FiBookmark } from "react-icons/fi";

const Post = ({ content }) => {
  const { age_hours, id, body, replies, author, source } = content;
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

  const postTime = () => {
    const age_minutes = age_hours * 60
    const age_seconds = age_minutes * 60

    if (age_seconds < 60) return `${Math.round(age_seconds)}s`
    else if (age_minutes < 60) return `${Math.round(age_minutes)}m`
    else return `${Math.round(age_hours)}h`
  }

  return (
    <StyledPost>
      <div></div>
      <div>
        <p>@{author.username}</p>
        <p>{postTime()} ago</p>
        <button type="button">Follow</button>
      </div>
      <div>{body}</div>
      <Interactions>
        <Button
          type="button"
          className={liked ? "liked" : ""}
          onClick={handleLike}
        >
          <FiHeart />
          {likes}
        </Button>
        <Button type="button">
          <FiBookmark />0
        </Button>
      </Interactions>
    </StyledPost>
  );
};

export default Post;
