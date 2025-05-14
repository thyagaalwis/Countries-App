// src/tests/CountryDetails.integration.test.jsx
// @vitest-environment jsdom

import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import CountryDetailsPage from '../pages/CountryDetailsPage'
import { afterEach, describe, it, expect } from 'vitest'

const mockCountry = {
  cca3: 'AAA',
  name: { common: 'AlphaLand', official: 'Republic of AlphaLand' },
  flags: { svg: 'https://example.com/alpha.svg' },
  population: 12_345,
  area: 1_000,
  region: 'Europe',
  subregion: 'Northern Europe',
  capital: ['Alpha City'],
  languages: { en: 'English', fr: 'French' },
  currencies: {
    USD: { name: 'US Dollar', symbol: '$' },
    EUR: { name: 'Euro', symbol: '€' }
  },
  idd: { root: '+1', suffixes: ['234', '567'] },
  maps: { googleMaps: 'https://maps.google.com/alpha' },
  timezones: ['UTC', 'UTC+1']
}

afterEach(cleanup)

function renderWithState(country = mockCountry) {
  return render(
    <MemoryRouter initialEntries={[{ pathname: '/details', state: country }]}>
      <Routes>
        <Route path="/details" element={<CountryDetailsPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('CountryDetailsPage (integration)', () => {
  it('shows the country name and flag', () => {
    renderWithState()
    expect(
      screen.getByRole('heading', { name: 'AlphaLand' })
    ).toBeInTheDocument()

    const flag = screen.getByRole('img', { name: /flag of alphaland/i })
    expect(flag).toHaveAttribute('src', mockCountry.flags.svg)
  })

  it('renders population, area, region/subregion and capital', () => {
    renderWithState()

    // Population
    const popLabel = screen.getByText('Population:')
    expect(popLabel.parentElement).toHaveTextContent('12,345')

    // Area
    const areaLabel = screen.getByText('Area:')
    expect(areaLabel.parentElement).toHaveTextContent('1,000 km²')

    // Region / Subregion line
    expect(
      screen.getByText(/Europe\s*\/\s*Northern Europe/)
    ).toBeInTheDocument()

    // Capital
    const capLabel = screen.getByText('Capital:')
    expect(capLabel.parentElement).toHaveTextContent('Alpha City')
  })

  it('lists languages and currency', () => {
    renderWithState()

    const langLabel = screen.getByText('Languages:')
    expect(langLabel.parentElement).toHaveTextContent('English, French')

    const currLabel = screen.getByText('Currency:')
    expect(currLabel.parentElement).toHaveTextContent('US Dollar (USD)')
  })

  it('shows timezones and calling code', () => {
    renderWithState()

    const tzLabel = screen.getByText('Timezones:')
    expect(tzLabel.parentElement).toHaveTextContent('UTC, UTC+1')

    const callLabel = screen.getByText('Calling code:')
    expect(callLabel.parentElement).toHaveTextContent('+1234')
  })

  it('provides a Google Maps link', () => {
    renderWithState()
    const mapsLink = screen.getByRole('link', {
      name: /view on google maps/i
    })
    expect(mapsLink).toHaveAttribute(
      'href',
      mockCountry.maps.googleMaps
    )
  })
})
