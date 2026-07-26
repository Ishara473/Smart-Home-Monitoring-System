import { getFirestore } from 'firebase/firestore';
import { app } from './firebaseConfig';

/**
 * Firebase Firestore database instance.
 * Decoupled service layer ready for future Firestore queries and real-time synchronization.
 */
const db = getFirestore(app);

export { db };
export default db;
