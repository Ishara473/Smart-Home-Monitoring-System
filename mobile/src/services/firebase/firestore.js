import { getFirestore } from 'firebase/firestore';
import { app } from './firebaseConfig';

/**
 * Firebase Firestore database instance.
 * Safe null guard ensures app stability when Firebase credentials are not yet configured.
 */
const db = app ? getFirestore(app) : null;

export { db };
export default db;
