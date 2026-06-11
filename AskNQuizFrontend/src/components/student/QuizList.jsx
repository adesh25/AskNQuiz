import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./QuizList.css";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem("student"));

  useEffect(() => {
    if (!student?.studentId) return;

    // Load released quizzes
    axios
      .get("http://localhost:8080/quiz/available")
      .then((res) => setQuizzes(res.data))
      .catch((err) =>
        console.log(err.response?.data?.message)
      );

    // Load student attempts
    axios
      .get(`http://localhost:8080/attempts/student/${student.studentId}`)
      
      .then((res) => setAttempts(res.data))
      .catch(() => console.log("No attempts found"));

  }, [student]);

  const startQuiz = (quizId) => {
    navigate(`/student/attempt/${quizId}`);
  };

  const viewResult = (attemptId) => {
    navigate(`/student/result/${attemptId}`);
  };

  const getAttemptForQuiz = (quizId) => {
    return attempts.find((a) => a.quizId === quizId);
  };

  return (
    <div className="quiz-container">
      <h2>Available Quizzes</h2>

      <div className="quiz-card-container">
        {quizzes.map((quiz) => {
          const attempt = getAttemptForQuiz(quiz.quizId);

          return (
            <div className="quiz-card" key={quiz.quizId}>
              <h3>{quiz.title}</h3>
              <p><strong>Status:</strong> {quiz.status}</p>

              {attempt ? (
                <button
                  className="result-btn"
                  onClick={() => viewResult(attempt.attemptId)}
                >
                  View Result
                </button>
              ) : (
                <button
                  className="start-btn"
                  onClick={() => startQuiz(quiz.quizId)}
                >
                  Start Quiz
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QuizList;