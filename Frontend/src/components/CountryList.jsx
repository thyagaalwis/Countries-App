// src/components/CountryList.jsx
import React from 'react';

export default function CountryList({ countries, onSelect, toggleFavorite, favorites }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Countries ({countries.length})</h2>
      <ul className="space-y-2 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300">
        {countries.map((country) => (
          <li
            key={country.cca3}
            className="flex justify-between items-center bg-white hover:bg-blue-50 p-3 rounded-md shadow-sm transition cursor-pointer"
          >
            <span onClick={() => onSelect(country)} className="font-medium">
              {country.name.common}
            </span>
            <button onClick={() => toggleFavorite(country.cca3)} className="text-xl">
              {favorites.includes(country.cca3) ? '💖' : '🤍'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}