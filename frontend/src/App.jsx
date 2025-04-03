import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Registration and User Components
import SignUp from './components/registration/SignUp';
import LogIn from './components/registration/LogIn';
import AdminRegister from './components/registration/admin-registration/AdminRegister';
import UserRegister from './components/registration/resident-registration/UserRegister';
import ResidentList from './components/user/ResidentList';
import UserProfile from './components/user/UserProfile';

// Admin Dashboard Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminEvents from './pages/admin/Events';
import AdminBillings from './pages/admin/Billings';
import AdminComplaints from './pages/admin/Complaints';
import AdminNotices from './pages/admin/Notices';
import AdminPosts from './pages/admin/Posts';
import AdminParking from './pages/admin/Parking';
import AdminEmergencyContacts from './pages/admin/EmergencyContacts';
import AdminRequestServices from './pages/admin/RequestServices';
import AdminFeedback from './pages/admin/Feedback';
import AdminLayout from './components/dashboard-pages/AdminLayout';

// Resident Dashboard Pages
import ResidentDashboard from './pages/resident/Dashboard';
import ResidentEvents from './pages/resident/Events';
import ResidentBillings from './pages/resident/Billings';
import ResidentBillPayment from './pages/resident/BillingPage';
import ResidentComplaints from './pages/resident/Complaints';
import ResidentNotices from './pages/resident/Notices';
import ResidentParking from './pages/resident/Parking';
import ResidentEmergencyContacts from './pages/resident/EmergencyContacts';
import ResidentRequestServices from './pages/resident/RequestServices';
import ResidentFeedback from './pages/resident/Feedback';
import ResidentLayout from './components/dashboard-pages/ResidentLayout';
import BillingPage from './pages/admin/BillingPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/resident-list" element={<ResidentList />} />
          <Route path="/user-profile" element={<UserProfile />} />
        
        {/* <Route path="/resident-list" element={<ResidentList />} /> */}

        {/* Admin Dashboard Routes */}
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="request-services" element={<AdminRequestServices />} />
          <Route path="complaints" element={<AdminComplaints />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="notices" element={<AdminNotices />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="parking" element={<AdminParking />} />
          <Route path="emergency-contacts" element={<AdminEmergencyContacts />} />
          {/* <Route path="billings" element={<AdminBillings />} /> */}
          <Route path="billings" element={<BillingPage />} />
          <Route path="feedback" element={<AdminFeedback />} />
          {/* <Route path="resident-list" element={<ResidentList />} />
          <Route path="user-profile" element={<UserProfile />} /> */}

        </Route>

        {/* Resident Dashboard Routes */}
        <Route path="/resident-dashboard" element={<ResidentLayout />}>
          <Route index element={<ResidentDashboard />} />
          <Route path="request-services" element={<ResidentRequestServices />} />
          <Route path="complaints" element={<ResidentComplaints />} />
          <Route path="events" element={<ResidentEvents />} />
          <Route path="notices" element={<ResidentNotices />} />
          <Route path="parking" element={<ResidentParking />} />
          <Route path="emergency-contacts" element={<ResidentEmergencyContacts />} />
          {/* <Route path="post" element={<ResidentBillings />} /> */}
          <Route path="billings" element={<ResidentBillPayment />} />
          <Route path="feedback" element={<ResidentFeedback />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;