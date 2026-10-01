import { useState } from "react";
import { createPost } from "../../service/api";

const MakePost = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    createPost(content)
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  if (isLoading) return <h2>Loading...</h2>

  return (
    <div>
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
    </div>
  );
};

export default MakePost;
