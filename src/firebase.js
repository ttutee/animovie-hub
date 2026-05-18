// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmfK8A34a9pR_1YPpe9bGN8622pjURQEQ",
  authDomain: "animovie-hub.firebaseapp.com",
  projectId: "animovie-hub",
  storageBucket: "animovie-hub.firebasestorage.app",
  messagingSenderId: "209420989159",
  appId: "1:209420989159:web:ab90ba1f3301977be0e842",
  measurementId: "G-QF734LC7ZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);