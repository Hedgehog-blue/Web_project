import React from 'react';

export default function SpecialtyCard({ specialty, onClick, flash }) {
  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center ${flash ? 'card-flash' : ''}`}
    >
      <div>
        <strong>{specialty.name}</strong> — {specialty.short}
      </div>
      <button
        className="btn btn-outline-primary btn-sm"
        onClick={() => onClick(specialty)}
      >
        Детальніше
      </button>
    </li>
  );
}
