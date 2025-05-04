// src/tests/CountryDetails.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryDetailsPage from '../pages/CountryDetailsPage';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const mockCountry = {
  cca3: 'LKA',
  name: { common: 'Sri Lanka' },
  flags: { svg: 'flag.svg', png: 'flag.png' },
  region: 'Asia',
  population: 21000000,
  capital: ['Colombo'],
};

test('renders country detail', () => {
  render(
    <MemoryRouter initialEntries={[{ pathname: '/details', state: mockCountry }]}> 
      <Routes>
        <Route path="/details" element={<CountryDetailsPage />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/Sri Lanka/)).toBeInTheDocument();
  expect(screen.getByAltText(/flag of sri lanka/i)).toHaveAttribute('src', 'flag.svg');
});
