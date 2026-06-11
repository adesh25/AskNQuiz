import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AskDoubt() {

  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("student"));

  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    teacherId: ""
  });

  // 🔥 Load Teachers for dropdown
  useEffect(() => {
    axios
      .get("http://localhost:8080/teachers/list")
      .then(res => setTeachers(res.data))
      .catch(() => alert("Failed to load teachers"));
  }, []);

  if (!student) return <h2>Please login first</h2>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.teacherId) {
      alert("Please select a teacher");
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
      navigate("/student");

    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit doubt");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Ask Doubt</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Doubt Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Describe your doubt..."
          value={form.description}
          onChange={handleChange}
          required
        />

        <br /><br />

        <select
          name="teacherId"
          value={form.teacherId}
          onChange={handleChange}
          required
        >
          <option value="">Select Teacher</option>
          {teachers.map(t => (
            <option key={t.teacherId} value={t.teacherId}>
              {t.name} ({t.subject})
            </option>
          ))}
        </select>

        <br /><br />

        <button type="submit">Submit Doubt</button>

      </form>
    </div>
  );
}

export default AskDoubt;