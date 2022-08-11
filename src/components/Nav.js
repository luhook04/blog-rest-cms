import React, { useContext } from "react";
import { AuthContext } from "../App";
import { Link } from "react-router-dom";

const Nav = () => {
  const { dispatch } = useContext(AuthContext);

  const logOut = () => {
    dispatch({ type: "logout" });
  };

  return (
    <nav className="navigation-container">
      <ul className="nav-list">
        <li className="nav-link">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-link">
          <Link to="/newpost">New Post</Link>
        </li>
        <li className="nav-list-button">
          <button type="button" onClick={logOut}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
