import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import DestinationDetails from './pages/DestinationDetails';
import Calendar from './components/Calendar';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import './index.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
  };

  return (
    <Router>
      <div className={isDarkMode ? 'dark-mode' : ''}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/calender" element={<PrivateRoute><Calendar /></PrivateRoute>} />
          <Route path="/destination/:id" element={<PrivateRoute><DestinationDetails /></PrivateRoute>} />
          <Route path="/event/:id" element={<PrivateRoute><EventDetails /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
