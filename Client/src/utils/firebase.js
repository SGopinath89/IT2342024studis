/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KRY,
  authDomain: "studius-2f158.firebaseapp.com",
  projectId: "studius-2f158",
  storageBucket: "studius-2f158.appspot.com",
  messagingSenderId: "141551534905",
  appId: "1:141551534905:web:739be8f8852c029bb4dee8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);