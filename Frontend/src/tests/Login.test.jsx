// src/tests/Login.test.jsx
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import { vi } from 'vitest';

// Mock useAuth and loginWithGoogle
typeof globalThis.mockLogin === 'undefined' && (globalThis.mockLogin = vi.fn());
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ loginWithGoogle: globalThis.mockLogin })
}));

// Mock useNavigate
globalThis.mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => globalThis.mockNavigate };
});

test('calls loginWithGoogle and navigates on click', async () => {
  render(<Login />);
  fireEvent.click(screen.getByRole('button', { name: /sign in with google/i }));
  expect(globalThis.mockLogin).toHaveBeenCalled();
  await waitFor(() => {
    expect(globalThis.mockNavigate).toHaveBeenCalledWith('/');
  });
});
