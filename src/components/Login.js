import React, { useContext, useState } from "react";
import { AuthContext } from "../App";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = JSON.stringify(user);

      const req = await fetch(
        "https://dry-hamlet-86450.herokuapp.com/api/login",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (req.status !== 200) {
        console.log("error incorrect login");
        return;
      }
      const reqJson = await req.json();
      console.log(reqJson);

      dispatch({ type: "login", payload: reqJson });
    } catch (err) {
      return err;
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          value={user.password}
          onChange={(e) => handleChange(e)}
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
