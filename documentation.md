# Blog Query Service V2 – erweiterte Dokumentation

## 1. Sprachen & Technologien

| Technologie | Was ist das? |
|---|---|
| **JavaScript (ES6+)** | Die Programmiersprache des gesamten Projekts (kein TypeScript) |
| **Node.js** | Laufzeitumgebung – führt JavaScript **auf dem Server** aus (nicht im Browser) |
| **Express.js** | Web-Framework für Node.js – vereinfacht HTTP-Server, Routing, Anfragen/Antworten |
| **React** | Frontend-Bibliothek für Benutzeroberflächen (komponentenbasiert) |
| **Axios** | HTTP-Client – sendet Anfragen (GET, POST, etc.) an andere Services |
| **CORS** | Cross-Origin Resource Sharing – erlaubt Browser-Anfragen von anderen Ports/Domains |
| **Nodemon** | Entwicklungstool – startet Server bei Code-Änderungen automatisch neu |
| **npm** | Package Manager – verwaltet Abhängigkeiten (Bibliotheken) |
| **Bootstrap** | CSS-Framework – fertige Styles für Layout, Karten, Formulare, Buttons |

---

## 2. Grundlegende Begriffe

### JavaScript/Node.js-Begriffe

| Begriff | Bedeutung |
|---|---|
| **`const`** | *Constant* – deklariert eine Variable, die nicht neu zugewiesen werden kann. `const x = 5; x = 6;` → Fehler. Der Inhalt von Objekten/Arrays darf aber verändert werden. |
| **`require("...")`** | Importiert eine Bibliothek. `const express = require("express")` lädt das Express-Modul. |
| **`{ randomBytes }`** | Destructuring – nur die Funktion `randomBytes` aus dem `crypto`-Modul holen. |
| **`async/await`** | Asynchrone Programmierung. `await axios.post(...)` = "warte, bis der POST fertig ist, ohne den Server zu blockieren". |
| **`=>` (Arrow Function)** | Kurzschreibweise für Funktionen. `(req, res) => { ... }` = `function(req, res) { ... }` |
| **`req`** | **Request** – die eingehende Anfrage (enthält URL, Body, Header, Parameter). |
| **`res`** | **Response** – die Antwort, die wir zurückschicken. |
| **`req.params.id`** | Greift den URL-Parameter `:id` aus der Route ab. Bei `/posts/:id/comments` und Aufruf `/posts/abc/comments` → `req.params.id = "abc"` |
| **`req.body`** | Enthält die JSON-Daten einer POST-Anfrage (nach Verarbeitung durch `bodyParser`). |
| **`res.send(...)`** | Sendet eine Antwort zurück (meist JSON). |
| **`res.status(201).send(...)`** | Setzt HTTP-Statuscode (z. B. 201 = "Created") und sendet Antwort. |
| **`randomBytes(4).toString("hex")`** | Erzeugt eine zufällige ID: 4 Bytes = 8 Hexadezimalzeichen (z. B. `"a3f2c1b0"`). |

### Express-Begriffe

| Begriff | Bedeutung |
|---|---|
| **`express()`** | Erstellt die Express-Applikation (den HTTP-Server). |
| **`app.use(...)`** | Middleware registrieren – wird bei **jeder** Anfrage ausgeführt. |
| **`app.get("/pfad", handler)`** | Definiert eine Route für **GET**-Anfragen. |
| **`app.post("/pfad", handler)`** | Definiert eine Route für **POST**-Anfragen (Daten senden/erstellen). |
| **`app.listen(PORT, callback)`** | Startet den Server auf einem bestimmten Port. |
| **`bodyParser.json()`** | Middleware – wandelt JSON-Bodies automatisch in JavaScript-Objekte um. |
| **`cors()`** | Middleware – erlaubt Cross-Origin-Anfragen (Frontend auf anderem Port). |
| **Middleware** | Funktionen, die zwischen Anfrage und Antwort ausgeführt werden (z. B. Parsen, Loggen, Berechtigungen). |

### React-Begriffe

