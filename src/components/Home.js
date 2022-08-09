import React, { useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthContext } from "../App";

const Home = () => {
  const { state } = useContext(AuthContext);

  return (
    <BrowserRouter basename="/">
      <Routes></Routes>
    </BrowserRouter>
  );
};

export default Home;
