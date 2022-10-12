// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup
  // signInWithEmailAndPassword,
  // createUserWithEmailAndPassword,
  // sendPasswordResetEmail,
  // signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase pr
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJa_mE5gTeRvwYiS0cRKICJpG4JDI8iig",
  authDomain: "todo-with-firebase-93907.firebaseapp.com",
  projectId: "todo-with-firebase-93907",
  storageBucket: "todo-with-firebase-93907.appspot.com",
  messagingSenderId: "46109416380",
  appId: "1:46109416380:web:bca05257a4e36b169929b9",
  measurementId: "G-KJ79N66W91"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try{
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    
    const q = query(collection(db, "users"), where("uid", "==" ,user.uid));
    const docs = await getDocs(q);
    if(docs.docs.length === 0){
      await addDoc(collection(db, "users"), {
        uid : user.uid,
        name : user.displayName,
        authProvider : "google",
        email : user.email
      });
    }
  }catch(err){
    console.error(err.message);
  }
}

export { db, auth, signInWithGoogle }