import React, { useContext } from "react";
import { AuthContext } from "../App";

const Nav = () => {
  const { dispatch } = useContext(AuthContext);
  const logOut = () => {
    dispatch({ type: "logout" });
  };

  return <button onClick={logOut}>logout</button>;
};

export default Nav;
