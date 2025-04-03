import React from "react";
import { FaUserCircle, FaUsers, FaSignOutAlt } from "react-icons/fa";
import "./UserProfile.css";

const UserProfile = () => {
  const user = {
    name: "Pavani",
    flatNo: "A234",
    societyName: "Aravali Hills",
    block: "Block A",
    phone: "9728153456",
    email: "pavani@gmail.com",
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="navbar-title">User Profile</h1>
        <div className="navbar-icons">
          <FaUserCircle className="icon" />
          <span className="user-name">{user.name}</span>
          <FaUsers className="icon" />
          <FaSignOutAlt className="icon" />
        </div>
      </nav>

      {/* Profile Card */}
      <div className="profile-card">
        {/* Left Section */}
        <div className="profile-left">
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-flat">Flat - {user.flatNo}</p>
        </div>

        {/* Right Section */}
        <div className="profile-right">
          <h3 className="info-header">INFORMATION</h3>
          <div className="info-grid">
            <div>
              <p className="info-title">Society Name</p>
              <p className="info-value">{user.societyName}</p>
            </div>
            <div>
              <p className="info-title">Name</p>
              <p className="info-value">{user.name}</p>
            </div>
            <div>
              <p className="info-title">Block</p>
              <p className="info-value">{user.block}</p>
            </div>
            <div>
              <p className="info-title">Flat No</p>
              <p className="info-value">{user.flatNo}</p>
            </div>
            <div>
              <p className="info-title">Phone</p>
              <p className="info-value">{user.phone}</p>
            </div>
            <div>
              <p className="info-title">Email</p>
              <p className="info-value email">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;




