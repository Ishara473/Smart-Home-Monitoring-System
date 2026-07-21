import { createCamera } from '../models/camera';

export const cameraMockData = [
  createCamera({
    id: 'cam-1',
    deviceId: 'dev-camera-1',
    name: 'Front Gate Security Camera',
    location: 'Garage Entrance',
    status: 'ONLINE',
    snapshotUri: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80',
    streamUri: 'mock://camera/front-gate',
    lastUpdated: '1s ago'
  }),
  createCamera({
    id: 'cam-2',
    deviceId: 'dev-camera-2',
    name: 'Backyard Garden Camera',
    location: 'Backyard Patio',
    status: 'DISCONNECTED',
    snapshotUri: null,
    streamUri: null,
    lastUpdated: '14 mins ago'
  })
];

export const getCameraById = (id) => {
  return cameraMockData.find(cam => cam.id === id) || cameraMockData[0];
};

export const getCameraByDeviceId = (deviceId) => {
  return cameraMockData.find(cam => cam.deviceId === deviceId);
};

export default cameraMockData;
