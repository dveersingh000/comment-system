import React, { useEffect, useState } from "react";
import { auth, signInWithGoogle, logOut } from "../firebase";
import './GoogleAuth.css'; // Import the CSS file

const GoogleAuth = ({ setCurrentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setCurrentUser(user ? {
        currentUserId: user.uid,
        currentUserImg: user.photoURL,
        currentUserProfile: user.email,
        currentUserFullName: user.displayName
      } : null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="google-auth-container">
      <h1 className="title">Comment System with Google Authentication and Rich Text Features</h1>
      {user ? (
        <button className="auth-button" onClick={logOut}>Logout</button>
      ) : (
        <button className="auth-button google-signin-button" onClick={signInWithGoogle}>
          <img src="data:image/png;base64,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" alt="Google" className="google-icon" />
          Sign with Google
        </button>
      )}
    </div>
  );
};

export default GoogleAuth;
