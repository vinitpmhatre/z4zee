import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

function HeartMesh({ heartRate = 70, map = 93, diameter = 100 }) {
  const meshRef = useRef();
  const t = useRef(0);
  const bpm = heartRate / 60;

  const color = map < 90 ? '#22c55e' : map > 110 ? '#dc2626' : map > 100 ? '#f59e0b' : '#16a34a';

  useFrame((_, delta) => {
    t.current += delta * bpm * Math.PI * 2;
    const pulse = 1 + 0.08 * Math.sin(t.current);
    if (meshRef.current) {
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      <mesh ref={meshRef} castShadow>
        <icosahedronGeometry args={[1.2, 2]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.8, 16]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.5} />
      </mesh>
      <Html position={[1.5, 0.5, 0]} style={{ pointerEvents: 'none' }}>
        <div style={{ background: 'rgba(15,23,42,0.85)', color: '#e6edf3', padding: '4px 8px', borderRadius: 6, fontSize: 12, whiteSpace: 'nowrap', border: '1px solid #334155' }}>
          Left Ventricle
        </div>
      </Html>
      <Html position={[0.4, 2.2, 0]} style={{ pointerEvents: 'none' }}>
        <div style={{ background: 'rgba(15,23,42,0.85)', color: '#e6edf3', padding: '4px 8px', borderRadius: 6, fontSize: 12, whiteSpace: 'nowrap', border: '1px solid #334155' }}>
          Aorta
        </div>
      </Html>
    </group>
  );
}

function Vessel({ curve, radius = 0.06, color = '#ef4444', pulsePhase = 0, heartRate = 70 }) {
  const meshRef = useRef();
  const t = useRef(pulsePhase);
  const bpm = heartRate / 60;

  const tubeGeom = useMemo(() => new THREE.TubeGeometry(curve, 20, radius, 8, false), [curve, radius]);

  useFrame((_, delta) => {
    t.current += delta * bpm * Math.PI * 2;
    const pulse = 1 + 0.12 * Math.sin(t.current);
    if (meshRef.current) {
      meshRef.current.scale.x = pulse;
      meshRef.current.scale.z = pulse;
    }
  });

  return (
    <mesh ref={meshRef} geometry={tubeGeom}>
      <meshStandardMaterial color={color} roughness={0.5} />
    </mesh>
  );
}

function VesselNetwork({ diameter = 100, heartRate = 70, map = 93 }) {
  const vesselRadius = 0.04 * (diameter / 100);
  const pressureColor = map > 110 ? '#dc2626' : map > 100 ? '#f59e0b' : map < 90 ? '#3b82f6' : '#22c55e';

  const curves = useMemo(() => [
    new THREE.CatmullRomCurve3([new THREE.Vector3(0,1.8,0), new THREE.Vector3(0.5,2.5,0), new THREE.Vector3(1.2,3,0.3), new THREE.Vector3(2,3.5,0.5)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0,1.8,0), new THREE.Vector3(-0.5,2.5,0), new THREE.Vector3(-1.2,3,0.3), new THREE.Vector3(-2,3.5,0.5)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.8,0,0), new THREE.Vector3(1.2,-1,0.2), new THREE.Vector3(1.5,-2,0), new THREE.Vector3(1.8,-3.5,0)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(-0.8,0,0), new THREE.Vector3(-1.2,-1,0.2), new THREE.Vector3(-1.5,-2,0), new THREE.Vector3(-1.8,-3.5,0)]),
  ], []);

  return (
    <>
      {curves.map((curve, i) => (
        <Vessel key={i} curve={curve} radius={vesselRadius} color={pressureColor} pulsePhase={i * Math.PI * 0.5} heartRate={heartRate} />
      ))}
    </>
  );
}

export function HeartScene({ heartRate = 70, map = 93, diameter = 100, ariaLabel = '3D animated heart model' }) {
  return (
    <div className="canvas-container" aria-label={ariaLabel} role="img">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#3b82f6" />
        <HeartMesh heartRate={heartRate} map={map} diameter={diameter} />
        <VesselNetwork diameter={diameter} heartRate={heartRate} map={map} />
        <OrbitControls enablePan={false} minDistance={3} maxDistance={12} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
