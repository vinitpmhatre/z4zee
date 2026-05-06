import React from 'react';
import { conditions } from '../data/conditions';
import { ConditionCard } from '../components/ConditionCard';

export function ConditionsPage() {
  return (
    <div>
      <header className="page-header">
        <h1>📋 Condition Library</h1>
        <p className="text-muted">Learn about common cardiovascular conditions. Click any card to explore it live in the simulation.</p>
      </header>
      <div className="card-grid">
        {conditions.map(c => <ConditionCard key={c.id} condition={c} />)}
      </div>
    </div>
  );
}
