import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBfy-tRr33Ii1kozHg7hlRdvabzvRGelmA",
    authDomain: "think-piece-b709b.firebaseapp.com",
    projectId: "think-piece-b709b",
    storageBucket: "think-piece-b709b.appspot.com",
    messagingSenderId: "60392985430",
    appId: "1:60392985430:web:d320166fd0139132dfbcf7",
    measurementId: "G-6DXNJWS21Q"
};

firebase.initializeApp(firebaseConfig);

window.firebase = firebase;

export const firestore = firebase.firestore();

firestore.settings({ timestampsInSnapshots: true });

export default firebase;