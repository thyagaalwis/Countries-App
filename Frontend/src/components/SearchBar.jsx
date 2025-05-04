// src/components/SearchBar.jsx
import React from 'react';

export default function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by name..."
      onChange={(e) => onSearch(e.target.value)}
      className="p-2 border rounded w-full md:w-60"
    />
  );
}