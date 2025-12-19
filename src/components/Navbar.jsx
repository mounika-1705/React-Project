import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="logo" onClick={() => navigate("/")}>
          <span className="brand">CleanOps</span>
          <span className="emoji"> 🚛♻️</span>
        </div>

        {/* Left Navigation */}
        <nav className="nav-btn1">
          <NavLink to="/" className="nav-item">Home</NavLink>
          <NavLink to="/community" className="nav-item">Community</NavLink>

          {/* Citizen */}
          {user && user.role === "citizen" && (
            <>
              <NavLink to="/raise-request" className="nav-item">Raise Request</NavLink>
              <NavLink to="/my-requests" className="nav-item">My Requests</NavLink>
            </>
          )}

          {/* Operator */}
          {user && user.role === "operator" && (
            <NavLink to="/assigned" className="nav-item">Assigned</NavLink>
          )}

          {/* Ward Admin */}
          {user && (user.role === "ward admin" || user.role === "wardAdmin") && (
            <>
              <NavLink to="/admin-dashboard" className="nav-item">Dashboard</NavLink>
              <NavLink to="/admin-analytics" className="nav-item">Analytics</NavLink>
              <NavLink to="/admin-operators" className="nav-item">Operators</NavLink>
            </>
          )}

          {/* Super Admin */}
          {user && (user.role === "super admin" || user.role === "superAdmin") && (
            <>
              <NavLink to="/admin-dashboard" className="nav-item">Dashboard</NavLink>
              <NavLink to="/admin-analytics" className="nav-item">Analytics</NavLink>
              <NavLink to="/admin-operators" className="nav-item">Operators</NavLink>
            </>
          )}
        </nav>

        {/* Right Navigation */}
        <div className="nav-btn2">
          {user ? (
            <div className="user-menu">
              <span className="user-info">
                {user.name} <span className="user-role">({user.role})</span>
              </span>

              <button className="logout-btn" onClick={() => {
                  onLogout();
                  navigate("/login");
                }}
              >Logout</button>
            </div>
          ) : (
            <>
              <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
              <button className="register-btn" onClick={() => navigate("/register")}>Register</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}