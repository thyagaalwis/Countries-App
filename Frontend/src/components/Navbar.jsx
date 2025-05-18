// src/components/Navbar.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const { pathname } = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef();
  const mobileMenuRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const linkStyle = (path) =>
    `hover:underline text-lg ${
      pathname === path ? 'text-yellow-400 font-semibold' : 'text-white'
    }`;

  return (
    <nav className="bg-blue-900 px-6 py-4 flex items-center justify-between shadow-md relative">
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <img
          src="https://img.icons8.com/color/48/000000/globe.png"
          alt="logo"
          className="h-9 w-9"
        />
        <h1 className="text-2xl font-bold text-white">Country Explorer</h1>
      </div>

      {/* Desktop links & auth */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/" className={linkStyle('/')}>
          🏠 Home
        </Link>
        <Link to="/favorites" className={linkStyle('/favorites')}>
          ❤️ Favorites
        </Link>
        {!user ? (
          <Link
            to="/login"
            className="flex items-center gap-1 text-white hover:underline"
          >
            <img
              src="https://img.icons8.com/ios-filled/20/ffffff/login-rounded-right.png"
              alt="login"
            />
            <span className="text-lg">Sign in</span>
          </Link>
        ) : (
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setShowDropdown((v) => !v)}
              className="bg-pink-500 text-white font-semibold rounded-full w-9 h-9 flex items-center justify-center"
              title={user.displayName}
            >
              {user.displayName?.[0].toUpperCase() || 'U'}
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-md z-50">
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

      {/* Mobile Hamburger */}
      <button
        onClick={() => setShowMobileMenu(true)}
        className="md:hidden text-white text-2xl"
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-40 flex">
          {/* Sidebar */}
          <div
            ref={mobileMenuRef}
            className="w-64 bg-blue-900 text-white p-6 space-y-6"
          >
            <button
              onClick={() => setShowMobileMenu(false)}
              className="text-2xl mb-4"
              aria-label="Close menu"
            >
              ✖
            </button>
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setShowMobileMenu(false)}
                className={linkStyle('/')}
              >
                🏠 Home
              </Link>
              <Link
                to="/favorites"
                onClick={() => setShowMobileMenu(false)}
                className={linkStyle('/favorites')}
              >
                ❤️ Favorites
              </Link>
              {!user ? (
                <Link
                  to="/login"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center gap-1 hover:underline"
                >
                  <img
                    src="https://img.icons8.com/ios-filled/20/ffffff/login-rounded-right.png"
                    alt="login"
                  />
                  <span className="text-lg">Sign in</span>
                </Link>
              ) : (
                <button
                  onClick={() => { setShowMobileMenu(false); onLogout(); }}
                  className="flex items-center gap-2 hover:underline"
                >
                  ↩️ Sign out
                </button>
              )}
            </nav>
          </div>
          {/* Backdrop */}
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setShowMobileMenu(false)}
          />
        </div>
      )}
    </nav>
  );
}
