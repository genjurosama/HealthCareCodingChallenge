import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import PatientNotes from './components/PatientNotes'; // Import the PatientNotes component
import NoteCreation from './components/NoteCreation'; // Import the NotesCreation component
import { Auth, Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


Amplify.configure(awsconfig);
Auth.configure(awsconfig);



function App() {

  const signOut = async () => {
 
    try {
      await Auth.signOut();
      // Redirect or perform any other necessary actions after successful sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1 className='app-title'>HealthCare Coding Challenge</h1>
          <Authenticator>
          <div className="main-display">
          <nav className="custom-nav">
            <ul className="custom-nav-links">
              <li>
                <a href="/">Patient Notes</a>
              </li>
              <li>
                <a href="/noteCreation">Create Patient Note</a>
              </li>
              {/* Add other custom navigation links as needed */}
            </ul>
          </nav>
            <button className="logout-button" onClick={signOut}>
              Sign Out
            </button>
          </div>
          <Routes>
            <Route path="/" element={<PatientNotes />} />
            <Route path="/noteCreation" element={<NoteCreation />} />
            {/* Define other routes as needed */}
          </Routes>
          </Authenticator>
        </header>
       
      </div>
    </Router>
  );
}

export default App;
