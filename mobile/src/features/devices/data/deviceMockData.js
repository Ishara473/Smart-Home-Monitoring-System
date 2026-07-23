import { createDevice } from '../models/device';
import { DEVICE_TYPES } from '../../../shared/constants/deviceTypes';
import { DEVICE_STATUS } from '../../../shared/constants/deviceStatus';

// Compute dynamic timestamps relative to current runtime to keep formatting realistic
const getPastTimestampISO = (offsetMs) => {
  return new Date(Date.now() - offsetMs).toISOString();
};

export const deviceMockData = [
  createDevice({
    id: 'dev-light-1',
    name: 'Living Room Ceiling Light',
    type: DEVICE_TYPES.LIGHT,
    status: DEVICE_STATUS.ON,
    room: 'Living Room',
    floor: 'ground-floor',
    isControllable: true,
    powerUsage: '12W',
    schedule: { turnOn: '18:00', turnOff: '23:00' },
    lastUpdated: getPastTimestampISO(2 * 60 * 1000) // 2 minutes ago
  }),
  createDevice({
    id: 'dev-outlet-1',
    name: 'Kitchen Main Outlet',
    type: DEVICE_TYPES.OUTLET,
    status: DEVICE_STATUS.OFF,
    room: 'Kitchen',
    floor: 'ground-floor',
    isControllable: true,
    powerUsage: '0W',
    lastUpdated: getPastTimestampISO(15 * 60 * 1000) // 15 minutes ago
  }),
  createDevice({
    id: 'dev-switch-1',
    name: 'Bedroom Smart Switch Panel',
    type: DEVICE_TYPES.SWITCH_PANEL,
    status: DEVICE_STATUS.ON,
    room: 'Bedroom',
    floor: 'first-floor',
    isControllable: true,
    powerUsage: '45W',
    switches: [
      { id: 1, name: 'Ceiling Fan', status: DEVICE_STATUS.ON },
      { id: 2, name: 'Reading Lamp', status: DEVICE_STATUS.OFF },
      { id: 3, name: 'Wall Lights', status: DEVICE_STATUS.ON }
    ],
    lastUpdated: getPastTimestampISO(45 * 1000) // 45 seconds ago
  }),
  createDevice({
    id: 'dev-iron-1',
    name: 'Smart Laundry Iron',
    type: DEVICE_TYPES.IRON,
    status: DEVICE_STATUS.ERROR,
    room: 'Laundry Room',
    floor: 'ground-floor',
    isControllable: true,
    powerUsage: '1800W',
    maxOnDuration: 15,
    lastUpdated: getPastTimestampISO(2 * 60 * 60 * 1000) // 2 hours ago
  }),
  createDevice({
    id: 'dev-camera-1',
    name: 'Front Gate Security Camera',
    type: DEVICE_TYPES.CAMERA,
    status: DEVICE_STATUS.DISCONNECTED,
    room: 'Garage Entrance',
    floor: 'ground-floor',
    isControllable: false,
    powerUsage: '0W',
    cameraUri: 'mock://camera/front-gate',
    lastUpdated: getPastTimestampISO(24 * 60 * 60 * 1000) // Yesterday
  })
];

export const getDeviceById = (id) => {
  return deviceMockData.find(dev => dev.id === id) || deviceMockData[0];
};

export const getDevicesByFloor = (floorId) => {
  return deviceMockData.filter(dev => dev.floor === floorId);
};

export default deviceMockData;
