// middleware/authMiddleware.js
// Middleware to protect routes with JWT

const jwt = require('jsonwebtoken');

// Secret key (in production, store in environment variable!)
const SECRET_KEY = 'mysecretkey';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken, SECRET_KEY };
