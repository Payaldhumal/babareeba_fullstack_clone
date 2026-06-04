# BA BA REEBA — Fullstack Clone

This repository is a fullstack clone of the BA BA REEBA website (reference: https://www.babareeba.club/) created as a coding assignment. It includes a React + Vite frontend and a minimal Express backend for contact handling and simple admin functionality.

## Key Technologies
- Frontend: React 18, Vite
- Routing: React Router DOM
- Animations: Framer Motion
- Backend: Node.js + Express

## Features
- Responsive gallery and site pages matching the reference layout
- Contact form with an Express endpoint
- Admin area with simple JWT-based authentication
- Image uploads (stored in `server/uploads`) and basic upload/delete management in the Admin UI

## Getting Started (local)
1. Install dependencies for client and server:

```powershell
cd client
npm install
cd ../server
npm install
```

2. Start the backend server (new terminal):

```powershell
cd server
npm start
```

3. Start the frontend dev server (new terminal):

```powershell
cd client
npm run dev
```

4. Open http://localhost:5173 in your browser.

## Environment variables (server)
- `ADMIN_USER` (default: `admin`)
- `ADMIN_PASS` (default: `secret`)
- `JWT_SECRET` (default: `change_this_secret`) — change for production

## Admin / Uploads
- Admin login is available on the client Admin page. After login you can view contact submissions and manage uploaded images.
- Uploaded files are saved to `server/uploads` and served at `/uploads/<filename>`.

## Recommended Improvements
- Add local copies of external images and optimize sizes
- Add unit and integration tests and a CI build pipeline
- Harden authentication and secure `JWT_SECRET` for production

## Deployment
Build the client and deploy to static hosting (Netlify/Vercel) and host the server on any Node-capable host. If using a single repo, build the client into a `dist` folder and serve static files from the Express server.

## ZIP for submission (Windows PowerShell)

```powershell
cd ..\..\babareeba_fullstack_clone
Compress-Archive -Path * -DestinationPath ..\babareeba_submission.zip
```

---
If you want, I can now initialize git, commit everything, and show the exact commands to push this repository to GitHub (or run them here if you authorize).
