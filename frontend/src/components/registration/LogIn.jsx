import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "./LogIn.css";
import logo from '../../assets/logo.jpg';
import apartment from '../../assets/apartment.jpeg';

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const validateForm = () => {
    let formErrors = {};
    if (!email.trim()) {
      formErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      formErrors.email = "Invalid email format";
    }
    if (!password.trim()) {
      formErrors.password = "Password is required";
    } else if (password.length < 8) {
      formErrors.password = "Password must be at least 8 characters";
    } else if (!validatePassword(password)) {
      formErrors.password = "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Validation failed!");
      return;
    }
    setLoading(true);

    try {
      console.log("Sending login request...");
      const response = await axios.post("http://localhost:8080/usersdata/login", { email, password });

      console.log("Login Response:", response.data); // Debugging log

      if (response.status === 200 && response.data.email && response.data.role) {
        const { email, role } = response.data;

        // Store Email & Role in Local Storage
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", role);

        if (role.toLowerCase() === "admin") {
          // ✅ Admin: Navigate immediately
          console.log("Admin login successful. Redirecting...");
          navigate("/admin-dashboard");
          return; // ⬅️ Stops further execution (No user details fetch)
        } 

        // ✅ Resident: Fetch additional details
        console.log("Resident login successful. Fetching user details...");
        const userDetailsResponse = await axios.get(`http://localhost:8080/api/user-details?email=${email}`);

        if (userDetailsResponse.status === 200 && userDetailsResponse.data.name) {
          const username = userDetailsResponse.data.name;
          localStorage.setItem("userName", username);

          console.log("Resident details fetched. Redirecting to resident dashboard...");
          navigate("/resident-dashboard");
        } else {
          alert("Failed to fetch resident details.");
        }
      } else {
        alert("Login failed: Invalid response from server");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Login_page">
      <div className="apartment">
        <img src={apartment} alt="apartment" />
      </div>
      <div className="login_form">
        <img src={logo} className="communitylogo" alt="Community Logo" />
        <h1>Log In</h1>
      
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div>
          <h4 style={{ display: 'inline', marginRight: '5px' }}>Don't have an account?</h4>
          <span className="auth-link" onClick={() => navigate("/")}>Sign Up Now</span>
        </div>
      </div>
    </div>
  );
};

export default LogIn;


