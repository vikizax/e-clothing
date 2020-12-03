import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBDoOvRqJ_cM8fzT365SW7A7del932-1UU",
  authDomain: "e-clothing-c64b2.firebaseapp.com",
  databaseURL: "https://e-clothing-c64b2.firebaseio.com",
  projectId: "e-clothing-c64b2",
  storageBucket: "e-clothing-c64b2.appspot.com",
  messagingSenderId: "781285744032",
  appId: "1:781285744032:web:0266d358d35006413698c5",
  measurementId: "G-LG3GW17ZZJ"
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
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
