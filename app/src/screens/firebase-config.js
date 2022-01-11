// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHtpFLMlwJ5xdORvLGw_US5itnGMrmxQs",
  authDomain: "reactnative-6a612.firebaseapp.com",
  projectId: "reactnative-6a612",
  storageBucket: "reactnative-6a612.appspot.com",
  messagingSenderId: "622660161618",
  appId: "1:622660161618:web:da9d5500ec9e07b9928f8b",
  measurementId: "G-163QX16P2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
