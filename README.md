# Kanban Board

A simple kanban-style task board with a React + Vite frontend and an Express + MongoDB backend.

## Tech stack

- Client: React 19, Vite, CSS, Axios
- Server: Node.js (ES modules), Express, Mongoose
- Auth: JWT (JSON Web Tokens)
- DB: MongoDB

## Repository structure

- `client/` — React frontend (Vite)
- `server/` — Express API and MongoDB models

Key files:
- `server/index.js` — Express app and route mounting
- `server/routes/authRoutes.js` — Auth endpoints
- `server/routes/taskRoutes.js` — Task endpoints (protected)
- `client/src/api/` — client API helpers and axios instance

## Prerequisites

- Node.js (v18+ recommended)
- npm (or yarn)
- A running MongoDB instance (MongoDB local)

## Environment variables

Create a `.env` file in `server/` with at least the following:

```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/kanban?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

Create a `.env` (or `.env.local`) in `client/` (Vite) to override the API base URL if needed:

```
VITE_API_BASE=http://localhost:5000/api
```

If you don't set `VITE_API_BASE`, the client defaults to `http://localhost:5000/api`.

### Environment example files

For convenience there are example env files you can copy and edit:

- `server/.env.example` — copy to `server/.env` and fill in your MongoDB connection and JWT secret.
- `client/.env.example` — copy to `client/.env` or `client/.env.local` to override the API base URL for Vite.

These example files live at the repository root under the `server/` and `client/` folders.

## Install & run (Windows PowerShell)

Open two terminals (one for server, one for client).

Server:

```powershell
cd server
npm install
# start in dev mode (nodemon)
npm run dev
# or to start without nodemon
npm start
```

Client:

```powershell
cd client
npm install
npm run dev
```

The Vite dev server runs on `http://localhost:5173` by default. The server listens on the `PORT` from `.env` (default `5000`).

## Available scripts

Client (`client/package.json`):
- `npm run dev` — start Vite dev server
- `npm run build` — build production bundle
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

Server (`server/package.json`):
- `npm run dev` — start server with `nodemon` (dev)
- `npm start` — start server with `node index.js`

## API (endpoints)

Authentication (public):
- POST `/api/auth/register` — body: `{ name, email, password }` — registers a new user
- POST `/api/auth/login` — body: `{ email, password }` — returns JWT token on success

Tasks (protected — require Authorization: `Bearer <token>`):
- GET `/api/tasks` — list tasks for the authenticated user
- POST `/api/tasks` — create a task
- PUT `/api/tasks/:id` — update a task
- DELETE `/api/tasks/:id` — delete a task

The client sets the Authorization header automatically when a token is saved in localStorage via the `auth` helpers.

## CORS

The server currently allows requests from `http://localhost:5173` (Vite dev). If your client runs on a different origin, update the CORS origin in `server/index.js`.

## Troubleshooting

- "MongoDB connection failed": check `MONGO_URI` and that your IP is allowed (Atlas), or that local MongoDB is running.
- 401 unauthorized on tasks: ensure you are sending a valid JWT token (login first) and the token is present in localStorage under `kanban_token`.
- Port conflicts: adjust `PORT` in `server/.env` or the Vite port via `vite.config.js` if needed.

## Next steps / Suggestions

- Add unit/integration tests for API and client components
- Add Dockerfiles for containerized development
- Add a production-ready deployment guide (serving built client from the server)
