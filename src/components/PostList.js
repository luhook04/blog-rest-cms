import React, { useEffect, useState } from "react";

const PostList = () => {
  const [posts, setPosts] = useState([]);

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

  return (
    <div>
      {posts ? (
        <div>
          {posts.map((post) => {
            return <p key={post._id}>{post.title}</p>;
          })}
        </div>
      ) : (
        <h2>No Posts</h2>
      )}
    </div>
  );
};

export default PostList;
