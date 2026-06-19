import React from 'react';                      // React importieren
import { createRoot } from 'react-dom/client';  // neue React 18 API zum Rendern
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap CSS (Styles)
import App from './App';                        // die Hauptkomponente importieren

const container = document.getElementById('root'); // das <div id="root"> aus index.html
const root = createRoot(container);             // React Root erstellen
root.render(<App />);                           // Die App-Komponente rendern
