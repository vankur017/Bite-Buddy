import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "dummy-api-key",
    authDomain: "dummy.firebaseapp.com",
    projectId: "dummy",
    storageBucket: "dummy.appspot.com",
    messagingSenderId: "12345",
    appId: "12345"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
