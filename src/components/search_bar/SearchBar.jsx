import React from "react";
import "./SearchBar.css";

const SearchBar = ({ query, handleSearch }) => {
  return (
    <input
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Search for movies..."
      className="search-input"
    />
  );
};

export default SearchBar;
