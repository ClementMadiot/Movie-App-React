import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "./components/Spinner";
import { ACCESS_TOKEN, API_BASE_URL, API_OPTIONS } from "../tmdb";
import MovieDetails from "./components/MovieDetails";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Fetch movie details from TMDB API
    const fetchMovie = async () => {
      const res = await fetch(
        `${API_BASE_URL}/movie/${id}?api_key=${ACCESS_TOKEN}`,
        API_OPTIONS
      );

      if (!res.ok) throw new Error("Failed to fetch movie details");

      const data = await res.json();
      // console.log(data);

      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <Spinner />;

  // Helper to format runtime in hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes || isNaN(minutes)) return "N/A";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  // Helper to display "N/A" for empty strings or falsy values
  const displayValue = (value) => {
    if (value === "" || value === null || value === undefined) return "N/A";
    return value;
  };

  //Helper to format vote count in thousands
  const formatVoteCount = (count) => {
    if (!count || isNaN(count)) return "N/A";
    if( count <= 999 ) return `${count}k`;
    return `${(count / 1000).toFixed(1)}M`;
  };

  return (
    <section className="wrapper gap-10">
      <header className="flex items-center justify-between movie-header">
        <article>
          <h1>{displayValue(movie.title)}</h1>
          <div className="display flex items-center gap-2">
            <p>
              {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
            </p>
            <span className="dot">•</span>
            <p className="capitalize">
              {displayValue(movie.original_language)}
            </p>
            <span className="dot">•</span>
            <p>{formatRuntime(movie.runtime)}</p>
          </div>
        </article>

        <article className="flex items-center gap-2 bg-[#221F3D] py-2 px-3 rounded-lg">
          <img
            className="w-auto"
            src="/star.svg"
            alt="stars"
            width={20}
            height={20}
          />
          <p className="text-white font-bold">
            {movie.vote_average?.toFixed(1)}
            <span className=" font-normal">
              /10 ({formatVoteCount(movie.vote_count)})
            </span>
          </p>
        </article>
      </header>

      {/* Images */}
      <article className="flex justify-center">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/no-movie.png"
          }
          alt={displayValue(movie.title)}
          className="rounded-xl object-cover max-w-[300px] lg:max-w-[300px] lg:max-h-[400px] md:max-w-[200px] md:max-h-[300px]"
        />
        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={displayValue(movie.title)}
            className="w-full rounded-xl ml-6 object-cover lg:max-h-[400px] md:block md:max-h-[300px] hidden"
          />
        )}
      </article>
      {/* Details */}
      <article className="flex justify-between flex-col gap-12 lg:flex-row lg:gap-0">
        <MovieDetails movie={movie} displayValue={displayValue} />
        <div className="flex items-start">
          <Link className="button-gradient bg-[#D6C7FF]" to="/">
            Visit Homepage →
          </Link>
        </div>
      </article>
    </section>
  );
};

export default Movie;
