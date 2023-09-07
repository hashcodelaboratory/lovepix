// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from '@firebase/storage'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import {
  FIREBASE_API_KEY, FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN, FIREBASE_MEASUREMENT_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_STORAGE_MESSAGING_SENDER_ID
} from "./constants";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_STORAGE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider()

export const database = getFirestore(app)
export const storage = getStorage(app)
