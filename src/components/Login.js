import React, { useContext, useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={user.username}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          value={user.password}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
