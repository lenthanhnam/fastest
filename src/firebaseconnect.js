import { getApp, getApps, initializeApp } from 'firebase/app';
import { addDoc, getDocs, deleteDoc, doc, collection, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDUNaFwrfrZs-JlYOEluXRFfGvpz8kYmOY",
    authDomain: "luyentap2-65033.firebaseapp.com",
    databaseURL: "https://luyentap2-65033-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "luyentap2-65033",
    storageBucket: "luyentap2-65033.firebasestorage.app",
    messagingSenderId: "1031016631610",
    appId: "1:1031016631610:web:37083ca4f40448ae1f5403",
    measurementId: "G-6XYKJG8G7K"
  };  
  // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
  // const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  const firestore = getFirestore(app);
  const db = getFirestore(app); // Firestore instance
  const auth = getAuth(app);
  export { app,db, auth, addDoc, getDocs, deleteDoc, doc, collection, getFirestore, getAuth };