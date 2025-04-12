import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthLogin from "../Components/author/AuthLogin"
import AuthSignUp from "../Components/author/AuthSignUp"
import AuthorDashboard from '../Components/author/AuthorDashboard'
function authorRoute() {
  return (
    <Routes>
  <Route path="/login" element={<AuthLogin />} />
  <Route path="/signup" element={<AuthSignUp />} />
  <Route path="/dashboard" element={<AuthorDashboard />} />

    </Routes>
  )
}

export default authorRoute
