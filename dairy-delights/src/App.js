//App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios'; 
import './App.css';
import Header from './components/Header';
import MainBoday from './components/MainBoday'; 
import Footer from './components/Footer';
import OrderDetails from './components/OrderDetails';
import filterSearch from './util/filterSearch';
import Login from './components/Login';
import Admin from './components/Admin';
import Signup from './components/SignUp';

function App() {
  const [dairyData, setDairyData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  function searchHandler(e) {
    setSearchQuery(e.target.value);
  }

  const handleAdminLogin = () => setIsAdmin(true);
  const handleAdminLogout = () => setIsAdmin(false);

  const displaydata = filterSearch(dairyData, searchQuery);

  const url = "http://localhost:5000/products";

  useEffect(() => {
    const fetchData = () => {
        axios.get(url)
            .then(response => {
                setDairyData(response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header onSearch={searchHandler} searchText={searchQuery} isLoggedIn={isLoggedIn} onLogout={handleLogout} isAdmin={isAdmin} onAdminLogout={handleAdminLogout}/>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<MainBoday allData={displaydata}  />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin onAdminLogin={handleAdminLogin}/>} />
          <Route path="/order/:id" element={isLoggedIn ? <OrderDetails /> : <Navigate to="/login" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
