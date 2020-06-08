import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDokaIB-lO71jsIR-LT0YAU5fn2tcozTuk",
  authDomain: "crwn-db-56d45.firebaseapp.com",
  databaseURL: "https://crwn-db-56d45.firebaseio.com",
  projectId: "crwn-db-56d45",
  storageBucket: "crwn-db-56d45.appspot.com",
  messagingSenderId: "718434523101",
  appId: "1:718434523101:web:4f9e01a98330d64bcf4834",
  measurementId: "G-450BJWMGN9",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
