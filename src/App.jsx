import React, { useMemo, useState } from 'react';

const steps = ['Predict', 'Manipulate', 'Observe', 'Explain', 'Compare'];

const initial = { diameter: 100, heartRate: 70, volume: 100 };

function simulate({ diameter, heartRate, volume }) {
  const d = diameter / 100;
  const vol = volume / 100;
  const resistance = 1 / (d * d);
  const strokeVolume = 70 * vol;
  const cardiacOutput = (heartRate * strokeVolume) / 1000;
  const map = 18 * cardiacOutput * resistance;
  const observed = map > 100 ? 'up' : map < 90 ? 'down' : 'same';

  return { resistance, cardiacOutput, map, observed };
}

function scoreExplanation(text) {
  const keywords = ['diameter', 'resistance', 'output', 'pressure'];
  const lowered = text.toLowerCase();
  const hits = keywords.filter((w) => lowered.includes(w)).length;
  return {
    hits,
    message:
      hits >= 3
        ? 'Strong chain reasoning: includes multiple causal steps.'
        : 'Needs more causal detail: mention diameter → resistance → output → pressure.',
  };
}

export function App() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(initial);
  const [prediction, setPrediction] = useState('');
  const [explanation, setExplanation] = useState('');
  const [feedback, setFeedback] = useState('');

  const model = useMemo(() => simulate(values), [values]);

  const result = prediction
    ? `Prediction: ${prediction}. Observed: ${model.observed}. ${prediction === model.observed ? 'Correct.' : 'Not correct—revise your model.'}`
    : `Observed blood pressure change: ${model.observed}. Add a prediction first next run.`;

  const resetAll = () => {
    setValues(initial);
    setPrediction('');
    setExplanation('');
    setFeedback('');
    setStep(0);
  };

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>Blood Pressure Reasoning Lab (React)</h1>
        <p>Predict → Manipulate → Observe → Explain → Compare</p>
      </header>

      <nav className="stepper" aria-label="workflow">
        {steps.map((s, i) => (
          <button
            key={s}
            className={`step ${i === step ? 'active' : ''}`}
            onClick={() => setStep(i)}
          >
            {i + 1}. {s}
          </button>
        ))}
      </nav>

      <section className="card stage" key={step}>
        {step === 0 && (
          <>
            <h2>1) Predict</h2>
            <label>What happens to blood pressure if vessel diameter decreases by 25%?</label>
            <select value={prediction} onChange={(e) => setPrediction(e.target.value)}>
              <option value="">Choose one...</option>
              <option value="up">Blood pressure goes up</option>
              <option value="down">Blood pressure goes down</option>
              <option value="same">No major change</option>
            </select>
          </>
        )}

        {step === 1 && (
          <>
            <h2>2) Manipulate Variables</h2>
            <label>Vessel diameter: {values.diameter}%</label>
            <input type="range" min="60" max="140" value={values.diameter} onChange={(e) => setValues((v) => ({ ...v, diameter: Number(e.target.value) }))} />

            <label>Heart rate: {values.heartRate} bpm</label>
            <input type="range" min="40" max="140" value={values.heartRate} onChange={(e) => setValues((v) => ({ ...v, heartRate: Number(e.target.value) }))} />

            <label>Blood volume: {values.volume}%</label>
            <input type="range" min="70" max="130" value={values.volume} onChange={(e) => setValues((v) => ({ ...v, volume: Number(e.target.value) }))} />
          </>
        )}

        {step === 2 && (
          <>
            <h2>3) Observe System Response</h2>
            <div className="metrics">
              <div><strong>Resistance</strong><span>{model.resistance.toFixed(2)}</span></div>
              <div><strong>Cardiac Output</strong><span>{model.cardiacOutput.toFixed(2)} L/min</span></div>
              <div><strong>Blood Pressure</strong><span>{model.map.toFixed(0)} mmHg</span></div>
            </div>
            <p className="timeline">
              t0: diameter {values.diameter}% → t1: resistance {model.resistance.toFixed(2)} → t2: output {model.cardiacOutput.toFixed(2)} L/min → t3: MAP {model.map.toFixed(0)} mmHg
            </p>
          </>
        )}

        {step === 3 && (
          <>
            <h2>4) Explain Causal Chain</h2>
            <textarea rows={4} value={explanation} onChange={(e) => setExplanation(e.target.value)} placeholder="Explain diameter → resistance → output → pressure" />
            <button onClick={() => setFeedback(scoreExplanation(explanation).message)}>Score Explanation</button>
            <p>{feedback}</p>
          </>
        )}

        {step === 4 && (
          <>
            <h2>5) Compare Prediction vs Reality</h2>
            <p>{result}</p>
          </>
        )}
      </section>

      <footer className="actions">
        <button onClick={() => setStep((s) => Math.max(0, s - 1))}>Previous</button>
        <button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>Next</button>
        <button className="ghost" onClick={resetAll}>Reset</button>
      </footer>
    </main>
  );
}
