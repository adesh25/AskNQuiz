import { useEffect, useState } from "react";
import axios from "axios";
import "./Quiz.css";

function ReleaseQuiz() {
  const teacher = JSON.parse(localStorage.getItem("teacher"));
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (!teacher) return;

    axios
      .get(`http://localhost:8080/quiz/teacher/${teacher.teacherId}`)
      .then(res => setQuizzes(res.data))
      .catch(() => alert("Failed to load quizzes"));
  }, [teacher]);

  const releaseQuiz = async (quizId) => {
    try {
      await axios.put(
        `http://localhost:8080/quiz/release/${quizId}/${teacher.teacherId}`
      );

      alert("Quiz Released Successfully");
      window.location.reload();

    } catch (err) {
      alert(err.response?.data?.message || "Failed to release quiz");
    }
  };

  return (
    <div className="quiz-page">
      <div className="quiz-card">
        <h2>Release Quiz</h2>

        {quizzes
          .filter(q => q.status === "DRAFT")
          .map(q => (
            <div key={q.quizId} style={{ marginBottom: "10px" }}>
              <h4>{q.title}</h4>
              <button onClick={() => releaseQuiz(q.quizId)}>
                Release
              </button>
            </div>
        ))}
      </div>
    </div>
  );
}

export default ReleaseQuiz;