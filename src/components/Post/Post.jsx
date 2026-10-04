import { Button, Interactions, StyledPost } from "./Post.styled";
import { FiHeart, FiBookmark } from "react-icons/fi";

const Post = ({ content }) => {
  const { age_hours, id, body, author, likes, liked, saved } = content;
  const { username, followed } = author

  const postTime = () => {
    const age_minutes = age_hours * 60;
    const age_seconds = age_minutes * 60;
    const age_days = age_hours / 24;
    const hour_suffix = Math.round(age_hours) % 10 == 1 ? "hour" : "hours";
    const day_suffix = Math.round(age_days) % 10 == 1 ? "day" : "days";

    if (age_seconds < 60) return `${Math.round(age_seconds)} sec`;
    else if (age_minutes < 60) return `${Math.round(age_minutes)} min`;
    else if (age_hours < 24) return `${Math.round(age_hours)} ${hour_suffix}`;
    else if (age_days < 15) return `${Math.round(age_days)} ${day_suffix}`;
    else return ``;
  };

  return (
    <StyledPost>
      <div></div>
      <div>
        <p>@{username}</p>
        <p>{postTime()} ago</p>
        <button
          type="button"
          className={followed ? "followed" : ""}
          data-action="follow"
          data-user={author.id}
        >
          {followed ? "Following" : "Follow"}
        </button>
      </div>
      <div>{body}</div>
      <Interactions>
        <Button
          type="button"
          className={liked ? "active" : ""}
          data-post={id}
          data-action="like"
        >
          <FiHeart />
          {likes}
        </Button>
        <Button
          type="button"
          className={saved ? "active" : ""}
          data-post={id}
          data-action="save"
        >
          <FiBookmark />0
        </Button>
      </Interactions>
    </StyledPost>
  );
};

export default Post;
