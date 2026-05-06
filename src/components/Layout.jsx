import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="layout-shell">
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <NavLink to="/" className="navbar-logo">🫀 MedExplorer</NavLink>
        <div className="navbar-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/anatomy">Anatomy</NavLink>
          <NavLink to="/simulation">Simulation</NavLink>
          <NavLink to="/conditions">Conditions</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
