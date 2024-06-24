// components/MovieCard.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for additional matchers
import MovieCard from "./MovieCard";

const mockMovie = {
  id: 1,
  title: "Sample Movie",
  release_date: "2023-01-01",
  vote_count: 100,
  popularity: 7.5,
  poster_path: "/sample-poster.jpg",
};

test("renders movie card with correct movie details", () => {
  render(<MovieCard movie={mockMovie} />);

  const movieTitle = screen.getByText(mockMovie.title);
  expect(movieTitle).toBeInTheDocument();

  expect(
    screen.getByText(`Release Date: ${mockMovie.release_date}`)
  ).toBeInTheDocument();
  expect(
    screen.getByText(`Vote Count: ${mockMovie.vote_count}`)
  ).toBeInTheDocument();
  expect(
    screen.getByText(`Popularity: ${mockMovie.popularity}`)
  ).toBeInTheDocument();
});
