import { useState } from "react";
import axios from "axios";
import Navbar from "../common/Navbar";

function TeacherResults() {
  const teacher = JSON.parse(localStorage.getItem("teacher"));
  const [quizId, setQuizId] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  if (!teacher) return <h2>Please login</h2>;

  const loadResults = async () => {
    try {
      setError("");
      const res = await axios.get(
        `http://localhost:8080/attempts/quiz/${quizId}`
      );
      setResults(res.data);
    } catch (err) {
      setError("Failed to load results");
      setResults([]);
    }
  };

  return (
    <>
      <Navbar title="Teacher Results" user={teacher} />

      <div style={{ padding: 30 }}>
        <h2>View Quiz Results</h2>

        <input
          type="number"
          placeholder="Enter Quiz ID"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          style={{ marginRight: 10 }}
        />

        <button onClick={loadResults}>Load Results</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {results.map((r) => (
          <div
            key={r.attemptId}
            style={{
              marginTop: 20,
              padding: 15,
              border: "1px solid #ddd",
              borderRadius: 6
            }}
          >
            <p><b>Student ID:</b> {r.studentId}</p>
            <p><b>Score:</b> {r.score}</p>
            <p><b>Total Questions:</b> {r.totalQuestions}</p>
            <p><b>Correct:</b> {r.correctCount}</p>
            <p><b>Wrong:</b> {r.wrongCount}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default TeacherResults;