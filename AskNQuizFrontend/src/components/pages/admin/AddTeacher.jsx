import { useState } from "react";
import axios from "axios";
import "./AddTeacher.css";

function AddTeacher() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    subject: "",
    courseId: ""
  });

  // handle input change
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // handle submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8080/teachers/addTeacher",
        {
          name: form.name,
          email: form.email,
          password: form.password,
          subject: form.subject,
          courseId: Number(form.courseId)
        }
      );

      alert(response.data.message || "Teacher added successfully");

      // reset form
      setForm({
        name: "",
        email: "",
        password: "",
        subject: "",
        courseId: ""
      });

    }
    catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to add teacher"
      );

    }

  };

  return (

    <div className="add-teacher-page">

      <div className="add-teacher-card">

        <h2>Add Teacher</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter Teacher Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Enter Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="courseId"
            placeholder="Enter Course ID"
            value={form.courseId}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Add Teacher
          </button>

        </form>

      </div>

    </div>

  );

}

export default AddTeacher;