import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams }    from 'react-router-dom';
import CountryCard            from '../components/CountryCard';
import Pagination             from '../components/Pagination';
import SearchBar              from '../components/SearchBar';

export default function Home({ countries, favorites, toggleFavorite }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // ─── 1) bootstrap from URL ───────────────────────────────
  const initialQ      = searchParams.get('q')      || '';
  const initialRegion = searchParams.get('region') || '';
  const initialPage   = parseInt(searchParams.get('page') || '1', 10);

  // ─── 2) local state seeded from URL ──────────────────────
  const [searchTerm,  setSearchTerm]  = useState(initialQ);
  const [region,      setRegion]      = useState(initialRegion);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const itemsPerPage = 12;

  // ─── 3) keep URL in sync whenever any of these change ─────
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm)    params.set('q',      searchTerm);
    if (region)        params.set('region', region);
    if (currentPage > 1) params.set('page',   currentPage);
    setSearchParams(params, { replace: true });
  }, [searchTerm, region, currentPage, setSearchParams]);

  // ─── 4) filter + paginate ────────────────────────────────
  const filtered = useMemo(() => {
    return countries
      .filter(c =>
        c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(c => region ? c.region === region : true);
  }, [countries, searchTerm, region]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const start      = (currentPage - 1) * itemsPerPage;
  const pageItems  = filtered.slice(start, start + itemsPerPage);

  // ─── 5) handlers that reset page back to 1 on new search/region ───
  const handleSearch = q => {
    setSearchTerm(q);
    setCurrentPage(1);
  };
  const handleRegion = r => {
    setRegion(r);
    setCurrentPage(1);
  };

  return (
    <div className="px-4">
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
        {/* controlled, URL-synced search bar */}
        <SearchBar onSearch={handleSearch} value={searchTerm} />

        <select
          value={region}
          onChange={e => handleRegion(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white w-full md:w-1/4"
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
        {pageItems.map(country => (
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
          onPageChange={p => setCurrentPage(p)}
        />
      </div>
    </div>
  );
}
