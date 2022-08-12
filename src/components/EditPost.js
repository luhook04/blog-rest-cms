import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../App";

const EditPost = () => {
  const [post, setPost] = useState({ title: "", text: "", published: false });
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const { state } = useContext(AuthContext);

  const { postId } = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        const req = await fetch(
          `https://dry-hamlet-86450.herokuapp.com/api/posts/${postId}`,
          { method: "GET" }
        );
        if (req.status !== 200) {
          return;
        }
        const reqJson = await req.json();
        const title = reqJson.post.title;
        const text = reqJson.post.text;
        const published = reqJson.post.published;
        setPost({ title, text, published });
      } catch (err) {}
    };
    getPost();

    const getComments = async () => {
      try {
        const req = await fetch(
          `https://dry-hamlet-86450.herokuapp.com/api/posts/${postId}/comments`,
          { method: "GET" }
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

  const handlePublish = (e) => {
    setPost({
      ...post,
      published: e.target.checked,
    });
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
            published: post.published,
          }),
        }
      );
      if (req.status === 200) {
        setMessage("Post Updated!");
        setTimeout(() => setMessage(""), 4000);
      } else {
        return;
      }
    } catch (err) {
      return err;
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const newCommentList = comments.filter(
        (comment) => comment._id !== commentId
      );

      const req = await fetch(
        `https://dry-hamlet-86450.herokuapp.com/api/posts/${postId}/comments/${commentId}`,
        {
          method: "delete",
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (req.status === 200) {
        setComments(newCommentList);
      } else {
        return;
      }
    } catch (err) {
      return err;
    }
  };

  return (
    <div className="edit-post-container">
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={(e) => handleEdit(e)}
              value={post.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Edit Text: </label>
            <textarea
              type="text"
              name="text"
              rows="20"
              id="text"
              onChange={(e) => handleEdit(e)}
              value={post.text}
            />
          </div>
          <div className="publish-div">
            <label htmlFor="publish">Check button to publish: </label>
            <input
              type="checkbox"
              id="publish"
              name="publish"
              checked={post.published}
              onChange={(e) => handlePublish(e)}
            />
          </div>
          <button type="submit">Submit Edit</button>
        </form>
        <div>{message}</div>
      </div>

      {comments.length !== 0 ? (
        <div className="comments-container">
          {comments.map((comment) => {
            return (
              <div className="comment-container" key={comment._id}>
                <p>{comment.username}</p>
                <p>{comment.text}</p>
                <p className="comment-date">{comment.date}</p>
                <button
                  type="button"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  Delete Comment
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <h3>No Comments</h3>
      )}
    </div>
  );
};

export default EditPost;
