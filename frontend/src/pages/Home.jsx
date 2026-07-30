import { useEffect, useState } from "react";
import { api } from "../api";
import SearchBar from "../components/SearchBar.jsx";
import MovieCard from "../components/MovieCard.jsx";
import MovieModal from "../components/MovieModal.jsx";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sectionLabel, setSectionLabel] = useState("Trending this week");
  const [selectedId, setSelectedId] = useState(null);

  const loadTrending = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.getTrending();
      setMovies(data.results || []);
      setSectionLabel("Trending this week");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrending();
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    setError("");
    try {
      const data = await api.search(query);
      setMovies(data.results || []);
      setSectionLabel(`Results for "${query}"`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className="marquee-header">
        <h1>CineReel</h1>
        <div className="sub">now showing — search the reel</div>
        <SearchBar onSearch={handleSearch} />
      </header>

      <div className="content">
        <div className="section-label">{sectionLabel}</div>

        {loading && <div className="state-msg">Rolling the reel...</div>}
        {error && <div className="state-msg">{error}</div>}
        {!loading && !error && movies.length === 0 && (
          <div className="state-msg">No films found. Try another title.</div>
        )}

        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onSelect={setSelectedId} />
          ))}
        </div>
      </div>

      {selectedId && <MovieModal movieId={selectedId} onClose={() => setSelectedId(null)} />}
    </div>
  );
}
