import React, { useState } from "react";
import GoogleAuth from './components/GoogleAuth';
import CommentSectionComponent from './components/CommentSection';
import './App.css'; // Import the CSS file

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="app-container">
      <GoogleAuth setCurrentUser={setCurrentUser} />
      {currentUser && (
        <CommentSectionComponent currentUser={currentUser} />
      )}
    </div>
  );
}

export default App;
