import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseApp';
import { withTimestamps, HOME_ID } from './seedUtils';
import { deviceMockData } from '../../../features/devices/data/deviceMockData';
import { roomMockData } from '../../../features/rooms/data/roomMockData';

export const seedDevices = async () => {
  // We need to map room and floor IDs
  const roomNameToId = {};
  const roomToFloorId = {};
  
  for (const room of roomMockData) {
    roomNameToId[room.name] = room.id;
    roomToFloorId[room.id] = room.floorId;
  }

  for (const device of deviceMockData) {
    const { id, location, lastUpdated, ...data } = device;
    
    let roomId = null;
    let floorId = null;
    
    if (location && location.room) {
      roomId = roomNameToId[location.room] || "room-living";
      floorId = roomToFloorId[roomId] || "floor-ground";
    }
    
    const seedData = {
      ...data,
      homeId: HOME_ID,
      roomId,
      floorId
    };
    
    await setDoc(doc(db, 'devices', id), withTimestamps(seedData), { merge: false });
  }
};