import React from "react";
import { Link } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";

const PostPreview = ({ post }) => {
  const commentCount = post.comments.length;
  return (
    <div className="post-preview">
      <h3 className="post-title">{post.title}</h3>
      <h4 className="post-author">By: {post.authorName}</h4>
      <p className="post-date-preview">{post.date}</p>
      <div className="view-post-container">
        <Link to={`/posts/${post._id}`}>
          <button type="button">Edit Post</button>
        </Link>
        <div className="comment-count-container">
          <CommentIcon />
          <span className="comment-count">{commentCount}</span>
        </div>
      </div>
    </div>
  );
};

export default PostPreview;
