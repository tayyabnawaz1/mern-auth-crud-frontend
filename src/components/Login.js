import React, { useState } from "react";
import ".//login.css"
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../utils";
import { ToastContainer } from "react-toastify";
const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log("LoginInfo=>>>>>", loginInfo);
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password are required");
    }
    try {
      const url = "http://localhost:7979/mern_auth/login";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, error, message, token, name } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        return handleError(details);
      } else {
        return handleError(message);
      }
      console.log(result);
    } catch (error) {
      return handleError(error);
    }
  };

  return (
    <div className="container">
      <h2>Wellcome Back</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            autoFocus
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </div>
        <span>
          Don't have an account?
          <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
