import React, { Suspense, useState } from 'react';
import { organs } from '../data/organs';
import { OrganScene } from '../scenes/OrganScene';
import { Loader } from '../components/Loader';

export function AnatomyPage() {
  const [selected, setSelected] = useState(organs[0]);

  return (
    <div className="anatomy-layout">
      <aside className="organ-list" aria-label="Organ selector">
        <h2>Organs</h2>
        {organs.map(org => (
          <button
            key={org.id}
            className={`organ-btn${selected.id === org.id ? ' active' : ''}`}
            onClick={() => setSelected(org)}
            aria-pressed={selected.id === org.id}
          >
            {org.emoji} {org.name}
          </button>
        ))}
      </aside>

      <div className="anatomy-main">
        <h1>{selected.emoji} {selected.name}</h1>
        <Suspense fallback={<Loader />}>
          <OrganScene organId={selected.id} ariaLabel={`3D model of the ${selected.name}`} />
        </Suspense>

        <div className="organ-info card" style={{ marginTop: '1rem' }}>
          <p>{selected.description}</p>
          <p><strong>Function:</strong> {selected.function}</p>
          <div>
            <strong>Key Parts:</strong>
            <ul className="parts-list">
              {selected.parts.map(p => <li key={p}>{p}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
