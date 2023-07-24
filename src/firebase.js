// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
 // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSW1ZI6enorajMQwrOgZBnqzKaw9ym4_8",
  authDomain: "podcast-app-1c263.firebaseapp.com",
  projectId: "podcast-app-1c263",
  storageBucket: "podcast-app-1c263.appspot.com",
  messagingSenderId: "954294254270",
  appId: "1:954294254270:web:38ce1edbf9644084bafcef",
  measurementId: "G-WYG7M8QKP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
 const storage=getStorage(app);
 const auth=getAuth(app);
 const provider=new GoogleAuthProvider();
 export {auth,db,storage,provider};