import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId, onSuccess }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:4001/posts/${postId}/comments`, { content });
      setContent("");
      if (onSuccess) onSuccess(); // ask parent to re-fetch aggregator
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="commentInput">New Comment</label>
          <input
              id="commentInput"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-control"
              required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
  );
};

export default CommentCreate;
