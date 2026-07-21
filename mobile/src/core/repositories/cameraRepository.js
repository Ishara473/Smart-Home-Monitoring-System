import dataService from '../services/dataService';

export const cameraRepository = {
  getCameras: () => {
    return dataService.getCameras();
  },

  getCameraById: (id) => {
    const cameras = dataService.getCameras();
    return cameras.find(c => c.id === id);
  }
};

export default cameraRepository;
