import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

// const movie1 = {
//   Title: "Batman Begins",
//   Year: "2005",
//   imdbID: "tt0372784",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BODIyMDdhNTgtNDlmOC00MjUxLWE2NDItODA5MTdkNzY3ZTdhXkEyXkFqcGc@._V1_SX300.jpg",
// };

export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  async function fetchData(query) {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=bad3ba45&s=${query}`
    );
    const data = await res.json();
    setMovies(data.Search);
  }
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    const defaultSearchTerm = searchTerm || "Batman";
    fetchData(defaultSearchTerm);
  }, [searchTerm]);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          ref={inputRef}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchData(searchTerm);
            }
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            fetchData(searchTerm);
          }}
        />
      </div>
      <div className="container">
        {movies?.length > 0 ? (
          movies.map((movie) => <MovieCard movie={movie} />)
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </div>
  );
}
