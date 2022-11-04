import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ErrorMessage,
  LoginContainer,
  LoginForm,
  LoginFormContainer,
  NavButtons,
  NavLogin,
  NavSignup,
  SuccessMessage
} from "./index.styles";
import { AuthContext } from "../Contexts/AuthContextProvider";

/**
 *  Creates Login component
 *  @param {boolean} register boolean that shows if user inside register or login page
 *  @returns {component} Login Component used for login and register pages
 */
const Login = ({ register }) => {
  // keeps error message in state
  const [error, setError] = useState("");

  // kepps success message in state
  const [success, setSuccess] = useState("");

  // keeps username in state
  const [username, setUsername] = useState("");

  // keeps email in state
  const [email, setEmail] = useState("");

  // keeps password
  const [password, setPassword] = useState("");

  // gets setToken and setRole functions from context
  const { setToken, setRole } = useContext(AuthContext);

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      // eslint-disable-next-line no-undef
      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
        email,
        password
      });

      // saves token in context
      setToken(data.token);

      // saves role in context
      setRole(data.role);

      // setTimeout(() => {
      // navigates to /books
      navigate("/books");
      // }, 1000);
    } catch ({ response: { data } }) {
      // sets error message
      setError(data.message);
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      // eslint-disable-next-line no-undef
      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`, {
        username,
        email,
        role: "customer",
        password
      });

      setSuccess(data.message);
    } catch ({ response: { data } }) {
      // sets error message
      setError(data.message);
    }
  };

  return (
    <LoginContainer>
      <LoginFormContainer>
        <h1>{register ? "Signup" : "Login"} Form</h1>

        <NavButtons>
          <NavLogin onClick={() => navigate("/")} register={register}>
            Login
          </NavLogin>
          <NavSignup onClick={() => navigate("/register")} register={register}>
            Signup
          </NavSignup>
        </NavButtons>

        {!register ? (
          <LoginForm onSubmit={loginUser}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}></input>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}></input>
            <button disabled={!email || !password}>Login</button>
          </LoginForm>
        ) : (
          <LoginForm register={register} onSubmit={registerUser}>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}></input>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}></input>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}></input>
            <button disabled={!email || !password}>Sign Up</button>
          </LoginForm>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </LoginFormContainer>
    </LoginContainer>
  );
};

export default Login;
