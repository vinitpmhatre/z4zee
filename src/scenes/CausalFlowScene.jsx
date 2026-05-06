import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const NODES = [
  { id: 'diameter', label: 'Diameter', position: [-4, 0, 0], color: '#3b82f6' },
  { id: 'resistance', label: 'Resistance', position: [-1.3, 0, 0], color: '#f59e0b' },
  { id: 'output', label: 'Cardiac Output', position: [1.3, 0, 0], color: '#22c55e' },
  { id: 'pressure', label: 'Blood Pressure', position: [4, 0, 0], color: '#ef4444' },
];

function FlowNode({ position, label, color, active }) {
  const meshRef = useRef();
  useFrame((_, delta) => {
    if (meshRef.current && active) {
      meshRef.current.rotation.y += delta * 1.5;
    }
  });
  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color={active ? color : '#334155'} emissive={active ? color : '#000'} emissiveIntensity={active ? 0.4 : 0} />
      </mesh>
      <Html center style={{ pointerEvents: 'none', marginTop: 60 }}>
        <div style={{ color: active ? color : '#94a3b8', fontSize: 11, textAlign: 'center', whiteSpace: 'nowrap', fontWeight: active ? 700 : 400 }}>
          {label}
        </div>
      </Html>
    </group>
  );
}

function ArrowMesh({ from, to, active }) {
  const midX = (from[0] + to[0]) / 2;
  const midY = (from[1] + to[1]) / 2;
  const midZ = (from[2] + to[2]) / 2;
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const dz = to[2] - from[2];
  const len = Math.sqrt(dx * dx + dy * dy + dz * dz) - 1.1;
  const color = active ? '#60a5fa' : '#334155';

  return (
    <group position={[midX, midY, midZ]}>
      <mesh>
        <cylinderGeometry args={[0.04, 0.04, len, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, len / 2 + 0.1, 0]}>
        <coneGeometry args={[0.12, 0.25, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

export function CausalFlowScene({ activeStep = -1 }) {
  return (
    <div className="canvas-container" style={{ height: 200 }} aria-label="Causal flow diagram" role="img">
      <Canvas camera={{ position: [0, 2, 7], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[0, 5, 5]} intensity={0.8} />
        {NODES.map((node, i) => (
          <FlowNode key={node.id} position={node.position} label={node.label} color={node.color} active={i <= activeStep} />
        ))}
        {NODES.slice(0, -1).map((node, i) => (
          <ArrowMesh key={i} from={node.position} to={NODES[i + 1].position} active={i < activeStep} />
        ))}
      </Canvas>
    </div>
  );
}
