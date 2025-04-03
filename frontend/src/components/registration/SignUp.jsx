// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import './SignUp.css';
// import logo from '../../assets/logo.jpg';
// import apartment from '../../assets/apartment.jpeg';
// import { toast } from "react-toastify";

// const SignUp = ({ isLogin: defaultLogin }) => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [isLogin, setIsLogin] = useState(defaultLogin);
//   const [data, setData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [error, setError] = useState({ errors: {}, isError: false });

//   useEffect(() => {
//     setIsLogin(location.pathname === "/login");
//   }, [location]);

//   const handleChange = (event) => {
//     setData({ ...data, [event.target.name]: event.target.value });
//   };

//   const validateForm = () => {
//     let errors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//     if (!data.email) {
//       errors.email = "Email is required";
//     } else if (!emailRegex.test(data.email)) {
//       errors.email = "Enter a valid email";
//     }

//     if (!data.password) {
//       errors.password = "Password is required";
//     } else if (!passwordRegex.test(data.password)) {
//       errors.password = "Password must be at least 8 characters, include a number & special character";
//     }

//     if (!isLogin && data.password !== data.confirmPassword) {
//       errors.confirmPassword = "Passwords do not match";
//     }

//     if (!isLogin && !data.role) {
//       errors.role = "Please select a role";
//     }

//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     const user = {
//       name: data.email.split("@")[0],
//       email: data.email,
//       password: data.password,
//       role: data.role,
//     };

//     try {
//       const response = await axios.post("http://localhost:8080/usersdata/signup", user);
//       console.log("Signup response:", response.data);
//       toast.success("User registered successfully");

//       setData({ email: "", password: "", confirmPassword: "", role: "" });

//       if (data.role === "Admin") {
//         navigate("/admin-register");
//       } else if (data.role === "Resident") {
//         navigate("/user-register");
//       } else {
//         navigate("/welcome");
//         alert("Choose valid role");
//       }
//     } catch (error) {
//       setError({ errors: error.response?.data || {}, isError: true });
//       toast.error(`Signup failed: ${error.response?.data?.message || "Please try again."}`);
//       console.error("Signup failed:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className='Signup_page'>
//       <div className='apartment'>
//         <img src={apartment} alt='apartment' />
//       </div>

//       <div className='signup_form'>
//         <img src={logo} className='communitylogo' alt="Community Logo" />

//         <h1>{isLogin ? "Log In" : "Sign Up"}</h1>

//         <form onSubmit={handleSubmit}>
//           <label>Email</label>
//           <input type='email' name="email" value={data.email} onChange={handleChange} />
//           {errors.email && <span className="error">{errors.email}</span>}

//           <label>Password</label>
//           <input type='password' name="password" value={data.password} onChange={handleChange} />
//           {errors.password && <span className="error">{errors.password}</span>}

//           {!isLogin && (
//             <>
//               <label>Confirm Password</label>
//               <input type='password' name="confirmPassword" value={data.confirmPassword} onChange={handleChange} />
//               {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

//               <label>Role</label>
//               <select name="role" value={data.role} onChange={handleChange}>
//                 <option value="">Select</option>
//                 <option value="Admin">Admin</option>
//                 <option value="Resident">Resident</option>
//               </select>
//               {errors.role && <span className="error">{errors.role}</span>}
//             </>
//           )}

//           <button type='submit'>{isLogin ? "Log In" : "Sign Up"}</button>
//         </form>

//         <div>
//           <h4 style={{ display: 'inline', marginRight: '5px' }}>
//             {isLogin ? "Create new account" : "Already have an account?"}
//           </h4>
//           <span className="auth-link" onClick={() => navigate(isLogin ? "/" : "/login")}>
//             {isLogin ? "Sign Up Now" : "Log In Here"}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;




import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';
import logo from '../../assets/logo.jpg';
import apartment from '../../assets/apartment.jpeg';
import { toast } from "react-toastify";


const SignUp = ({ isLogin: defaultLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(defaultLogin);
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState({ errors: {}, isError: false });

  useEffect(() => {
    setIsLogin(location.pathname === "/login");
  }, [location]);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!data.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      errors.email = "Enter a valid email";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(data.password)) {
      errors.password = "Password must be at least 8 characters, include a number & special character";
    }

    if (!isLogin && data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!isLogin && !data.role) {
      errors.role = "Please select a role";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const user = {
      name: data.email.split("@")[0],
      email: data.email,
      password: data.password,
      role: data.role,
    };

    try {
      const response = await axios.post("http://localhost:8080/usersdata/signup", user);
      console.log("Signup response:", response.data);
      toast.success("User registered successfully");

      setData({ email: "", password: "", confirmPassword: "", role: "" });

      if (data.role === "Admin") {
        navigate("/admin-register");
      } else if (data.role === "Resident") {
        navigate("/user-register", { state: { email: data.email } });
      } else {
        navigate("/welcome");
        alert("Choose valid role");
      }
    } catch (error) {
      setError({ errors: error.response?.data || {}, isError: true });
      toast.error(`Signup failed: ${error.response?.data?.message || "Please try again."}`);
      console.error("Signup failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className='Signup_page'>
      <div className='apartment'>
        <img src={apartment} alt='apartment' />
      </div>

      <div className='signup_form'>
        <img src={logo} className='communitylogo' alt="Community Logo" />

        <h1>{isLogin ? "Log In" : "Sign Up"}</h1>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type='email' name="email" value={data.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}

          <label>Password</label>
          <input type='password' name="password" value={data.password} onChange={handleChange} />
          {errors.password && <span className="error">{errors.password}</span>}

          {!isLogin && (
            <>
              <label>Confirm Password</label>
              <input type='password' name="confirmPassword" value={data.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

              <label>Role</label>
              <select name="role" value={data.role} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Admin">Admin</option>
                <option value="Resident">Resident</option>
              </select>
              {errors.role && <span className="error">{errors.role}</span>}
            </>
          )}

          <button type='submit'>{isLogin ? "Log In" : "Sign Up"}</button>
        </form>
        <div>
          <h4 style={{ display: 'inline', marginRight: '5px' }}>Already have an account?</h4>
          <span className="auth-link" onClick={() => navigate("/login")}>LogIn Here</span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
