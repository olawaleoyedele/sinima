import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavourites } from "../services/favourites";
import { toast } from "react-hot-toast";



const FavouritesPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      const toastId = toast.loading("Loading favourites...");
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await getFavourites(token);
        setMovies(res);
        toast.success("Favourites loaded", { id: toastId });
      } catch (err) {
        toast.error("Failed to load favourites", { id: toastId });
      }
    };
    fetchFavourites();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6 py-10">
      <h2 className="text-3xl font-extrabold mb-8 text-center">
        ⭐ My Favourites
      </h2>

      {movies.length === 0 ? (
        <p className="text-center text-gray-300">You haven’t added any favourites yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <Link key={movie.movie_id} to={`/movie/${movie.movie_id}`}>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden hover:scale-105 transform transition duration-300 shadow-lg hover:shadow-pink-500/20">
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