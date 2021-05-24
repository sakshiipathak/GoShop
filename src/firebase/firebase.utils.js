import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const config = {
    apiKey: "AIzaSyAupPwN4XnXkGbANqfZPfDmpUduApO2yaA",
    authDomain: "goshop-db.firebaseapp.com",
    projectId: "goshop-db",
    storageBucket: "goshop-db.appspot.com",
    messagingSenderId: "854358911540",
    appId: "1:854358911540:web:ae75b754403854fa9c7861",
    measurementId: "G-MK7L730TZC"
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData)=> {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
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