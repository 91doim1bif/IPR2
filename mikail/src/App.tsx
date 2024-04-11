import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="container mt-3">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/user" element={<BoardUser />} />
      <Route path="/mod" element={<BoardModerator />} />
      <Route path="/admin" element={<BoardAdmin />} />
    </Routes>
  </div>
}

export default App;
