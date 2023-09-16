import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=411bd1a20da8c85635ddc01cd37cc229`
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const { title, release_date, overview, runtime } = movieDetails;
  const releaseDateUTC = new Date(release_date).toUTCString();

  return (
    <div className="movie-details">
      <h2 data-testid="movie-title">{title}</h2>
      <p data-testid="movie-release-date">Release Date: {releaseDateUTC}</p>
      <p data-testid="movie-runtime">{runtime} minutes</p>
      <p data-testid="movie-overview">{overview}</p>
      <button onClick={toggleFavorite} className={isFavorite ? "favorite" : ""}>
        <FontAwesomeIcon
          icon={faHeart}
          style={{ color: isFavorite ? "red" : "gray" }}
        />
      </button>
    </div>
  );
};

export default MovieDetails;
