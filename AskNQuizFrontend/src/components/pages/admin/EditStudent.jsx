import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateStudent } from "../../../api/adminApi";
import "./EditStudent.css";

function EditStudent() {

  const navigate = useNavigate();
  const location = useLocation();

  const student = location.state;

  const [formData, setFormData] = useState({
    studentName: student.studentName,
    email: student.email
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await updateStudent(
        student.studentId,
        formData
      );

      alert("Student Updated Successfully");

      navigate("/admin/students");

    } catch (error) {

      console.error(error);

      alert("Update Failed");

    }

  };

  return (

    <div className="edit-student-page">

      <div className="edit-student-card">

        <h2>✏️ Edit Student</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Update Student
          </button>

        </form>

      </div>

    </div>

  );

}

export default EditStudent;