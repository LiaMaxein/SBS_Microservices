//hört auf Port 4001
// Aufgabe: erstellt und listet Kommentare für einen best. Post. Sendet bei neuen Kommentaren ein Event.

const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};            //speichert Kommentare pro Post-ID

// GET/posts/:id/comments - Kommentare zu EINEM Post abrufen
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);  // ":id" ist ein Platzhalter--> req.params.id
});

// POST /posts/:id/comments - neuen Kommentar erstellen
app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex"); //zufällige ID für den Kommentar
  const { content } = req.body;                     // Holt "content" aus dem Body

  const comments = commentsByPostId[req.params.id] || []; // Existierende Kommentare holen (oder leeres Array)

  comments.push({ id: commentId, content });        // neuen Kommentar hinzufügen

  commentsByPostId[req.params.id] = comments;       //zurückspeichern

    // Event an den Event-Bus senden
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,                        // zu welchem Post gehört der Kommentar
    },
  });

  res.status(201).send(comments);                   // antwort mit allen Kommentaren des Posts
});

app.post("/events", (req, res) => {
  console.log("Event Received", req.body.type);

  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
