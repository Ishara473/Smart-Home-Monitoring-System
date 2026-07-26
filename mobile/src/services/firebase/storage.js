import { getStorage } from 'firebase/storage';
import { app } from './firebaseConfig';

/**
 * Firebase Storage instance.
 * Safe null guard ensures app stability when Firebase credentials are not yet configured.
 */
const storage = app ? getStorage(app) : null;

export { storage };
export default storage;
