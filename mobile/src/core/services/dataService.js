import { deviceMockData } from '../../features/devices/data/deviceMockData';
import { floorMockData } from '../../features/floors/data/floorMockData';
import { cameraMockData } from '../../features/cameras/data/cameraMockData';

/**
 * Core Data Service interfacing with local mock data storage.
 * Designed to adapt to Firebase SDK, REST APIs, or local persistence in the future.
 */
export const dataService = {
  getDevices: () => {
    return [...deviceMockData];
  },
  
  getFloors: () => {
    return [...floorMockData];
  },
  
  getCameras: () => {
    return [...cameraMockData];
  },

  updateDevice: (deviceId, updatedFields) => {
    if (__DEV__) {
      console.log(`[DataService]: Simulating field updates for device ${deviceId}`, updatedFields);
    }
    return true;
  }
};

export default dataService;
