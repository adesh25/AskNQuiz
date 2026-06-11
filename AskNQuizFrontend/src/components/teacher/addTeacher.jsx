import { useState } from "react";
import axios from "axios";
import "./AddTeacher.css";

function AddTeacher() {

  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8080/teachers/addTeacher",
        teacher
      );

      alert("Teacher Registered Successfully");

      console.log(response.data);

      setTeacher({
        name: "",
        email: "",
        password: ""
      });

    } catch (error) {

      alert("Registration Failed");

      console.log(error);

    }
  };

  return (

    <div className="add-teacher-page">

      <div className="add-teacher-card">

        <h2>👨‍🏫 Add Teacher</h2>

        <p className="teacher-subtitle">
          Create Teacher Account
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter Teacher Name"
            value={teacher.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={teacher.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={teacher.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Register Teacher
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddTeacher;