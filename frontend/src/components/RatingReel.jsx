export default function RatingReel({ score }) {
  // score comes in as 0-10 from TMDB, convert to a 0-1 fraction
  const fraction = Math.max(0, Math.min(score / 10, 1));
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * fraction;

  return (
    <div className="reel">
      <svg width="34" height="34" viewBox="0 0 34 34">
        <circle cx="17" cy="17" r={radius} fill="none" stroke="rgba(241,233,216,0.15)" strokeWidth="3" />
        <circle
          cx="17"
          cy="17"
          r={radius}
          fill="none"
          stroke="#c9a227"
          strokeWidth="3"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="reel-score">{score ? score.toFixed(1) : "—"}</div>
    </div>
  );
}
