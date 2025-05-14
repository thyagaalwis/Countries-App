// @vitest-environment jsdom

import React from 'react'
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup
} from '@testing-library/react'
import App from '../App'
import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from 'vitest'

// --- 1) Mock data for two countries, including flags.svg ---
const mockCountries = [
  {
    cca3: 'AAA',
    name: { common: 'AlphaLand' },
    flags: { svg: 'https://example.com/alpha.svg' },
    population: 12345,
    area: 1000,
    languages: { en: 'English' },
    currencies: { USD: { name: 'US Dollar' } },
    idd: { root: '+1', suffixes: ['234'] },
    maps: { googleMaps: 'https://maps.google.com' },
    timezones: ['UTC']
  },
  {
    cca3: 'BBB',
    name: { common: 'BetaIsland' },
    flags: { svg: 'https://example.com/beta.svg' },
    population: 54321,
    area: 2000,
    languages: { es: 'Spanish' },
    currencies: { EUR: { name: 'Euro' } },
    idd: { root: '+3', suffixes: ['456'] },
    maps: { googleMaps: 'https://maps.google.com' },
    timezones: ['UTC+1']
  }
]

// Clean up DOM *and* reset URL between tests
afterEach(() => {
  cleanup()
  window.history.replaceState({}, '', '/')
})

describe('App integration', () => {
  beforeAll(() => {
    // 2) Mock global.fetch() → our two-country list
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockCountries
    })
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('renders the home page header and country list', async () => {
    render(<App />)

    const heading = await screen.findByRole('heading', {
      name: /where in the world\?/i
    })
    expect(heading).toBeInTheDocument()

    expect(screen.getByText('AlphaLand')).toBeInTheDocument()
    expect(screen.getByText('BetaIsland')).toBeInTheDocument()
  })

  it('filters the list when typing and pressing Enter', async () => {
    render(<App />)
    await screen.findByText('AlphaLand')

    const input = screen.getByPlaceholderText(/search for a country/i)
    fireEvent.change(input, { target: { value: 'Beta' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    await waitFor(() => {
      expect(screen.queryByText('AlphaLand')).toBeNull()
      expect(screen.getByText('BetaIsland')).toBeInTheDocument()
    })
  })

  it('navigates to the details page when the Details button is clicked', async () => {
    render(<App />)
    await screen.findByText('AlphaLand')

    // click the first “Details” button
    const [firstDetails] = screen.getAllByRole('button', { name: /details/i })
    fireEvent.click(firstDetails)

    const detailHeading = await screen.findByRole('heading', {
      name: 'AlphaLand'
    })
    expect(detailHeading).toBeInTheDocument()
    expect(screen.getByText(/Population:/i)).toBeInTheDocument()
  })
})
