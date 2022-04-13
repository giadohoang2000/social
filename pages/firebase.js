
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

import "firebase/firestore"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4Cg9gOLWKfGWCJolXyvysMLhvpATD5bc",
  authDomain: "fb-clone-c6d09.firebaseapp.com",
  projectId: "fb-clone-c6d09",
  storageBucket: "fb-clone-c6d09.appspot.com",
  messagingSenderId: "777811646403",
  appId: "1:777811646403:web:5566fbf03f59e589834f76",
  measurementId: "G-EFW5QRP4GX",
};

const firebase = initializeApp(firebaseConfig)

export const db = getFirestore(firebase)
export const auth = getAuth(firebase);
