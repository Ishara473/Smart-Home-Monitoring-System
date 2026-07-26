import { initializeApp, getApps, getApp } from 'firebase/app';

/**
 * Firebase Configuration Object.
 * Values are loaded from Expo environment variables (process.env.EXPO_PUBLIC_FIREBASE_*).
 * Actual values will be supplied after creating the Firebase project in Firebase Console.
 */
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
};

/**
 * Ensures initialization occurs only once across hot-reloads / Fast Refresh in Expo.
 */
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export { app, firebaseConfig };
export default app;
