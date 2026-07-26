# Firebase Infrastructure - Smart Home Monitoring System

This module establishes the foundational Firebase service layer and configuration management for the Smart Home Monitoring System React Native application.

---

## 📌 Architecture Overview

The system adheres to **Clean Architecture** principles, ensuring that UI components and React hooks remain completely decoupled from underlying database and infrastructure details.

```text
Today (Mock Phase)

UI
 ↓
Hooks
 ↓
Mock Repository
 ↓
Mock Data


Tomorrow (Firebase Migration Phase)

UI
 ↓
Hooks
 ↓
Repository Interface
 ↓
Firebase Repository
 ↓
Firestore
```

By maintaining strict abstraction boundaries:
- Presentation screens and hooks interact only with **Repository Interfaces**.
- Swapping the repository backend (e.g. from Mock to Firebase or SQLite) requires zero changes in the presentation layer.

---

## 🛠️ Service Components & Responsibilities

| File | Primary Responsibility |
| :--- | :--- |
| `firebaseConfig.js` | Initializes the root Firebase App singleton using Expo environment variables. Prevents duplicate initializations during Fast Refresh. |
| `firestore.js` | Initializes and exports the Firebase Firestore database instance (`db`). |
| `auth.js` | Initializes and exports the Firebase Authentication instance (`auth`). |
| `storage.js` | Initializes and exports the Firebase Storage instance (`storage`). |
| `index.js` | Provides a unified, centralized barrel export for all Firebase services (`app`, `db`, `auth`, `storage`). |

---

## 🔐 Environment Variables (`EXPO_PUBLIC_*`)

Expo automatically embeds environment variables prefixed with `EXPO_PUBLIC_` into the application bundle at build time.

### Required Environment Variables

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
```

> **Note:** Real credentials will be provided after creating the project in the Firebase Console (Prompt 031). A template file `.env.example` is located in the `mobile/` root directory.

---

## 🚀 Repository Abstraction & Migration Strategy

Repositories are organized by domain under `src/repositories/`:

```text
src/repositories/
 ├── device/
 │    ├── MockDeviceRepository.js
 │    ├── FirebaseDeviceRepository.js
 │    └── index.js
 ├── floor/
 ├── room/
 ├── camera/
 ├── schedule/
 ├── notification/
 └── report/
 └── index.js (Repository Factory / Central Re-exporter)
```

### Migration Steps (Future Phase)
1. **Phase 1 (Current)**: Establish Firebase infrastructure and placeholder repositories. Keep `src/repositories/index.js` exporting Mock Repositories.
2. **Phase 2**: Create Firebase Console project & design Firestore collections.
3. **Phase 3**: Implement Firestore query logic inside `Firebase<Domain>Repository.js` files.
4. **Phase 4**: Switch exports in `src/repositories/<domain>/index.js` from `Mock<Domain>Repository` to `Firebase<Domain>Repository`.
