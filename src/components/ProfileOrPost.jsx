import { Navigate, useParams } from "react-router-dom";
import Profile from "../pages/Profile/Profile";

export const ProfileOrPost = () => {
  const { id } = useParams();

  if (id.startsWith("@") && id.length > 1) {
    const user = id.slice(1);
    return <Profile user={user} />;
  }

  const postId = Number(id);

  if (Number.isInteger(postId) && postId > 0) {
    if (String(postId) !== id) return <Navigate to={`/${postId}`} replace />;
    return <p>Post: {id}</p>;
  }

  return <Navigate to="/error" state={{ code: 404 }} />;
};
