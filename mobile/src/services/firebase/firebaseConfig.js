import { initializeApp, getApps, getApp } from 'firebase/app';
import { validateFirebaseConfig } from './validateFirebaseConfig';

/**
 * Perform defensive validation on environment variables.
 */
const { config: firebaseConfig, isValid: isConfigValid, missingKeys } = validateFirebaseConfig();

let app = null;

if (isConfigValid) {
  try {
    // Ensures initialization occurs only once across hot-reloads / Fast Refresh in Expo
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  } catch (error) {
    if (typeof __DEV__ !== 'undefined' && __DEV__) {
      console.warn('[Firebase] Initialization error:', error.message);
    }
  }
} else if (getApps().length > 0) {
  app = getApp();
}

export { app, firebaseConfig, isConfigValid, missingKeys };
export default app;
