// src/tests/App.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import App from "../App.jsx";

// 1) Mock AuthContext so AuthProvider + useAuth exist
vi.mock("../contexts/AuthContext", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    AuthProvider: ({ children }) => <>{children}</>,
    useAuth: () => ({
      user: null,
      authLoading: false,
      loginWithGoogle: vi.fn(),
      logout: vi.fn(),
    }),
  };
});

// 2) Mock fetchAllCountries so no real network call
vi.mock("../api/restCountries", () => ({
  fetchAllCountries: vi.fn().mockResolvedValue([]),
}));

// 3) Mock useFavorites so no Firebase/localStorage
vi.mock("../hooks/useFavorites", () => ({
  useFavorites: () => [[], vi.fn()],
}));

describe("App", () => {
  it("renders the main heading", () => {
    // NO <BrowserRouter> wrapper here—App already includes its own Router
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /where in the world\?/i })
    ).toBeInTheDocument();
  });
});
