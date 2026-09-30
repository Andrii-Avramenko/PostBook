import { useEffect, useState } from "react";
import {
  Wrapper,
  LoginForm,
  ColorOverlay,
  Input,
  SubmitBtn,
} from "./Login.styled";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../service/api";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [conpassword, setConPass] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!!localStorage.getItem('token')) navigate("/", { replace: true });
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await signUp({ username, email, password, conpassword })
      .then((res) => res)
      .catch((err) => {
        throw new Error(err);
      });
    localStorage.setItem("token", token.token);
    localStorage.setItem("account", JSON.stringify(token.user));
    navigate("/", { replace: true });
  };

  return (
    <Wrapper>
      <ColorOverlay />
      <LoginForm action="" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <Input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Input
          type="password"
          id="pass"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
        />
        <Input
          type="password"
          id="conpass"
          value={conpassword}
          onChange={(e) => setConPass(e.target.value)}
          placeholder="Confirm password"
        />
        <p>
          Have an account? <Link to="/login">Login instead</Link>
        </p>
        <SubmitBtn type="submit">Submit</SubmitBtn>
      </LoginForm>
    </Wrapper>
  );
};
