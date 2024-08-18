import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAndLK36B_Oy_cAr7NeNe-tOwuQg3dQ4io",
    authDomain: "comment-section-158d6.firebaseapp.com",
    projectId: "comment-section-158d6",
    storageBucket: "comment-section-158d6.appspot.com",
    messagingSenderId: "958184187664",
    appId: "1:958184187664:web:b920e9546923febfc7a795",
    measurementId: "G-EVWZWZQW1G"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firebase services
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // ... (Handle successful login)
    } catch (error) {
      // ... (Handle errors)
    }
  };
export const logout = () => signOut(auth);
