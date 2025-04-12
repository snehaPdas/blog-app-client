import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReaderRoute from './Routes/readerRoute'; 
import AuthorRoute from './Routes/authorRoute'
import AdminRoute from './Routes/adminRoute'


function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/*" element={<ReaderRoute />} />
        <Route path="/author/*" element={<AuthorRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />


    
      </Routes>
    </Router>
  );
}

export default App;
