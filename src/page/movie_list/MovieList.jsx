// components/MovieList.js
import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { fetchMovies, handleMovieSearch } from "../../actions/movieActions";
import "./MovieList.css";
import MovieCard from "../../components/movie_card/MovieCard";
import SearchBar from "../../components/search_bar/SearchBar";
import { debounce } from "../../utils";

const MovieList = ({
  movieStatus,
  movies,
  searchResults,
  error,
  fetchMovies,
  handleMovieSearch,
  isLoading,
}) => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (movieStatus === "idle") {
      fetchMovies();
    }
  }, [movieStatus, fetchMovies]);

  useEffect(() => {
    fetchMovies(currentPage); // Pass currentPage to fetchMovies
  }, [currentPage, fetchMovies]);
  console.log(currentPage);
  //  using debouncer
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandleMovieSearch = useCallback(
    debounce(handleMovieSearch, 300),
    []
  );
  const handleSearch = async (event) => {
    setQuery(event.target.value);
    if (event.target.value.length > 2) {
      await debouncedHandleMovieSearch(event.target.value);
    }
  };

  let content;

  if (movieStatus === "loading" || isLoading) {
    content = <div className="custom-spinner"></div>;
  } else if (movieStatus === "succeeded") {
    const moviesToDisplay = query.length > 2 ? searchResults : movies;
    content = (
      <div className="movie-grid">
        {moviesToDisplay.length > 0
          ? moviesToDisplay?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          : "No Movie Found"}
      </div>
    );
  } else if (movieStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <>
      <h2>Movies</h2>
      <div>
        <SearchBar query={query} handleSearch={handleSearch} />
        <button
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
        >
          Load More Movies
        </button>
      </div>
      {content}
    </>
  );
};

const mapStateToProps = (state) => ({
  movies: state.movies.movies,
  searchResults: state.search.result,
  movieStatus: state.movies.status,
  error: state.movies.error,
  isLoading: state.isLoading,
});

const mapDispatchToProps = {
  fetchMovies,
  handleMovieSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
