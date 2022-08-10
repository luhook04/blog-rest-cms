import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App";
import PostPreview from "./PostPreview";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const req = await fetch(
          "https://dry-hamlet-86450.herokuapp.com/api/posts"
        );
        if (req.status !== 200) {
          return;
        }
        const reqJson = await req.json();
        setPosts(reqJson.posts);
      } catch (err) {}
    };
    getPosts();
  }, []);

  const deletePost = async (postId) => {
    try {
      const newPostsList = posts.filter((post) => post._id !== postId);

      const req = await fetch(
        `https://dry-hamlet-86450.herokuapp.com/api/posts/${postId}`,
        {
          method: "delete",
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (req.status !== 200) {
        return;
      }
      setPosts(newPostsList);
    } catch (err) {
      return err;
    }
  };

  return (
    <div className="post-list-container">
      {posts ? (
        <div>
          {posts.map((post) => {
            return (
              <PostPreview key={post._id} deletePost={deletePost} post={post} />
            );
          })}
        </div>
      ) : (
        <h2>No Posts</h2>
      )}
    </div>
  );
};

export default PostList;
