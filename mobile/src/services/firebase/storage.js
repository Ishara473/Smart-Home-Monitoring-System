import { getStorage } from 'firebase/storage';
import { app } from './firebaseConfig';

/**
 * Firebase Storage instance.
 * File upload/download functionality (e.g. camera snapshots, media assets) will be implemented in subsequent phases.
 */
const storage = getStorage(app);

export { storage };
export default storage;
