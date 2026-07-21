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
        if (!device.isControllable || device.type === DEVICE_TYPES.CAMERA) return device;

        const nextStatus = device.status === DEVICE_STATUS.ON ? DEVICE_STATUS.OFF : DEVICE_STATUS.ON;
        const nextPowerUsage = nextStatus === DEVICE_STATUS.ON
          ? (device.type === DEVICE_TYPES.IRON ? '1800W' : '12W')
          : '0W';

        return {
          ...device,
          status: nextStatus,
          powerUsage: nextPowerUsage
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

        // Recompute power usage based on active sub-switches (each consumes e.g. 15W)
        const activeCount = updatedSwitches.filter(s => s.status === DEVICE_STATUS.ON).length;
        const nextPowerUsage = `${activeCount * 15}W`;
        
        return {
          ...device,
          switches: updatedSwitches,
          powerUsage: nextPowerUsage,
          status: activeCount > 0 ? DEVICE_STATUS.ON : DEVICE_STATUS.OFF
        };
      })
    );
  };

  const updateDeviceStatus = (deviceId, status) => {
    setDevices(prevDevices =>
      prevDevices.map(device => {
        if (device.id !== deviceId) return device;
        return { ...device, status };
      })
    );
  };

  const value = {
    devices,
    toggleDevice,
    toggleSubSwitch,
    updateDeviceStatus,
    getDevice,
  };

  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  );
}

export default DeviceProvider;
