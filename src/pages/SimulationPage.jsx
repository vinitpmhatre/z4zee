import React, { useMemo, useState, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { useSimulation } from '../hooks/useSimulation';
import { HeartScene } from '../scenes/HeartScene';
import { CausalFlowScene } from '../scenes/CausalFlowScene';
import { MetricsPanel } from '../components/MetricsPanel';
import { Loader } from '../components/Loader';

const steps = ['Predict', 'Manipulate', 'Observe', 'Explain', 'Compare'];
const defaultValues = { diameter: 100, heartRate: 70, volume: 100 };

function scoreExplanation(text) {
  const keywords = ['diameter', 'resistance', 'output', 'pressure'];
  const hits = keywords.filter(w => text.toLowerCase().includes(w)).length;
  return {
    hits,
    message: hits >= 3
      ? '✅ Strong chain reasoning: includes multiple causal steps.'
      : '⚠️ Needs more detail: mention diameter → resistance → output → pressure.',
  };
}

export function SimulationPage() {
  const location = useLocation();
  const initialValues = location.state?.params || defaultValues;

  const [step, setStep] = useState(0);
  const [values, setValues] = useState(initialValues);
  const [prediction, setPrediction] = useState('');
  const [explanation, setExplanation] = useState('');
  const [feedback, setFeedback] = useState('');

  const model = useSimulation(values);
  const baselineModel = useSimulation(defaultValues);

  const result = prediction
    ? `Prediction: ${prediction}. Observed: ${model.observed}. ${prediction === model.observed ? '✅ Correct.' : '❌ Not correct — revise your model.'}`
    : `Observed blood pressure change: ${model.observed}. Add a prediction first next run.`;

  const resetAll = () => {
    setValues(defaultValues);
    setPrediction('');
    setExplanation('');
    setFeedback('');
    setStep(0);
  };

  return (
    <div className="simulation-page">
      <header className="page-header">
        <h1>⚙️ Blood Pressure Reasoning Lab</h1>
        <p className="text-muted">Predict → Manipulate → Observe → Explain → Compare</p>
      </header>

      <nav className="stepper" aria-label="Simulation workflow steps">
        {steps.map((s, i) => (
          <button key={s} className={`step${i === step ? ' active' : ''}`} onClick={() => setStep(i)}>
            {i + 1}. {s}
          </button>
        ))}
      </nav>

      <section className="card stage" key={step}>
        {step === 0 && (
          <>
            <h2>1) Predict</h2>
            <label htmlFor="prediction-select">What happens to blood pressure if vessel diameter decreases by 25%?</label>
            <select id="prediction-select" value={prediction} onChange={e => setPrediction(e.target.value)}>
              <option value="">Choose one…</option>
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
            <input type="range" min="60" max="140" value={values.diameter} onChange={e => setValues(v => ({ ...v, diameter: Number(e.target.value) }))} aria-label="Vessel diameter" />
            <label>Heart rate: {values.heartRate} bpm</label>
            <input type="range" min="40" max="140" value={values.heartRate} onChange={e => setValues(v => ({ ...v, heartRate: Number(e.target.value) }))} aria-label="Heart rate" />
            <label>Blood volume: {values.volume}%</label>
            <input type="range" min="70" max="130" value={values.volume} onChange={e => setValues(v => ({ ...v, volume: Number(e.target.value) }))} aria-label="Blood volume" />
          </>
        )}

        {step === 2 && (
          <>
            <h2>3) Observe System Response</h2>
            <Suspense fallback={<Loader />}>
              <HeartScene heartRate={values.heartRate} map={model.map} diameter={values.diameter} ariaLabel={`3D heart beating at ${values.heartRate} bpm with MAP ${model.map.toFixed(0)} mmHg`} />
            </Suspense>
            <MetricsPanel model={model} />
            <p className="timeline">
              t0: diameter {values.diameter}% → t1: resistance {model.resistance.toFixed(2)} → t2: output {model.cardiacOutput.toFixed(2)} L/min → t3: MAP {model.map.toFixed(0)} mmHg
            </p>
            <h3 style={{ marginTop: '1rem' }}>Causal Flow</h3>
            <Suspense fallback={<Loader />}>
              <CausalFlowScene activeStep={3} />
            </Suspense>
          </>
        )}

        {step === 3 && (
          <>
            <h2>4) Explain Causal Chain</h2>
            <textarea
              rows={4}
              value={explanation}
              onChange={e => setExplanation(e.target.value)}
              placeholder="Explain: diameter → resistance → output → pressure"
              aria-label="Explanation text area"
            />
            <button onClick={() => setFeedback(scoreExplanation(explanation).message)}>Score Explanation</button>
            {feedback && <p className="feedback-msg">{feedback}</p>}
          </>
        )}

        {step === 4 && (
          <>
            <h2>5) Compare Prediction vs Reality</h2>
            <p className="result-msg">{result}</p>
            <div className="split-canvas">
              <div>
                <h4>Baseline (Normal)</h4>
                <Suspense fallback={<Loader />}>
                  <HeartScene heartRate={defaultValues.heartRate} map={baselineModel.map} diameter={defaultValues.diameter} ariaLabel="Baseline heart state" />
                </Suspense>
                <MetricsPanel model={baselineModel} />
              </div>
              <div>
                <h4>Your Settings</h4>
                <Suspense fallback={<Loader />}>
                  <HeartScene heartRate={values.heartRate} map={model.map} diameter={values.diameter} ariaLabel={`Your heart state at MAP ${model.map.toFixed(0)} mmHg`} />
                </Suspense>
                <MetricsPanel model={model} />
              </div>
            </div>
          </>
        )}
      </section>

      <footer className="actions">
        <button onClick={() => setStep(s => Math.max(0, s - 1))}>← Previous</button>
        <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}>Next →</button>
        <button className="btn-ghost" onClick={resetAll}>Reset</button>
      </footer>
    </div>
  );
}
