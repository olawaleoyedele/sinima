import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MovieRow = ({ title, fetchMoviesFn }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMoviesFn();
      setMovies(data);
    };
    fetchData();
  }, [fetchMoviesFn]);

  return (
    <div className="px-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 px-4"
        style={{
          scrollbarWidth: "none",            // Firefox
          msOverflowStyle: "none",           // IE 10+
          overflowY: "hidden",               // Prevent vertical scroll
        }}>
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="block">
            <div className="min-w-[160px] max-w-[180px] flex-shrink-0 hover:scale-105 transition-transform duration-300">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg shadow-lg"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
