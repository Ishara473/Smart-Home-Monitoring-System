import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebaseApp';
import { mapDoc } from './utils';

export const reportRepository = {
  async getReportsByHome(homeId) {
    try {
      const q = query(
        collection(db, 'reports'),
        where('homeId', '==', homeId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(mapDoc);
    } catch (error) {
      console.error('[reportRepository] getReportsByHome error', error);
      throw error;
    }
  },

  async getReportsByType(homeId, type) {
    try {
      const q = query(
        collection(db, 'reports'),
        where('homeId', '==', homeId),
        where('type', '==', type),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(mapDoc);
    } catch (error) {
      console.error('[reportRepository] getReportsByType error', error);
      throw error;
    }
  }
};