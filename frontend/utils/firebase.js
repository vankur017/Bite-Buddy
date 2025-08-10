
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {

  apiKey: "AIzaSyDdm9s03JymIwgY3-XdYhjGT966oAvUeY8",

  authDomain: "bitebuddy-743a4.firebaseapp.com",

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