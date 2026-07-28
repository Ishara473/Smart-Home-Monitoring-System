import { collection, query, where, orderBy, getDocs, doc, getDoc, documentId } from 'firebase/firestore';
import { db } from '../firebaseApp';
import { mapDoc } from './utils';

export const floorRepository = {
  async getFloorsByHome(homeId) {
    try {
      const q = query(
        collection(db, 'floors'),
        where('homeId', '==', homeId),
        orderBy('order', 'asc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(mapDoc);
    } catch (error) {
      console.error('[floorRepository] getFloorsByHome error', error);
      throw error;
    }
  },

  async getFloorById(floorId, homeId) {
    try {
      if (homeId) {
        // Use a collection query with homeId filter to satisfy isHomeMember security rule
        // (same pattern as getFloorsByHome — direct doc reads can fail the rule)
        const q = query(
          collection(db, 'floors'),
          where('homeId', '==', homeId),
          where(documentId(), '==', floorId)
        );
        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;
        return mapDoc(snapshot.docs[0]);
      }
      // Fallback: direct read (used when homeId is not yet available)
      const docRef = doc(db, 'floors', floorId);
      const snap = await getDoc(docRef);
      if (!snap.exists()) return null;
      return mapDoc(snap);
    } catch (error) {
      console.error('[floorRepository] getFloorById error', error);
      throw error;
    }
  }
};