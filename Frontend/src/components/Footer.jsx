// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h4 className="text-lg font-semibold mb-2">About</h4>
          <p className="text-sm">
            Country Explorer helps you discover facts about every country—its
            capital, population, region, and more.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/favorites" className="hover:underline">
                Favorites
              </a>
            </li>
            <li>
              <a href="/login" className="hover:underline">
                Sign In
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Contact</h4>
          <ul className="space-y-1 text-sm">
            <li>Email: support@countryexplorer.com</li>
            <li>
              GitHub:{' '}
              <a
                href="https://github.com/thyagaalwis"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                github.com/thyagaalwis
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-blue-800 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Country Explorer. All rights reserved.
      </div>
    </footer>
  );
}
