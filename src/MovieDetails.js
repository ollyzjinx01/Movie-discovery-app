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

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=411bd1a20da8c85635ddc01cd37cc229`
      );
      const data = await response.json();
      data.release_date = new Date(data.release_date).toUTCString(); // Convert to UTC
      setMovieDetails(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h2 data-testid="movie-title">{movieDetails.title}</h2>
      <p data-testid="movie-release-date">{movieDetails.release_date}</p>
      <p data-testid="movie-runtime">{movieDetails.runtime}</p>
      <p data-testid="movie-overview">{movieDetails.overview}</p>
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
