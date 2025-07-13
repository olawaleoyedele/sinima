import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavourites } from "../services/favourites";

const FavouritesPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await getFavourites(token);
        setMovies(res);
      } catch (err) {
        console.error(err);
        alert("Failed to load favourites");
      }
    };
    fetchFavourites();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6 py-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-red-500 text-center">
        ⭐ My Favourites
      </h2>

      {movies.length === 0 ? (
        <p className="text-center text-gray-300">You haven’t added any favourites yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <Link key={movie.movie_id} to={`/movie/${movie.movie_id}`}>
              <div className="relative group rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 bg-neutral-800">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={movie.movie_title}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent px-3 py-4">
                  <h3 className="text-sm font-semibold truncate">{movie.movie_title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;
// This FavouritesPage component fetches and displays the user's favourite movies.
// It uses the getFavourites service to retrieve the list of favourites from the backend.