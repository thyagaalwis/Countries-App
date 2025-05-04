import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CountryDetailsPage() {
  const navigate = useNavigate();
  const { state: country } = useLocation();

  if (!country) return <div className="text-center text-white">No country selected.</div>;

  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
  const currency = country.currencies
    ? Object.values(country.currencies)[0]?.name + ` (${Object.keys(country.currencies)[0]})`
    : 'N/A';
  const area = country.area ? `${country.area.toLocaleString()} km²` : 'N/A';
  const callingCode = country.idd ? `${country.idd.root}${country.idd.suffixes?.[0] || ''}` : 'N/A';
  const googleMaps = country.maps?.googleMaps;

  return (
    <div className="min-h-screen bg-[#0c1f3f] text-white px-6 py-12">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        <div className="flex flex-col items-center">
          <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className="w-full max-w-md border mb-6" />
          <div className="flex gap-4">
            <button onClick={() => navigate(-1)} className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-600">
              ← Back
            </button>
            {googleMaps && (
              <a
                href={googleMaps}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 px-5 py-2 rounded hover:bg-blue-500"
              >
                🌍 View on Google Maps
              </a>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold">{country.name.common}</h1>
          <p className="text-lg text-gray-300 mb-4">{country.region} / {country.subregion || 'N/A'}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm">
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Languages:</strong> {languages}</p>
            <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
            <p><strong>Currency:</strong> {currency}</p>
            <p><strong>Area:</strong> {area}</p>
            <p><strong>Timezones:</strong> {country.timezones?.join(', ')}</p>
            <p><strong>Calling code:</strong> {callingCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
