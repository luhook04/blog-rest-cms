import React from "react";

const Comment = ({ comment }) => {
  <div className="comment-container" key={comment._id}>
    <p>{comment.username}</p>
    <p>{comment.text}</p>
    <p className="comment-date">{comment.date}</p>
    <button type="button">Delete Comment</button>
  </div>;
};

export default Comment;
