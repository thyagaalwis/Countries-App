// src/tests/App.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';

// Mock auth and favorites hooks
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ user: null, logout: vi.fn() })
}));
vi.mock('../hooks/useFavorites', () => ({
  useFavorites: () => [[], vi.fn()]
}));

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />);
    expect(screen.getByText(/Where in the world\?/i)).toBeInTheDocument();
  });
});
