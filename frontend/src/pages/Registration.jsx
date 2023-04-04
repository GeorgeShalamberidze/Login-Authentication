import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import REGISTER_USER from "../Query/registerUser";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [register, { loading }] = useMutation(REGISTER_USER, {
    onError(err) {
      setErrors(err?.graphQLErrors[0].extensions.errors);
    },
    onCompleted: () => {
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      navigate("/");
    },
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await register({
      variables: {
        registerInput: {
          username,
          password,
          confirmPassword,
        },
      },
    });

    if (data) {
      // Store user to LocalStorage
      const usersArr = JSON.parse(localStorage.getItem("users")) || [];
      usersArr.push(data.register);
      localStorage.setItem("users", JSON.stringify(usersArr));

      localStorage.setItem("username", JSON.stringify(data.register));
      localStorage.setItem("refreshToken", data.register.refreshToken);
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
        <div className="input_wrapper">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            placeholder="confirm password..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading} className="reg_button">
          Register
        </button>
      </form>
      <div>
        <div className="have_account">
          <p>have an account ?</p>
          <span className="login_text">
            <a href="/login">Login</a>
          </span>
        </div>
      </div>
      {errors &&
        Object.keys(errors).length > 0 &&
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

export default Registration;
