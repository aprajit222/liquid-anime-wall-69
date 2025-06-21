
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration - these will be set from admin panel
const firebaseConfig = {
  apiKey: localStorage.getItem('firebase_api_key') || "demo-key",
  authDomain: localStorage.getItem('firebase_auth_domain') || "demo-project.firebaseapp.com",
  projectId: localStorage.getItem('firebase_project_id') || "demo-project",
  storageBucket: localStorage.getItem('firebase_storage_bucket') || "demo-project.appspot.com",
  messagingSenderId: localStorage.getItem('firebase_messaging_sender_id') || "123456789",
  appId: localStorage.getItem('firebase_app_id') || "1:123456789:web:abcdef123456",
  measurementId: localStorage.getItem('firebase_measurement_id') || "G-XXXXXXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
