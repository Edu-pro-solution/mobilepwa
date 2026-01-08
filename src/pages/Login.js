import "font-awesome/css/font-awesome.min.css";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../hooks/useAuth";
import "./login.css";

import * as Yup from "yup";
import { AuthContext } from "../contexts/AuthContext";
// inital login credentials
const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  // email: Yup.string()
  //   .email("Invalid Email address")
  //   .required("Email is required!"),
  // username: Yup.string()
  //   .email("Invalid Username")
  //   .required("Username is required!"),
});
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
const { loginUser } = useContext(AuthContext); // 👈 ADD THIS

  const apiUrl = process.env.REACT_APP_API_URL;
  // const handleFormSubmit = async (values) => {
  //   setLoading(true);
  //   try {
  //     await login(values.email, values.password);
  //     toast.success("Login successful!");
  //     navigate("/dashboard");
  //   } catch (e) {
  //     toast.error("An error occurred during login.");
  //     setLoading(false);
  //   }
  // };
//   const handleFormSubmit = async (values) => {
//   setLoading(true);
//   try {
//     const loggedInUser = await login(values.email, values.password);
//     toast.success("Login successful!");

//     // Update App state by storing user in localStorage and refreshing user state
//     localStorage.setItem("user", JSON.stringify(loggedInUser));
//     // Navigate after login
//     navigate("/dashboard");
//   } catch (e) {
//     toast.error("An error occurred during login.");
//     setLoading(false);
//   }
// };
const handleFormSubmit = async (values) => {
  setLoading(true);
  try {
    const loggedInUser = await login(values.email, values.password);

    // ✅ update context state
    loginUser(loggedInUser);

    toast.success("Login successful!");
    navigate("/dashboard");
  } catch (e) {
    toast.error("An error occurred during login.");
    setLoading(false);
  }
};

   return (
   <>
     <ToastContainer position="top-center" />
 
     <div className="register-page">
 
       {/* TOP BAR */}
       <div className="register-topbar">
         <div className="topbar-left">
           <span className="back-arrow">←</span>
           <span className="app-title">Edu Pro Solution Desktop</span>
         </div>
 
         <div className="auth-toggle">
           <button className="active" onClick={() => navigate("/register")}> Sign Up</button>
           <button onClick={() => navigate("/login")}>Sign In</button>
         </div>
       </div>
 
       {/* MAIN CONTENT */}
       <div className="register-content">
 
         {/* LEFT TEXT */}
         <div className="register-left">
           <h1>Welcome Back</h1>
           <p>Sign in to your account below</p>
         </div>
 
         {/* RIGHT FORM */}
         <div className="register-right">
           <Formik
             initialValues={initialValues}
             validationSchema={validationSchema}
             onSubmit={handleFormSubmit}
           >
             {({
               values,
               errors,
               touched,
               handleChange,
               handleBlur,
               handleSubmit,
             }) => (
               <form onSubmit={handleSubmit} className="register-form">
 
        
 
          
 
                 <div className="form-group">
                   <label>Email</label>
                   <input
                     type="email"
                     name="email"
                     value={values.email}
                     onChange={handleChange}
                     onBlur={handleBlur}
                   />
                 </div>
 
              
 
          
 

     <div className="form-group password-group">
  <label>Password</label>

  <div className="password-input-wrapper">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={values.password}
   onChange={handleChange}
                     onBlur={handleBlur}
    />

    <i
      className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
      onClick={() => setShowPassword(!showPassword)}
    />
  </div>
</div>
               
                 <div className="submit-row">
                   <button type="submit" disabled={loading}>
                     {loading ? "Submitting..." : "Submit"}
                   </button>
                 </div>
 
               </form>
             )}
           </Formik>
         </div>
 
       </div>
     </div>
   </>
 );
};

export default Login;
