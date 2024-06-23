// components/MovieCard.js
import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        onError={(e) => {
          e.target.onerror = null; // Prevents infinite loop if the default image also fails
          e.target.src =
            "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";
        }}
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
  );
};

export default MovieCard;
