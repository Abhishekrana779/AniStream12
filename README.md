# AniStream

Modern anime discovery and streaming web application.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router, HLS.js
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Deployment: Render

## Local Setup

1. Install dependencies: `npm run install:all`
2. Create backend `.env` from `backend/.env.example`
3. Start dev servers: `npm run dev`

Frontend runs on `http://localhost:5173`, backend on `http://localhost:5000`.

## Environment Variables

### Backend

```
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
MIRURO_API_URL=https://miruroapi-bgdh.onrender.com
```

### Frontend

```
VITE_API_URL=http://localhost:5000/api
```

## Render Deployment

### Backend

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

### Frontend

- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `frontend/dist`

## Scripts

- `npm run dev` - Start both frontend and backend
- `npm run client` - Start frontend only
- `npm run server` - Start backend only
- `npm run build` - Build frontend
