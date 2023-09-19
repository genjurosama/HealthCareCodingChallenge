import React from 'react';
import { Auth } from 'aws-amplify';

function Logout() {
  const handleLogout = async () => {
    try {
      await Auth.signOut();
      // Handle successful logout (e.g., navigate to the login page).
    } catch (error) {
      // Handle logout error (e.g., display an error message).
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
