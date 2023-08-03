import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBekRl-CY413TF6ajrFNFaBhtkbQ6HqfTs',
  authDomain: 'pizza-admin-panel.firebaseapp.com',
  projectId: 'pizza-admin-panel',
  storageBucket: 'pizza-admin-panel.appspot.com',
  messagingSenderId: '939996711380',
  appId: '1:939996711380:web:5d00fe05d791d1a5542e41',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
