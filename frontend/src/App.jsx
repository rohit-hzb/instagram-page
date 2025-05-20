import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './Login';
import Home from './Home';

export const backendUrl = "https://instagram-page-3.onrender.com";

function App() {
  const [token, setToken] = useState("");

  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Show Login if not authenticated */}
        <Route
          path="/login"
          element={!token ? <Login setToken={setToken} /> : <Navigate to="/home" />}
        />
        
        {/* Show Home only if authenticated */}
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/login" />}
        />

        {/* Default route */}
        <Route
          path="*"
          element={<Navigate to={token ? "/home" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
