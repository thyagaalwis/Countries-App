import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";
import SummaryStats from "./components/SummaryStats";
import { fetchAllCountries } from "./api/restCountries";

import Login from "./pages/Login";
import Home from "./pages/Home";
import CountryDetailsPage from "./pages/CountryDetailsPage";
import FavoritesPage from "./pages/Favorites";

import { useAuth } from "./contexts/AuthContext";
import { useFavorites } from "./hooks/useFavorites";

export default function App() {
  const { user, logout } = useAuth();
  const [favorites, setFavorites] = useFavorites();

  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetchAllCountries().then(setCountries);
  }, []);

  const toggleFavorite = (code) => {
    setFavorites((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Navbar: uses <Link to="/login"> when no user */}
        <Navbar user={user} onLogout={logout} />

        <main className="p-6">
          <Routes>
            {/* Home */}
            <Route
              path="/"
              element={
                <>
                  <h1 className="text-4xl font-bold text-center mb-6">
                    Where in the world?
                  </h1>
                  <SummaryStats countries={countries} />
                  <Home
                    countries={countries}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                </>
              }
            />

            {/* Favorites (protected) */}
            <Route
              path="/favorites"
              element={
                user ? (
                  <FavoritesPage
                    countries={countries}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Country Details */}
            <Route path="/details" element={<CountryDetailsPage />} />

            {/* Login page */}
            <Route
              path="/login"
              element={user ? <Navigate to="/" replace /> : <Login />}
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
