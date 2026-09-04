import React, { useState } from "react";
import ".//signup.css"
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log("signUP information", signupInfo);
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name , email and password are required !");
    }
    try {
      const url = "http://localhost:7979/mern_auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else {
        handleError(message);
      }
      console.log(result);
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            autoFocus
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />

          <button type="submit">SignUp</button>
        </div>
        <span>
          Already have an account?
          <Link to="/login">Login</Link>
        </span>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Signup;
