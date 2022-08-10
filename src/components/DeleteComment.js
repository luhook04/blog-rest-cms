import React from "react";

const DeleteComment = ({ comment }) => {
  const handleDeleteComment = () => {};
  return (
    <div className="comment-container" key={comment._id}>
      <p>{comment.username}</p>
      <p>{comment.text}</p>
      <p className="comment-date">{comment.date}</p>
      <button type="button" onClick={handleDeleteComment}>
        Delete Comment
      </button>
    </div>
  );
};

export default DeleteComment;
