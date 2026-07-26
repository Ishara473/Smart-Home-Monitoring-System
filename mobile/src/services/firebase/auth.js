import { getAuth } from 'firebase/auth';
import { app } from './firebaseConfig';

/**
 * Firebase Authentication instance.
 * Safe null guard ensures app stability when Firebase credentials are not yet configured.
 */
const auth = app ? getAuth(app) : null;

export { auth };
export default auth;
