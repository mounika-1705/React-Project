import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Citizen Pages
import RaiseRequest from "./pages/citizen/RaiseRequest";
import MyRequests from "./pages/citizen/MyRequests";
import RequestDetails from "./pages/citizen/RequestDetails";

// Operator Pages
import OperatorAssigned from "./pages/Operator/OperatorAssigned";

// Admin Page
import AdminOperators from "./pages/admin/AdminOperators";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

// Community Pages
import CommunityList from "./pages/community/CommunityList";
import CommunityCreate from "./pages/community/CommunityCreate";
import CommunityDetails from "./pages/community/Communitydetails";

export default function App() {
  const [user, setUser] = useState(null);

  // Check for logged-in user on load
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
  
    // Clear storage
    localStorage.removeItem("loggedInUser"); 
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        {/* Public & Auth Routes */}
        <Route path="/" element={<Home user={user} />} />
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />

        {/* Citizen Routes */}
        <Route path="/raise-request" element={<RaiseRequest />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/view-request/:id" element={<RequestDetails />} />

        {/* Community Routes */}
        <Route path="/community" element={<CommunityList user={user} />} />
        <Route path="/community/create" element={<CommunityCreate user={user} />} />
        <Route path="/community/:id" element={<CommunityDetails user={user} />} />

        {/* Operator Route */}
        <Route path="/assigned" element={<OperatorAssigned />} />

        {/* Admin Route */}
        <Route path="/admin-operators" element={<AdminOperators />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-analytics" element={<AdminAnalytics />} />
      </Routes>
    </Router>
  );
}

