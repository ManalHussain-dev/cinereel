import { useEffect, useState } from "react";
import { api, IMG_BASE } from "../api";
import RatingReel from "./RatingReel.jsx";

export default function MovieModal({ movieId, onClose }) {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    api
      .getMovie(movieId)
      .then((data) => !cancelled && setMovie(data))
      .catch((err) => !cancelled && setError(err.message));
    return () => {
      cancelled = true;
    };
  }, [movieId]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        {error && <div className="state-msg">{error}</div>}

        {!error && !movie && <div className="state-msg">Loading details...</div>}

        {movie && (
          <>
            {movie.poster_path && (
              <img
                className="modal-poster"
                src={`${IMG_BASE}${movie.poster_path}`}
                alt={movie.title}
              />
            )}
            <div className="modal-body">
              <h2>{movie.title}</h2>
              {movie.tagline && <div className="tagline">{movie.tagline}</div>}

              <div className="genres">
                {(movie.genres || []).map((g) => (
                  <span key={g.id} className="genre-pill">
                    {g.name}
                  </span>
                ))}
              </div>

              <p className="overview">{movie.overview || "No overview available."}</p>

              <div className="modal-meta">
                <span>{movie.release_date?.slice(0, 4) || "—"}</span>
                <span>{movie.runtime ? `${movie.runtime} min` : "—"}</span>
                <RatingReel score={movie.vote_average} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
