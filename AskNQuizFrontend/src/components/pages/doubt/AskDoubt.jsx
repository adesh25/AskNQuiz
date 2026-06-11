import { useState } from "react";
import axios from "axios";
import "./AskDoubt.css";

function AskDoubt() {
  const student = JSON.parse(localStorage.getItem("student"));

  const [form, setForm] = useState({
    title: "",
    description: "",
    teacherId: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student) {
      alert("Please login first");
      return;
    }

    try {
      await axios.post("http://localhost:8080/doubts/ask", {
        title: form.title,
        description: form.description,
        studentId: student.studentId,
        teacherId: Number(form.teacherId)
      });

      alert("Doubt submitted successfully");
      setForm({ title: "", description: "", teacherId: "" });

    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit doubt");
    }
  };

  return (
    <div className="doubt-page">
      <div className="doubt-card">
        <h2>Ask a Doubt</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Doubt Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Describe your doubt"
            rows="4"
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="teacherId"
            placeholder="Teacher ID"
            value={form.teacherId}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit Doubt</button>
        </form>
      </div>
    </div>
  );
}

export default AskDoubt;