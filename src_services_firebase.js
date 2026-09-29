// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

/**
 * IMPORTANTE: Reemplazar estas credenciales con las de tu proyecto Firebase
 * 1. Ir a https://firebase.google.com/
 * 2. Crear proyecto "AFPE"
 * 3. Registrar app como "Web"
 * 4. Copiar las credenciales aquí
 */

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "YOUR_APP_ID",
  databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL || "YOUR_DATABASE_URL",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Servicios
export const auth = getAuth(app);
export const database = getDatabase(app);
export const functions = getFunctions(app, 'us-central1');

// SOLO para desarrollo: Usar emuladores locales (comentar en producción)
if (__DEV__ && !auth.currentUser) {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    connectDatabaseEmulator(database, 'localhost', 9000);
    connectFunctionsEmulator(functions, 'localhost', 5001);
  } catch (error) {
    // Los emuladores ya podrían estar conectados
  }
}

export default app;
