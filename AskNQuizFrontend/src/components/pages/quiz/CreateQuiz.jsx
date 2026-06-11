import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

function CreateQuiz() {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const storedTeacher = localStorage.getItem("teacher");
    if (storedTeacher) {
      setTeacher(JSON.parse(storedTeacher));
    } else {
      navigate("/teacher/login");
    }
  }, [navigate]);

  const [quiz, setQuiz] = useState({
    title: "",
    subject: "",
    timeLimit: "",
    totalMarks: ""
  });

  const handleChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!teacher || !teacher.teacherId) {
      alert("Teacher ID missing. Please login again.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/quiz/add", {
        title: quiz.title,
        subject: quiz.subject,
        timeLimit: Number(quiz.timeLimit),
        totalMarks: Number(quiz.totalMarks),
        teacherId: teacher.teacherId
      });

      alert("Quiz created successfully");
      navigate(`/teacher/add-question/${res.data.quizId}`);

    } catch (err) {
      alert(
        err?.response?.data?.msg ||
        err?.response?.data?.message ||
        "Failed to create quiz"
      );
    }
  };

  return (
    <div className="quiz-page">
      <div className="quiz-card">
        <h2>Create Quiz</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Quiz Title"
            value={quiz.title}
            onChange={handleChange}
            required
          />
          <input
            name="subject"
            placeholder="Subject"
            value={quiz.subject}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="timeLimit"
            placeholder="Time Limit (minutes)"
            value={quiz.timeLimit}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="totalMarks"
            placeholder="Total Marks"
            value={quiz.totalMarks}
            onChange={handleChange}
            required
          />

          <button type="submit">Create Quiz</button>
        </form>
      </div>
    </div>
  );
}

export default CreateQuiz;