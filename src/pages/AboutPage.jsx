import React from 'react';

export function AboutPage() {
  return (
    <div>
      <header className="page-header">
        <h1>ℹ️ About MedExplorer</h1>
      </header>
      <div className="card" style={{ maxWidth: 720 }}>
        <p>MedExplorer is an interactive 3D medical education platform built with React, Three.js, and <code>@react-three/fiber</code>.</p>
        <h3>What you can do</h3>
        <ul>
          <li><strong>Anatomy Explorer</strong> — Rotate and inspect procedural 3D organ models with labelled parts.</li>
          <li><strong>Blood Pressure Lab</strong> — Follow the Predict → Manipulate → Observe → Explain → Compare workflow with real-time 3D feedback.</li>
          <li><strong>Condition Library</strong> — Explore common cardiovascular conditions and jump directly into the simulation with pre-loaded parameters.</li>
        </ul>
        <h3>Technology</h3>
        <ul>
          <li>React 18 + Vite — fast development and build</li>
          <li>Three.js / @react-three/fiber — WebGL 3D rendering</li>
          <li>@react-three/drei — helpers (OrbitControls, Html labels, Environment)</li>
          <li>react-router-dom v7 — client-side routing</li>
          <li>detect-gpu — GPU tier detection for low-end device fallbacks</li>
        </ul>
        <p className="text-muted" style={{ marginTop: '1.5rem' }}>For educational purposes only. Not a substitute for medical advice.</p>
      </div>
    </div>
  );
}
