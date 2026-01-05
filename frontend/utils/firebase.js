
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  // Use process.env instead of import.meta.env
  apiKey: process.env.VITE_FIREBASE_API_KEY || process.env.REACT_APP_FIREBASE_API_KEY, 
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: "bitebuddy-743a4",
  storageBucket: "bitebuddy-743a4.appspot.com",
  messagingSenderId: "434707778041",
  appId: "1:434707778041:web:393cf1b45df54018269528",
  measurementId: "G-J7B46EK06V"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);


export const auth = getAuth(app);