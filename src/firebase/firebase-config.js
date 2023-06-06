import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import config from "../config";

//console.log({ config });

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: config.REACT_APP_FIREBASE_API_KEY,
  authDomain: config.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: config.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: config.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: config.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
export { auth, db, firebase };
