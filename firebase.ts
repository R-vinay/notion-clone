// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkRTuBYgVHvNYtgYxZsmwXoDStoXkDpeI",
  authDomain: "notion-clone-19617.firebaseapp.com",
  projectId: "notion-clone-19617",
  storageBucket: "notion-clone-19617.firebasestorage.app",
  messagingSenderId: "383589626259",
  appId: "1:383589626259:web:5b9b789abff0ceb0d67866",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
