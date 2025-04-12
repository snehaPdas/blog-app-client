// src/Routes/adminRoute.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../Components/admin/AdminLogin';
import UserList from '../Components/admin/UserList';
import AdminLayout from '../Components/admin/AdminLayout';

function AdminRoute() {
  return (
    <Routes>
      {/* Public admin route for login */}
      <Route path="/login" element={<AdminLogin />} />

      {/* Protected admin routes wrapped in AdminLayout */}
      <Route
        path="/*"
        element={
          <AdminLayout>
            <Routes>
              <Route path="/users" element={<UserList />} />
              {/* Add other protected admin routes here, e.g., /admin/content */}
            </Routes>
          </AdminLayout>
        }
      />
    </Routes>
  );
}

export default AdminRoute;