| Begriff | Bedeutung |
|---|---|
| **Komponente** | Ein wiederverwendbares UI-Element. Z. B. `PostCreate`, `PostList`. |
| **Prop** | *Property* – Daten, die von einer Eltern-Komponente an eine Kind-Komponente übergeben werden (wie Funktionsparameter). |
| **State (Zustand)** | Daten, die sich innerhalb einer Komponente ändern können. Mit `useState` verwaltet. |
| **`useState(startwert)`** | React Hook – erzeugt Zustand. Gibt Array zurück: `[wert, setterFunktion]`. |
| **`useEffect(() => {...}, [deps])`** | React Hook – führt Code aus **nach** dem Rendern, z. B. Daten laden. `deps` = Abhängigkeiten (bei Änderung erneut ausführen). |
| **`useCallback(...)`** | React Hook – verhindert, dass eine Funktion bei jedem Rendern neu erstellt wird. |
| **JSX** | HTML-ähnliche Syntax in JavaScript. `return <h1>Titel</h1>` |
| **`onChange`** | React-Event – wird bei jeder Änderung eines Eingabefelds ausgelöst. |
| **`onSubmit`** | React-Event – wird beim Abschicken eines Formulars ausgelöst. |
| **`e.preventDefault()`** | Verhindert das Standardverhalten (Seite neu laden bei Formularabsendung). |
| **`className`** | In JSX: `class` heißt `className` (weil `class` in JavaScript reserviert ist). |
| **`htmlFor`** | In JSX: `for` heißt `htmlFor` (`<label htmlFor="id">`). |
| **try/catch** | Fehlerbehandlung. Code in `try` wird ausgeführt; bei Fehler springt es in `catch`. |
| **`.map()`** | Array-Methode – führt eine Funktion für jedes Element aus und gibt ein neues Array zurück. |
| **`export default`** | Macht die Komponente für andere Dateien importierbar. |

---

## 3. Datenbank

### Gibt es eine Datenbank?

**Nein.** Es gibt **keine** Datenbank – weder SQL (PostgreSQL, MySQL) noch NoSQL (MongoDB).

### Wo werden die Daten gespeichert?

Alle 4 Backend-Services speichern Daten ausschließlich **im Arbeitsspeicher (RAM)** in JavaScript-Objekten:

posts/index.js: const posts = {} // Speichert alle Posts 
comments/index.js: const commentsByPostId = {} // Speichert Kommentare pro Post-ID 
query/index.js: const posts = {} // Speichert Posts + Kommentare aggregiert 
event-bus/index.js: — speichert gar nichts —

### Was passiert bei einem Neustart?

**Alle Daten sind weg.** Das ist beabsichtigt – das Projekt soll nur die Kommunikation zwischen Services demonstrieren, nicht Persistenz. 
Typische Aussage für Lernprojekte: "Sobald der Server neustartet, sind die Daten verloren."

### Wie würden Datenbanken in einer echten Version aussehen?

In einer produktionsreifen Version würde jeder Service eine eigene Datenbank haben:
- Posts-Service → PostgreSQL-Tabelle `posts`
- Comments-Service → PostgreSQL-Tabelle `comments`
- Query-Service → könnte auf einen Read-Optimizer wie **Redis** oder eine materialisierte Sicht setzen

---

## 4. Architektur

### Microservice-Architektur

Statt einer monolithischen Anwendung gibt es **mehrere kleine, unabhängige Services**, die zusammenarbeiten. 
Jeder Service hat eine klar abgegrenzte Aufgabe (engl. *separation of concerns*).


                +-------------------+
                |  React Frontend   |
                |    (Port 3000)    |
                +---------+---------+
                          |
          +---------------+---------------+
          |               |               |
          v               v               v
+-------+----+  +------+------+  +-----+--------+
| POST /posts |  | POST /:id/  |  | GET /posts   |
| (erstellen) |  |  comments   |  | (abrufen)    |
+------+------+  | (erstellen) |  +------+-------+
|                +------+------+         |
v                       v                |

+---------+------+ +-----+--------+ | | Posts | | Comments | | | (Port 4000) | | (Port 4001) | | 
+---------+------+ +-----+--------+ | | | | | Event | Event | +------+---------+--+ | | | | v v | +-------+------------+--------+ | | Event-Bus | | | (Port 4005) | | +--+---------+--------+------+ | | | | | v v v | +------+--+ +---+----+ +-+--------+ | | Posts | |Comments| | Query | | | 4000 | | 4001 | |(Port 4002)| | +--------+ +--------+ +-----+-----+ | | | +----------+ (Frontend fragt Query-Service für alle Daten)


### Die drei Kommunikationsarten

1. **Client → Service (direkt/synchron)** – HTTP-Anfragen vom Frontend an einzelne Services
2. **Service → Event-Bus (asynchron)** – Events nach dem Erstellen eines Posts/Kommentars
3. **Event-Bus → Alle Services (Broadcast)** – leitet jedes Event an alle Services weiter

### Port-Übersicht

| Service | Port | Erreichbar unter |
|---|---|---|
| Posts-Service | 4000 | `http://localhost:4000` |
| Comments-Service | 4001 | `http://localhost:4001` |
| Query-Service | 4002 | `http://localhost:4002` |
| Event-Bus | 4005 | `http://localhost:4005` |
| React Frontend | 3000 | `http://localhost:3000` |

---

