import React from "react";


const Footer = () => (
  <footer className="bg-black text-gray-400 py-8 mt-10">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
      <div>
        <h2 className="text-red-600 text-2xl font-bold mb-2">Sinimá</h2>
        <p className="text-sm">
          Discover, search, and save your favorite movies. Powered by Sinimá.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-white mb-2">Explore</h4>
        <ul className="space-y-1 text-sm">
          <li><a href="/explore" className="hover:text-white transition">Explore</a></li>
          <li><a href="/watchlist" className="hover:text-white transition">Watchlist</a></li>
          <li><a href="/favourites" className="hover:text-white transition">Favourites</a></li>
          <li><a href="/profile" className="hover:text-white transition">Profile</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-white mb-2">Contact</h4>
        <ul className="space-y-1 text-sm">
          <li>Email: <a href="mailto:support@sinimá.com" className="hover:text-white transition">support@sinimá.com</a></li>
          <li>GitHub: <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">movieapp</a></li>
        </ul>
      </div>
    </div>
    <div className="text-center text-xs text-gray-500 mt-8">
      &copy; {new Date().getFullYear()} Sinimá. All rights reserved.
    </div>
  </footer>

);

export default Footer;
