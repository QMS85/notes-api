// models/userModel.js
// Handles user storage in users.json

const fs = require('fs');
const bcrypt = require('bcryptjs');
const filePath = './users.json';

// Load users
function loadUsers() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
}

// Save users
function saveUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

// Register new user
function registerUser(username, password) {
  const users = loadUsers();

  if (users.find(u => u.username === username)) {
    return null; // user already exists
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const newUser = { username, passwordHash };

  users.push(newUser);
  saveUsers(users);

  return newUser;
}

// Validate user login
function validateUser(username, password) {
  const users = loadUsers();
  const user = users.find(u => u.username === username);

  if (!user) return null;

  const validPassword = bcrypt.compareSync(password, user.passwordHash);
  return validPassword ? user : null;
}

module.exports = { loadUsers, saveUsers, registerUser, validateUser };
