import { createDevice } from '../models/device';
import { DEVICE_TYPES } from '../../../shared/constants/deviceTypes';
import { DEVICE_STATUS } from '../../../shared/constants/deviceStatus';

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
    schedule: { turnOn: '18:00', turnOff: '23:00' }
  }),
  createDevice({
    id: 'dev-outlet-1',
    name: 'Kitchen Main Outlet',
    type: DEVICE_TYPES.OUTLET,
    status: DEVICE_STATUS.OFF,
    room: 'Kitchen',
    floor: 'ground-floor',
    isControllable: true,
    powerUsage: '0W'
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
    ]
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
    maxOnDuration: 15 // minutes
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
    cameraUri: 'mock://camera/front-gate'
  })
];

export const getDeviceById = (id) => {
  return deviceMockData.find(dev => dev.id === id) || deviceMockData[0];
};

export const getDevicesByFloor = (floorId) => {
  return deviceMockData.filter(dev => dev.floor === floorId);
};

export default deviceMockData;
