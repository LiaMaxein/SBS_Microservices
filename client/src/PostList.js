import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = ({ refresh }) => {             // nimmt refresh als Prop
  const [posts, setPosts] = useState({}); // Zustand: alle Posts
  const [error, setError] = useState(null);     // Zustand: Fehlermeldung

  const fetchPosts = useCallback(async () => {  //useCallbacks = Funktion wird nicht unnötig neu erstellt
    try {
      const res = await axios.get("http://localhost:4002/posts");   // GET vom Query-Service
      setPosts(res.data);                               // Antwort in Zustand speicher
      setError(null);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts.");
    }
  }, []);

  // initial load + whenever parent bumps refresh
  useEffect(() => {                     // führt fetchPosts aus...
    fetchPosts();                                    // beim ersten Rendern...
  }, [fetchPosts, refresh]);                   // ... und immer wenn sich refresh ändert

  const renderedPosts = Object.values(posts).map((post) => ( // Konvertiert Objekt in Array und mapped
      <div
          className="card"
          style={{ width: "30%", marginBottom: "20px" }}
          key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments || []} />
          <CommentCreate                // Formular für neuen Kommentar
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
