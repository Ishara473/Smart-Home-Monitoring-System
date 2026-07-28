import { collection, query, where, orderBy, limit, getDocs, onSnapshot, doc, updateDoc, getCountFromServer } from 'firebase/firestore';
import { db } from '../firebaseApp';
import { mapDoc, withUpdatedTimestamps } from './utils';

export const notificationRepository = {
  async getRecentNotifications(homeId, limitCount = 20) {
    try {
      const q = query(
        collection(db, 'notifications'),
        where('homeId', '==', homeId),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(mapDoc);
    } catch (error) {
      console.error('[notificationRepository] getRecentNotifications error', error);
      throw error;
    }
  },

  subscribeToNotifications(homeId, callback, limitCount = 20) {
    try {
      const q = query(
        collection(db, 'notifications'),
        where('homeId', '==', homeId),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      return onSnapshot(q, (snapshot) => {
        callback(snapshot.docs.map(mapDoc));
      }, (error) => {
        console.error('[notificationRepository] subscribeToNotifications error', error);
      });
    } catch (error) {
      console.error('[notificationRepository] subscribeToNotifications setup error', error);
      throw error;
    }
  },

  async markNotificationRead(notificationId) {
    try {
      const docRef = doc(db, 'notifications', notificationId);
      await updateDoc(docRef, withUpdatedTimestamps({ isRead: true }));
    } catch (error) {
      console.error('[notificationRepository] markNotificationRead error', error);
      throw error;
    }
  },

  async getUnreadCount(homeId) {
    try {
      const q = query(
        collection(db, 'notifications'),
        where('homeId', '==', homeId),
        where('isRead', '==', false)
      );
      const snapshot = await getCountFromServer(q);
      return snapshot.data().count;
    } catch (error) {
      console.error('[notificationRepository] getUnreadCount error', error);
      throw error;
    }
  }
};