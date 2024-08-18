// Logout.jsx
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log('User signed out');
        navigate('/login'); // Redirect to login
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;