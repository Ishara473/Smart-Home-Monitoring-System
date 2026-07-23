import { useState, useEffect } from 'react';
import { FloorRepository } from '../repository/FloorRepository';

/**
 * Custom hook supplying floors lists and simulated async loaders.
 */
export function useFloors() {
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const delay = setTimeout(() => {
      try {
        const data = FloorRepository.getFloors();
        setFloors(data);
      } catch (err) {
        setError('Failed to retrieve house floors');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, []);

  return {
    floors,
    loading,
    error,
  };
}

export default useFloors;
