import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../Components/reader/Login';
import Signup from '../Components/reader/SignUp'
import ReaderHomePage from '../Components/reader/ReaderHomePage';

function ReaderRoute() {
  return (
    <Routes>
      {/* Use absolute paths */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<ReaderHomePage />} />

    </Routes>
  );
}

export default ReaderRoute;
