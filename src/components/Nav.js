import React, { useContext } from "react";
import { AuthContext } from "../App";
import { Link } from "react-router-dom";

const Nav = () => {
  const { dispatch } = useContext(AuthContext);

  const logOut = () => {
    dispatch({ type: "logout" });
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/newpost">New Post</Link>
        </li>
        <li>
          <button type="button" onClick={logOut}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
