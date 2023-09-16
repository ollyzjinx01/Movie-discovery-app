import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({
  movie: { tmdbID, Year, Poster, Title, Type, poster_path, release_date },
}) => {
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : "https://via.placeholder.com/400";

  return (
    <div className="movie" key={tmdbID} data-testid="movie-card">
      <div>
        <img
          src={posterUrl}
          alt={Title}
          style={{
            width: "250px",
            height: "370px",
            flexShrink: 0,
          }}
          data-testid="movie-poster"
        />
      </div>

      <div>
        <p
          style={{
            width: "250px",
            color: "#ffffff", // Bright color (white in this case)
            fontFamily: "DM Sans",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
            // marginTop: "10px", // Add some space between poster and title
          }}
          data-testid="movie-title"
        >
          {Title}
        </p>
      </div>

      <div>
        <p
          style={{
            color: "var(--gray-900, #111827)",
            fontFamily: "DM Sans",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
          }}
          data-testid="movie-release-date"
        >
          {release_date}
        </p>
      </div>

      <Link to={`/movies/${tmdbID}`}>
        <button>See Details</button>
      </Link>
    </div>
  );
};

export default MovieCard;
