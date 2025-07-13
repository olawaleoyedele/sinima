import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const WatchlistPage = () => {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    const fetchWatchlist = async () => {
      const toastId = toast.loading("Loading watchlist...");
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/watchlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovies(res.data);
        toast.success("Watchlist loaded", { id: toastId });
      } catch (err) {
        
        toast.error("Failed to load watchlist", { id: toastId });
      }
    };

    fetchWatchlist();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6 py-10">
      <h2 className="text-3xl font-extrabold mb-8 text-center">🎬 My Watchlist</h2>

      {movies.length === 0 ? (
        <p className="text-center text-gray-400">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
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
                  className="w-full h-[300px] object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-lg text-white truncate">{movie.movie_title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
// This WatchlistPage component fetches and displays the user's watchlist movies. 