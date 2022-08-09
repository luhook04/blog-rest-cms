import React, { useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthContext } from "../App";
import EditPost from "./EditPost";
import NewPost from "./NewPost";
import PostList from "./PostList";
import Login from "./Login";

const Home = () => {
  const { state } = useContext(AuthContext);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          exact
          path="/"
          element={state.isAuthenticated ? <PostList /> : <Login />}
        />
        <Route
          exact
          path="/posts/:postId"
          element={state.isAuthenticated ? <EditPost /> : <Login />}
        />
        <Route
          exact
          path="/newpost"
          element={state.isAuthenticated ? <NewPost /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Home;