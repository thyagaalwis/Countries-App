// src/api/restCountries.js
export async function fetchAllCountries() {
    const res = await fetch('https://restcountries.com/v3.1/all');
    return await res.json();
  }