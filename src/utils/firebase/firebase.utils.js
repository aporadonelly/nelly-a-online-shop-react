import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore' //getFirestore is to instantiate firestore instance just like getAuth in auth service. doc is to retreive documents inside firestore db. getDoc is to access data in doc, and setDoc when you set data in the docs.

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDnNPvw27WNTial-69t259CjaTrSAqmv3c',
  authDomain: 'nelly-a-clothing.firebaseapp.com',
  projectId: 'nelly-a-clothing',
  storageBucket: 'nelly-a-clothing.appspot.com',
  messagingSenderId: '80466810771',
  appId: '1:80466810771:web:e2b5311fada7301520ba66',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider)

//instantiate firestore db
export const db = getFirestore()

export const createUserDocFromAuth = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return
  const userDocRef = doc(db, 'users', userAuth.uid) //doc takes 3 params: fireStore db, collections or tables, and the thing you want to return from the response. In this example it's userAuth.uid
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      })
    } catch (err) {
      console.log('There is an error.', err.message)
    }
  }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

//sign in user with email and password
export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await signInWithEmailAndPassword(auth, email, password)
}
