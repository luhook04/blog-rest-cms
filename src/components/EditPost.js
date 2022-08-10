import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../App";
import DeleteComment from "./DeleteComment";

const EditPost = () => {
  const [post, setPost] = useState({ title: "", text: "" });
  const [comments, setComments] = useState([]);
  const { state } = useContext(AuthContext);

  const { postId } = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        const req = await fetch(
          `https://dry-hamlet-86450.herokuapp.com/api/posts/${postId}`
        );
        if (req.status !== 200) {
          return;
        }
        const reqJson = await req.json();
        const title = reqJson.post.title;
        const text = reqJson.post.text;
        setPost({ title, text });
      } catch (err) {}
    };
    getPost();

    const getComments = async () => {
      try {
        const req = await fetch(
          `https://dry-hamlet-86450.herokuapp.com/api/posts/${postId}/comments`
        );
        if (req.status !== 200) {
          return;
        }
        const reqJson = await req.json();
        setComments(reqJson.comments);
      } catch (err) {}
    };
    getComments();
  }, [postId]);

  const handleEdit = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const req = await fetch(
        `https://dry-hamlet-86450.herokuapp.com/api/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: post.title,
            text: post.text,
          }),
        }
      );
      if (req.status === 200) {
        refreshPage();
      }
    } catch (err) {
      return err;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => handleEdit(e)}
            value={post.title}
          />
        </div>
        <div>
          <label htmlFor="text">Edit Text: </label>
          <textarea
            type="text"
            name="text"
            id="text"
            onChange={(e) => handleEdit(e)}
            value={post.text}
          />
        </div>
        <button type="submit">Submit Edit</button>
      </form>
      {comments.length !== 0 ? (
        <div className="comments-container">
          {comments.map((comment) => {
            return <DeleteComment key={comment._id} comment={comment} />;
          })}
        </div>
      ) : (
        <h3>No Comments</h3>
      )}
    </div>
  );
};

export default EditPost;
