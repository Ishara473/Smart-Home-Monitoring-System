/**
 * Firebase Environment Variable Validation Utility.
 * Validates presence of required EXPO_PUBLIC_FIREBASE_* environment variables.
 */

const REQUIRED_ENV_VARS = [
  { key: 'EXPO_PUBLIC_FIREBASE_API_KEY', prop: 'apiKey' },
  { key: 'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN', prop: 'authDomain' },
  { key: 'EXPO_PUBLIC_FIREBASE_PROJECT_ID', prop: 'projectId' },
  { key: 'EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET', prop: 'storageBucket' },
  { key: 'EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', prop: 'messagingSenderId' },
  { key: 'EXPO_PUBLIC_FIREBASE_APP_ID', prop: 'appId' },
];

export function validateFirebaseConfig() {
  const missingKeys = [];
  const config = {};

  REQUIRED_ENV_VARS.forEach(({ key, prop }) => {
    const value = process.env[key];
    if (!value || typeof value !== 'string' || value.trim() === '') {
      missingKeys.push(key);
      config[prop] = '';
    } else {
      config[prop] = value.trim();
    }
  });

  const isValid = missingKeys.length === 0;

  if (typeof __DEV__ !== 'undefined' && __DEV__ && !isValid) {
    console.warn(
      `[Firebase Config Validation Warning]\n` +
      `The following required Expo environment variable(s) are missing or unpopulated:\n` +
      missingKeys.map(k => `  • ${k}`).join('\n') + '\n\n' +
      `Firebase initialization has been safely bypassed to prevent runtime errors.\n` +
      `To resolve: Copy '.env.example' to '.env', populate credentials from Firebase Console, and restart Expo via 'npx expo start -c'.`
    );
  }

  return {
    isValid,
    missingKeys,
    config,
  };
}

export default validateFirebaseConfig;
