import React, { useState } from "react";
import axios from "axios";

const PostCreate = ({ onSuccess }) => {         // nimmt onSuccess als Prop entgegen
  const [title, setTitle] = useState("");   // Lokaler Zustand für Titel

  const handleSubmit = async (e) => {           // wird beim Abschicken des Formulars aufgerufen
    e.preventDefault();                                       // verhindert, dass die Seite neu lädt
    try {
      await axios.post("http://localhost:4000/posts", { title }); // POST an Posts-Service
      setTitle("");                                         // Eingabefeld leeren
      if (onSuccess) onSuccess(); // notify parent to refresh list
    } catch (err) {
      console.error("Error submitting post:", err);
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="titleInput">Title</label>
          <input
              id="titleInput"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // bei jeder Tasteneingabe: Zustand updaten
              className="form-control"
              required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
  );
};

export default PostCreate;
