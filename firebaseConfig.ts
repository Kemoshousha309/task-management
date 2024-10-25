// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAkbTElc5kullt2QM0YPZjkFPOeD075rzI",
  authDomain: "task-management-1bc5f.firebaseapp.com",
  databaseURL:
    "https://task-management-1bc5f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "task-management-1bc5f",
  storageBucket: "task-management-1bc5f.appspot.com",
  messagingSenderId: "366721217755",
  appId: "1:366721217755:web:6b6442cfccddce521848fe",
  measurementId: "G-N896D2GD90",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage(app);

