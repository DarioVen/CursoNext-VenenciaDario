// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrU7nLFXJhXqOVuSyFOxmEPeeTSsN2Ohc",
  authDomain: "curso-nextjs-54259.firebaseapp.com",
  projectId: "curso-nextjs-54259",
  storageBucket: "curso-nextjs-54259.firebasestorage.app",
  messagingSenderId: "724922179244",
  appId: "1:724922179244:web:12d0226bb3162d4c244909"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
