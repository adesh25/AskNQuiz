import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function QuizQuestions() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const attemptId = localStorage.getItem("attemptId");

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // default 5 min

  // 🔥 TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          autoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 🔥 LOAD QUESTIONS
  useEffect(() => {
    if (!attemptId) {
      alert("Quiz not started properly");
      navigate("/student/quizzes");
      return;
    }

    axios
      .get(`http://localhost:8080/questions/quiz/${quizId}`)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Failed to load questions");
      });
  }, [quizId, attemptId, navigate]);

  const handleChange = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const submitQuiz = async () => {
    try {
      await axios.post("http://localhost:8080/attempts/submit", {
        attemptId: Number(attemptId),
        answers,
      });

      navigate(`/student/result/${attemptId}`);
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
    }
  };

  const autoSubmit = async () => {
    alert("Time is up! Auto submitting quiz.");
    await submitQuiz();
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Quiz Questions</h2>

      <h3 style={{ color: "red" }}>
        Time Left: {formatTime()}
      </h3>

      {questions.map((q, index) => (
        <div key={q.questionId} style={{ marginBottom: "20px" }}>
          <h4>
            {index + 1}. {q.questionText}
          </h4>

          {q.options.map((opt) => (
            <div key={opt.optionId}>
              <label>
                <input
                  type="radio"
                  name={`q-${q.questionId}`}
                  onChange={() =>
                    handleChange(q.questionId, opt.optionId)
                  }
                />
                {opt.optionText}
              </label>
            </div>
          ))}
        </div>
      ))}

      {questions.length > 0 && (
        <button onClick={submitQuiz}>Submit Quiz</button>
      )}
    </div>
  );
}

export default QuizQuestions;