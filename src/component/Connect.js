// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkrw9dq0MMrky9LluGahYRrW3h_4-ykMc",
  authDomain: "luyentap22-25550.firebaseapp.com",
  databaseURL: "https://luyentap22-25550-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "luyentap22-25550",
  storageBucket: "luyentap22-25550.firebasestorage.app",
  messagingSenderId: "223688326241",
  appId: "1:223688326241:web:f590f8b660439f36f13e20",
  measurementId: "G-51LPP0LEBF"
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  export { app, firestore };