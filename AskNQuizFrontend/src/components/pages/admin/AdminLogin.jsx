import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";

function AdminLogin() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // handle input change
  const handleChange = (e) => {

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });

  };

  // handle login
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8080/admin/login",
        loginData
      );

      if (response.data.status === "SUCCESS") {

        // save admin in localStorage
        localStorage.setItem(
          "admin",
          JSON.stringify(loginData)
        );

        alert("Admin login successful");

        navigate("/admin/dashboard");

      } else {

        alert(response.data.msg);

      }

    } catch (error) {

      alert("Login failed");

      console.log(error);

    }

  };

  return (
  <div className="admin-login-page">

    <div className="admin-login-card">

      <h2>⚙️ Admin Login</h2>

      <p className="login-subtitle">
        Welcome Back Administrator
      </p>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={loginData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  </div>
);

}

export default AdminLogin;