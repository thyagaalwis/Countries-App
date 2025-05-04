import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CountryCard({ country, isFavorite, toggleFavorite }) {
  const { name, flags, population, region, capital, cca3 } = country;
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 text-white rounded-xl shadow hover:shadow-xl transition">
      <img src={flags.svg} alt={`Flag of ${name.common}`} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{name.common}</h3>
        <p className="text-sm"><strong>Population:</strong> {population.toLocaleString()}</p>
        <p className="text-sm"><strong>Region:</strong> {region}</p>
        <p className="text-sm mb-2"><strong>Capital:</strong> {capital?.[0] || 'N/A'}</p>
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/details', { state: country })}
            className="text-blue-400 text-sm hover:underline"
          >
            Details
          </button>
          <button onClick={() => toggleFavorite(cca3)} className="text-xl">
            {isFavorite ? '💖' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
}
