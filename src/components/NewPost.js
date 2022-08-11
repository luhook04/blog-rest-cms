import React, { useState, useContext } from "react";
import { AuthContext } from "../App";

const NewPost = () => {
  return (
    <div className="new-post-container">
      <form>
        <div>
          <label htmlFor="title">Title: </label>
          <input type="text" id="title" name="title" />
        </div>
        <div>
          <label htmlFor="text">Post: </label>
          <input type="text" id="text" name="text" />
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default NewPost;
