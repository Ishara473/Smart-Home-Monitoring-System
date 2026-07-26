import { getAuth } from 'firebase/auth';
import { app } from './firebaseConfig';

/**
 * Firebase Authentication instance.
 * Authentication logic and providers will be implemented in subsequent phases.
 */
const auth = getAuth(app);

export { auth };
export default auth;
