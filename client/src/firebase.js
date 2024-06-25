// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-b19ea.firebaseapp.com",
  projectId: "mern-auth-b19ea",
  storageBucket: "mern-auth-b19ea.appspot.com",
  messagingSenderId: "80900585959",
  appId: "1:80900585959:web:d36c822cd949a6dc0b6542",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