## 5. Ablauf im Detail

### Szenario 1: Post erstellen

Schritt 1: Frontend → POST localhost:4000/posts { title: "Mein Blog" }

Schritt 2: Posts-Service (4000) 
├── Generiert ID: "a1b2c3d4" 
├── Speichert: posts = { "a1b2c3d4": { id, title } } 
└── Sendet Event an Event-Bus (4005): { type: "PostCreated", data: { id: "a1b2c3d4", title: "Mein Blog" } }

Schritt 3: Event-Bus (4005) 
└── Leitet Event an ALLE Services weiter: → POST localhost:4000/events (Posts-Service – ignoriert es) → POST localhost:4001/events (Comments-Service – ignoriert es) → POST localhost:4002/events (Query-Service – VERARBEITET es)

Schritt 4: Query-Service (4002) 
└── Empfängt PostCreated 
└── Erstellt: posts = { "a1b2c3d4": { id, title, comments: [] } }


### Szenario 2: Kommentar erstellen
Schritt 1: Frontend → POST localhost:4001/posts/a1b2c3d4/comments { content: "Super Beitrag!" }

Schritt 2: Comments-Service (4001) 
├── Generiert ID: "e5f6g7h8" 
├── Speichert: commentsByPostId["a1b2c3d4"] = [{ id: "e5f6g7h8", content: "Super Beitrag!" }] 
└── Sendet Event an Event-Bus (4005): { type: "CommentCreated", data: { id: "e5f6g7h8", content: "Super Beitrag!", postId: "a1b2c3d4" } }

Schritt 3: Event-Bus (4005) 
└── Leitet an alle weiter → auch an Query-Service (4002)

Schritt 4: Query-Service (4002) 
├── Findet Post mit ID "a1b2c3d4" 
└── Fügt hinzu: posts["a1b2c3d4"].comments.push({ id: "e5f6g7h8", content: "Super Beitrag!" })


### Szenario 3: Posts anzeigen
Schritt 1: Frontend → GET localhost:4002/posts

Schritt 2: Query-Service (4002) 
└── Gibt das fertig aufgebaute Objekt zurück:

{ "a1b2c3d4": { "id": "a1b2c3d4", "title": "Mein Blog", "comments": [ { "id": "e5f6g7h8", "content": "Super Beitrag!" } ] } }

Schritt 3: Frontend rendert jede Post-Karte mit: 
├── Titel als

├── CommentList (alle Kommentare als /) 
└── CommentCreate (Formular für neuen Kommentar)

**Wichtig:** Das Frontend fragt NUR den Query-Service. Es muss nicht erst Posts und dann Kommentare separat laden. Der Query-Service hält alles in der richtigen Form vor.

---

## 6. Zusammenfassung aller Bausteine

| Baustein | Sprache | Port | package.json-Dependencies | Aufgabe |
|---|---|---|---|---|
| **`posts/`** | JavaScript (Node.js) | 4000 | express, body-parser, cors, axios, nodemon, crypto (built-in) | Posts erstellen & auflisten. Sendet `PostCreated`-Event. |
| **`comments/`** | JavaScript (Node.js) | 4001 | express, body-parser, cors, axios, nodemon, crypto (built-in) | Kommentare erstellen & auflisten. Sendet `CommentCreated`-Event. |
| **`event-bus/`** | JavaScript (Node.js) | 4005 | express, body-parser, axios, nodemon | Empfängt Events und leitet sie an alle Services weiter (Broadcast). |
| **`query/`** | JavaScript (Node.js) | 4002 | express, body-parser, cors, nodemon | Baut aus Events eine aggregierte Ansicht (Posts + Kommentare). Dient als Lese-API fürs Frontend. |
| **`client/`** | JavaScript (React) | 3000 | react, react-dom, axios, bootstrap | Benutzeroberfläche: Formulare, Listen, Karten-Layout. |

**Jeder Service hat:**
- `package.json` – Abhängigkeiten und Start-Script
- `index.js` – Der gesamte Code (sehr kompakt, keine Aufteilung in mehrere Dateien)
- `package-lock.json` – Automatisch generiert, sperrt Versionsnummern

**Dependencies im Detail:**

| Paket | Wird verwendet in | Zweck |
|---|---|---|
| **express** | posts, comments, event-bus, query | HTTP-Server erstellen und Routen definieren |
| **body-parser** | posts, comments, event-bus, query | JSON-Bodies aus POST-Anfragen parsen |
| **cors** | posts, comments, query | Cross-Origin-Anfragen vom Frontend erlauben |
| **axios** | posts, comments, event-bus | HTTP-Anfragen an andere Services senden |
| **nodemon** | posts, comments, event-bus, query | Automatischer Neustart bei Code-Änderungen |
| **react** | client | UI-Bibliothek |
| **react-dom** | client | React im Browser rendern |
| **react-scripts** | client | Build-Toolchain (Create React App) |
| **bootstrap** | client | CSS-Klassen für Layout und Design |

