// src/tests/CountryList.test.jsx
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CountryList from '../components/CountryList'
import { vi } from 'vitest'

test('renders and clicks country', () => {
  const country = { cca3: 'LKA', name: { common: 'Sri Lanka' } }
  const onSelect = vi.fn()
  const { getByText } = render(
    <CountryList
      countries={[country]}
      onSelect={onSelect}
      toggleFavorite={() => {}}
      favorites={[]}
    />
  )

  fireEvent.click(getByText('Sri Lanka'))
  expect(onSelect).toHaveBeenCalledWith(country)
})
