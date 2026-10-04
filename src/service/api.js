import axios from "axios";

const baseURL = "http://localhost:3001";

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getFeed = (page = 1) => {
  return api
    .get(`/posts`, {
      params: { page },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getFollowing = (before) => {
  return api
    .get(`/following`, {
      params: before ? { before } : {},
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getPostById = (id) => {
  return api
    .get(`/posts/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error();
    });
};

export const signUp = ({ username, email, password, conpassword }) => {
  return api
    .post(`/register`, {
      username,
      email,
      password,
      conpassword,
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const logIn = ({ identifier, password }) => {
  return api
    .post(`/login`, {
      identifier,
      password,
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const checkAcc = () => {
  return api
    .get(`/me`)
    .then((res) => res.data)
    .catch((err) => {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
      }
      throw err;
    });
};

export const createPost = (content) => {
  return api
    .post(`/posts`, {
      body: content,
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const like = (postId) => {
  return api
    .post(`/like`, { postId })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const save = (postId) => {
  console.log("Save: " + postId);
  // return api
  //   .post(
  //     `/save`,
  //     { postId }
  //   )
  //   .then((res) => res.data)
  //   .catch((err) => {
  //     throw err;
  //   });
};

export const follow = (followeeId) => {
  return api
    .post(`/follow`, { followeeId })
    .then((res) => res.status)
    .catch((err) => {
      throw err;
    });
};

export const unfollow = (userId) => {
  return api
    .delete(`/follow/${userId}`)
    .then((res) => res.status)
    .catch((err) => {
      throw err;
    });
};

export const getUserById = (username) => {
  return api
    .get(`/users/${username}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getUserPostsById = (username) => {
  return api
    .get(`/users/${username}/posts`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
