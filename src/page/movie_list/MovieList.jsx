// components/MovieList.js
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchMovies, handleMovieSearch } from "../../actions/movieActions";
import "./MovieList.css";
import MovieCard from "../../components/movie_card/MovieCard";
import SearchBar from "../../components/search_bar/SearchBar";

const MovieList = ({
  movieStatus,
  movies,
  searchResults,
  error,
  fetchMovies,
  handleMovieSearch,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (movieStatus === "idle") {
      fetchMovies();
    }
  }, [movieStatus, fetchMovies]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
    if (event.target.value.length > 2) {
      handleMovieSearch(event.target.value);
    }
  };

  let content;

  if (movieStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (movieStatus === "succeeded") {
    const moviesToDisplay = query.length > 2 ? searchResults : movies;
    content = (
      <div className="movie-grid">
        {moviesToDisplay?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    );
  } else if (movieStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <>
      <h2>Movies</h2>
      <SearchBar query={query} handleSearch={handleSearch} />
      {content}
    </>
  );
};

const mapStateToProps = (state) => ({
  movies: state.movies.movies,
  searchResults: state.search.result,
  movieStatus: state.movies.status,
  error: state.movies.error,
});

const mapDispatchToProps = {
  fetchMovies,
  handleMovieSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
