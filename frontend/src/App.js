import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';

// import pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';

// store backend url in one place
export const API_BASE_URL = 'http://localhost:5000/api';

function App(){

  const[isAuthenticated, setIsAuthenticated] = useState(false);

  const[user, setUser] = useState(null);

  const[token, setToken] = useState(null);

  const[loading, setLoading] = useState(true); // start as true - as we're checking localstorage

  // check if user is logged in
  useEffect(() => {
    console.log('useEffect running');
    const storedToken = localStorage.getItem('token'); // if token exists
    const storedUser = localStorage.getItem('user'); // if user data exists
    console.log(storedToken, storedUser);

    if(storedToken && storedUser){
      setToken(storedToken);
      setUser(JSON.parse(storedUser)); // convert string back to object and restore user
      setIsAuthenticated(true);
    }

    setLoading(false);
    console.log('loading set to false');
  }, []);

  // login handler (saves to state and save to localstorage)
  const handleLogin = (token, userData) => {
    setToken(token);
    setUser(userData);
    setIsAuthenticated(true);

    // save to localstorage so user stay logged in
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // logout user
  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if(loading){
    return <div className="loading">Loading...</div>
  }

  return(
    // it wraps the entire app
    <BrowserRouter> 
      <div className="App">
         {isAuthenticated && <Navbar user={user} onLogout={handleLogout} />}

         <Routes>
          {/*Login page*/}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard"/>
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />

          {/*dashboard - only for logged in user . If user not authenticated , redirect to login*/}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <DashboardPage token={token} user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/*Home - Redirect to login if not authenticated*/}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Catch all undefined routes */}
          <Route path="*" element={<Navigate to="/" />} />
         </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;