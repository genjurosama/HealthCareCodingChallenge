import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Logout from './Logout';
import PatientNotes from './PatientNotes'; // Import the PatientNotes component
import { Auth,Amplify } from 'aws-amplify';
import {configure} from 'aws-amplify';
import awsconfig from './aws-exports';
import {Authenticator} from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'


Amplify.configure(awsconfig);

Amplify.configure(awsconfig);
Auth.configure(awsconfig)

function App() {

  const isAuthenticated = true; 
  return (
    <Router>
      <div className="App">
      
        <header>
          <h1>Your App Name</h1>
      
              <Authenticator>
                <PatientNotes></PatientNotes>
              </Authenticator>

        </header>
        <Routes>
          
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
