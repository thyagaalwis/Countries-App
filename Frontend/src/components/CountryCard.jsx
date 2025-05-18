// src/components/CountryCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function CountryCard({ country, isFavorite, toggleFavorite }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { name, flags, population, region, capital, cca3 } = country;
  const canToggle = Boolean(user);
  const displayFavorite = Boolean(user && isFavorite);

  const handleFavoriteClick = () => {
    if (!canToggle) {
      // Not signed in → send user to login/signup page
      navigate('/login');
    } else {
      // Signed in → toggle favorite
      toggleFavorite(cca3);
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded-xl shadow hover:shadow-xl transition">
      <img
        src={flags.svg}
        alt={`Flag of ${name.common}`}
        className="w-full h-40 object-cover rounded-t-xl"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{name.common}</h3>
        <p className="text-sm">
          <strong>Population:</strong> {population.toLocaleString()}
        </p>
        <p className="text-sm">
          <strong>Region:</strong> {region}
        </p>
        <p className="text-sm mb-2">
          <strong>Capital:</strong> {capital?.[0] || 'N/A'}
        </p>

        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/details', { state: country })}
            className="text-blue-400 text-sm hover:underline"
          >
            Details
          </button>

          <button
            onClick={handleFavoriteClick}
            className={`
              text-2xl transition
              ${canToggle
                ? 'hover:scale-110 cursor-pointer'
                : 'cursor-pointer opacity-80'}
            `}
            title={
              canToggle
                ? (isFavorite
                    ? 'Remove from favorites'
                    : 'Add to favorites')
                : 'Sign in to favorite'
            }
          >
            {displayFavorite ? '💖' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
}
