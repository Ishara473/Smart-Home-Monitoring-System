import { useState, useEffect } from 'react';
import { RoomRepository } from '../repository/RoomRepository';

/**
 * Custom hook supplying room listings with simulated loader states.
 */
export function useRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const delay = setTimeout(() => {
      try {
        const data = RoomRepository.getRooms();
        setRooms(data);
      } catch (err) {
        setError('Failed to retrieve room divisions');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, []);

  return {
    rooms,
    loading,
    error,
  };
}

export default useRooms;
