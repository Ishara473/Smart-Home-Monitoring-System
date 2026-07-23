import React, { createContext, useState } from 'react';
import { deviceRepository } from '../../../core/repositories/deviceRepository';
import { DEVICE_STATUS } from '../../../shared/constants/deviceStatus';
import { DEVICE_TYPES } from '../../../shared/constants/deviceTypes';

const initialDevices = deviceRepository.getDevices();

export const DeviceContext = createContext({
  devices: [],
  toggleDevice: () => {},
  toggleSubSwitch: () => {},
  updateDeviceStatus: () => {},
  updateDeviceState: () => {},
  getDevice: () => {},
});

export function DeviceProvider({ children }) {
  const [devices, setDevices] = useState(initialDevices);

  const getDevice = (deviceId) => {
    return devices.find(d => d.id === deviceId);
  };

  const toggleDevice = (deviceId) => {
    setDevices(prevDevices =>
      prevDevices.map(device => {
        if (device.id !== deviceId) return device;
        if (device.type === DEVICE_TYPES.CAMERA) return device;

        const nextPower = !device.state.power;
        const nextStatus = nextPower ? DEVICE_STATUS.ON : DEVICE_STATUS.OFF;
        const nextPowerConsumption = nextPower
          ? (device.type === DEVICE_TYPES.IRON ? 1800 : 12)
          : 0;

        return {
          ...device,
          status: nextStatus,
          state: {
            ...device.state,
            power: nextPower
          },
          powerConsumption: nextPowerConsumption,
          lastUpdated: new Date().toISOString()
        };
      })
    );
  };

  const toggleSubSwitch = (deviceId, switchId) => {
    setDevices(prevDevices =>
      prevDevices.map(device => {
        if (device.id !== deviceId) return device;
        if (device.type !== DEVICE_TYPES.SWITCH_PANEL) return device;

        const updatedSwitches = device.switches.map(s => {
          if (s.id !== switchId) return s;
          const nextStatus = s.status === DEVICE_STATUS.ON ? DEVICE_STATUS.OFF : DEVICE_STATUS.ON;
          return { ...s, status: nextStatus };
        });

        const activeCount = updatedSwitches.filter(s => s.status === DEVICE_STATUS.ON).length;
        const nextPowerConsumption = activeCount * 15;
        
        return {
          ...device,
          switches: updatedSwitches,
          powerConsumption: nextPowerConsumption,
          status: activeCount > 0 ? DEVICE_STATUS.ON : DEVICE_STATUS.OFF,
          lastUpdated: new Date().toISOString()
        };
      })
    );
  };

  const updateDeviceStatus = (deviceId, status) => {
    setDevices(prevDevices =>
      prevDevices.map(device => {
        if (device.id !== deviceId) return device;
        return {
          ...device,
          status,
          lastUpdated: new Date().toISOString()
        };
      })
    );
  };

  const updateDeviceState = (deviceId, stateChanges) => {
    setDevices(prevDevices =>
      prevDevices.map(device => {
        if (device.id !== deviceId) return device;

        const nextState = {
          ...device.state,
          ...stateChanges
        };

        let nextStatus = device.status;
        if (stateChanges.hasOwnProperty('power')) {
          nextStatus = stateChanges.power ? DEVICE_STATUS.ON : DEVICE_STATUS.OFF;
        }

        return {
          ...device,
          state: nextState,
          status: nextStatus,
          lastUpdated: new Date().toISOString()
        };
      })
    );
  };

  const value = {
    devices,
    toggleDevice,
    toggleSubSwitch,
    updateDeviceStatus,
    updateDeviceState,
    getDevice,
  };

  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  );
}

export default DeviceProvider;
