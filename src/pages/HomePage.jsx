import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { DnaHelix } from '../scenes/DnaHelix';
import { Loader } from '../components/Loader';

export function HomePage() {
  return (
    <div>
      <section className="page-hero">
        <div className="hero-content">
          <h1>3D Medical Explorer</h1>
          <p className="hero-subtitle">Interactive 3D anatomy, real-time cardiovascular simulation, and condition education — all in your browser.</p>
          <div className="hero-actions">
            <Link to="/anatomy" className="btn btn-primary">Explore Anatomy</Link>
            <Link to="/simulation" className="btn btn-ghost">Run Simulation</Link>
          </div>
        </div>
        <div className="hero-3d">
          <Suspense fallback={<Loader />}>
            <DnaHelix />
          </Suspense>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Explore the Platform</h2>
        <div className="card-grid">
          {[
            { to: '/anatomy', icon: '🫀', title: '3D Anatomy Explorer', desc: 'Rotate and inspect heart, lungs, brain, and kidneys with interactive 3D models and part labels.' },
            { to: '/simulation', icon: '⚙️', title: 'Blood Pressure Lab', desc: 'Manipulate vessel diameter, heart rate, and blood volume. Observe real-time 3D cardiovascular response.' },
            { to: '/conditions', icon: '📋', title: 'Condition Library', desc: 'Learn about Hypertension, Atherosclerosis, Heart Failure, and Tachycardia with pre-loaded simulation examples.' },
          ].map(f => (
            <Link key={f.to} to={f.to} className="info-card feature-card" aria-label={f.title}>
              <div className="info-card-emoji">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
