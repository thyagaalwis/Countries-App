// src/components/RegionFilter.jsx
import React from 'react';

export default function RegionFilter({ onFilter }) {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <select onChange={(e) => onFilter(e.target.value)} className="p-2 border rounded w-full md:w-60">
      <option value="">All Regions</option>
      {regions.map((region) => (
        <option key={region} value={region}>{region}</option>
      ))}
    </select>
  );
}