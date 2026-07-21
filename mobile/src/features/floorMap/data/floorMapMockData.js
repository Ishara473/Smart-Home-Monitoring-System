import { createFloorMap, createRoom, createDeviceLocation } from '../models/floorMap';

export const floorMapMockData = {
  'ground-floor': createFloorMap({
    floorId: 'ground-floor',
    width: 8,
    height: 8,
    gridSize: 40,
    rooms: [
      createRoom({ id: 'room-kitchen', name: 'Kitchen', position: { x: 0, y: 0 }, width: 4, height: 3 }),
      createRoom({ id: 'room-living', name: 'Living Room', position: { x: 4, y: 0 }, width: 4, height: 4 }),
      createRoom({ id: 'room-garage', name: 'Garage', position: { x: 0, y: 4 }, width: 8, height: 4 }),
    ],
    devices: [
      createDeviceLocation({ deviceId: 'dev-outlet-1', roomId: 'room-kitchen', position: { x: 2, y: 1 } }),
      createDeviceLocation({ deviceId: 'dev-light-1', roomId: 'room-living', position: { x: 6, y: 2 } }),
      createDeviceLocation({ deviceId: 'dev-camera-1', roomId: 'room-garage', position: { x: 7, y: 7 } }),
    ]
  }),
  'first-floor': createFloorMap({
    floorId: 'first-floor',
    width: 8,
    height: 8,
    gridSize: 40,
    rooms: [
      createRoom({ id: 'room-bedroom', name: 'Bedroom', position: { x: 0, y: 0 }, width: 8, height: 5 }),
      createRoom({ id: 'room-bathroom', name: 'Bathroom', position: { x: 0, y: 5 }, width: 8, height: 3 }),
    ],
    devices: [
      createDeviceLocation({ deviceId: 'dev-switch-1', roomId: 'room-bedroom', position: { x: 3, y: 2 } }),
      createDeviceLocation({ deviceId: 'dev-iron-1', roomId: 'room-bedroom', position: { x: 6, y: 3 } }),
    ]
  })
};

export const getFloorMap = (floorId) => {
  return floorMapMockData[floorId] || floorMapMockData['ground-floor'];
};

export default floorMapMockData;
