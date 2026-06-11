import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function QuizAttemptStart() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("student"));

    if (!student) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    axios
      .post("http://localhost:8080/attempts/start", {
        quizId: Number(quizId),
        studentId: Number(student.studentId),
      })
      .then((res) => {
        // ✅ Only store attemptId
        localStorage.setItem("attemptId", res.data.attemptId);

        navigate(`/student/attempt/${quizId}/questions`);
      })
      .catch((err) => {
        const msg = err.response?.data?.message;

        if (msg?.includes("already")) {
          alert("You have already attempted this quiz.");
        } else {
          alert(msg || "Failed to start quiz");
        }

        navigate("/student/quizzes");
      });
  }, [quizId, navigate]);

  return <h3>Starting Quiz...</h3>;
}

export default QuizAttemptStart;