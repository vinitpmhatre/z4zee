import React from 'react';
import { useNavigate } from 'react-router-dom';

export function ConditionCard({ condition }) {
  const navigate = useNavigate();
  const go = () => navigate('/simulation', { state: { params: condition.params } });
  return (
    <div className="info-card" onClick={go} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && go()} aria-label={`Explore ${condition.name} in simulation`}>
      <div className="info-card-header">
        <span className="info-card-emoji">{condition.emoji}</span>
        <span className={`badge badge-${condition.badgeColor}`}>{condition.badge}</span>
      </div>
      <h3>{condition.name}</h3>
      <p>{condition.description}</p>
      <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); go(); }}>
        Explore in Simulation →
      </button>
    </div>
  );
}
