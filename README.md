# FLUX — Full-Stack Authentication System

FLUX is a full-stack user authentication system built using React, Node.js, Express, MongoDB, bcrypt and JWT.

The project demonstrates how a modern authentication system works from user registration and password hashing to login, JWT authentication, protected routes and logout.

---

## 🚀 Features

- User registration
- Secure password hashing using bcrypt
- User login
- JWT-based authentication
- Protected backend API
- Frontend route protection
- User dashboard
- Logout functionality
- Password visibility toggle
- Form validation
- MongoDB database integration
- Responsive dark-themed UI
- Authentication status display
- Secure environment variable handling

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- CSS
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token (JWT)
- CORS
- dotenv

### Development Tools

- Visual Studio Code
- Git
- GitHub
- MongoDB Atlas

---

## 🏗️ Project Architecture

```text
                    ┌──────────────────┐
                    │   React Frontend │
                    │      (Vite)      │
                    └────────┬─────────┘
                             │
                             │ HTTP Requests
                             ▼
                    ┌──────────────────┐
                    │  Express Server  │
                    │    REST API      │
                    └────────┬─────────┘
                             │
                  ┌──────────┴──────────┐
                  │                     │
                  ▼                     ▼
          ┌──────────────┐      ┌──────────────┐
          │    bcrypt    │      │     JWT      │
          │  Password    │      │ Authentication│
          │   Hashing    │      │    Tokens     │
          └──────────────┘      └──────────────┘
                  │                     │
                  └──────────┬──────────┘
                             ▼
                    ┌──────────────────┐
                    │     MongoDB      │
                    │      Atlas       │
                    └──────────────────┘

       🔐 Authentication Flow
        Registration
User enters name, email and password
                ↓
        React Registration Form
                ↓
        POST /api/auth/register
                ↓
        Express Backend
                ↓
        Password hashed with bcrypt
                ↓
        User stored in MongoDB
                ↓
       Registration successful

       Login
User enters email and password
                ↓
          React Login Form
                ↓
        POST /api/auth/login
                ↓
        Express Backend
                ↓
        Find user in MongoDB
                ↓
       bcrypt.compare()
                ↓
        Password verified
                ↓
          JWT generated
                ↓
       Token stored in browser
                ↓
          Dashboard access

          Protected Dashboard
User opens /dashboard
          ↓
Frontend Route Guard
          ↓
Check JWT in localStorage
          ↓
Send JWT with API request
          ↓
Express Authentication Middleware
          ↓
jwt.verify()
          ↓
Token valid?
     ↙           ↘
   YES            NO
    ↓              ↓
Dashboard       Login Page

📁 Project Structure
FLUX
│
├── backend
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   ├── models
│   │   └── user.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── dashboardRoutes.js
│   │
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend
│   │
│   ├── src
│   │   ├── components
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── assets
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md

⚙️ Installation
1. Clone the repository
git clone https://github.com/SatyamRunghe/FLUX.git

Move into the project:
cd FLUX

🔧 Backend Setup
Move into the backend directory:
cd backend

Install dependencies:
npm install

## 💻 Frontend Setup

Open a second terminal.

Move into the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will show the local frontend URL in the terminal, usually:

```text
http://localhost:5173
```

---

## 🔗 API Endpoints

### Register User

```http
POST /api/auth/register
```

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User

```http
POST /api/auth/login
```

Example request:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

A successful login returns a JWT token.

### Protected Dashboard

```http
GET /api/dashboard
```

The request requires a valid JWT:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## 🔒 Security

FLUX uses several authentication and security concepts.

### Password Hashing

Passwords are never stored as plain text.

During registration:

```text
Plain Password
      ↓
bcrypt.hash()
      ↓
Hashed Password
      ↓
MongoDB
```

During login:

```text
Entered Password
      ↓
bcrypt.compare()
      ↓
Stored Hash
      ↓
Password Verified
```

### JWT Authentication

After successful login, the server generates a JSON Web Token.

The token is then used when requesting protected resources.

The backend verifies the token using the JWT secret.

### Environment Variables

Sensitive configuration such as:

- MongoDB connection string
- JWT secret

is stored in `.env`.

The `.env` file is excluded from Git using `.gitignore`.

---

## 🛡️ Protected Routes

FLUX uses protection on both the frontend and backend.

### Frontend Protection

`ProtectedRoute.jsx` checks whether a token exists in local storage.

If no token exists:

```text
/dashboard
     ↓
No token
     ↓
Redirect to login
```

### Backend Protection

The backend uses:

```text
authMiddleware.js
```

The middleware:

1. Reads the Authorization header.
2. Extracts the JWT.
3. Verifies the JWT.
4. Rejects invalid or expired tokens.
5. Allows valid requests to continue.

---

## 🎨 User Interface

The application includes:

- Dark modern interface
- FLUX branding
- Responsive authentication cards
- Form validation messages
- Password visibility toggle
- Loading states
- User account dashboard
- Authentication status indicator
- Logout button

---

## 🧪 Testing

The following authentication scenarios can be tested.

### Registration

- Register with valid details
- Try empty fields
- Try a password shorter than 8 characters
- Try registering an existing email

### Login

- Login with correct credentials
- Try an incorrect password
- Try an unregistered email
- Try empty fields

### Protected Dashboard

- Access dashboard after login
- Access dashboard without a token
- Test an invalid or expired token

### Logout

- Click logout
- Verify the token is removed
- Try accessing the dashboard again

---

## 📚 Key Concepts Demonstrated

This project demonstrates practical understanding of:

- Full-stack web development
- React component architecture
- React Router
- REST APIs
- HTTP requests
- Express.js routing
- Express middleware
- MongoDB
- Mongoose
- Password hashing
- bcrypt
- JWT authentication
- Protected routes
- Frontend route guards
- Local storage
- Environment variables
- Git
- GitHub

---

## 🔄 Complete Application Flow

```text
                    USER
                      │
                      ▼
              ┌───────────────┐
              │ Registration  │
              └───────┬───────┘
                      │
                      ▼
                Express API
                      │
                      ▼
                bcrypt.hash()
                      │
                      ▼
                   MongoDB
                      │
                      ▼
              Registration Done
                      │
                      ▼
                    Login
                      │
                      ▼
               bcrypt.compare()
                      │
                      ▼
                  JWT Token
                      │
                      ▼
               Protected Route
                      │
                      ▼
              JWT Verification
                      │
                      ▼
                 Dashboard
                      │
                      ▼
                   Logout
                      │
                      ▼
               Token Removed
                      │
                      ▼
                Login Screen
```

---

## 🎯 Project Objective

The main objective of FLUX is to demonstrate how authentication works in a full-stack web application.

The project combines frontend and backend technologies to implement a complete authentication workflow rather than relying only on frontend validation.

---

## 🚀 Future Improvements

Possible future improvements include:

- Forgot password functionality
- Email verification
- Refresh tokens
- HTTP-only cookies
- Role-based authentication
- User profile editing
- Password reset
- Account deletion
- Rate limiting
- Improved API validation
- Deployment to a cloud platform

---

## 👨‍💻 Author

**Satyam Runghe**

B.Tech Information Technology Student

GitHub:

https://github.com/SatyamRunghe

---

## 📄 License

This project was created as a learning and project demonstration application.
