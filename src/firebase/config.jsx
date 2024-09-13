import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCWNqpLe-yS8RYrUQTY12dgxS-sPKbFD1w",
  authDomain: "miniblog-b3f0f.firebaseapp.com",
  projectId: "miniblog-b3f0f",
  storageBucket: "miniblog-b3f0f.appspot.com",
  messagingSenderId: "771540876055",
  appId: "1:771540876055:web:cae14bf5bdc2a16c895552"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };