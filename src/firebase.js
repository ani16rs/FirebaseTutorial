import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

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

window.firebase = firebase;                         // Don't do this in your project


export const firestore = firebase.firestore();
export const auth = firebase.auth();

firestore.settings({ timestampsInSnapshots: true });

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();


/*
    Consider the following:
    * User signs up/logs in using Google. Has a profile photo (data other than email).
    * User changes profile photo. Logs out, and then logs in again.
    * Now, the 'additional data' will be fetched again from Google, but it will be the old data (old picture), and not the new one.
    * Point is, if the 'additional data' already exists (if the USER'S DOCUMENT already exists), get that; rather than fetching from Google.

    So that's what getUserDocument() & createUserProfileDocument() are trying to accomplishing.
    If the user's doc exists, get it. Else, create new user profile doc!
*/

export const createUserProfileDocument = async (user, additionalData) => {
    if (!user) return;

    // Reference to the place in the database where a user profile might be
    const userRef = firestore.doc(`users/${user.uid}`);                     // equavalent to .collection('users').doc(uid);

    // Go and fetch the document from that location
    const snapshot = await userRef.get();

    // If it doesn't exist, get the data out of user object that was sent, and create a new profile doc using userRef.set()!
    if (!snapshot.exists) {
        const { displayName, email, photoURL } = user;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName, email, photoURL, createdAt, ...additionalData,
            })
        } catch (error) {
            console.error('Error creating user', error.message);
        }
    }

    // If the doc exists, 
    return getUserDocument(user.uid);
}

export const getUserDocument = async (uid) => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.collection('users').doc(uid).get();
        return { uid, ...userDocument.data() };
    } catch (error) {
        console.error('Error fetching user', error.message);
    }

    // for getting all the posts by a particular user; like looking at a profile on twitter
    // const allPostsByUser = await firestore.collection('posts').doc(uid).get().filter(doc => doc.user.uid === uid);
}

export default firebase;

/*

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'


var firebaseConfig = {
    apiKey: "AIzaSyDuaiB5Qmi4GUnhIb0XGRArFo4U8C06hLE",
    authDomain: "animefx-d5e27.firebaseapp.com",
    projectId: "animefx-d5e27",
    storageBucket: "animefx-d5e27.appspot.com",
    messagingSenderId: "1039480282806",
    appId: "1:1039480282806:web:487dcb13b39132805c1017",
    measurementId: "G-RT4G0XY7DE"
};

firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

export const firestore = firebase.firestore();
export const auth = firebase.auth();


export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.GoogleAuthProvider();
export const emailProvider = new firebase.auth.EmailAuthProvider();


export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);
export const signInWithEmail = () => auth.signInWithPopup(emailProvider);

export const signOut = () => auth.signOut();


firestore.settings({ timestampsInSnapshots: true });

export default firebase;
*/