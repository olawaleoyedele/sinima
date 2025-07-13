// src/pages/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import MovieRow from "../components/MovieRow";
import { getTrendingMovies, getTopRatedMovies, getActionMovies } from "../services/tmdb";
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen">
      {/* 🎬 Hero Section with Fight Club Image and Framer Motion Animations */}
      <div
        className="relative h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90"></div>
        <div className="absolute bottom-20 left-5 max-w-xl z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold mb-4"
          >
            Fight Club
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-lg mb-6 max-w-md"
          >
            An insomniac office worker and a devil-may-care soapmaker form an underground fight club...
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/explore")}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Watch Now
          </motion.button>
        </div>
      </div>

      {/* Movie Rows with Netflix Styling */}
      <div className="py-10 space-y-12">
        <MovieRow title="🔥 Trending Now" fetchMoviesFn={getTrendingMovies} />
        <MovieRow title="🌟 Top Rated" fetchMoviesFn={getTopRatedMovies} />
        <MovieRow title="💥 Action Movies" fetchMoviesFn={getActionMovies} />
      </div>
    </div>
  );
};

export default HomePage;
