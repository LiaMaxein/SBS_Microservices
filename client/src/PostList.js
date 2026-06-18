import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = ({ refresh }) => {
  const [posts, setPosts] = useState({});
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:4002/posts");
      setPosts(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts.");
    }
  }, []);

  // initial load + whenever parent bumps refresh
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, refresh]);

  const renderedPosts = Object.values(posts).map((post) => (
      <div
          className="card"
          style={{ width: "30%", marginBottom: "20px" }}
          key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments || []} />
          <CommentCreate
              postId={post.id}
              onSuccess={fetchPosts} // re-fetch posts (with comments) after new comment
          />
        </div>
      </div>
  ));

  return (
      <div className="d-flex flex-row flex-wrap justify-content-between">
        {error ? <div className="alert alert-danger">{error}</div> : renderedPosts}
      </div>
  );
};

export default PostList;
