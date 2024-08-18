import React, { useState } from 'react';
import { signInWithGoogle } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

function Login() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      setUser(result.user);
      navigate('/comments'); // Redirect to the comment page
    } catch (error) {
      console.error('Error during Google Sign-in:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
}

export default Login;
