import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SummaryStats from "./components/SummaryStats";
import { fetchAllCountries } from "./api/restCountries";

import Login from "./pages/Login";
import Home from "./pages/Home";
import CountryDetailsPage from "./pages/CountryDetailsPage";
import FavoritesPage from "./pages/Favorites";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useFavorites } from "./hooks/useFavorites";

function PrivateRoute({ children }) {
  const { user, authLoading } = useAuth();
  if (authLoading) return null;               // still checking login → render nothing
  return user
    ? children                              // logged in → show protected page
    : <Navigate to="/login" replace />;   // not logged in → redirect
}

function MainApp() {
  const { user, logout, authLoading } = useAuth();
  const [favorites, setFavorites] = useFavorites();

  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetchAllCountries().then(setCountries);
  }, []);

  const toggleFavorite = (code) => {
    setFavorites(prev =>
      prev.includes(code)
        ? prev.filter(c => c !== code)
        : [...prev, code]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar user={user} onLogout={logout} />

      <main className="flex-grow p-6">
        <Routes>
          {/* Home is always available */}
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

          {/* Favorites is protected */}
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <FavoritesPage
                  countries={countries}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              </PrivateRoute>
            }
          />

          {/* Country Details */}
          <Route path="/details" element={<CountryDetailsPage />} />

          {/* Login */}
          <Route
            path="/login"
            element={
              authLoading
                ? null                                      // still loading auth → show nothing
                : user
                  ? <Navigate to="/" replace />         // already logged in → home
                  : <Login />                             // not logged in → login form
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <MainApp />
      </Router>
    </AuthProvider>
  );
}
