import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBFCdYCgEZx5GrAZcMz5IOPLTXZ8VsGyyA",
  authDomain: "heartdisease-87750.firebaseapp.com",
  projectId: "heartdisease-87750",
  storageBucket: "heartdisease-87750.appspot.com",
  messagingSenderId: "416320621447",
  appId: "1:416320621447:web:fbcf66d8bed8cef5072122",
  measurementId: "G-LXP8K95PKJ"
};


const app = initializeApp(firebaseConfig);
const db=getDatabase(app);
export default db;