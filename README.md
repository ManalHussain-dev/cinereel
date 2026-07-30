# CineReel 🎬

A movie search app with a marquee-cinema visual identity — search any film and browse trending titles, with a ticket-stub card design and a circular "film reel" rating dial instead of a plain star rating.

Built to show clean public API integration and polished, distinctive frontend design — the counterpart to [Deadline Desk](https://github.com/ManalHussain-dev/deadline-desk), which focuses on backend/auth depth.

## Features

- Search movies by title (powered by [TMDB](https://www.themoviedb.org/documentation/api))
- Trending-this-week grid on load
- Movie detail modal: overview, genres, runtime, release year, rating
- Rating shown as a circular "reel" dial that fills based on score
- API key kept server-side via a small Express proxy — never exposed to the browser

## Tech stack

**Frontend:** React (Vite), plain CSS
**Backend:** Node.js, Express (thin proxy to TMDB)

## Project structure

```
cinereel/
├── backend/
│   └── server.js        # Proxies /api/search, /api/trending, /api/movie/:id to TMDB
└── frontend/
    └── src/
        ├── components/    # MovieCard, SearchBar, MovieModal, RatingReel
        ├── pages/          # Home
        └── api.js          # fetch wrapper for the backend proxy
```

## Running it locally

### 1. Get a free TMDB API key
Sign up at [themoviedb.org](https://www.themoviedb.org/signup), then go to Settings → API to request a free API key (v3 auth).

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
```
Paste your TMDB key into `.env` as `TMDB_API_KEY`.

```bash
npm run dev
```
Runs on `http://localhost:5050`.

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Runs on `http://localhost:5174`.

## Why a backend proxy for a "frontend" project?

Calling TMDB directly from the browser would expose the API key in every request. The Express proxy keeps the key server-side and only forwards the specific endpoints the app needs — a small but important pattern worth showing in a portfolio.

## Possible next steps

- Add pagination for search results
- Add a "watchlist" saved to localStorage
- Deploy backend to Render/Railway, frontend to Vercel/Netlify
<img width="1349" height="677" alt="2" src="https://github.com/user-attachments/assets/d26266dc-4e71-4ff9-9e98-7bf313086d33" />
