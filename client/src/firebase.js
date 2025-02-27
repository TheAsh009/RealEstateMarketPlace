// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-137c1.firebaseapp.com",
  projectId: "mern-estate-137c1",
  storageBucket: "mern-estate-137c1.firebasestorage.app",
  messagingSenderId: "1032486335666",
  appId: "1:1032486335666:web:e965c6964219b2b8fa05ab",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
