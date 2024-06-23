import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchMovies } from "../actions/movieActions";
import "./MovieList.css"; // Import your CSS file for styling

const MovieList = ({ movieStatus, movies, error, fetchMovies }) => {
  useEffect(() => {
    if (movieStatus === "idle") {
      fetchMovies();
    }
  }, [movieStatus, fetchMovies]);

  let content;

  if (movieStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (movieStatus === "succeeded") {
    content = (
      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>
                <strong>Release Date:</strong> {movie.release_date}
              </p>
              <p>
                <strong>Vote Count:</strong> {movie.vote_count}
              </p>
              <p>
                <strong>Popularity:</strong> {movie.popularity}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (movieStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Movies</h2>
      {content}
    </section>
  );
};

const mapStateToProps = (state) => ({
  movies: state.movies.movies,
  movieStatus: state.movies.status,
  error: state.movies.error,
});

const mapDispatchToProps = {
  fetchMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
