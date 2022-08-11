import React, { useState, useContext } from "react";
import { AuthContext } from "../App";

const NewPost = () => {
  const [newPost, setNewPost] = useState({ title: "", text: "" });
  const { state } = useContext(AuthContext);

  const handleChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="new-post-container">
      <form>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={(e) => handleChange(e)}
            value={newPost.title}
          />
        </div>
        <div>
          <label htmlFor="text">Post: </label>
          <input
            type="text"
            id="text"
            name="text"
            onChange={(e) => handleChange(e)}
            value={newPost.text}
          />
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default NewPost;
