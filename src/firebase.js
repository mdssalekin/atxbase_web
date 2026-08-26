// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv8Yyxj0EA6ylGz0Ht5zV495IwqnrLdWk",
  authDomain: "rm-best-properties.firebaseapp.com",
  projectId: "rm-best-properties",
  storageBucket: "rm-best-properties.firebasestorage.app",
  messagingSenderId: "910952660182",
  appId: "1:910952660182:web:2a13e187565901623e1d77",
  measurementId: "G-6NHBN30N0B"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);