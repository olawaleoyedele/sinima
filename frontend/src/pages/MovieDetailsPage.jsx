import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
    getMovieDetails,
    getMovieTrailer,
    getRecommendations,
} from "../services/tmdb";
import {
    getAverageRating,
    getUserRating,
    setUserRating,
} from "../services/ratings";
import { getReviews, addReview } from "../services/reviews";
import {
    getFavourites,
    addToFavourites,
    removeFromFavourites,
} from "../services/favourites";
import {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
} from "../services/watchlist";

const MovieDetailsPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [inFavourites, setInFavourites] = useState(false);
    const [inWatchlist, setInWatchlist] = useState(false);
    const [avgRating, setAvgRating] = useState(null);
    const [userRating, setUserRatingState] = useState(null);
    const [hoverRating, setHoverRating] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewInput, setReviewInput] = useState("");
    const [reviewLoading, setReviewLoading] = useState(false);
    const [recommendations, setRecommendations] = useState([]);

    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const data = await getMovieDetails(id);
                setMovie(data);

                const trailer = await getMovieTrailer(id);
                setTrailerKey(trailer);

                const avg = await getAverageRating(id);
                setAvgRating(avg.avg_rating);

                if (isLoggedIn) {
                    const user = await getUserRating(id, token);
                    setUserRatingState(user.rating);

                    const favList = await getFavourites(token);
                    setInFavourites(favList.some((m) => m.movie_id === Number(id)));

                    const watchList = await getWatchlist(token);
                    setInWatchlist(watchList.some((m) => m.movie_id === Number(id)));
                }

                const revs = await getReviews(id);
                setReviews(revs);

                const recs = await getRecommendations(id);
                setRecommendations(recs);
            } catch (err) {
                console.error("Error loading data", err);
            }
        };

        fetchAll();
    }, [id, token, isLoggedIn]);

    const handleSetRating = async (value) => {
        const toastId = toast.loading("Saving rating...");
        if (!isLoggedIn) return toast.error("Please log in first", { id: toastId });
        try {
            await setUserRating(id, value, token);
            setUserRatingState(value);
            const avg = await getAverageRating(id);
            setAvgRating(avg.avg_rating);
            toast.success("Rating saved!", { id: toastId });
        } catch {
            toast.error("Failed to save rating", { id: toastId });
        }
    };

    const handleAddReview = async (e) => {
        const toastId = toast.loading("Adding review...");
        e.preventDefault();
        if (!isLoggedIn) return toast.error("Please log in first", { id: toastId });
        if (!reviewInput.trim()) return toast.error("Review cannot be empty", { id: toastId });

        setReviewLoading(true);
        try {
            await addReview(id, reviewInput, token);
            setReviewInput("");
            const updated = await getReviews(id);
            setReviews(updated);
            toast.success("Review added successfully!", { id: toastId });
        } catch {
            toast.error("Failed to add review", { id: toastId });
        } finally {
            setReviewLoading(false);
        }
    };

    const toggleFavourite = async () => {
        const toastId = toast.loading("Loading...");
        try {
            if (inFavourites) {
                await removeFromFavourites(movie.id, token);
                setInFavourites(false);
                toast.success("Removed from favourites", { id: toastId });
            } else {
                await addToFavourites(
                    {
                        movie_id: movie.id,
                        movie_title: movie.title,
                        poster_path: movie.poster_path,
                    },
                    token
                );
                setInFavourites(true);
                toast.success("Added to favourites", { id: toastId });
            }
        } catch {
            toast.error("Failed to toggle favourite", { id: toastId });
        }
    };

    const toggleWatchlist = async () => {
        const toastId = toast.loading("Loading...");
        try {
            if (inWatchlist) {
                await removeFromWatchlist(movie.id, token);
                setInWatchlist(false);
                toast.success("Removed from watchlist", { id: toastId });
            } else {
                await addToWatchlist(
                    {
                        movie_id: movie.id,
                        movie_title: movie.title,
                        poster_path: movie.poster_path,
                    },
                    token
                );
                setInWatchlist(true);
                toast.success("Added to watchlist", { id: toastId });
            }
        } catch {
            toast.error("Failed to toggle watchlist", { id: toastId });
        }
    };

    if (!movie) return <div className="text-center mt-20 text-white">Loading...</div>;

    const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";
    const backdrop = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : poster;

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Backdrop Hero */}
            <div
                className="h-[60vh] bg-cover bg-center relative"
                style={{ backgroundImage: `url(${backdrop})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-10 left-6 md:left-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-xl">{movie.title}</h1>
                    <p className="text-sm text-gray-300 max-w-lg mt-2 line-clamp-3">{movie.overview}</p>
                </div>
            </div>

            {/* Details Card */}
            <div className="-mt-24 md:-mt-32 max-w-6xl mx-auto px-4">
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 grid md:grid-cols-3 gap-8">
                    <img src={poster} alt={movie.title} className="rounded-xl w-full" />
                    <div className="md:col-span-2 space-y-4">
                        <p className="text-gray-300">{movie.overview}</p>
                        <div className="text-sm text-gray-400 space-y-1">
                            <div><strong>Released:</strong> {movie.release_date}</div>
                            <div><strong>Genres:</strong> {movie.genres.map((g) => g.name).join(", ")}</div>
                            <div><strong>TMDB Rating:</strong> ⭐ {Math.floor(movie.vote_average)}</div>
                            <div><strong>Average User Rating:</strong> {avgRating ? `⭐ ${Math.floor(avgRating)}` : "No ratings yet"}</div>
                        </div>
                        {isLoggedIn && (
                            <div>
                                <span className="mr-2 font-semibold">Your Rating:</span>
                                {[...Array(10)].map((_, i) => {
                                    const val = i + 1;
                                    return (
                                        <span
                                            key={val}
                                            style={{
                                                cursor: "pointer",
                                                color: (hoverRating || userRating) >= val ? "#FFD700" : "#555",
                                                fontSize: "1.5rem",
                                            }}
                                            onClick={() => handleSetRating(val)}
                                            onMouseEnter={() => setHoverRating(val)}
                                            onMouseLeave={() => setHoverRating(null)}
                                        >
                                            ★
                                        </span>
                                    );
                                })}
                            </div>
                        )}
                        {isLoggedIn && (
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={toggleFavourite}
                                    className={`px-4 py-2 rounded text-white ${inFavourites ? "bg-gray-600" : "bg-pink-600 hover:bg-pink-700"
                                        }`}
                                >
                                    {inFavourites ? "❌ Remove from Favourites" : "⭐ Add to Favourites"}
                                </button>
                                <button
                                    onClick={toggleWatchlist}
                                    className={`px-4 py-2 rounded text-white ${inWatchlist ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                >
                                    {inWatchlist ? "📺 Remove from Watchlist" : "➕ Add to Watchlist"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Trailer */}
            {trailerKey && (
                <div className="max-w-6xl mx-auto mt-16 px-4">
                    <h2 className="text-2xl font-bold mb-4">Trailer</h2>
                    <div className="aspect-w-16 aspect-h-9 rounded overflow-hidden">
                        <iframe
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            title="Trailer"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>
            )}

            {/* Reviews */}
            <div className="max-w-6xl mx-auto mt-16 px-4">
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                {isLoggedIn ? (
                    <form onSubmit={handleAddReview} className="mb-6 flex flex-col md:flex-row gap-3">
                        <textarea
                            className="bg-gray-800 p-3 rounded w-full resize-none"
                            rows={3}
                            placeholder="Write your review..."
                            value={reviewInput}
                            onChange={(e) => setReviewInput(e.target.value)}
                            disabled={reviewLoading}
                        />
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                            disabled={reviewLoading}
                        >
                            {reviewLoading ? "Submitting..." : "Submit Review"}
                        </button>
                    </form>
                ) : (
                    <p className="text-pink-400 mb-4">Please log in to write a review.</p>
                )}
                <div className="space-y-4">
                    {reviews.length === 0 ? (
                        <p className="text-gray-400">No reviews yet.</p>
                    ) : (
                        reviews.map((r, idx) => (
                            <div key={idx} className="bg-gray-800 p-4 rounded">
                                <div className="font-bold text-blue-300">{r.username}</div>
                                <p className="text-gray-100 whitespace-pre-line">{r.review}</p>
                                <div className="text-xs text-gray-500">{new Date(r.created_at).toLocaleString()}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
                <div className="max-w-6xl mx-auto mt-20 px-4">
                    <h2 className="text-2xl font-bold mb-4 text-white">You May Also Like</h2>
                    <div
                        className="flex overflow-x-auto space-x-4 px-1"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            overflowY: "hidden",
                        }}
                    >
                        {recommendations.map((rec) => (
                            <Link to={`/movie/${rec.id}`} key={rec.id}>
                                <div
                                    className="w-[180px] h-[300px] bg-[#111] rounded-xl overflow-hidden hover:scale-105 transition duration-300 shadow-lg flex-shrink-0"
                                >
                                    <div className="w-full h-[250px] bg-black">
                                        <img
                                            src={
                                                rec.poster_path
                                                    ? `https://image.tmdb.org/t/p/w500${rec.poster_path}`
                                                    : "https://via.placeholder.com/500x750?text=No+Image"
                                            }
                                            alt={rec.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-2 h-[50px]">
                                        <h3 className="text-white text-sm font-semibold truncate">
                                            {rec.title}
                                        </h3>
                                        <p className="text-xs text-gray-400">
                                            {rec.release_date?.slice(0, 4)}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default MovieDetailsPage;
