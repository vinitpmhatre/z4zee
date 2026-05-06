import { useMemo } from 'react';

export function simulate({ diameter, heartRate, volume }) {
  const d = diameter / 100;
  const vol = volume / 100;
  const resistance = 1 / (d * d);
  const strokeVolume = 70 * vol;
  const cardiacOutput = (heartRate * strokeVolume) / 1000;
  const map = 18 * cardiacOutput * resistance;
  const observed = map > 100 ? 'up' : map < 90 ? 'down' : 'same';
  return { resistance, cardiacOutput, map, observed };
}

export function useSimulation(values) {
  return useMemo(() => simulate(values), [values]);
}
