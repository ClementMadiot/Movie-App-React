import { Link } from "react-router-dom";

const MovieCards = ({
  movie: {
    title,
    poster_path,
    vote_average,
    original_language,
    release_date,
    id,
  },
}) => {
  return (
    <Link
      to={`/movie/${id}`}
      className="movie-card cursor-pointer"
    >
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
      />
      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <img
              src="star.svg"
              alt="stars"
              width="18px"
              height="18px"
              className="w-auto"
            />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <span className="dot">•</span>
          <p className="lang">{original_language}</p>
          <span className="dot">•</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCards;
