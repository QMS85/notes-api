// routes/auth.js
// Defines endpoints for user registration and login

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers.js');

// POST /register → create new user
router.post('/register', authController.register);

// POST /login → login existing user
router.post('/login', authController.login);

module.exports = router;


