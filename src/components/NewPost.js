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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const req = await fetch(
        "https://dry-hamlet-86450.herokuapp.com/api/posts/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newPost.title,
            text: newPost.text,
          }),
        }
      );
      if (req.status !== 200) {
        return;
      }
      setNewPost({
        title: "",
        text: "",
      });
    } catch (err) {
      return err;
    }
  };

  return (
    <div className="new-post-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={(e) => handleChange(e)}
            value={newPost.title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Post: </label>
          <textarea
            type="text"
            rows="20"
            id="text"
            name="text"
            onChange={(e) => handleChange(e)}
            value={newPost.text}
          />
        </div>
        <button className="new-post-btn" type="submit">
          Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
