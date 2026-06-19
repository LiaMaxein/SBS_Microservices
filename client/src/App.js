import React, { useState } from "react";    // useState = React Hook für Zustand
import PostCreate from "./PostCreate";      // Formular zum Erstellen von Posts
import PostList from "./PostList";          // Liste aller Posts

const App = () => {
    // tick increments only after successful create
    const [refreshTick, setRefreshTick] = useState(0); // Zähler, der die PostList zum Neuladen zwingt

    return (
        <div className="container">         // Bootstrap-Container
            <h1>Create Post</h1>
            <PostCreate onSuccess={() => setRefreshTick((n) => n + 1)} /> // Nach Erfolg --> refreshTick erhöhen
            <hr />
            <h1>Posts</h1>
            <PostList refresh={refreshTick} />  // refreshTick als "prop" übergeben
        </div>
    );
};

export default App;
