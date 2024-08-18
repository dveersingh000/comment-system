import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAndLK36B_Oy_cAr7NeNe-tOwuQg3dQ4io",
    authDomain: "comment-section-158d6.firebaseapp.com",
    projectId: "comment-section-158d6",
    storageBucket: "comment-section-158d6.appspot.com",
    messagingSenderId: "958184187664",
    appId: "1:958184187664:web:b920e9546923febfc7a795",
    measurementId: "G-EVWZWZQW1G"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => signInWithPopup(auth, provider);
const logOut = () => signOut(auth);

export { auth, signInWithGoogle, logOut };
