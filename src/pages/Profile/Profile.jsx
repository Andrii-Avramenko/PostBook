import { useEffect, useState } from "react";
import PostList from "../../components/PostList/PostList";
import { StyledProfile } from "./Profile.styled";
import { getUserById } from "../../service/api";

const Profile = ({ user }) => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserById(user)
      .then(setInfo)
      .catch(err => console.error(err))
      .finally(setLoading(false));
  }, [user]);

  console.log(info)

  return (
    <StyledProfile>
      <div>
        <h2>@{user}</h2>
      </div>
      <PostList user={user} />
    </StyledProfile>
  );
};

export default Profile;
