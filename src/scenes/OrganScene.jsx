import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

function OrganMesh({ organId }) {
  const meshRef = useRef();
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.4;
  });

  const configs = {
    heart: { geometry: <icosahedronGeometry args={[1.2, 2]} />, color: '#dc2626' },
    lungs: { geometry: <sphereGeometry args={[1, 16, 16]} />, color: '#ec4899' },
    brain: { geometry: <dodecahedronGeometry args={[1.1, 0]} />, color: '#a78bfa' },
    kidneys: { geometry: <capsuleGeometry args={[0.6, 1, 8, 16]} />, color: '#f97316' },
  };
  const cfg = configs[organId] || configs.heart;

  return (
    <mesh ref={meshRef} castShadow>
      {cfg.geometry}
      <meshStandardMaterial color={cfg.color} roughness={0.4} metalness={0.1} />
    </mesh>
  );
}

export function OrganScene({ organId = 'heart', ariaLabel = '3D organ model' }) {
  return (
    <div className="canvas-container" aria-label={ariaLabel} role="img">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrganMesh organId={organId} />
        <OrbitControls enablePan={false} minDistance={2} maxDistance={8} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
