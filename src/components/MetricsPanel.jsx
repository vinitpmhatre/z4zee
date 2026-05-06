import React from 'react';
export function MetricsPanel({ model }) {
  return (
    <div className="metrics" role="region" aria-label="Simulation metrics">
      <div><strong>Resistance</strong><span>{model.resistance.toFixed(2)}</span></div>
      <div><strong>Cardiac Output</strong><span>{model.cardiacOutput.toFixed(2)} L/min</span></div>
      <div><strong>Blood Pressure (MAP)</strong><span>{model.map.toFixed(0)} mmHg</span></div>
    </div>
  );
}
