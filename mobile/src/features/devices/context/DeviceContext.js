import React, { createContext, useState, useEffect } from 'react';
import { deviceRepository as mockDeviceRepository } from '../../../core/repositories/deviceRepository';
import { deviceRepository as firebaseDeviceRepository } from '../../../services/firebase/repositories';
import { shouldUseMockData, isFirebaseConfigured } from '../../../services/firebase';
import { useHomeContext } from '../../home/context/HomeContext';
import { DEVICE_STATUS } from '../../../shared/constants/deviceStatus';
import { DEVICE_TYPES } from '../../../shared/constants/deviceTypes';

export const DeviceContext = createContext({
  devices: [],
  toggleDevice: () => {},
  toggleSubSwitch: () => {},
  updateDeviceStatus: () => {},
  updateDeviceState: () => {},
  getDevice: () => {},
  loading: true,
  error: null,
});

export function DeviceProvider({ children }) {
  const { homeId, loading: homeLoading } = useHomeContext();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (homeLoading) return;

    if (shouldUseMockData()) {
      setDevices(mockDeviceRepository.getDevices());
      setLoading(false);
      return;
    }

    if (!isFirebaseConfigured() || !homeId) {
      setDevices([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = firebaseDeviceRepository.subscribeToDevices(homeId, (fetchedDevices) => {
      setDevices(fetchedDevices);
      setError(null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [homeId, homeLoading]);

  const getDevice = (deviceId) => devices.find(d => d.id === deviceId);

  const toggleDevice = async (deviceId) => {
    const device = getDevice(deviceId);
    if (!device || device.type === DEVICE_TYPES.CAMERA) return;

    const nextPower = !device.state.power;
    const nextStatus = nextPower ? DEVICE_STATUS.ON : DEVICE_STATUS.OFF;
    const nextPowerConsumption = nextPower ? (device.type === DEVICE_TYPES.IRON ? 1800 : 12) : 0;

    if (shouldUseMockData()) {
      setDevices(prev => prev.map(d => d.id !== deviceId ? d : {
        ...d, status: nextStatus,
        state: { ...d.state, power: nextPower },
        powerConsumption: nextPowerConsumption,
        lastUpdated: new Date().toISOString()
      }));
      return;
    }

    try {
      await firebaseDeviceRepository.updateDeviceState(deviceId, { power: nextPower });
      await firebaseDeviceRepository.updateDeviceStatus(deviceId, nextStatus);
    } catch (err) {
      console.error('[DeviceContext] toggleDevice failed', err);
      setError('Unable to toggle device. Check your connection.');
    }
  };

  const toggleSubSwitch = (deviceId, switchId) => {
    const device = getDevice(deviceId);
    if (!device || device.type !== DEVICE_TYPES.SWITCH_PANEL) return;

    const updatedSwitches = device.switches.map(s => {
      if (s.id !== switchId) return s;
      const nextStatus = s.status === DEVICE_STATUS.ON ? DEVICE_STATUS.OFF : DEVICE_STATUS.ON;
      return { ...s, status: nextStatus };
    });

    const activeCount = updatedSwitches.filter(s => s.status === DEVICE_STATUS.ON).length;
    setDevices(prev => prev.map(d => d.id !== deviceId ? d : {
      ...d,
      switches: updatedSwitches,
      status: activeCount > 0 ? DEVICE_STATUS.ON : DEVICE_STATUS.OFF,
      powerConsumption: activeCount * 15,
      lastUpdated: new Date().toISOString()
    }));
  };

  const updateDeviceStatus = async (deviceId, status) => {
    if (shouldUseMockData()) {
      setDevices(prev => prev.map(d => d.id !== deviceId ? d : {
        ...d, status, lastUpdated: new Date().toISOString()
      }));
      return;
    }
    try {
      await firebaseDeviceRepository.updateDeviceStatus(deviceId, status);
    } catch (err) {
      console.error('[DeviceContext] updateDeviceStatus failed', err);
      setError('Unable to update device status.');
    }
  };

  const updateDeviceState = async (deviceId, stateChanges) => {
    if (shouldUseMockData()) {
      setDevices(prev => prev.map(d => {
        if (d.id !== deviceId) return d;
        const nextState = { ...d.state, ...stateChanges };
        let nextStatus = d.status;
        if (Object.prototype.hasOwnProperty.call(stateChanges, 'power')) {
          nextStatus = stateChanges.power ? DEVICE_STATUS.ON : DEVICE_STATUS.OFF;
        }
        return { ...d, state: nextState, status: nextStatus, lastUpdated: new Date().toISOString() };
      }));
      return;
    }
    try {
      await firebaseDeviceRepository.updateDeviceState(deviceId, stateChanges);
      if (Object.prototype.hasOwnProperty.call(stateChanges, 'power')) {
        const nextStatus = stateChanges.power ? DEVICE_STATUS.ON : DEVICE_STATUS.OFF;
        await firebaseDeviceRepository.updateDeviceStatus(deviceId, nextStatus);
      }
    } catch (err) {
      console.error('[DeviceContext] updateDeviceState failed', err);
      setError('Unable to update device state.');
    }
  };

  return (
    <DeviceContext.Provider value={{
      devices, toggleDevice, toggleSubSwitch,
      updateDeviceStatus, updateDeviceState, getDevice,
      loading, error,
    }}>
      {children}
    </DeviceContext.Provider>
  );
}

export default DeviceProvider;
