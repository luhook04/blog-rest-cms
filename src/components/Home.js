import React, { useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthContext } from "../App";
import EditPost from "./EditPost";
import NewPost from "./NewPost";
import PostList from "./PostList";
import Login from "./Login";
import Nav from "./Nav";

const Home = () => {
  const { state } = useContext(AuthContext);

  return (
    <BrowserRouter basename="/">
      {state.isAuthenticated && <Nav />}
      <Routes>
        <Route
          exact
          path="/blog-rest-cms"
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
