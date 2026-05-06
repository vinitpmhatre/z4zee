import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Loader } from './components/Loader';

const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AnatomyPage = lazy(() => import('./pages/AnatomyPage').then(m => ({ default: m.AnatomyPage })));
const SimulationPage = lazy(() => import('./pages/SimulationPage').then(m => ({ default: m.SimulationPage })));
const ConditionsPage = lazy(() => import('./pages/ConditionsPage').then(m => ({ default: m.ConditionsPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));

export function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="anatomy" element={<AnatomyPage />} />
            <Route path="simulation" element={<SimulationPage />} />
            <Route path="conditions" element={<ConditionsPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
