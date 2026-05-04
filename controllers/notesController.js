// controllers/notesController.js
// Handles request logic for notes

const notesModel = require('../models/notesModel');

// List all notes
exports.listNotes = (req, res) => {
  const notes = notesModel.loadNotes();
  res.json(notes);
};

// Add a new note
exports.addNote = (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  const newNote = notesModel.addNote(message);
  res.status(201).json(newNote);
};

// Delete a note by ID
exports.deleteNote = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const deleted = notesModel.deleteNote(id);
  if (!deleted) {
    return res.status(404).json({ error: `No note found with ID ${id}` });
  }
  res.json({ message: `Note with ID ${id} deleted successfully` });
};

// Update a note by ID
exports.updateNote = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required to update note' });
  }

  const updatedNote = notesModel.updateNote(id, message);

  if (!updatedNote) {
    return res.status(404).json({ error: `No note found with ID ${id}` });
  }

  res.json(updatedNote);
};
