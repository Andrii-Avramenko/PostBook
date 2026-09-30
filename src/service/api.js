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
      throw new Error(err);
    });
};
