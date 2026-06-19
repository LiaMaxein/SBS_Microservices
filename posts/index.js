// hört auf Port 4000
// Aufgabe: erstellt und listet Blog-Posts. Schickt bei neuen Posts ein Event an den Event-Bus

const express = require("express");         // lädt Express-Framework
const bodyParser = require("body-parser"); //lädt Body-Parser (liest JSON aus Anfragen)
const { randomBytes } = require("crypto"); //lädt nur die randomBytes-Funktion aus dem crypto-Modul
const cors = require("cors");               // lädt CORS-Modul
const axios = require("axios");             // lädt Axios (HTTP-Client)

const app = express();                      //erstellt die Express-App (den Server)
app.use(bodyParser.json());                 //sagt: "wandle alle JSON-Bodies automatisch um"
app.use(cors());                            //sagt: "Erlaube Anfragen von anderen Ports"

const posts = {};                       // ein leeres Objekt als "Datenbank" (im Arbeitsspeicher)

// GET/posts - alle Posts abrufen
app.get("/posts", (req, res) => {
  res.send(posts);                          // sendet das gesamte posts-Objekt als JSON
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");   // erzeugt zufällige 8-stellige ID
  const { title } = req.body;                   // holt das Feld "title" aus dem JSON-Body

  posts[id] = {                             //speichert den neuen Post im Objekt
    id,
    title,
  };

// sendet ein Event an den Event-Bus
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",                    //event-typ: ein Post wurde erstellt
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);          // antwortet mit Status 202 (created) und dem neuen Post
});

// POST/events - empfängt Events vom Event-Bus (nur Log)
app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type); //gibt den Event-Typ in der Konsole aus
  res.send({});                                 // sendet leeres Objekt als Bestätigung
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
