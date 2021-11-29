// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { initializeFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDnK3Ru6Z7KIw6LIteM6TAZwuuJLH6Owhs',
  authDomain: 'iclubapp-b2419.firebaseapp.com',
  projectId: 'iclubapp-b2419',
  storageBucket: 'iclubapp-b2419.appspot.com',
  messagingSenderId: '107355092968',
  appId: '1:107355092968:web:f5e9c7da2870e4f9c3165d',
  measurementId: 'G-8WH2FKFFCJ',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
