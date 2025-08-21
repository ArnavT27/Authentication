## Full-Stack Auth (Node/Express + MongoDB + React/Vite)

A complete authentication flow with signup, login, logout, email verification (6-digit code), forgot password, and password reset. Backend built with Express/Mongoose/JWT; frontend with React (Vite), Ant Design notifications, and Framer Motion.

### Features

- **User auth**: Signup, Login, Logout
- **Email verification**: 6-digit code with expiry
- **Password reset**: Request link via email and reset via token
- **JWT cookie**: Token set as a cookie for session persistence
- **Auth guard**: Client checks `GET /api/auth/check-auth` on load

### Tech Stack

- **Backend**: Node.js, Express 5, Mongoose 8, JWT, Bcrypt, Nodemailer/Mailtrap
- **Frontend**: React 19, Vite 7, React Router, Ant Design notifications, Framer Motion,lucide-react 
- **Styling**: Tailwind (via `@tailwindcss/vite` plugin)

---

### File Structure

```text
Auth/
  package.json
  package-lock.json
  README.md
  client/
    vite-project/
      package.json
      package-lock.json
      vite.config.js
      index.html
      eslint.config.js
      README.md
      src/
        main.jsx
        index.css
        App.jsx
        utils/
          cookies.js
        context/
          AppContext.jsx
        components/
          FloatingShape.jsx
          Input.jsx
          PasswordStrength.jsx
        pages/
          ChangePasswordPage.jsx
          EmailVerificationPage.jsx
          ForgotPasswordPage.jsx
          Home.jsx
          Login.jsx
          SignupPage.jsx
          WelcomeHome.jsx
  server/
    server.js
    routes/
      authRoutes.js
    controller/
      authController.js
    model/
      usersModel.js
    mailtrap/
      email.js               # empty placeholder
      emailTemplate.js
      mailtrap.config.js
    utils/                   # (empty)
```

---

### Getting Started

#### Prerequisites

- Node.js 18+ recommended
- A MongoDB connection (e.g., MongoDB Atlas)
- A Mailtrap account for testing email delivery

#### 1) Configure environment (server/config.env)

````

Note: The server CORS allows only `http://127.0.0.1:5173`. Use 127.0.0.1 (not localhost) when running the client, or adjust `allowedOrigins` in `server/server.js`.

#### 2) Install dependencies

```bash
# from project root
npm install

# install client deps
cd client/vite-project
npm install
````

#### 3) Run locally

In two terminals:

```bash
# Terminal 1 - Backend (project root)
npm start

# Terminal 2 - Frontend (client)
cd client/vite-project
npm run dev
```

Backend runs on `http://127.0.0.1:8000`. Frontend runs on `http://127.0.0.1:5173`.

---

### API Overview

Base URL: `http://127.0.0.1:8000/api/auth`

- `POST /login`

  - Body: `{ email, password }`
  - Sets `token` cookie on success; returns user (without password)

- `POST /signup`

  - Body: `{ name, email, password, passwordConfirm }`
  - Creates user, sets cookie, generates verification token (email send is scaffolded)

- `POST /logout`

  - Clears `token` cookie

- `GET /check-auth`

  - Requires cookie; returns `{ status: 'success', user }`

- `POST /verify-email` (protected)

  - Body: `{ code }` (6-digit)
  - Requires `token` cookie; marks user as verified

- `POST /forgot-password`

  - Body: `{ email }`
  - Sends reset link with token to email (via Mailtrap SMTP)

- `POST /forgot-password/:token`
  - Body: `{ password, passwordConfirm }`
  - Resets password if token valid and not expired

---


### Frontend Notes

- Client uses axios with `withCredentials` where needed (verification, login/logout, auth check)
- Auth context in `src/context/AppContext.jsx` loads auth state on app start by calling `GET /api/auth/check-auth`
- Routes in `src/App.jsx` include signup, login, email verification, forgot/reset, and a simple authenticated home

---

### Scripts

- Root: `npm start` → `nodemon server/server.js`
- Client:
  - `npm run dev` → Vite dev server
  - `npm run build` → Vite build
  - `npm run preview` → Preview built app

---

### Security Notes

- Consider enabling `httpOnly` for the JWT cookie in production (currently commented) and using `secure: true` behind HTTPS
- Update CORS and cookie `sameSite` settings as appropriate for your deployment

---
