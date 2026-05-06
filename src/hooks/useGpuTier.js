import { useState, useEffect } from 'react';
import { getGPUTier } from 'detect-gpu';

export function useGpuTier() {
  const [tier, setTier] = useState(null);
  useEffect(() => {
    getGPUTier().then((result) => setTier(result.tier));
  }, []);
  return tier;
}
