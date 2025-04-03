import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminRegister.css";
import apartment from '../../../assets/apartment.jpeg';
import logo from '../../../assets/logo.jpg'
import axios from "axios";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    societyName: "",
    societyAddress: "",
    city: "",
    district: "",
    postal: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:8080/usersdata/admin-register",
        formData, 
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        alert("Admin Registered Successfully!");
        navigate("/login");
      } else {
        alert("Failed to register admin.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting data.");
    }
  };
    
  return (
    <div className="admin-register">
      <div className='image-container'>
        <img src={apartment} alt='apartment' />
      </div>

      <div className="form-container">
        <h2>Fill these details to continue</h2>
        <img src={logo} className='communitylogo' alt="Community Logo" />
       
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone No" value={formData.phone} onChange={handleChange} required />
          <input type="text" name="societyName" placeholder="Society Name" value={formData.societyName} onChange={handleChange} required />
          <input type="text" name="societyAddress" placeholder="Society Address" value={formData.societyAddress} onChange={handleChange} required />
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
          <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} required />
          <input type="text" name="postal" placeholder="Postal" value={formData.postal} onChange={handleChange} required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
