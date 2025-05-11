import React, { useEffect } from 'react';
import { useSearchParams }   from 'react-router-dom';

export default function SearchBar({ onSearch, value }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // keep the URL’s `?q=` in sync with `value`
  useEffect(() => {
    const q = value || '';
    const next = new URLSearchParams(searchParams);
    if (q) next.set('q', q);
    else  next.delete('q');
    next.delete('page');           // reset page on new search
    setSearchParams(next, { replace: true });
  }, [value, searchParams, setSearchParams]);

  // typing → lift up to Home
  const handleChange = e => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search for a country..."
      value={value}
      onChange={handleChange}
      className="px-4 py-2 rounded bg-gray-800 placeholder-gray-400 text-white w-full md:w-1/2"
    />
  );
}
