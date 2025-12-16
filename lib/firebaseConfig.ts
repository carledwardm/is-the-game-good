import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA6dQ8WKOnFaEd-6QDCUxmsu7xO35H_VkE",
  authDomain: "is-the-game-good.firebaseapp.com",
  projectId: "is-the-game-good",
  storageBucket: "is-the-game-good.firebasestorage.app",
  messagingSenderId: "149195401962",
  appId: "1:149195401962:web:d274e52ec5599aff2d8593",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };