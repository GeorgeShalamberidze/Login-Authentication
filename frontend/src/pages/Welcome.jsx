import React from "react";
import { useStateContext } from "../context/ContextProvider";

const Welcome = () => {
  const user = JSON.parse(localStorage.getItem("username"));
  const loginCount = user?.loginAttempt;
  const { data, loading, error } = useStateContext();
  const userCount = data?.userRegistered?.count;

  return (
    <div>
      <h1 style={{ color: "black" }}>
        {!user && (
          <>
            you are not signed in
            <div className="welcome_buttons">
              <a href="/login">Login</a>
              <a href="/registration">Register</a>
            </div>
          </>
        )}
      </h1>
      {user && loginCount && loginCount < 2 && (
        <h2 style={{ color: "black" }}>{`Welcome, ${user.username}`}</h2>
      )}
      {user && loginCount && loginCount >= 2 && (
        <h3
          style={{ color: "black", marginTop: "20px" }}
        >{`${user.username}, It's your ${loginCount}th Login`}</h3>
      )}
      {!data ? (
        <h2 style={{ color: "black", marginTop: "20px" }}>
          No Users have registered yet
        </h2>
      ) : (
        <h2 style={{ color: "black", marginTop: "20px" }}>
          Registered Users Count: {userCount}
        </h2>
      )}

      {user && userCount > 3 && (
        <h3 style={{ color: "green" }}>You’re lucky person :)</h3>
      )}
    </div>
  );
};

export default Welcome;
