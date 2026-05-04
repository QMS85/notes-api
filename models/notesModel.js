// models/notesModel.js
// Handles data storage for notes in notes.json

const fs = require('fs');
const filePath = './notes.json';

// Load notes
function loadNotes() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
}

// Save notes
function saveNotes(notes) {
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}

// Add note
function addNote(message) {
  const notes = loadNotes();
  const newNote = {
    id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
    message
  };
  notes.push(newNote);
  saveNotes(notes);
  return newNote;
}

// Delete note
function deleteNote(id) {
  const notes = loadNotes();
  const updatedNotes = notes.filter(note => note.id !== id);
  if (updatedNotes.length === notes.length) return false;
  saveNotes(updatedNotes);
  return true;
}

// Update note
function updateNote(id, newMessage) {
  const notes = loadNotes();
  const noteIndex = notes.findIndex(note => note.id === id);

  if (noteIndex === -1) return null;

  notes[noteIndex].message = newMessage;
  saveNotes(notes);
  return notes[noteIndex];
}

module.exports = { loadNotes, saveNotes, addNote, deleteNote, updateNote };
