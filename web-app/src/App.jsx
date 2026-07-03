import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ServiceManagerDashboard from './pages/ServiceManagerDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminServiceRequests from './pages/AdminServiceRequests';
import CustomerRegister from './pages/CustomerRegister';
import CustomerBooking from './pages/CustomerBooking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/booking" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer-register" element={<CustomerRegister />} />
        <Route path="/booking" element={<CustomerBooking />} />
        
        <Route path="/admin" element={<AppLayout role="Admin" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="requests" element={<AdminServiceRequests />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        <Route path="/manager" element={<AppLayout role="Manager" />}>
          <Route index element={<ServiceManagerDashboard />} />
        </Route>

        <Route path="/superadmin" element={<AppLayout role="Super Admin" />}>
          <Route index element={<SuperAdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
