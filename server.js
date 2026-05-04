// server.js
// Entry point for the Express server

const express = require('express');
const notesRoutes = require('./\_routes/notes.js');
const authRoutes = require('./\_routes/auth.js');

const app = express();
const PORT = 3000;

// Middleware: parse JSON request bodies
app.use(express.json());

// Auth routes (register & login)
app.use('/', authRoutes);

// Notes routes (protected with JWT)
app.use('/notes', notesRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
