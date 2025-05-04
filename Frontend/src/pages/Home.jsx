import React, { useState } from 'react';
import CountryCard from '../components/CountryCard';
import Pagination from '../components/Pagination';

export default function Home({ countries, favorites, toggleFavorite }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filtered = countries.filter((c) => {
    const matchesSearch = c.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = region ? c.region === region : true;
    return matchesSearch && matchesRegion;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedCountries = filtered.slice(start, start + itemsPerPage);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search for a country..."
          className="px-4 py-2 rounded bg-gray-800 placeholder-gray-400 text-white w-full md:w-1/2"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="px-4 py-2 rounded bg-gray-800 text-white w-full md:w-1/4"
          onChange={(e) => {
            setRegion(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedCountries.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
            isFavorite={favorites.includes(country.cca3)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
