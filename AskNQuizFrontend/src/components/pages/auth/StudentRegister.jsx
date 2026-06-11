import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentRegister.css";

function StudentRegister() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    studentName: "",
    email: "",
    password: "",
    confirmPassword: "",
    admissionDate: "",
    courseId: ""
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (student.password !== student.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/students/register",
        {
          studentName: student.studentName,
          email: student.email,
          password: student.password,
          admissionDate: student.admissionDate,
          courseId: Number(student.courseId)
        }
      );

      alert("Student Registered Successfully");
      navigate("/student/login");

    } catch (error) {
      console.error(error.response?.data);
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
  <div className="student-register-page">
    <div className="student-register-card">

      <h2>📝 Student Registration</h2>

      <p className="register-subtitle">
        Create Your AskNQuiz Account
      </p>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="studentName"
          placeholder="Enter Student Name"
          value={student.studentName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={student.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={student.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={student.confirmPassword}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="admissionDate"
          value={student.admissionDate}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="courseId"
          placeholder="Enter Course ID"
          value={student.courseId}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Register
        </button>

      </form>
    </div>
  </div>
);
}

export default StudentRegister;
