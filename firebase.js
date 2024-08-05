// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC24dTgNOhO4bBMSZsrCDmAbSbDICDIuco",
  authDomain: "hspantryapp-2ed24.firebaseapp.com",
  projectId: "hspantryapp-2ed24",
  storageBucket: "hspantryapp-2ed24.appspot.com",
  messagingSenderId: "292875549977",
  appId: "1:292875549977:web:a154d92dd0216d070b1988"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore};