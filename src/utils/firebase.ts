// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "tiktok-clone-82a56.firebaseapp.com",
  projectId: "tiktok-clone-82a56",
  storageBucket: "tiktok-clone-82a56.appspot.com",
  messagingSenderId: "233211437083",
  appId: "1:233211437083:web:0c508df7155478176058be",
  measurementId: "G-Y085P8BS6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };