// routes/notes.js
// Defines endpoints for notes CRUD operations

const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController.js');
const { authenticateToken } = require('../middleware/authMiddleware');

// Protected routes
router.get('/', authenticateToken, notesController.listNotes);
router.post('/', authenticateToken, notesController.addNote);
router.delete('/:id', authenticateToken, notesController.deleteNote);
router.put('/:id', authenticateToken, notesController.updateNote);

module.exports = router;


