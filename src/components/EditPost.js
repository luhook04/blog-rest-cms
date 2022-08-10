import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

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
        setPost(reqJson.post);
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

  return (
    <div>
      <form>
        <div>
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" id="title" value={post.title} />
        </div>
        <div>
          <label htmlFor="text">Edit Text: </label>
          <textarea type="text" name="text" id="text" value={post.text} />
        </div>
        <button type="submit">Submit Edit</button>
      </form>
      {comments ? (
        <div className="comments-container">
          {comments.map((comment) => {
            return (
              <div className="comment-container" key={comment._id}>
                <p>{comment.username}</p>
                <p>{comment.text}</p>
                <p className="comment-date">{comment.date}</p>
                <button type="button">Delete Comment</button>
              </div>
            );
          })}
        </div>
      ) : (
        <h2>No Comments</h2>
      )}
    </div>
  );
};

export default EditPost;
