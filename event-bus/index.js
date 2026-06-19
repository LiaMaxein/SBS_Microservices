// hört auf Port 4005
// Aufgabe: der Vermittler. Er nimmt Events entgegen und leitet sie an alle anderen Services weiter.
// Dadurch müssen die Services nicht direkt miteinander sprechen.
// Wichtig:es gibt keine Schleife (Endlosschleife), weil axios.post ohne await ausgeführt wird.Die Events werden sicher gesendet.
// Jeder Service bekommt jedes Event und entscheidet selbst, ob er reagiert.

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
// hier: kein CORS nötig. Der Event-Bus wird nur von anderen Services angefragt, nicht vom Browser

// POST /events - empfängt rein Event und leitet es weiter
app.post("/events", (req, res) => {
  const event = req.body;                       // das gesamte Event (mit Type und Data)

    // sendet das Event an ALLLE Services (auch an sich selbst, was wiederum ignoriert wird)
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);                       // Fehler abfangen (z.B. wenn Service offline ist)
  });
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });                       // Bestätgigun an Absender
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
