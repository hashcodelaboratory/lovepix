// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getStorage} from '@firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDK00RhvsP8k9PR-XNGIcVXVGSk6jJD_1Q",
    authDomain: "waller-development.firebaseapp.com",
    projectId: "waller-development",
    storageBucket: "waller-development.appspot.com",
    messagingSenderId: "903580623140",
    appId: "1:903580623140:web:7f38ac2ddc4ca38ff353b1",
    measurementId: "G-P2MTCY09WB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
export const storage = getStorage(app);