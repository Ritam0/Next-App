// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBadp7aSoSvCQYRXzGdzUULrHrmBEeBDZc",
  authDomain: "astro-pro-69c34.firebaseapp.com",
  projectId: "astro-pro-69c34",
  storageBucket: "astro-pro-69c34.appspot.com",
  messagingSenderId: "659411954372",
  appId: "1:659411954372:web:a34aea5c8fe19964a2f791"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
const database = getDatabase(app);
export {auth,provider,database}