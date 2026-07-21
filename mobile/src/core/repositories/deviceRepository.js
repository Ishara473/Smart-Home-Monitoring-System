import dataService from '../services/dataService';
import realtimeService from '../services/realtimeService';

export const deviceRepository = {
  getDevices: () => {
    return dataService.getDevices();
  },

  getDeviceById: (id) => {
    const devices = dataService.getDevices();
    return devices.find(d => d.id === id);
  },

  updateDeviceStatus: (id, status) => {
    return dataService.updateDevice(id, { status });
  },

  subscribeToDevices: (callback) => {
    return realtimeService.subscribe('devices', callback);
  }
};

export default deviceRepository;
