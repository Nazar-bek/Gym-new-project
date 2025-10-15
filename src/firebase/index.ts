import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBZPRrHbVlhja7W9ZyqLeHTbDNlFxfq1QY",
  authDomain: "gym-project-training.firebaseapp.com",
  projectId: "gym-project-training",
  storageBucket: "gym-project-training.firebasestorage.app",
  messagingSenderId: "781462050661",
  appId: "1:781462050661:web:a96efe049b9e575fee338c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
export { auth, db };