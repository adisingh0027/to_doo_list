# To-Do List App

This repository contains a simple To-Do List mobile-first app (React + Vite + Tailwind) and a minimal Express API for task CRUD.

Features implemented:
- Create, edit, delete tasks
- Search tasks by keywords
- Tasks grouped by week (Mon-Sun) on the home screen
- Mark tasks as In Progress / Completed
- Weekly summary card with counts

Folders:
- `frontend` — Vite + React frontend with Tailwind
- `backend` — Express API (in-memory storage) with CRUD endpoints

Local run (development)
1. Backend:
   Open a terminal and run:

```powershell
cd backend; npm install; npm run dev
```

Backend runs at `http://localhost:4000`.

2. Frontend:
   In another terminal:

```powershell
cd frontend; npm install; npm run dev
```

Frontend runs at `http://localhost:5173` by default.

Deployment
- For frontend: build with `npm run build` inside `frontend` and deploy to Netlify or Vercel (configure redirects if using backend on another host).
- For backend: deploy the `backend` folder to any Node host (Heroku, Render, Railway).

Deployment (recommended)

1) Prepare the repo locally and push to GitHub

- Initialize git and commit the code:

```powershell
cd C:\Users\USER\Desktop\assessment_app
git init
git add .
git commit -m "Initial commit - ToDo app"
```

- Create a GitHub repository (via web UI or GitHub CLI) and push:

```powershell
# using GitHub CLI (optional)
gh repo create <owner>/<repo-name> --public --source=. --remote=origin --push
# or manually create repo on github.com then:
git remote add origin https://github.com/<your-user>/<repo>.git
git branch -M main
git push -u origin main
```

2) Deploy frontend to Netlify

- In Netlify, create a new site from Git, choose your GitHub repo and the `main` branch.
- Set build command: `npm run build` and publish directory: `frontend/dist`.
- IMPORTANT: set an environment variable `VITE_API_URL` in Netlify's Site Settings → Build & Deploy → Environment to your backend URL (for example `https://todo-backend.example.com`). The frontend reads `import.meta.env.VITE_API_URL`.

3) Deploy backend to Render / Railway / Heroku

- Push the `backend` folder to GitHub (it can be in the same repo). Deploy it as a Node service on Render/Railway:
   - Build/Start command: `node server.js` (or `npm run start` if you add a `start` script)
   - Port: use default (server reads `process.env.PORT`)
- After deployment note the backend URL (e.g. `https://todo-backend.onrender.com`) and add it to Netlify's `VITE_API_URL` environment variable.

4) Local preview with a production build (optional)

```powershell
# build frontend
cd frontend
npm install
npm run build

# serve `frontend/dist` with a static host or Netlify CLI
npx serve frontend/dist
```

Notes
- The frontend expects a runtime environment variable `VITE_API_URL` for the API base URL. If not set, it falls back to `http://localhost:4000` for local development.
- The backend is intentionally tiny and uses in-memory storage; to persist data use SQLite/Postgres and update `backend/server.js`.
- If you want, I can prepare a `Procfile`, `Dockerfile`, or GitHub Actions workflow to automate deployments.

Notes
- The backend uses in-memory storage for simplicity; replace with a database for persistence.
- The UI is responsive and styled with Tailwind to match the provided Figma and screenshot.
- <img width="1869" height="1079" alt="image" src="https://github.com/user-attachments/assets/7252c913-2137-4089-bf37-1cdae8887f9d" />
<img width="1918" height="1077" alt="image" src="https://github.com/user-attachments/assets/adbb1f81-83be-4473-ab8b-07fdbcb51ae4" />

