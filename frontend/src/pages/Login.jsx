import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LOGIN_USER from "../Query/loginUser";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onError(err) {
      setErrors(err?.graphQLErrors[0].extensions.errors);
    },
    onCompleted: () => {
      setUsername("");
      setPassword("");
      navigate("/");
    },
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await login({
      variables: {
        loginInput: {
          username,
          password,
        },
      },
    });

    if (data) {
      localStorage.setItem("username", JSON.stringify(data.login));
      localStorage.setItem("refreshToken", data.login.refreshToken);
    }
  };

  return (
    <div className="reg_form">
      <form onSubmit={handleSubmit}>
        <div className="input_wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input_wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading} className="login_button">
          Login
        </button>
      </form>
      <div className="no_account">
        <p>Don't have an account ?</p>
        <span className="register_text">
          <a href="/registration">Register</a>
        </span>
      </div>
      {Object.keys(errors).length > 0 &&
        Object.keys(errors).map((err, i) => {
          return (
            <p key={i} style={{ color: "red", marginTop: "10px" }}>
              {errors[err]}
            </p>
          );
        })}
    </div>
  );
};

export default Login;
