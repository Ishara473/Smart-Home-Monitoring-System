import { floorMockData } from '../data/floorMockData';

/**
 * Floor Repository abstraction.
 * Decouples mock data from screens to support future Firebase integrations seamlessly.
 */
export const FloorRepository = {
  getFloors: () => {
    return [...floorMockData];
  },

  getFloorById: (id) => {
    return floorMockData.find(floor => floor.id === id);
  }
};

export default FloorRepository;
