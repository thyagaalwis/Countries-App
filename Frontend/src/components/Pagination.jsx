// src/components/Pagination.jsx
import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center space-x-2 text-white">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 bg-blue-700 rounded disabled:opacity-50"
      >
        &lt;
      </button>

      {start > 1 && <span className="px-2">...</span>}

      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 rounded ${currentPage === num ? 'bg-blue-600' : 'bg-blue-800 hover:bg-blue-700'}`}
        >
          {num}
        </button>
      ))}

      {end < totalPages && <span className="px-2">...</span>}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 bg-blue-700 rounded disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
}
