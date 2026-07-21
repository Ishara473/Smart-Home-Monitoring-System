export const floorMockData = [
  {
    id: 'ground-floor',
    name: 'Ground Floor',
    deviceCount: 8,
    roomCount: 3,
    status: 'ON',
    rooms: [
      { id: 'room-living', name: 'Living Room', deviceCount: 4 },
      { id: 'room-kitchen', name: 'Kitchen', deviceCount: 2 },
      { id: 'room-garage', name: 'Garage', deviceCount: 2 }
    ]
  },
  {
    id: 'first-floor',
    name: 'First Floor',
    deviceCount: 6,
    roomCount: 2,
    status: 'ON',
    rooms: [
      { id: 'room-bedroom', name: 'Bedroom', deviceCount: 4 },
      { id: 'room-bathroom', name: 'Bathroom', deviceCount: 2 }
    ]
  }
];

export const getFloorById = (id) => {
  return floorMockData.find(floor => floor.id === id) || floorMockData[0];
};

export default floorMockData;
