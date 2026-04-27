import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDU-JVJ7Pxs1gOkvg248yufMczeqgCq8jM",
  authDomain: "envigo-e9e99.firebaseapp.com",
  projectId: "envigo-e9e99",
  storageBucket: "envigo-e9e99.firebasestorage.app",
  messagingSenderId: "858931539426",
  appId: "1:858931539426:web:d83fe98e5f45dfc2239dbb",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);