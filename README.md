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

Note: Vite may auto-increment the dev port if the default is in use (e.g. 5173 → 5174 → 5175).

Client environment:
- `VITE_API_URL` — base URL for the API (e.g. `http://localhost:5000`). Set this in `client/.env` for dev and in your production build environment.

## Environment variables (server)
- `ADMIN_USER` (default: `admin`)
- `ADMIN_PASS` (default: `secret`)
- `JWT_SECRET` (default: `change_this_secret`) — change for production

Server example: copy `server/.env.example` to `server/.env` and update secrets.

Client example: create `client/.env` with `VITE_API_URL=http://localhost:5000` before running the client dev server.

## Admin / Uploads
- Admin login is available on the client Admin page. After login you can view contact submissions and manage uploaded images.
- Uploaded files are saved to `server/uploads` and served at `/uploads/<filename>`.

## Recommended Improvements
- Add local copies of external images and optimize sizes
- Add unit and integration tests and a CI build pipeline
- Harden authentication and secure `JWT_SECRET` for production

## Deployment
Build the client and deploy to static hosting (Netlify/Vercel) and host the server on any Node-capable host. If using a single repo, build the client into a `dist` folder and serve static files from the Express server.

Docker (optional): this repo includes `Dockerfile`s and a `docker-compose.yml` to run both services together. Example:

```powershell
# from repo root
docker compose up --build
```

Production build (client):

```powershell
cd client
npm run build
# serve the generated `dist` folder from any static host or copy into the server `client/dist` and let Express serve it
```

Notes on recent updates
- UI migrated to Chakra UI (components under `client/src/components` and pages under `client/src/pages`).
- `GalleryModal`, `Contact`, and `Admin` pages use Chakra components and `import.meta.env.VITE_API_URL` for API requests.
- Server: added basic security and logging middlewares, and `.env.example` for recommended env variables.

Netlify Deploy (team: `payaldhumal121`)

- This repo includes a `netlify.toml` configured to build the client and publish `client/dist` as the SPA.
- To deploy to your Netlify team:
	1. Go to https://app.netlify.com/teams/payaldhumal121 and choose "New site from Git".
	2. Connect GitHub and select the `Payaldhumal/babareeba_fullstack_clone` repository.
	3. Set build settings as below (these are pre-filled by `netlify.toml` but verify):

```
Build command: npm --prefix client ci && npm --prefix client run build
Publish directory: client/dist
```

	4. Add environment variables in the Netlify Site settings → Build & deploy → Environment:
		 - `VITE_API_URL` — set to your backend URL (e.g., `https://your-api.example.com`)
	5. Trigger a deploy. Netlify will build the client and publish the `dist` folder.

Notes:
- The Express server in `server/` is not hosted on Netlify by default — Netlify hosts only the static client. You can host the server separately (Render, Heroku, DigitalOcean, Azure) and point `VITE_API_URL` to that server.
- If you want to consolidate both in Netlify, consider converting server endpoints into Netlify Functions (not included by default).

## ZIP for submission (Windows PowerShell)

```powershell
cd ..\..\babareeba_fullstack_clone
Compress-Archive -Path * -DestinationPath ..\babareeba_submission.zip
```

---
If you want, I can now initialize git, commit everything, and show the exact commands to push this repository to GitHub (or run them here if you authorize).
