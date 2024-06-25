// lib/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBqs8xXHRnAY7lUbfgOEWJazRL4U1Quuak",
    authDomain: "centi-crensento.firebaseapp.com",
    projectId: "centi-crensento",
    storageBucket: "centi-crensento.appspot.com",
    messagingSenderId: "127117263525",
    appId: "1:127117263525:web:4a51f98d43739c80b3c34c",
    measurementId: "G-KGJVJRSRN3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
