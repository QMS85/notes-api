// controllers/authController.js
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../middleware/authMiddleware');
const userModel = require('../models/userModel');

// Register new user
exports.register = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const newUser = userModel.registerUser(username, password);

  if (!newUser) {
    return res.status(409).json({ error: 'Username already exists' });
  }

  res.status(201).json({ message: 'User registered successfully', username: newUser.username });
};

// Login existing user
exports.login = (req, res) => {
  const { username, password } = req.body;

  const user = userModel.validateUser(username, password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ token });
};


