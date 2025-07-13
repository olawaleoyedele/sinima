// src/pages/HomePage.jsx
import React from "react";
// Add this at the top
import { useNavigate } from "react-router-dom";
import MovieRow from "../components/MovieRow";
import { getTrendingMovies, getTopRatedMovies, getActionMovies } from "../services/tmdb";


const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-black text-white min-h-screen">
            {/* Static Hero for now */}
            <div
                className="relative h-[80vh] bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url(https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg)",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90"></div>
                <div className="absolute bottom-20 left-10 max-w-xl">
                    <h1 className="text-5xl font-extrabold mb-4">Fight Club</h1>
                    <p className="text-lg mb-6 max-w-md">
                        An insomniac office worker and a devil-may-care soapmaker form an underground fight club...
                    </p>
                    <button
                        onClick={() => navigate("/explore")} // ✅ Add navigation
                        className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                        Watch Now
                    </button>
                </div>
            </div>

            {/* Movie Carousels */}
            <div className="py-10 space-y-12">
                <MovieRow title="🔥 Trending Now" fetchMoviesFn={getTrendingMovies} />
                {/* You can add more fetchers like getTopRatedMovies, etc. */}
                <MovieRow title="🌟 Top Rated" fetchMoviesFn={getTopRatedMovies} />
                <MovieRow title="💥 Action Movies" fetchMoviesFn={getActionMovies} />
            </div>
        </div>
    );
};

export default HomePage;
