import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA78Oee7vydDug6fZ3YIQ4Y5sm40zqkaPU",
  authDomain: "socialmedial-ec913.firebaseapp.com",
  projectId: "socialmedial-ec913",
  storageBucket: "socialmedial-ec913.appspot.com",
  messagingSenderId: "675466039930",
  appId: "1:675466039930:web:14c8afa220f756aef221c3",
  measurementId: "G-LZ7Q8BX6VN",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const storage = getStorage(app);

export { app, db, auth, storage };
