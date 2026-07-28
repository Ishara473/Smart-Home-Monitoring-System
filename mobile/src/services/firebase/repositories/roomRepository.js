import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseApp';
import { mapDoc } from './utils';

export const roomRepository = {
  async getRoomsByFloor(floorId, homeId) {
    try {
      const constraints = [
        collection(db, 'rooms'),
        where('floorId', '==', floorId),
      ];
      // homeId must be included in the query so Firestore security rules
      // (which check isHomeMember(resource.data.homeId)) can be evaluated.
      if (homeId) {
        constraints.push(where('homeId', '==', homeId));
      }
      const q = query(...constraints);
      const snapshot = await getDocs(q);
      return snapshot.docs.map(mapDoc);
    } catch (error) {
      console.error('[roomRepository] getRoomsByFloor error', error);
      throw error;
    }
  },

  async getRoomById(roomId) {
    try {
      const docRef = doc(db, 'rooms', roomId);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) return null;
      return mapDoc(snapshot);
    } catch (error) {
      console.error('[roomRepository] getRoomById error', error);
      throw error;
    }
  }
};