import RatingReel from "./RatingReel.jsx";
import { IMG_BASE } from "../api";

export default function MovieCard({ movie, onSelect }) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "—";

  return (
    <div className="movie-card" onClick={() => onSelect(movie.id)}>
      {movie.poster_path ? (
        <img className="poster" src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} loading="lazy" />
      ) : (
        <div className="poster" />
      )}
      <div className="stub-info">
        <h3>{movie.title}</h3>
        <div className="meta-row">
          <span>{year}</span>
          <RatingReel score={movie.vote_average} />
        </div>
      </div>
    </div>
  );
}