---

## 7. FAQ

### "Ist `express` ausgedacht?"
**Nein.** Express ist ein reales, sehr bekanntes npm-Paket (über 30 Millionen Downloads pro Woche). Es ist das populärste Web-Framework für Node.js.

### "Wofür steht `const`?"
`const` = **constant**. Deklariert eine Variable, die nach der Erstzuweisung **nicht neu zugewiesen** werden kann. Der Inhalt von Objekten/Arrays darf aber verändert werden:
```javascript
const x = 5;     // ✅ x = 5
x = 6;           // ❌ Fehler!
const obj = {};  // ✅
obj.name = "A";  // ✅ erlaubt (Inhalt ändern)
```

### "Was heißt cors?"
**CORS** = Cross-Origin Resource Sharing. Browser blockieren standardmäßig JavaScript-Anfragen von einer anderen Domain/Port. Mit app.use(cors()) sagt der Server: "Ich erlaube Anfragen von überall." Ohne CORS würde das Frontend auf localhost:3000 keine Daten von localhost:4000 abrufen können.

### "Gibt es Klassen (OOP)?"
**Nein.** Das Projekt verwendet funktionale Programmierung mit einfachen Objekten. Es gibt keine class-Definitionen. posts = {} ist ein einfaches JavaScript-Objekt.

### "Kann man das über das Internet nutzen?"

Nein. Alle Services laufen auf localhost und sind nur für den eigenen Rechner gedacht. Es gibt keine Authentifizierung, keine Sicherheit, keine Datenbank-Persistenz. Reines Lernprojekt.

### "Warum heißt es Microservices, wenn alles auf einem Rechner läuft?"

Es geht um die Architektur, nicht um die Deployment-Topologie. Die Services sind logisch getrennt (eigener Port, eigener Prozess, eigene Abhängigkeiten). Im echten Einsatz würde man sie auf verschiedene Server/Container verteilen.

### "Was passiert, wenn ein Service ausfällt?"
Wenn Posts ausfällt: Keine neuen Posts möglich, bestehende Daten sind weg.
Wenn Event-Bus ausfällt: Events kommen nicht an → Query-Service aktualisiert sich nicht.
Wenn Query ausfällt: Das Frontend kann nichts anzeigen (die anderen Services laufen aber weiter).
Fehlerbehandlung: Die .catch()-Aufrufe im Event-Bus fangen Fehler ab (z. B. wenn ein Service offline ist), geben sie nur in der Konsole aus. Es gibt kein Retry, keine Warteschlange.

#### "Warum wird in query/index.js cors verwendet, aber nicht in event-bus/index.js?"

Der Event-Bus wird nur von anderen Services angefragt, nicht vom Frontend-Browser. CORS wird nur für Browser-Anfragen benötigt. Der Query-Service wird direkt vom Browser (React) angefragt (axios.get("http://localhost:4002/posts")) – deshalb braucht er CORS.

### "Was bedeutet das Ausrufezeichen ! in posts[postId]?"

posts[postId] sucht einen Post mit dieser ID. Wenn der Post nicht existiert, ist der Wert undefined. Der Code im Query-Service ruft post.comments.push(...) auf – falls post undefined ist, würde das Programm abstürzen (TypeError). Das ist ein bekanntes Problem im Code: es fehlt eine Prüfung, ob der Post existiert. In einem echten System müsste man sicherstellen, dass das PostCreated-Event vor dem CommentCreated-Event eintrifft.

### "Warum wird await im Buffer nicht verwendet?"

Im Event-Bus werden die axios.post-Aufrufe ohne await ausgeführt. Das ist Absicht: Der Event-Bus soll die Events feuer-vergiss (fire-and-forget) versenden. Er wartet nicht auf Antworten, sondern sendet und antwortet sofort mit { status: "OK" }. Die .catch()-Fänger verhindern, dass Fehler den Server zum Absturz bringen.

### "Wieso app.use(bodyParser.json()) und nicht express.json()?"

In neueren Express-Versionen (4.16+) kann man express.json() statt body-parser verwenden. Der Code hier verwendet body-parser als explizites Paket – das ist eine ältere Vorgehensweise, funktioniert aber genauso.

### "Was bedeutet das { } in import React, { useState } from 'react'?"

Das sind benannte Exporte (named exports). React ist der Standard-Export (Default Export), useState ist ein benannter Export. In require-Schreibweise wäre es: const React = require('react'); const { useState } = require('react');.