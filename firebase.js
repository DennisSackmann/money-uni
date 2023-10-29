// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";

import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBceEa_64iARC3Y6N2Pz5XSEjlGO5IG7DI",
  authDomain: "money-uni.firebaseapp.com",
  databaseURL: "https://money-uni-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "money-uni",
  storageBucket: "money-uni.appspot.com",
  messagingSenderId: "798141164972",
  appId: "1:798141164972:web:896292be1e203dda19de09"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);