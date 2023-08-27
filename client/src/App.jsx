import './App.css';
import Auth from './components/auth/Auth';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import Logout from './components/auth/logout/Logout';
import RoomIndex from './components/room/RoomIndex'
import { Col } from 'reactstrap';
import RoomUpdate from './components/room/RoomEdit';

function App() {

  // Token use state set up
  const [ sessionToken, setSessionToken ] = useState('');

  console.log('Token: ', sessionToken)

  const updateToken = newToken => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'))
    }
  },[])

  return (
    <div className="App">

          <Nav />
          {
              sessionToken !== '' ? 
              <Logout setSessionToken={setSessionToken} /> : null
          }
          <Routes>

              <Route 
                path='/'
                element={<Auth updateToken={updateToken} />}
              />

              <Route 
                path='/room'
                // element={<h2>Movie SECTION Placeholder.com</h2>}
                element={<RoomIndex token={sessionToken} />}
              />

              <Route 
                path='/room/update/:id'
                element={<RoomUpdate token={sessionToken} />}
              />

          </Routes>
          <Footer />

    </div>
  );
}

export default App;
