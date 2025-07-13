import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // You can replace with Heroicons if you like

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-4 md:px-10 py-3 sticky top-0 z-50 shadow-md">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-red-600 hover:text-red-400 transition">
          Sinimá
        </Link>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/explore" className="hover:text-red-400 transition">Explore</Link>
          {token && <Link to="/watchlist" className="hover:text-red-400 transition">Watchlist</Link>}
          {token && <Link to="/favourites" className="hover:text-red-400 transition">Favourites</Link>}
          {token && <Link to="/profile" className="hover:text-red-400 transition">Profile</Link>}
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-semibold transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-red-400 transition">Login</Link>
              <Link to="/register" className="hover:text-red-400 transition">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-3 flex flex-col items-start px-2">
          <Link to="/explore" className="hover:text-red-400 transition" onClick={() => setIsOpen(false)}>Explore</Link>
          {token && <Link to="/watchlist" className="hover:text-red-400 transition" onClick={() => setIsOpen(false)}>Watchlist</Link>}
          {token && <Link to="/favourites" className="hover:text-red-400 transition" onClick={() => setIsOpen(false)}>Favourites</Link>}
          {token && <Link to="/profile" className="hover:text-red-400 transition" onClick={() => setIsOpen(false)}>Profile</Link>}
          {token ? (
            <button
              onClick={() => { handleLogout(); setIsOpen(false); }}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-semibold transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-red-400 transition" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/register" className="hover:text-red-400 transition" onClick={() => setIsOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
