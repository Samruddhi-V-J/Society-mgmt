import React, { useState } from "react";
import "./UserRegister.css";
import apartment from '../../../assets/apartment.jpeg';
import logo from '../../../assets/logo.jpg';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";


// const UserRegister = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     societyName: "",
//     flatNo: "",
//     postal: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {  
//     e.preventDefault();
    
//     try {
//       const response = await axios.post("http://localhost:8080/usersdata/add-resident", formData, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.status === 200 || response.status === 201) {
//         alert("User Registered Successfully!");
//         navigate("/login"); // Redirect after successful registration
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Registration failed. Please try again.");
//     }
//   };


//   return (
//     <div className="user-register">
//       <div className="image-container">
//         <img src={apartment} alt="Apartment" />
//       </div>

//       <div className="form-container">
       
//         <div className="header">
//           <h2>Sign Up</h2>
//           <img src={logo} alt="Logo" className="logo" />
//         </div>

//         <form onSubmit={handleSubmit}>
//           <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
//           <input type="tel" name="phone" placeholder="Phone No" value={formData.phone} onChange={handleChange} required />
//           <input type="text" name="societyName" placeholder="Society Name" value={formData.societyName} onChange={handleChange} required />
//           <input type="text" name="flatNo" placeholder="Flat No" value={formData.flatNo} onChange={handleChange} required />
//           <input type="text" name="postal" placeholder="Postal" value={formData.postal} onChange={handleChange} required />
//           <button type="submit">Register</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserRegister;




const UserRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";  // Retrieve email from navigation state

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    societyName: "",
    flatNo: "",
    postal: "",
    email: email,  // Pre-fill email
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {  
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:8080/api/add-resident", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 || response.status === 201) {
        alert("User Registered Successfully!");
        navigate("/login"); // Redirect after successful registration
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="user-register">
      <div className="image-container">
        <img src={apartment} alt="Apartment" />
      </div>

      <div className="form-container">
        <div className="header">
          <h2>Sign Up</h2>
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone No" value={formData.phone} onChange={handleChange} required />
          <input type="text" name="societyName" placeholder="Society Name" value={formData.societyName} onChange={handleChange} required />
          <input type="text" name="flatNo" placeholder="Flat No" value={formData.flatNo} onChange={handleChange} required />
          <input type="text" name="postal" placeholder="Postal" value={formData.postal} onChange={handleChange} required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
