import dataService from '../services/dataService';

export const floorRepository = {
  getFloors: () => {
    return dataService.getFloors();
  },

  getFloorById: (id) => {
    const floors = dataService.getFloors();
    return floors.find(f => f.id === id);
  }
};

export default floorRepository;
