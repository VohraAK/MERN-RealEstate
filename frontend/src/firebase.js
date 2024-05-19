// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ghardhoondo---mern-project.firebaseapp.com",
  projectId: "ghardhoondo---mern-project",
  storageBucket: "ghardhoondo---mern-project.appspot.com",
  messagingSenderId: "832428180570",
  appId: "1:832428180570:web:f4855d9941c62a85248463"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);