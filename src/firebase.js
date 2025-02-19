import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDiamTKFGgNiLiYi2rAR81kzUYlj9OPKtE",
    authDomain: "react-chat-application-1debb.firebaseapp.com",
    projectId: "react-chat-application-1debb",
    storageBucket: "react-chat-application-1debb.firebasestorage.app",
    messagingSenderId: "1010206552857",
    appId: "1:1010206552857:web:72300aa52f71a8e9878b88",
    measurementId: "G-P9E8T9ENS6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);