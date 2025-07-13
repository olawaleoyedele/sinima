import React, { useEffect, useState } from "react";
import { getTrendingMovies, searchMovies } from "../services/tmdb";
import { Link } from "react-router-dom";

const ExplorePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [popularity, setPopularity] = useState(false);

  const genres = [
    { id: '', name: 'All Genres' },
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Sci-Fi' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ];

  const fetchMovies = async (filters = {}, pageNum = 1) => {
    filters.page = pageNum;
    const isEmpty =
      !filters.query &&
      !filters.genre &&
      !filters.year &&
      !filters.rating &&
      !filters.release_date &&
      !filters.popularity;
    if (isEmpty) {
      filters.popularity = true;
    }
    const data = await searchMovies(filters);
    setMovies(data.results);
    setPage(data.page);
    setTotalPages(data.total_pages);
  };

  const buildFilters = () => {
    const filters = {};
    if (query) filters.query = query;
    if (genre) filters.genre = genre;
    if (year) filters.year = year;
    if (rating) filters.rating = rating;
    if (releaseDate) filters.release_date = releaseDate;
    if (popularity) filters.popularity = true;
    return filters;
  };

  const handleSearch = async (e, newPage = 1) => {
    if (e) e.preventDefault();
    const pageToFetch = e ? 1 : newPage;
    await fetchMovies(buildFilters(), pageToFetch);
  };

  useEffect(() => {
    fetchMovies({}, 1);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-8">Explore Movies</h1>

      <form
        onSubmit={handleSearch}
        className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-lg mb-8 flex flex-wrap gap-3 justify-center"
      >
        <input
          type="text"
          placeholder="Search title..."
          className="bg-black/50 border border-white/20 text-white px-3 py-2 rounded placeholder-gray-400 focus:ring-2 focus:ring-red-600"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="bg-black/50 border border-white/20 text-white px-3 py-2 rounded"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          {genres.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Year"
          className="bg-black/50 border border-white/20 text-white px-3 py-2 rounded w-24"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rating"
          className="bg-black/50 border border-white/20 text-white px-3 py-2 rounded w-24"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="0"
          max="10"
          step="0.1"
        />
        <input
          type="date"
          className="bg-black/50 border border-white/20 text-white px-3 py-2 rounded"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
        <label className="flex items-center text-sm text-gray-300">
          <input
            type="checkbox"
            className="mr-2"
            checked={popularity}
            onChange={(e) => setPopularity(e.target.checked)}
          />
          Popular
        </label>
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold transition"
        >
          Search
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {(Array.isArray(movies) ? movies : []).map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden hover:scale-105 transform transition duration-300 shadow-lg hover:shadow-pink-500/20">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title}
                className="rounded-t-lg"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent px-3 py-4">
                <h3 className="text-md font-semibold truncate">{movie.title}</h3>
                <p className="text-sm text-gray-300">
                  {movie.release_date?.slice(0, 4)} • ⭐ {Math.floor(movie.vote_average)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-10">
          <button
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded disabled:opacity-30"
            onClick={() => handleSearch(null, page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="text-gray-300">
            Page <span className="font-bold text-white">{page}</span> of {totalPages}
          </span>
          <button
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded disabled:opacity-30"
            onClick={() => handleSearch(null, page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
