// src/components/Navbar.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const { pathname } = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const linkStyle = (path) =>
    `hover:underline text-lg ${
      pathname === path ? 'text-yellow-400 font-semibold' : 'text-white'
    }`;

  return (
    <nav className="bg-blue-900 px-6 py-4 flex justify-between items-center shadow-md relative">
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <img
          src="https://img.icons8.com/color/48/000000/globe.png"
          alt="logo"
          className="h-9 w-9"
        />
        <h1 className="text-2xl font-bold text-white">Country Explorer</h1>
      </div>

      {/* Nav links + auth */}
      <div className="flex items-center gap-6">
        <Link to="/" className={linkStyle('/')}>
          🏠 Home
        </Link>

        <Link to="/favorites" className={linkStyle('/favorites')}>
          ❤️ Favorites
        </Link>

        {!user ? (
          // Link to your /login page instead of firing the popup here
          <Link
            to="/login"
            className="flex items-center gap-1 text-white hover:underline"
          >
            <img
              src="https://img.icons8.com/ios-filled/20/ffffff/login-rounded-right.png"
              alt="login"
            />
            <span className="text-lg">Sign in with Google</span>
          </Link>
        ) : (
          // User avatar + dropdown
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-pink-500 text-white font-semibold rounded-full w-9 h-9 flex items-center justify-center"
              title={user.displayName}
            >
              {user.displayName?.[0].toUpperCase() || 'U'}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-36 bg-white text-gray-800 rounded shadow-md z-50">
                <div className="px-4 py-2 border-b">
                  Hello, <strong>{user.displayName}</strong>
                </div>
                <button
                  onClick={() => { setShowDropdown(false); onLogout(); }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  ↩️ Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
