// hört auf Port 4002
// Aufgabe:Er baut sich aus den Events eine fertige Ansicht.
// Jeder Post enthält bereits all seine Kommentare. Das Frontend (Client) muss nur eine einzige Anfrage stellen.

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};                   // "Datenbank": speichert Posts MIT Kommentare

// GET/posts - alle Posts mit Kommentaren zurückgeben
app.get('/posts', (req, res) => {
  res.send(posts);                      // sendet das fertig aggregierte Objekt
});

// POST /events - Events vom Event-Bus empfangen
app.post('/events', (req, res) => {
  const { type, data } = req.body;        // Destructuring: type und data aus dem Body holen

  if (type === 'PostCreated') {            // wenn ein Post erstellst wurde..
    const { id, title } = data;

    posts[id] = { id, title, comments: [] }; // ... neuen Post mit leerem comments-Array anlegen
  }

  if (type === 'CommentCreated') {          // Wenn ein Kommentar erstellt wurde...
    const { id, content, postId } = data;

    const post = posts[postId];             // den zugehörigen Post finden
    post.comments.push({ id, content });    // Kommentar an das comments-Array anhängen
  }

  console.log(posts);                       // zeigt den aktuellen Stand in der Konsole an

  res.send({});                             // Bestätigung
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
