import axios from "axios";

const baseURL = "http://localhost:3001";

export const getFeed = () => {
  return axios
    .get(`${baseURL}/posts`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

export const signUp = ({ username, email, password, conpassword }) => {
  return axios
    .post(`${baseURL}/register`, {
      username,
      email,
      password,
      conpassword,
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

export const logIn = ({ identifier, password }) => {
  return axios
    .post(`${baseURL}/login`, {
      identifier,
      password,
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

export const checkAcc = () => {
  return axios
    .get(`${baseURL}/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      if (err.status === 401) console.log(`Bad token! Error ${err.status}, token is going to be cleared!`);
      localStorage.removeItem('token')
      throw new Error(err)
    });
};

export const createPost = (content) => {
  return axios
    .post(
      `${baseURL}/posts`,
      {
        body: content,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    )
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

export const like = (postId) => {
  return axios.post(
    `${baseURL}/like`,
    { postId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
};
