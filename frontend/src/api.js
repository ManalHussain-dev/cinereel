const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050/api";

async function request(path) {
  const res = await fetch(`${API_URL}${path}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export const api = {
  getTrending: () => request("/trending"),
  search: (query, page = 1) => request(`/search?query=${encodeURIComponent(query)}&page=${page}`),
  getMovie: (id) => request(`/movie/${id}`),
};

export const IMG_BASE = import.meta.env.VITE_TMDB_IMG_BASE || "https://image.tmdb.org/t/p/w500";
