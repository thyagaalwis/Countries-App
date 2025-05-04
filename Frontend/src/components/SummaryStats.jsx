// src/components/SummaryStats.jsx
import React from 'react';

export default function SummaryStats({ countries }) {
  const totalCountries = countries.length;
  const regions = [...new Set(countries.map(c => c.region))];
  const languages = new Set();
  let population = 0;

  countries.forEach(c => {
    population += c.population;
    if (c.languages) Object.values(c.languages).forEach(lang => languages.add(lang));
  });

  const statCard = (label, value) => (
    <div className="bg-gray-800 text-white px-4 py-3 rounded-lg text-center shadow-md">
      <div className="text-xl font-bold">{value}</div>
      <div className="text-sm text-gray-300">{label}</div>
    </div>
  );

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6">
      {statCard('Countries', totalCountries)}
      {statCard('Regions', regions.length)}
      {statCard('Population', population.toLocaleString())}
      {statCard('Languages', languages.size)}
      {statCard('Verified', '✔️')}
      {statCard('Live API', '🌐')}
    </section>
  );
}