require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));

const TMDB_BASE = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

async function tmdbGet(path, params = {}) {
  const url = new URL(`${TMDB_BASE}${path}`);
  url.searchParams.set("api_key", API_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`TMDB error ${res.status}: ${body}`);
  }
  return res.json();
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "CineReel proxy is running" });
});

// Trending movies for the home page
app.get("/api/trending", async (req, res) => {
  try {
    const data = await tmdbGet("/trending/movie/week");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch trending movies", error: err.message });
  }
});

// Search movies by title
app.get("/api/search", async (req, res) => {
  const { query, page = 1 } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Query param 'query' is required" });
  }
  try {
    const data = await tmdbGet("/search/movie", { query, page });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
});

// Movie detail by id
app.get("/api/movie/:id", async (req, res) => {
  try {
    const data = await tmdbGet(`/movie/${req.params.id}`, { append_to_response: "credits" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch movie details", error: err.message });
  }
});

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`CineReel proxy running on port ${PORT}`));
