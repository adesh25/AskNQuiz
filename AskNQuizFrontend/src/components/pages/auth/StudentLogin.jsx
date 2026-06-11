import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentLogin.css";

function StudentLogin() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/students/login",
        loginData
      );

      const student = {
        studentId: res.data.studentId,
        studentName: res.data.studentName,
        email: res.data.email,
      };

      localStorage.setItem(
        "student",
        JSON.stringify(student)
      );

      alert("Login Successful");
      navigate("/student");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="student-login-page">
      <div className="student-login-card">

        <h2>🎓 Student Login</h2>

        <p className="login-subtitle">
          Welcome Back to AskNQuiz
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={loginData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>

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

export default StudentLogin;