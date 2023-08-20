import './App.css';
import Auth from './components/auth/Auth';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';

function App() {

  // Token use state set up
  const [ sessionToken, setSessionToken ] = useState('');

  console.log('Token: ', sessionToken)

  const updateToken = newToken => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  }

  return (
    <div className="App">
    <Nav />
    <Routes>

        <Route 
          path='/'
          element={<Auth updateToken={updateToken} />}
        />

    </Routes>
    <Footer />
    </div>
  );
}

export default App;
