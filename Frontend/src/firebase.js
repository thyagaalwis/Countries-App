// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_GG3pnuB4japSdk3J19t56rj3vOxGqis",
  authDomain: "country-app-23fc6.firebaseapp.com",
  projectId: "country-app-23fc6",
  storageBucket: "country-app-23fc6.firebasestorage.app",
  messagingSenderId: "463282194438",
  appId: "1:463282194438:web:f452cd6686c5346d15db87",
  measurementId: "G-JYE2514FCM"
};

const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
export const auth = getAuth(app);
export const db   = getFirestore(app);

// Configure Google provider to always show account picker
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});
