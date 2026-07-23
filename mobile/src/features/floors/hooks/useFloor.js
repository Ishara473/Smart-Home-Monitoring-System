import { useState, useEffect } from 'react';
import { FloorRepository } from '../repository/FloorRepository';

/**
 * Custom hook supplying single floor layout lookup status.
 */
export function useFloor(id) {
  const [floor, setFloor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const delay = setTimeout(() => {
      try {
        const data = FloorRepository.getFloorById(id);
        if (data) {
          setFloor(data);
        } else {
          setError('Floor not found');
        }
      } catch (err) {
        setError('Failed to retrieve floor details');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [id]);

  return {
    floor,
    loading,
    error,
  };
}

export default useFloor;
