import { useState, useEffect } from 'react';
import { useDevices } from '../../devices';
import { CameraRepository } from '../repository/CameraRepository';

/**
 * Custom hook returning cameras lists, dynamically mapping connection status from DeviceContext.
 */
export function useCameras() {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { devices } = useDevices();

  useEffect(() => {
    setLoading(true);
    setError(null);

    const delay = setTimeout(() => {
      try {
        const rawCameras = CameraRepository.getCameras();
        const mappedCameras = rawCameras.map((cam) => {
          const device = devices.find((d) => d.id === cam.deviceId);
          const isConnected = device && device.status !== 'DISCONNECTED';
          
          return {
            ...cam,
            status: isConnected ? 'ONLINE' : 'OFFLINE',
            state: {
              ...cam.state,
              streaming: isConnected ? cam.state.streaming : false,
            },
          };
        });
        setCameras(mappedCameras);
      } catch (err) {
        setError('Failed to retrieve security camera logs');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [devices]);

  return {
    cameras,
    loading,
    error,
  };
}

export default useCameras;
