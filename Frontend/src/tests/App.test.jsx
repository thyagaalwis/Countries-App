// src/tests/App.test.jsx
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import App from '../App'
import { AuthProvider } from '../contexts/AuthContext'
import * as restAPI from '../api/restCountries'
import { describe, it, expect, beforeEach, vi } from 'vitest'

// 1) Mock out the real fetchAllCountries import
vi.mock('../api/restCountries', () => ({
  fetchAllCountries: vi.fn()
}))

describe('App', () => {
  beforeEach(() => {
    // Resolve immediately with an empty array—no async state update will fire after mount
    restAPI.fetchAllCountries.mockResolvedValue([])
  })

  it('renders the main heading without act(...) warnings', async () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    )

    // 2) waitFor wraps its callback in act(), so this covers any pending updates
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /where in the world\?/i })
      ).toBeInTheDocument()
    })
  })
})
