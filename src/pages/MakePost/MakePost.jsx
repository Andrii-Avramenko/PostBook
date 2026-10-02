import { useState } from "react";
import { createPost } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { StyledPost } from "./MakePost.styled";

const MakePost = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    createPost(content)
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
        navigate('/')
      });
  };

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <StyledPost>
      <h2>Make your own post</h2>
      <form action="" onSubmit={handleSubmit}>
        <textarea
          name="content"
          id=""
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Send</button>
      </form>
    </StyledPost>
  );
};

export default MakePost;
