// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8QiS5XGyNpM-URncyWuoQnrDf5g-YfIg",
  authDomain: "myzwigato.firebaseapp.com",
  projectId: "myzwigato",
  storageBucket: "myzwigato.firebasestorage.app",
  messagingSenderId: "187950236175",
  appId: "1:187950236175:web:88b74eb3a7e72ac6f6597a",
  measurementId: "G-HWHK5T0D4D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
