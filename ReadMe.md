

```markdown
# Notes API

A RESTful API for managing notes with user authentication. Built with Express.js and secured with JWT
(JSON Web Tokens).

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Files Included](#files-included)

---

## Features

✅ User registration and login  
✅ JWT-based authentication  
✅ Create, read, update, and delete notes  
✅ Password hashing with bcryptjs  
✅ Protected routes with token verification  
✅ JSON data persistence  

---

## Project Structure

```
notes-api/
├── server.js                 # Main Express server entry point
├── package.json              # Dependencies and project metadata
├── users.json                # Persistent user storage
├── notes.json                # Persistent notes storage
├── api.http                  # HTTP client test file
├── _routes/                  # API route handlers
│   ├── auth.js               # Authentication endpoints
│   └── notes.js              # Notes CRUD endpoints
├── controllers/              # Business logic
│   ├── authControllers.js    # Authentication logic
│   └── notesController.js    # Notes logic
├── middleware/               # Middleware functions
│   └── authMiddleware.js     # JWT verification middleware
└── models/                   # Data models
    ├── userModel.js          # User data operations
    └── notesModel.js         # Notes data operations
```

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

To verify installation, run:
```bash
node --version
npm --version
```

---

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd notes-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   This will install:
   - `express` - Web framework
   - `jsonwebtoken` - JWT creation and verification
   - `bcryptjs` - Password hashing

---

## Configuration

### Environment Setup

The project uses hardcoded configurations. For production, consider:

1. **JWT Secret Key** - Located in middleware/authMiddleware.js
   - Current: `mysecretkey`
   - **⚠️ Change this to a strong secret in production!**
   - Store in environment variables (`.env` file)

2. **Server Port** - Located in server.js
   - Current: `3000`
   - Modify the `PORT` variable if needed

### Example `.env` Setup (Optional)

Create a `.env` file in the project root:
```
PORT=3000
JWT_SECRET=your_super_secret_key_here
```

Then update middleware/authMiddleware.js to use `process.env.JWT_SECRET`.

---

## Running the Server

Start the server with:

```bash
node server.js
```

Expected output:
```
Server running at http://localhost:3000
```

---

## API Endpoints

### Authentication Endpoints

#### Register a New User
```
POST /register
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "username": "john_doe"
}
```

**Error Response (409 Conflict):**
```json
{
  "error": "Username already exists"
}
```

---

#### Login
```
POST /login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "token": "abc123.."
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": "Invalid credentials"
}
```

---

### Notes Endpoints (Protected - Require JWT Token)

**All note endpoints require the `Authorization` header:**
```
Authorization: Bearer <your_jwt_token_here>
```

#### List All Notes
```
GET /notes
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "username": "john_doe",
    "title": "My First Note",
    "content": "This is a test note"
  }
]
```

---

#### Create a New Note
```
POST /notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My New Note",
  "content": "Note content goes here"
}
```

**Response (201 Created):**
```json
{
  "id": 2,
  "username": "john_doe",
  "title": "My New Note",
  "content": "Note content goes here"
}
```

---

#### Update a Note
```
PUT /notes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}
```

**Response (200 OK):**
```json
{
  "message": "Note updated successfully"
}
```

---

#### Delete a Note
```
DELETE /notes/:id
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Note deleted successfully"
}
```

---

## Authentication

### How JWT Authentication Works

1. **User Registers** → Password hashed with bcryptjs → User stored in `users.json`
2. **User Logs In** → Credentials verified → JWT token generated (expires in 1 hour)
3. **Client Stores Token** → Token sent in `Authorization: Bearer <token>` header
4. **Protected Routes** → Token verified by `authenticateToken` middleware
5. **Request Processed** → If valid, request proceeds; if invalid, 403 Forbidden returned

### Token Structure

Tokens expire after **1 hour**. After expiration, users must log in again to get a new token.

---

## Data Models

### User Model

Stored in `users.json`:
```json
{
  "id": 1,
  "username": "john_doe",
  "password": "$2a$10$..." // bcryptjs hashed
}
```

### Notes Model

Stored in `notes.json`:
```json
{
  "id": 1,
  "username": "john_doe",
  "title": "Note Title",
  "content": "Note content"
}
```

---

## Error Handling

Common error responses:

| Status | Error | Cause |
|--------|-------|-------|
| 400 | Username and password required | Missing fields in request |
| 401 | Invalid credentials | Wrong username or password |
| 401 | Access denied. No token provided | Missing Authorization header |
| 403 | Invalid token | Expired or tampered token |
| 409 | Username already exists | Registration with duplicate username |

---

## Files Included

- **server.js** - Main Express application and route setup
- **api.http** - HTTP test file (for VS Code REST Client extension)
- **notes.json** - Persistent storage for notes
- **users.json** - Persistent storage for users
- **_routes/auth.js** - Authentication route definitions
- **_routes/notes.js** - Notes route definitions
- **controllers/authControllers.js** - User registration and login logic
- **controllers/notesController.js** - Notes CRUD operations
- **middleware/authMiddleware.js** - JWT verification middleware
- **models/userModel.js** - User data access layer
- **models/notesModel.js** - Notes data access layer
- **package.json** - Project dependencies

---

## Testing with REST Client

Use the included `api.http` file with the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) VS Code extension:

1. Install the REST Client extension
2. Open `api.http`
3. Click "Send Request" to test endpoints

---

## Next Steps & Improvements

Consider these enhancements for production:

- [ ] Use a real database (MongoDB, PostgreSQL)
- [ ] Add input validation and sanitization
- [ ] Implement refresh tokens
- [ ] Add role-based access control (RBAC)
- [ ] Add unit and integration tests
- [ ] Implement logging
- [ ] Add rate limiting
- [ ] Use environment variables for secrets
- [ ] Add API documentation (Swagger/OpenAPI)

---

## License

ISC

---

## Support

For issues or questions, please review the project structure and verify:
- Dependencies are installed (`npm install`)
- Server runs without errors (`node server.js`)
- Correct file paths in require statements
- JWT secret key is configured
```

