// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPq4xgkE74xrtlk17w3dcN3pC28IvSEV0",
  databaseURL:
    "https://zues-34c06-default-rtdb.asia-southeast1.firebasedatabase.app",
  authDomain: "zues-34c06.firebaseapp.com",
  projectId: "zues-34c06",
  storageBucket: "zues-34c06.firebasestorage.app",
  messagingSenderId: "162023753397",
  appId: "1:162023753397:web:1ad01fcab173566fc0e0fc",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const database = getDatabase();
export default database;
