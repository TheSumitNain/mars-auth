import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBIVWk9V1qj8qOOFKlZlW_Wrvl9J9Tzb-k",
  authDomain: "react-mars.firebaseapp.com",
  projectId: "react-mars",
  storageBucket: "react-mars.appspot.com",
  messagingSenderId: "526945224670",
  appId: "1:526945224670:web:6e7d8ae6e9566f9be3ff4f",
  measurementId: "G-KHNEZ0BQ3W"
};

const app = firebase.initializeApp(firebaseConfig);

export default firebase;
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);










// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// import firebase from "firebase/compat/app";
// import 'firebase/compat/firestore';
// import {getFirestore} from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyBIVWk9V1qj8qOOFKlZlW_Wrvl9J9Tzb-k",
//     authDomain: "react-mars.firebaseapp.com",
//     projectId: "react-mars",
//     storageBucket: "react-mars.appspot.com",
//     messagingSenderId: "526945224670",
//     appId: "1:526945224670:web:6e7d8ae6e9566f9be3ff4f",
//     measurementId: "G-KHNEZ0BQ3W"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// // export default app;

// export default firebase;
// export const db = getFirestore(app);
// export const storage = getStorage(app);