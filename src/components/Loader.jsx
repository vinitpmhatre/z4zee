import React from 'react';
export function Loader() {
  return (
    <div className="loader-overlay" role="status" aria-label="Loading 3D content">
      <div className="loader-spinner" />
      <p>Loading 3D scene…</p>
    </div>
  );
}
