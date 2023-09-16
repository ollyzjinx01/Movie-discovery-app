import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import MovieDetails from "./MovieDetails";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "411bd1a20da8c85635ddc01cd37cc229";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTopMovies();
  }, []);

  const fetchTopMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      setMovies(data.results.slice(0, 10));
    } catch (error) {
      console.error("Error fetching top movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (title) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${title}&page=1&include_adult=false`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="app">
        <h1>MOVIE DISCOVERY</h1>

        <div className="search">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies"
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="container">
            {movies?.length > 0 ? (
              movies.map((movie) => (
                <Link to={`/movies/${movie.id}`} key={movie.id}>
                  <MovieCard movie={movie} />
                </Link>
              ))
            ) : (
              <div className="empty">
                <h2>No movies found</h2>
              </div>
            )}
          </div>
        )}

        <Routes>
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
