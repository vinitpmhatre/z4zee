import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function HelixStrand({ offset = 0, color = '#3b82f6' }) {
  const groupRef = useRef();
  const pairs = 20;

  const points = [];
  for (let i = 0; i < pairs; i++) {
    const t = (i / pairs) * Math.PI * 4 + offset;
    points.push(new THREE.Vector3(Math.cos(t) * 1.2, (i / pairs) * 8 - 4, Math.sin(t) * 1.2));
  }

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={groupRef}>
      {points.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
      {points.slice(0, -1).map((p, i) => {
        const q = points[i + 1];
        const mid = new THREE.Vector3().addVectors(p, q).multiplyScalar(0.5);
        const pairPt = new THREE.Vector3(
          Math.cos((i / pairs) * Math.PI * 4 + offset + Math.PI) * 1.2,
          mid.y,
          Math.sin((i / pairs) * Math.PI * 4 + offset + Math.PI) * 1.2
        );
        const dir = new THREE.Vector3().subVectors(pairPt, mid);
        return (
          <mesh key={`rung-${i}`} position={mid.toArray()}>
            <cylinderGeometry args={[0.03, 0.03, dir.length() * 2.4, 6]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
        );
      })}
    </group>
  );
}

export function DnaHelix() {
  return (
    <div className="canvas-container dna-canvas" aria-label="Decorative DNA helix animation" role="img">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <HelixStrand offset={0} color="#3b82f6" />
        <HelixStrand offset={Math.PI} color="#22c55e" />
      </Canvas>
    </div>
  );
}
