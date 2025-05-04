import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Favorites({ countries, favorites, toggleFavorite }) {
  const navigate = useNavigate();
  const favoriteCountries = countries.filter(c => favorites.includes(c.cca3));

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Favorites</h1>

      {favoriteCountries.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-2xl text-gray-400 font-semibold">No favorite countries yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteCountries.map((country) => (
            <div
              key={country.cca3}
              className="bg-gray-800 text-white rounded-xl shadow hover:shadow-xl transition"
            >
              <img
                src={country.flags.svg}
                alt={`Flag of ${country.name.common}`}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{country.name.common}</h3>
                <p className="text-sm"><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p className="text-sm"><strong>Region:</strong> {country.region}</p>
                <p className="text-sm mb-2"><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => navigate('/details', { state: country })}
                    className="text-blue-400 text-sm hover:underline"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => toggleFavorite(country.cca3)}
                    className="text-xl"
                  >
                    ❌
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
